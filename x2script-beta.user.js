// ==UserScript==
// @name         x2script-beta
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  What the fuckin` wrong with you!
// @author       BJIAST
// @match        http://www.csgodouble.com/withdraw.php
// @match       https://steamcommunity.com/tradeoffer/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    jQuery(document).ready(function(){
        var dollar = 0,
            ruble = 0,
            dollarIsRight = !1;

        var settings = {
            $this : $("#confirmButton"),
            site : location.href,
            script : $("#changescript")
        };


        function getPrices() {
            xhr = new XMLHttpRequest;
            xhr['onreadystatechange'] = function() {
                4 == xhr['readyState'] && xhr['responseText'] && (dollar = /<div class='item-amount'>\$([0-9\.]*)<\/div>/g ['exec'](xhr['responseText']), null != dollar ? (dollar = dollar[1], dollarIsRight = !0) : dollarIsRight = !1)
            };
            xhr['open']('GET', 'https://opskins.com/?loc=shop_search&app=730_2&search_item=%22Chroma+2+Case+Key%22&min=&max=&sort=lh&stat=&grade=&exterior=&type=', !0);
            xhr['send'](null);
            xhr1 = new XMLHttpRequest;
            xhr1['onreadystatechange'] = function() {
                4 == xhr1['readyState'] && xhr1['responseText'] && (ruble = /<p class="ip-text">\u041b\u0443\u0447\u0448\u0435\u0435 ([0-9\.]*)<small>/g ['exec'](xhr1['responseText'])[1])
            };
            xhr1['open']('GET', 'https://csgo.tm/item/927007517-143865972-Chroma+2+Case+Key/', !0);
            xhr1['send'](null)
        }

   $(".slot").hover(function(){
                var  name =  $(this).attr("data-name");
                $("#item-status").show();
                $(".item-name").text(name);
            });
            $(".slot").mouseout(function(){
                $("#item-status").hide();
            });

        function x2style(){

            $("link[href='css/mine.css?v=5']").attr("href", "http://bjiast.at.ua/script/style.css");
            $("#left").append("<div id='captcha'>");
            $(".norobots").appendTo("#captcha");
            $('.fw-4 .panel-heading h3 b').text('');
            $("#inlineAlert").appendTo('.fw-4 .panel-heading h3 b');
            $("#botFilter .btn").toggleClass("btn-default btn-primary");
            $("#showConfirmButton").toggleClass("btn-danger btn-primary");
            $(".bricks>.placeholder").remove();
            $(".alert-danger").remove();
            $(".text-center:first>div").addClass("base-body");
            $(".navbar-right").prepend("<li><input type='checkbox' id='specialBot' disabled><label for='specialBot'>Специальный бот</label></li>");
            $(".base-body").prepend("<div class='panel panel-default text-left' id='info-bar'>");
            $(".base-body").prepend("<div class='panel panel-default text-left' id='item-status'>");
            $("#item-status").prepend("<div class='panel-body text-center'>");
            $("#item-status").hide();
            $("#item-status .panel-body").prepend("<div class='item-name'>");
            $("#info-bar").prepend("<nav class='trade-links'>");
            $(".trade-links").prepend("<div class='panel-body text-center'>" +
                "<ul>" +
                "<li class='btn btn-primary'><a href='http://analystic.ru/' target='_blank'>Аналистик</a></li>" +
                "<li class='btn btn-primary'><a href='https://csgo.tm/' target='_blank'>CSGO TM</a></li>" +
                "<li class='btn btn-primary'><a href='https://opskins.com/' target='_blank'>Opskins</a></li>" +
                "</ul></div>");
            $("#info-bar").append("<div class='info-status'>");

        }
             
        x2style();

    });
})();
