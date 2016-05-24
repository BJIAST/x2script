// ==UserScript==
// @name         CSGODouble withdraw script
// @namespace    http://tampermonkey.net/
// @version      0.0001
// @description  try to take over the world!
// @author       BJIAST
// @match        http://www.csgodouble.com/withdraw.php
// @grant        none
// ==/UserScript==
(function () {
    'use strict';


    function hello() {

        var name = $(".dropdown a b").html();
        var hellomes = "Привет " + name + ", работаем?";
        $(".alert-danger b").text(hellomes);

    }

    function DoAfter() {

        $(document).bind("ajaxComplete", function () {
            $('#orderBy').val(2);
            tinysort("#left .reals>.placeholder", {
                data: "price",
                order: "asc"
            });
            $(".alert-danger b").text("Тут что-то может быть.. иногда.. наверное..");

        });

    }

    hello();
    DoAfter();

})();
