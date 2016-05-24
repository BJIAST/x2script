// ==UserScript==
// @name         CSGODouble
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  When life gives you lemons, don't make lemonade! Make life take the lemons back!
// @author       WhynotCrybot (whynot.crybot.net)
// @match        http://www.csgodouble.com/withdraw.php
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var settings = {
    redefine_functions: true,

    min:         4   * 1000,
    max:         9  * 1000,
    ItemsToGrab: 30,
    max_diff   : -600,

    regex_pattern: /eSports 2013|DreamHack 2014|Access Pass|Cluj-Napoca|autograph capsule|esports key|case key|cologne|operation wildfire case|weapon case/i
},
App = window['App'] = {},
ItemsPerBot = {},
LoadedItems = [],
sound=new Audio('sounds/rolling.wav');
sound.volume=0.4;

App.GetJSON = function(){
    var Output = LoadedItems;
    $.each(Output, function(){
        delete(this.assetid);
        delete(this.img);
        delete(this.reject);
        delete(this.view);
        delete(this.botid);
    });
    Output = JSON.stringify(Output);
    //window.prompt("Copy to clipboard: Ctrl+C, Enter", Output);
    $('#JSONPrompt').val(Output);
}
App.DisplayAllItems = function(){
    $("#left .reals").empty();
    $("#right .reals").empty();
    var IMG = "{0}/{1}fx{2}f";
    var DIV = "<div class='placeholder matched' data-name='{0}' data-pos='{1}' data-price='{2}' data-bot='{3}'>";
    DIV += "<div class='slot {13}' data-view='{15}' data-name='{4}' data-pos='{5}' data-price='{6}' data-bot='{7}' data-id='{8}' style='background-image:url(\"{9}\")'>";
    DIV += "<div class='name'>{10}</div>";
    DIV += "<div class='price {11}'>{12}</div>";
    DIV += "<div class='bot'>{14}</div>";
    DIV += "</div></div>";
    
    var url = "";
    var count = LoadedItems.length;
    var eleA = [];
    for (var i = 0; i < count; i++) {
        var item = LoadedItems[i];
        var url = IMG.format(item.img, 110, 50);
        var price_class = "ball-1";
        if (DEPOSIT) {
            price_class = "ball-0";
        }
        var slot_class = "";
        var price_content = item.price;
        if (price_content == 0) {
            price_content = item.reject;
            slot_class = "reject";
        } else {
            price_content = formatNum(price_content);
        }
        var bot = 0;
        if (item.botid) {
            bot = item.botid;
        }
        var botLabel = "";
        if (!DEPOSIT) {
            botLabel = "Bot " + bot;
        }
        //if(/(Factory New)/.test(item.name)){
            var ele = DIV.format(item.name, i, item.price, bot, item.name, i, item.price, bot, item.assetid, url, item.name, price_class, price_content, slot_class, botLabel, item.view);
            eleA.push(ele); 
        //}

    }
    $("#left_number").html(count);
    document.getElementById("left").getElementsByClassName("reals")[0].innerHTML = eleA.join('');
}
App.ConfirmTradeOffer = function(){
    inlineAlert("", "Confirming trade offer - please wait...");
    var $this = $("#confirmButton");
    $this.prop("disabled", true);
    var tid = $this.data("tid");
    $.ajax({
        url: "scripts/_confirm.php",
        type: "GET",
        data: {
            "tid": tid
        },
        success: function(data) {
            try {
                data = JSON.parse(data);
                if (data.success) {
                    if (data.action == "accept") {
                        inlineAlert("success", data.result);
                        document.title = "SUCCESS!"
                    } else {
                        inlineAlert("cross", data.result);
                        document.title = "REFUND!"
                    }
                    $("#offerPanel").slideUp();
                    sound.play();
                    
                } else {
                    inlineAlert("error", data.error);
                    switch(data.error){
                        case "Offer not found in pending offer pool - please try again in 1 minute.":
                        case "Offer not found in pending offer pool - please try again in 60 seconds.":
                        case "This offer is awaiting mobile confirmation - this is done automatically, please allow up to 60 seconds.":
                        case "Attempting mobile confirmation: failed":
                        case "Attempting mobile confirmation: unknown json":
                            setTimeout(function(){ App.ConfirmTradeOffer(); }, 5000);
                            break;
                        case "Attempting mobile confirmation: success":
                        case "This offer is still pending. Please accept the trade offer and try again.":
                            document.title = "GO TO STEAM!";
                            $('#offerContent b a')[0].click();
                            sound.play();
                            break;
                        default:
                            console.log('Unnatural error! ('+data.error+')');
                            break;
                    }
                }
            } catch (err) {
                inlineAlert("error", "Javascript error: " + err);
                App.ConfirmTradeOffer();
            }
        },
        error: function(err) {
            inlineAlert("error", "AJAX error: " + err.statusText);
            setTimeout(function(){ App.ConfirmTradeOffer(); }, 5000);
        },
        complete: function() {
            $this.prop("disabled", false);
        }
    });
}


