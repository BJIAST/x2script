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

        var settings = {
            $this : $("#confirmButton"),
            site : location.href,
            script : $("#changescript")
        };

        function x2style(){
            $("body").css({
                "background" : "#202120"
            });
            $(".panel-body").css({
                "background" : "#cecece"
            });
            $(".bricks>.placeholder").hide();
            $("#botFilter").css({
                "width" : "100%"
            });
            $("#botFilter .btn ").css({
                "width" : "50px",
                "font-size" : "13px",
                "margin" : "5px",
                "padding" : "5px",
                "float" : "left"
            });
            $("#botFilter").append("<div id='captcha'>");
            $(".norobots").appendTo("#captcha");

        }

    });
})();
