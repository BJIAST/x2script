// ==UserScript==
// @name         x2script
// @namespace    http://bjiast.xyz/
// @version      1.3196
// @description  try to hard!
// @author       BJIAST
// @match        http://www.csgodouble.com/withdraw.php
// @match       https://steamcommunity.com/tradeoffer/*
// @grant        none
// ==/UserScript==


//Global settings

// function stopwithdraw(){
//     clearTimeout(timer);
//     clearTimeout(remitems);
//     showlogs("Вывод остановлен!");
// }
function scriptBtns(){
    // $(".fw-4 .panel-body").prepend("<button id='stopqueue' onclick='stopwithdraw()' class='btn stopbtn btn-primary btn-lg' style='width:30%;height:62px;word-wrap: break-word;font-size:14px'>Остановить бота</button>");
    $("#showConfirmButton").html("Запустить вывод<div style='font-size:12px'><span id='sum'>0</span> кредитов | Баланс: <span id='avail'>0</span></div>");
    // $("#showConfirmButton").css({
    //     "width":"69%"
    // });
    // $('.navbar-right').prepend("<li><button id='changescript' class='btn btn-warning'>Chroma3 Бот</button></li>");
    // $('.navbar-right li').css({
    //     "display" : "inline-block"
    // });
    // $("#changescript").css({
    //     "height" : "50px"
    // });
}

var $this = $("#confirmButton");
var site = location.href,
    script = $("#changescript"),
    minutes,
    seconds,
    timer,
    mailNotification,
    remitems,
    soundmes = new Audio('sounds/tone.wav'),
    sounditems = new Audio('http://bjiast.at.ua/script/beep9.mp3');
soundmes.volume = 0.75;
sounditems.volume = 0.21;


function showlogs(logmes){
    $(".logmessage").remove();
    $("body").append("<div class='fa fa-check-circle logmessage'><span>" + " " + logmes + "</span></div>");
    $(".logmessage").css({
        "position" : "fixed",
        "bottom" : "20px",
        "right" : "10px",
        "font-size" : "16px",
        "padding": "10px 29px 8px 40px",
        "border": "1px solid #026194",
        "border-radius": "10px",
        "-moz-border-radius": "10px",
        "-webkit-border-radius": "10px",
        "box-shadow": "2px 2px 3px #bbb",
        "-moz-box-shadow": "2px 2px 3px #bbb",
        "-webkit-box-shadow": "2px 2px 3px #bbb",
        "background": "#fff",
        "text-align":"justify",
        "color": "#000"
    });
    $(".logmessage").fadeIn(300).delay(4500).fadeToggle(300);
}
function chromemes(mesbody){
    var currentPermission;
    Notification.requestPermission( function(result) { currentPermission = result } );
    mailNotification = new Notification("x2script", {
        body : mesbody,
        icon : "https://pp.vk.me/c7004/v7004148/23616/XwoiYEex0CQ.jpg"
    });
}



function startTimerBotUpdating() {
    date = new Date();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    console.log("Сейчас " + minutes + " минут " + seconds + " секунд");
    seconds = 60 - seconds;
    console.log("Жду " + seconds + " секунд до отсчета");
    setTimeout(function(){
        var  messeconds = seconds -5;
        showlogs("Жду " + messeconds + " секунд до отсчета времени");
    },200);
    setTimeout(function(){
        date = new Date();
        minutes = date.getMinutes();
        console.log("Сейчас " + minutes + " минут ");
        switch(minutes) {
           case 2:
           case 7:
           case 12:
           case 17:
           case 22:
           case 27:
           case 32:
           case 37:
           case 42:
           case 47:
           case 52:
           case 57:
            soundmes.play();
            chromemes("На сервере обновилась группа ботов!");
            setTimeout(function(){mailNotification.close();},4000);
            break;
            default :
                break;

        };
        setInterval(function () {
            date = new Date();
            minutes = date.getMinutes();
            console.log("Сейчас " + minutes + " минут ");
            switch(minutes) {
           case 2:
           case 7:
           case 12:
           case 17:
           case 22:
           case 27:
           case 32:
           case 37:
           case 42:
           case 47:
           case 52:
           case 57:
            soundmes.play();
            chromemes("На сервере обновилась группа ботов!");
            setTimeout(function(){mailNotification.close();},4000);
            break;
                default :
                    break;
            };
        },60000);
    },seconds*1000);

}