var loadLeftNew = function(opts){
    inlineAlert("", "⌒(o＾▽＾o)ノ");
    var DIV = "<div class='placeholder matched' data-name='{0}' data-pos='{1}' data-price='{2}' data-bot='{3}'>";
    DIV += "<div class='slot {13}' data-view='{15}' data-name='{4}' data-pos='{5}' data-price='{6}' data-bot='{7}' data-id='{8}' style='background-image:url(\"{9}\")'>";
    DIV += "<div class='name'>{10}</div>";
    DIV += "<div class='price {11}'>{12}</div>";
    DIV += "<div class='bot'>{14}</div>";
    DIV += "</div></div>";
    var IMG = "{0}/{1}fx{2}f";
    var url = "";
    if (DEPOSIT) {
        url = "scripts/_get_inv.php?" + opts;
    } else {
        var g = grecaptcha.getResponse();
        url = "scripts/_get_bank_safe.php?g-recaptcha-response=" + g;
    }
    $.ajax({
        "url": url,
        success: function(data) {
            try {
                data = JSON.parse(data);
                if (data.success) {
                    LoadedItems = data.items;
                    //console.log(data);
                    $("#left .reals").empty();
                    $("#right .reals").empty();
                    $("#right .bricks").removeClass("hidden");
                    $("#avail").html(formatNum(data.balance));
                    var count = data.items.length;
                    var passed_filter = 0;
                    var eleA = [];
                    for (var i = 0; i < count; i++) {
                        var item = data.items[i];
                        var url = IMG.format(item.img, 110, 50);
                        var price_class = "ball-1";
                        if (DEPOSIT) {
                            price_class = "ball-0";
                        }
                        var slot_class = "";
                        var price_content = item.price;
                        if (price_content == 0) {
                            price_content = item.reject;
                            slot_class = "reject";
                        } else {
                            price_content = formatNum(price_content);
                        }
                        var bot = 0;
                        if (item.botid) {
                            bot = item.botid;
                        }
                        var botLabel = "";
                        if (!DEPOSIT) {
                            botLabel = "Bot " + bot;
                        }
                        
                        //EDITED
                        if (DEPOSIT) {
                            var ele = DIV.format(item.name, i, item.price, bot, item.name, i, item.price, bot, item.assetid, url, item.name, price_class, price_content, slot_class, botLabel, item.view);
                            eleA.push(ele);   
                        }
                        else{
                            var price = item.price,
                                name = item.name;
                            if (price <= settings['max'] && price >= settings['min']){
                                if(!settings['regex_pattern'].test(name)){
                                    var ele = DIV.format(item.name, i, item.price, bot, item.name, i, item.price, bot, item.assetid, url, item.name, price_class, price_content, slot_class, botLabel, item.view);
                                    eleA.push(ele);
                                    CountItemsPerBot(bot);
                                    passed_filter++;
                                } 
                            }
                        }
                        //EDITED
                        
                    }
                    $("#left_number").html(count);
                    document.getElementById("left").getElementsByClassName("reals")[0].innerHTML = eleA.join('');
                    
                    if(passed_filter > 0) DoAfter(data.balance);
                    
                    $('.text-center>div:first>div:first>b').html("Timer: <span id='cmd'>180</span>");
                    cmd();
                    
                    addPadding("#left", 6);
                    if (data.fromcache) {
                        inlineAlert("success", "Loaded " + count + " available items from cache - <a href=\"javascript:loadLeft('nocache')\">force reload</a>");
                    } else {
                        inlineAlert("success", "Loaded items: " + count + " Passed filtration: " + passed_filter);
                        console.log("Loaded items: " + count + " Passed filtration: " + passed_filter);
                    }
                } else {
                    inlineAlert("error", data.error);
                    cmd();
                    //Annoying piece of garbage fixer
                        if(data.error.substring(0, 14) == "Access denied."){
                            var delay = 0;
                            switch(data.error.length){
                                case 82:
                                    delay = data.error.substring(63, 66);
                                    break;
                                case 81:
                                    delay = data.error.substring(63, 65);
                                    break;
                                case 80:
                                    delay = data.error.substring(63, 64);
                                    break;
                                default:
                                    console.log("Something bad happened.");
                                    //location.reload();
                            }
                            if(delay !== 0){
                                console.log("I will reload the page after "+delay+"s.");
                                setTimeout(function(){location.reload();}, delay * 1000);   
                            }
                            else{
                                console.log("Error occured near timer sequence! Probably an error message has changes.");
                            }
                        }
                    
                    
                    
                }
                if (data.tid) {
                    showPending(data);
                }
            } catch (err) {
                inlineAlert("error", "Javascript error: " + err);
                console.log(err.stack);
            }
        },
        error: function(err) {
            inlineAlert("error", "AJAX error: " + err.statusText);
        },
    });
},
offerNew = function() {
    $('#showConfirmButton').prop("disabled", true);
    inlineAlert("", "Processing trade offer - please wait...");
    $("#confirmModal").modal("hide");
    var csv = "";
    var sum = 0;
    $("#right .slot").each(function(i, e) {
        csv += $(this).data("id") + ",";
        sum += $(this).data("price");
    });
    var turl = $("#tradeurl").val();
    var remember = $("#remember").is(":checked") ? "on" : "off";
    var url = "scripts/_withdraw.php";
    if (DEPOSIT) {
        url = "scripts/_deposit.php";
    }

        $.ajax({
            "url": url,
            type: "GET",
            data: {
                "assetids": csv,
                "tradeurl": turl,
                "checksum": sum,
                "remember": remember
            },
            success: function(data) {
                try {
                    data = JSON.parse(data);
                    if (data.success) {
                        document.title = "Creating trade offer...";
                        inlineAlert("success", "New trade offer!");
                        showPending(data);
                        sound.play();
                        App.ConfirmTradeOffer();
                    } else {
                        inlineAlert("error", data.error);
                        switch(data.error){
                            case "Bot error: There was an error sending your trade offer.  Please try again later. (10)":
                            case "Bot error: There was an error sending your trade offer.  Please try again later. (16)":
                            case "Bot error: There was an error sending your trade offer.  Please try again later. (26)":
                            case "Bot error: There was an error sending your trade offer.  Please try again later. (20)":
                            case "Please confirm your existing offer before making another.":
                            case "Bots offline for maintenance - please try again in 5 minutes.":
                            case "Bots offline for maintenance - please try again in 15 minutes.":
                            case "Bots are currently offline for maintenance. Please try again later.":
                                case "You have recently used the bots. Please try again in 30 seconds.":
                                case "You have recently used the bots. Please try again in 29 seconds.":
                                case "You have recently used the bots. Please try again in 28 seconds.":
                                case "You have recently used the bots. Please try again in 27 seconds.":
                                case "You have recently used the bots. Please try again in 26 seconds.":
                                case "You have recently used the bots. Please try again in 25 seconds.":
                                case "You have recently used the bots. Please try again in 24 seconds.":
                                case "You have recently used the bots. Please try again in 23 seconds.":
                                case "You have recently used the bots. Please try again in 22 seconds.":
                                case "You have recently used the bots. Please try again in 21 seconds.":
                                case "You have recently used the bots. Please try again in 20 seconds.":
                                case "You have recently used the bots. Please try again in 19 seconds.":
                                case "You have recently used the bots. Please try again in 18 seconds.":
                                case "You have recently used the bots. Please try again in 17 seconds.":
                                case "You have recently used the bots. Please try again in 16 seconds.":
                                case "You have recently used the bots. Please try again in 15 seconds.":
                                case "You have recently used the bots. Please try again in 14 seconds.":
                                case "You have recently used the bots. Please try again in 13 seconds.":
                                case "You have recently used the bots. Please try again in 12 seconds.":
                                case "You have recently used the bots. Please try again in 11 seconds.":
                                case "You have recently used the bots. Please try again in 10 seconds.":
                                case "You have recently used the bots. Please try again in 9 seconds.":
                                case "You have recently used the bots. Please try again in 8 seconds.":
                                case "You have recently used the bots. Please try again in 7 seconds.":
                                case "You have recently used the bots. Please try again in 6 seconds.":
                                case "You have recently used the bots. Please try again in 5 seconds.":
                                case "You have recently used the bots. Please try again in 4 seconds.":
                                case "You have recently used the bots. Please try again in 3 seconds.":
                                case "You have recently used the bots. Please try again in 2 seconds.":
                                case "You have recently used the bots. Please try again in 1 seconds.":
                            case "Bot error: HTTP error occurred while contacting Steam - please try again later":
                            case "Bot error: An error occurred while processing your request - please try again later": 
                            case "Bot error: Steam servers are currently under heavy load - please try again later":
                            case "Withdraw bots are currently offline for maintenance.":
                            case "You've tried trading 3 times in the last 60 seconds - please try again in 60 seconds.":
                            case "Bot error: Maximum concurrent requests exceeded - please try again":
                            case "This bot is currently busy assisting other players - please choose a different bot or try again later.":
                            case "This bot is currently busy assissting other players. Please choose a different bot or try again later.":
                                //console.log("[WITHDRAW ERROR] Continuing withdrawal loop. ("+ data.error +")\nWaiting 0.05 sec.");
                                setTimeout(function(){ offer(); }, 200);
                                break;
                            case "Items no longer available - please reload the page and try again.":
                                if($("#right .slot").length > 1){
                                    //console.log("[WITHDRAW ERROR] Removing 1 item from stash and continuing withdrawal loop. ("+ data.error +")");
                                    $('#right .reals div:first .slot').trigger('click');
                                    document.title = "Left items: "+$("#right .slot").length;
                                    offer();
                                }
                                else{
                                    document.title = "Dropped all items from stash";
                                    setInterval(function(){
                                        document.title = $('#cmd').text() + "|Dropped all items from stash";
                                    }, 1000);
                                }
                                break;
                            default:
                                document.title = "ERROR";
                                console.log("[WITHDRAW ERROR] Breaking withdrawal loop. ("+ data.error +")");
                                break;
                        };
                        
                    }
                    $('#showConfirmButton').prop("disabled", false);
                } catch (err) {
                    inlineAlert("error", "Javascript error: " + err);
                    offer();
                    $('#showConfirmButton').prop("disabled", false);
                }
            },
            error: function(err) {
                inlineAlert("error", "AJAX error: " + err.statusText);
                $('#showConfirmButton').prop("disabled", false);
                offer();
            },
        });
},
showConfirmNew = function(){
    if($('#tradeurl').val() == "") $("#confirmModal").modal("show");
    else offer();
}

