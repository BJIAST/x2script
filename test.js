var settings = {
        redefine_functions: true,

        regex_pattern: /eSports 2013|DreamHack 2014|Access Pass|Cluj-Napoca|autograph capsule|esports key|case key|cologne|operation wildfire case|weapon case/i
    },
    App = window['App'] = {},
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
    inlineAlert("", "Нука-нука, щас проверю..");
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
        inlineAlert("", "Гружууусь! ⌒(o＾▽＾o)ノ");
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


                            if (DEPOSIT) {
                                var ele = DIV.format(item.name, i, item.price, bot, item.name, i, item.price, bot, item.assetid, url, item.name, price_class, price_content, slot_class, botLabel, item.view);
                                eleA.push(ele);
                            }



                        }
                        $("#left_number").html(count);
                        document.getElementById("left").getElementsByClassName("reals")[0].innerHTML = eleA.join('');


                        $('.text-center>div:first>div:first>b').html("<a href='' onclick='location.reload();'>Перегружать</a> можно через: <span id='cmd'>160</span> секунд");
                        cmd();
                        $('#filterBtn')['on']('click', filterByCoins);
                        $('#resetFilter')['on']('click', resetFilter);
                        filter_root();  
                        App.DisplayAllItems();
                        DoAfter();
                        addPadding("#left", 6);
                        if (data.fromcache) {
                            inlineAlert("success", "Загрузил " + count + " available items from cache - <a href=\"javascript:loadLeft('nocache')\">обновить`</a>");
                        } else {
                            inlineAlert("success", "Загрузил: " + count + " предметов");
                            console.log("Loaded items: " + count);
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

function DoAfter(){
    $('#orderBy').val(2);
    tinysort("#left .reals>.placeholder", {
        data: "price",
        order: "asc"
    });
    $(document).bind("ajaxComplete", function () {

        $('#filterBtn')['on']('click', filterByCoins);
        $('#resetFilter')['on']('click', resetFilter);

        // sort by price
    });
}

function filterByCoins() {
    console['log']('Filter');
    var _0x7eb2x11 = parseInt($('#filterCoinsFrom')['val']()),
        _0x7eb2x12 = parseInt($('#filterCoinsTo')['val']());
    $('#left>.bricks')['remove']();
    $('#left>.reals>.placeholder')['attr']('data-price', function (_0x7eb2x13, _0x7eb2x14) {
        _0x7eb2x14 < _0x7eb2x11 || _0x7eb2x14 > _0x7eb2x12 ? $(this)['css']({
            display: 'none'
        }) : $(this)['css']({
            display: 'inline-block'
        })
    })
}

function resetFilter() {
    $('#filterCoinsFrom')['val']('');
    $('#filterCoinsTo')['val']('');
    $('#left>.reals>.placeholder')['css']({
        display: 'inline-block'
    })
}
function filter_root() {
    $(".btn-group").append("<label class='price-filter'>");
    $(".price-filter").append("<div class='form-filter'>from <input type='text' id='filterCoinsFrom' class='form-control'> to <input type='text' id='filterCoinsTo' class='form-control'><ul><li><a id='filterBtn' class='btn btn-warning'>Отфильтровать</a></li><li><a id='resetFilter' class='btn btn-danger'>Сбросить</a></li></ul>");
    $(".price-filter").css({
        "padding": "20px 0",
        "overflow": "hidden",
        "width": "100%"
    });

    $(".price-filter .form-filter").css({
        "width": "200px",
        "margin": "0 auto"
    });
    $(".form-filter ul").css({
        "display" : "inline-block",
        "list-style-type" : "none"
    });
    $(".form-filter ul li").css({
        "float" : "left;"
    });
    $(".form-filter ul li a").css({
        "width" : "120px"

    });
}

(function($){
    var name = $(".dropdown a b").html();
    var hello = "Привет " + name + ", работаем?";
    console.log(hello);
    $('.text-center>div:first>div:first>b').html("<i class='fa fa-exclamation-triangle'></i> " + hello);



})(jQuery);
