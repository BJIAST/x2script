// ==UserScript==
// @name         CSGODouble withdraw script
// @namespace    http://tampermonkey.net/
// @version      0.0004
// @description  try to take over the world!
// @author       BJIAST
// @match        http://www.csgodouble.com/withdraw.php
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    var name = $(".dropdown a b").html();
    // inlineAlert = $('#inlineAlert');


    function htmlwriter() {

        var hellomes = "Привет " + name + ", работаем?";
        $(".alert-danger b").text(hellomes);

        // alert
        $(".btn-group").append("<label class='price-filter'>");


        $(".price-filter").append("<div class='form-filter'>from <input type='text' id='filterCoinsFrom' class='form-control'> to <input type='text' id='filterCoinsTo' class='form-control'><ul><li><a id='filterBtn' class='btn btn-warning'>Отфильтровать</a></li><li><a id='resetFilter' class='btn btn-danger'>Сбросить</a></li></ul>");


        // sort inputs
    }

    function styles() {

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


    function timetoreload() {
        var countdown = $('.alert-danger b'),
           timer;

        function startCountdown() {
            var startFrom = 150;

            timer = setInterval(function () {
                countdown.html("<i class='fa fa-exclamation-triangle'></i>" + "Перегружать базу можно через " + --startFrom + " секунд");
                if (startFrom <= 0) {
                    clearInterval(timer);
                    countdown.html("<i class='fa fa-exclamation-triangle'></i>" + "База устарела. Стоит <a href='' onclick='window.location.reload();' id='reloadPage'>перезагрузить</a>!");
                }
            }, 1000);
        }
        startCountdown();

    }

    function resetFilter() {
        $('#filterCoinsFrom')['val']('');
        $('#filterCoinsTo')['val']('');
        $('#left>.reals>.placeholder')['css']({
            display: 'inline-block'
        })
    }

    function DoAfter() {

        $(document).bind("ajaxComplete", function () {
            $('#orderBy').val(2);
            tinysort("#left .reals>.placeholder", {
                data: "price",
                order: "asc"
            });
            // sort by descending
            $('#filterBtn')['on']('click', filterByCoins);
            $('#resetFilter')['on']('click', resetFilter);

            // sort by price
            // timetoreload();
        });

    }

    htmlwriter();
    styles();
    DoAfter();

})();