if(settings['redefine_functions']){
    loadLeft = loadLeftNew;
    offer = offerNew;
    showConfirm = showConfirmNew;
}

function DoAfter(balance){
    $('#orderBy').val(2);
    tinysort("#left .reals>.placeholder", {
        data: "price",
        order: "asc"
    });
    
    var BotWithMostItems = 0,
        MaxItems = 0;
    $.each(ItemsPerBot, function(k, v){
        if(v > MaxItems){
            BotWithMostItems = k;
            MaxItems = v;
        }
    });

    //Bot panel handler
    $("#botFilter .btn").removeClass("active").addClass("disabled");
    $("#botFilter .btn[data-bot='"+BotWithMostItems+"']").addClass("active").removeClass("disabled");
	doFilter();
    
    if(MaxItems < settings['ItemsToGrab']) settings['ItemsToGrab']=MaxItems;
    var GrabbedItems = 0,
        totalPrice = 0;
    $('#left .reals>div').each(function(){
        if($(this).hasClass('hidden')) return;
        if(GrabbedItems == settings['ItemsToGrab']) return false;
        
        var child = $(this).children(),
            grandchild = $(child[0]).children();
        totalPrice = totalPrice + parseInt($(grandchild[1]).text());
        if(totalPrice > balance) return false;
        
        $(child[0]).trigger('click');
        //console.log(totalPrice);
        GrabbedItems++;
    });
    
    document.title = "Left items: "+$("#right .slot").length;
    $('#showConfirmButton').trigger("click");
}

