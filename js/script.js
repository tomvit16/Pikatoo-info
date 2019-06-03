(function ($) {
    $(document).ready(function () {

        
        
//        Отслеживание состояний
        
        var lpReady = false;

        function lpGoToActive() {
            var lpPath = window.location.pathname.replace('/', ''),
                lpTrgt;
            if (lpPath != '') {
                lpTrgt = $('#' + lpPath);
                if (lpTrgt.length > 0) {
                    $('body, html').scrollTop(lpTrgt.offset().top - 44);
                }
            }
            setTimeout(function () {
                lpReady = true;
            }, 500);
        }

        lpGoToActive();
        $(window).on('load', lpGoToActive);


        /* Панель навигации */

        function lpHeader() {
            if ($(window).scrollTop() == 0) {
                $('header').addClass('top');
            } else {
                $('header.top').removeClass('top');
            }
        }

        lpHeader();
        $(window).on('load scroll', lpHeader);
        var lpNav = $('header ul');
        lpNav.find('li a').on('click', function (e) {
            var linkTrgt = $($(this).attr('href'));
            if (linkTrgt.length > 0) {
                e.preventDefault();
                var offset = linkTrgt.offset().top;
                $('body, html').animate({
                    scrollTop: offset - 44
                }, 750);
            }
        });

        /* Отслеживание активного экрана */


        function lpSetNavActive() {
            var curItem = '';
            $('section').each(function () {
                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    curItem = $(this).attr('id');
                }
            });
            if (lpNav.find('li.active a').attr('href') != '#' + curItem || lpNav.find('li.active').length == 0) {
                lpNav.find('li.active').removeClass('active');
                lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');

                if (lpReady) {
                    window.history.pushState({
                        curItemName: curItem
                    }, curItem, '/' + curItem);

                }


            }

        }
        lpSetNavActive();
        $(window).on('load scroll', lpSetNavActive);

        /* Слайдшоу */


        $('.lp-slider11').owlCarousel({
            items: 4,
            margin: 40,
            loop: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 6500,
            autoWidth: true,

        });

        /* Табулятор */

        $('.lp-tabs').each(function () {
            var tabs = $(this),
                tabsTitlesNames = [];
            tabs.find('div[data-tab-title]').each(function () {
                tabsTitlesNames.push($(this).attr('data-tab-title'));
            }).addClass('lp-tab');
            tabs.wrapInner('<div class="lp-tabs-content"></div>');
            tabs.prepend('<div class="lp-tabs-titles"><ul class="btn-group btn-group-lg "></ul></div>');
            var tabsTitles = tabs.find('.lp-tabs-titles'),
                tabsContent = tabs.find('.lp-tabs-content'),
                tabsContentTabs = tabsContent.find('.lp-tab');
            tabsTitlesNames.forEach(function (value) {
                tabsTitles.find('ul').append('<li type="button" >' + value + '</li>');
            });
            var tabsTitlesItems = tabsTitles.find('ul li');
            tabsTitlesItems.eq(0).addClass('active');
            tabsContentTabs.eq(0).addClass('active').show();
            tabsContent.height(tabsContent.find('.active').outerHeight());
            tabsTitlesItems.on('click', function () {
                if (!tabs.hasClass('changing')) {
                    tabs.addClass('changing');
                    tabsTitlesItems.removeClass('active');
                    $(this).addClass('active');
                    var curTab = tabsContent.find('.active'),
                        nextTab = tabsContentTabs.eq($(this).index());
                    var curHeight = curTab.outerHeight();
                    nextTab.show();
                    var nextHeight = nextTab.outerHeight();
                    nextTab.hide();
                    if (curHeight < nextHeight) {
                        tabsContent.animate({
                            height: nextHeight
                        }, 500);
                    }
                    curTab.fadeOut(500, function () {
                        if (curHeight > nextHeight) {
                            tabsContent.animate({
                                height: nextHeight
                            }, 500);
                        }
                        nextTab.fadeIn(500, function () {
                            curTab.removeClass('active');
                            nextTab.addClass('active');
                            tabs.removeClass('changing');
                        });
                    });

                }
            });

            $(window).on('load resize', function () {

                tabsContent.height(tabsContent.find('.active').outerHeight());
            });
        });

        /* Всплывающие окна */

        $('#lp-mfp').magnificPopup({
            type: 'inline'
        });




        //кнопки для таулятора на услуги
        $(".lp-tabs-titles li").addClass("btn btn-primary");

        //высота блоков
        $(window).on('load resize', function () {
            var heightRightDivTop = $('.ptoo-top-image').height();
            $('.pt-top-left-div').height(heightRightDivTop);
        });

        // Калькулятор клиентов

        var percent;
        var calculatorTip = $("#slider-range-min1");
        var calculatorResult = $(".calculator__result");
        var clientsByMonth = $("#clientsByMonth");
        var revenueByMonth = $('#revenueByMonth');

        calculatorTip.on("change ready", function () {
            percent = calculatorTip.val();
            calculatorResult.text(percent);
            $('#slider-range-min1').attr('data-min1-val', percent);
            var i = function () {
                return percent / 100 * 17 ^ 0;
            };
            clientsByMonth.text(i);
            $('#clientsByMonth').attr('data-clientsByMonth', i);
            var clBymnth = $('#clientsByMonth').attr('data-clientsByMonth');
            var slRangemin2 = $('#slider-range-min2').attr('data-min2-val');
            var percent100 = function () {
                return clBymnth * slRangemin2;
            }
            revenueByMonth.text(percent100);

        });

        var percent2;
        var calculatorTip2 = $("#slider-range-min2");
        var calculatorResult2 = $(".calculator__result2");

        calculatorTip2.on("change load", function () {
            percent2 = calculatorTip2.val();
            calculatorResult2.text(percent2);
            var percent11 = calculatorTip.val();
            var percent12 = percent11 / 100 * 17 ^ 0;
            var percent3 = percent12 * percent2;
            revenueByMonth.text(percent3);
            $('#slider-range-min2').attr('data-min2-val', percent2);
        });


        //map
        $.fn.lpMapInit = function () {

            var lpMapOption = {
                center: [53.906045, 27.542383],
                zoom: 4,
                controls: ['zoomControl', 'fullscreenControl']
            }

            if (window.innerWidth < 768) {
                lpMapOption.behaviors = ['multiTouch']
            } else {
                lpMapOption.behaviors = ['drag']
            }

            var lpMap = new ymaps.Map('lp-map', lpMapOption);

            var lpPlacemark = new ymaps.Placemark(lpMapOption.center, {
                hintContent: 'Pikatoo',
                balloonContentHeader: 'Pikatoo',
                balloonContentBody: 'Реклаба у блогеров',
                balloonContentFooter: 'ул. Мельникайте, д. 2'
            });
            lpMap.geoObjects.add(lpPlacemark);
        }



        //        Форма обратной связи   
        $('#popup1').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: '#lp-mfp',
            fbTheme: false
        });

        $('#lp-fb2').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: false
        });






        //Menu

        $('#my-menu').mmenu({

            extensions: ['pagedim-black', 'fx-listitems-slide', 'position-right'],
            navbar: {
                title: '<img src="./img/pikatoo.png" alt="Pikatoo">'
            }

        });









    });
})(jQuery);
