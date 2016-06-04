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
            
            $("#botFilter").append("<div id='captcha'>");
            $(".norobots").appendTo("#captcha");
        
        }

        loadCSS = function(href) {
            $("link")[4].disaled.true;
            var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
            $("head").append(cssLink);
        };

        loadCSS("https://github.com/BJIAST/x2script/blob/x2beta/newstyle.css");
    });
})();