function CountItemsPerBot(bot){
    if(bot in ItemsPerBot){
        ItemsPerBot[bot]++;
    }
    else{
        ItemsPerBot[bot] = 1;
    }
}

function DrawSettingsPanel(){
    $('body').append("<div id='SettingsPanel' style='z-index:20;position:fixed;width:250px;height:400px;background:white;top:0;color:black;'>" +
                     "<span onClick='App.DisplayAllItems()'>DisplayAllItems</span><br>"+
                     "<span onClick='App.GetJSON()'>Get items JSON</span>"+
                     "<textarea id='JSONPrompt'></textarea>" +
                     "</div>");
}

function receiveMessage(e) {
    var data = e.data;
    for (var i=0; i < LoadedItems.length; i++) {
        if (LoadedItems[i].name == data.name) {
            var price_diff = LoadedItems[i].price - data.price;
            
            if(price_diff >= settings['max_diff']){
                console.log(data.name + "|"+data.price+"|diff:" + price_diff+"       ratio: "+(price_diff/data.price)*100 + "%");
            }
            break;
        }
    }
}

(function($){
    var hello = "\n[whybot.crybot.net][v0.33] Have a nice day, sir! ｡ﾟ(⌐■_■)ﾟ｡";
    console.log(hello);
    $('.text-center>div:first>div:first>b').html("<i class='fa fa-exclamation-triangle'></i>" + hello);
    DrawSettingsPanel();
    
    window.addEventListener('message', receiveMessage);
})(jQuery);