//Global settings

function standartBot() {
    var settings = {
            redefine_functions: true,

            regex_pattern: /eSports 2013|DreamHack 2014|Access Pass|Cluj-Napoca|autograph capsule|esports key|case key|cologne|operation wildfire case|weapon case/i
        },
        App = window['App'] = {},
        LoadedItems = [],
        sound=new Audio('sounds/rolling.wav');
    sound.volume=0.4;

    // App.GetJSON = function(){
    //     var Output = LoadedItems;
    //     $.each(Output, function(){
    //         delete(this.assetid);
    //         delete(this.img);
    //         delete(this.reject);
    //         delete(this.view);
    //         delete(this.botid);
    //     });
    //     Output = JSON.stringify(Output);
    //     //window.prompt("Copy to clipboard: Ctrl+C, Enter", Output);
    //     $('#JSONPrompt').val(Output);
    // }
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
        inlineAlert("", "Отправляю офер..");
        showlogs("Отправляю офер..");
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
                            chromemes("Скин уже в инвентаре!");
                            setTimeout(function(){
                                mailNotification.close();
                                if(confirm("Перегрузить страницу?")){
                                    location.reload();
                                }
                            },5000);
                        } else {
                            inlineAlert("cross", data.result);
                            showlogs("cross", data.result);

                            document.title = "REFUND!"
                        }

                    } else {
                        inlineAlert("error", data.error);
                        var confirmtime = parseInt(data.error.replace(/\D+/g,""));
                        console.log(data.error);
                        switch(data.error){
                            case "Offer not found in pending offer pool - please try again in 1 minute.":
                            case "Offer not found in pending offer pool - please try again in 60 seconds.":
                            case "This offer is awaiting mobile confirmation - this is done automatically, please allow up to 60 seconds.":
                            case "Attempting mobile confirmation: failed":
                            case "Attempting mobile confirmation: unknown json":
                            case 'Offer not found in pending offer pool for "'+ name +'" - if your Steam name has changed please re-login and try again.' :
                                setTimeout(function(){$this.click(App.ConfirmTradeOffer()); }, 5000);
                                break;
                            case "Attempting mobile confirmation: success":
                                document.title = "Оффер отправлен!";
                                console.log(data.error);
                                $('#offerContent b a')[0].click();
                                sound.play();
                                setTimeout(function () {
                                    $this.click(App.ConfirmTradeOffer());
                                },8000);
                                break;
                            case "This offer is still pending. Please accept the trade offer and try again.":
                                setTimeout(function () {
                                    $this.click(App.ConfirmTradeOffer());
                                },6000);
                                break;
                            case "Mobile confirmation in progress: <span id='cmdm'>" + confirmtime + "</span> seconds remaining." :
                                showlogs("Приму через " + confirmtime + " секунд");
                                $this.click();
                                setTimeout(function () {
                                    $this.click(App.ConfirmTradeOffer());
                                    // setTimeout($this.click(),10000);
                                },confirmtime*1000);
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
                            script.remove();
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
                                    showlogs("Перегружу страницу через "+delay+" с.");
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
            inlineAlert("", "Пытаюсь отправить офер - подождите...");
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
                            document.title = "Оффер принят. Готовлюсь к отправке!";
                            inlineAlert("success", "Собрать офер удалось!");;
                            showlogs("success", "Собрать офер удалось!");;
                            showPending(data);
                            sound.play();
                            $this.click(App.ConfirmTradeOffer());
                        } else {
                            inlineAlert("error", data.error);
                            var errorStringforCase = data.error.split('. ');
                            switch(data.error){
                                case "You recently placed a bot request. Please try again in 30 seconds.":
                                    var timetosend = 30;
                                    var date = new Date();
                                    var h = getHours();
                                    var m = getMinutes();
                                    var s = getSeconds();
                                    console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 29 seconds.":
                                    var timetosend = 29;
                                    var date = new Date();
                                    var h = getHours();
                                    var m = getMinutes();
                                    var s = getSeconds();
                                    console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 28 seconds.":
                                    var timetosend = 28;
                                    var date = new Date();
                                    var h = getHours();
                                    var m = getMinutes();
                                    var s = getSeconds();
                                    console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 27 seconds.":
                                    var timetosend = 27;
                                    var date = new Date();
                                    var h = getHours();
                                    var m = getMinutes();
                                    var s = getSeconds();
                                    console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 26 seconds.":
                                    var timetosend = 26;
                                    var date = new Date();
                                    var h = getHours();
                                    var m = getMinutes();
                                    var s = getSeconds();
                                    console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 25 seconds.":
                                    var timetosend = 25;
                                    var date = new Date();
                                    var h = getHours();
                                    var m = getMinutes();
                                    var s = getSeconds();
                                    console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 24 seconds.":
                                    var timetosend = 24;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    // special for console log
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 23 seconds.":
                                    var timetosend = 23;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    // special for console log
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 22 seconds.":
                                    var timetosend = 22;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 21 seconds.":
                                    var timetosend = 21;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 20 seconds.":
                                    var timetosend = 20;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 19 seconds.":
                                    var timetosend = 19;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 18 seconds.":
                                    var timetosend = 18;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 17 seconds.":
                                    var timetosend = 17;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 16 seconds.":
                                    var timetosend = 16;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 15 seconds.":
                                    var timetosend = 15;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 14 seconds.":
                                    var timetosend = 14;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 13 seconds.":
                                    var timetosend = 13;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 12 seconds.":
                                    var timetosend = 12;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 11 seconds.":
                                    var timetosend = 11;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 10 seconds.":
                                    var timetosend = 10;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 9 seconds.":
                                    var timetosend = 9;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 8 seconds.":
                                    var timetosend = 8;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 7 seconds.":
                                    var timetosend = 7;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 6 seconds.":
                                    var timetosend = 6;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 5 seconds.":
                                    var timetosend = 5;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 4 seconds.":
                                    var timetosend = 4;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 3 seconds.":
                                    var timetosend = 3;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 2 seconds.":
                                    var timetosend = 2;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 1 seconds.":
                                    var timetosend = 1;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "You recently placed a bot request. Please try again in 0 seconds.":
                                    var timetosend = 0;
                                    // // special for console log
                                    // var date = new Date();
                                    // var h = getHours();
                                    // var m = getMinutes();
                                    // var s = getSeconds();
                                    // console.log("["+h+":"+m+":"+s+"] Автовывод сработал!");
                                    timer = setTimeout(function() {
                                        offer();
                                    },timetosend*1000);
                                    setTimeout(function () {
                                        showlogs("Жду " + timetosend + " секунд");
                                    },5000);
                                    break;
                                case "Bots offline for maintenance - please try again in 5 minutes.":
                                    showlogs("Боты выключены! Автоматически продолжчу через 5 минут!");
                                    inlineAlert("Боты выключены! Автоматически продолжчу через 5 минут!");
                                    setTimeout(function(){ offer(); },300000);
                                    break;
                                case "Bots offline for maintenance - please try again in 15 minutes.":
                                    showlogs("Боты выключены! Автоматически продолжчу через 15 минут!");
                                    inlineAlert("Боты выключены! Автоматически продолжчу через 15 минут!");
                                    setTimeout(function(){ offer(); },900000);
                                    break;

                                case "You've tried trading 3 times in the last 60 seconds - please try again in 60 seconds.":
                                    showlogs("Сервер сказал что я слишком быстрый. Жду 60 секунд!");
                                    inlineAlert("Что-то мы слишком быстро отправляем запросы. Жду 60 секунд!");
                                    setTimeout(function(){ offer(); },60000);
                                    break;
                                case "Bot error: There was an error sending your trade offer.  Please try again later. (10)":
                                case "Bot error: There was an error sending your trade offer.  Please try again later. (16)":
                                case "Bot error: There was an error sending your trade offer.  Please try again later. (26)":
                                case "Bot error: There was an error sending your trade offer.  Please try again later. (20)":
                                case "Bots are currently offline for maintenance. Please try again later.":
                                case "Bot error: HTTP error occurred while contacting Steam - please try again later":
                                case "Bot error: An error occurred while processing your request - please try again later":
                                case "Bot error: Steam servers are currently under heavy load - please try again later":
                                case "Withdraw bots are currently offline for maintenance.":
                                case "Bot error: Maximum concurrent requests exceeded - please try again":
                                case "This bot is currently busy assisting other players - please choose a different bot or try again later.":
                                case "This bot is currently busy assissting other players. Please choose a different bot or try again later.":
                                    // console.log("[WITHDRAW ERROR] Continuing withdrawal loop. ("+ data.error +")\nWaiting 0.05 sec.");
                                    showlogs(data.error);
                                    setTimeout(function(){offer();}, 200);

                                    break;
                                case "Please select at least 1 item." :
                                    showlogs("Добавь хотябы 1 вещь, ау!");
                                    break;
                                case "Please confirm your existing offer before making another.":
                                    setTimeout(function(){$this.click(App.ConfirmTradeOffer());}, 200);
                                    break;
                                case "Bot error: curl error (Received HTTP code 407 from proxy after CONNECT)" :
                                    setTimeout(function(){offer();}, 30000);
                                    break;

                                case "Items no longer available - please reload the page and try again. " + errorStringforCase[1]:
                                    var errorString = data.error.split('/');
                                    var num1 = parseInt(errorString[0].replace(/\D+/g,""));
                                    var num2 = parseInt(errorString[1].replace(/\D+/g,""));
                                    var i = 1;
                                    while (i <= num2-num1){
                                        i++;
                                        $('#right .reals div:last-child.placeholder>.slot').trigger('click');
                                    }
                                    showlogs(data.error);
                                    sounditems.play();
                                    chromemes(num2-num1 + " шт. уже нету! Я их убрал!");
                                    setTimeout(function () {
                                        mailNotification.close();
                                    },3000);
                                    remitems = setTimeout(function () {
                                        offer();
                                    },5000);

                                    break;
                                default:
                                    document.title = "ERROR";
                                    sounditems.play();
                                    showlogs("Я там словил непонятную ошибку. Попробуй сам");
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
        $('#filterBtn')['on']('click', filterByCoins);
        $('#resetFilter')['on']('click', resetFilter);
        // sort by price
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
        $('.text-center>div:first>div:first>b').html("<i class='fa fa-exclamation-triangle'></i> " + hello);
        $("#showConfirmButton").on("click",function () {
            showlogs("Вывод запущен!");
        });


    })(jQuery);
}


function loadscript() {
    if (site == "http://www.csgodouble.com/withdraw.php") {
        scriptBtns();
        standartBot();
        console.log("Загружен стандартный бот");
        showlogs("Загружен стандартный бот");
        startTimerBotUpdating();
    }
}
loadscript();
var steamsite = location.href.split("tradeoffer/");
if (site == steamsite[0] + "tradeoffer/" + steamsite[1]) {
    console.log(steamsite);
    function acceptSteamTrade() {
        if (document.referrer == "http://www.csgodouble.com/withdraw.php"){
            setInterval(function(){
                ToggleReady(true);
                jQuery(".newmodal_buttons .btn_green_white_innerfade span").click();
                ConfirmTradeOffer();
            },2000);
            setTimeout(function(){
                window.close();
            },4000);
        }else{
            showlogs("Нее, такие оферы я не акепчу!Фу-фу-фу");
        }
    }
    acceptSteamTrade();
}

