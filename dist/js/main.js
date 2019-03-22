(function($) {
    "use strict"
    $(function() {

        var
            step1_price =   0,
            step2_price =   0,
            step3_meters =  0,
            current_step =  1,
            ruble = $('input#calc31').val(),
            total = 0,
            titles = [
                '1. Выберите тип дома:',
                '2. Выберите тип ремонта:',
                '3. Производится расчет стоимости ремонта, наш менеджер Вас подробно проконсультирует. Оставьте номер телефона для связи.'
            ],
            titleBlock = $('.calculator__right__subtitle')

        function setStep(num) {
            titleBlock.html(titles[current_step - 1])
            $('.calculator__right__step').removeClass('is--active')
            $('.calculator__right__step[data-stepid="' + num +'"]').addClass('is--active')
        }
        
        setStep(current_step)

        $('.calculator__btn button[type="submit"]').on('click', function(e) {
            
            e.preventDefault()

            if(current_step == 1) {

                var inputs = $('.calculator__right__steps').find('input[name="calc1"]:checked')
                
                if(inputs.length > 0) {
                    if(inputs.attr('id') == 'calc11') step1_price = 1
                    else if(inputs.attr('id') == 'calc12') step1_price = 1
                    else if(inputs.attr('id') == 'calc13') step1_price = 1

                    if(step1_price > 0) {
                        current_step = 2
                        setStep(current_step)
                    }
                }

            }
            else if(current_step == 2) {

                var inputs = $('.calculator__right__steps').find('input[name="calc2"]:checked')

                if(inputs.length > 0) {
                    if(inputs.attr('id') == 'calc21') {
                        step2_price = 7500
                    }else if(inputs.attr('id') == 'calc22') {
                        step2_price = 12500
                    }

                    if(step2_price > 0 && $('input[id="calc23"]').val() != null && $('input[id="calc23"]').val() != 0) {

                        total = step1_price * step2_price * $('input[id="calc23"]').val()
                        $('input#calc31').val(total.toLocaleString('ru-RU') + ruble)
                        current_step = 3
                        setStep(current_step)
                    }
                }

            }
            else if(current_step == 3) {

                if($('input#calc32').val().length > 10) {
                    $.ajax({
                        url: 'form.php',
                        success: function(data) {
                        if(data == 'true') {
                            $('#modal_calculator').modal({
                                showClose: false,
                                show: true,
                                fadeDuration: 100
                            })
                        }
                        }
                    }); 
                }
                 
            }

        })

        $('.calculator__btn.is--prev').on('click', function() {
            if(current_step > 0) current_step--
            setStep(current_step)
        })

    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {
        


    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {
        
        setNavbar()
        fixeNavbar()

        function setNavbar() {
            var navbarHeight = $('.navbar').innerHeight()
            var bannerWidth = $('.banner__left').innerWidth()
            if(navbarHeight) {
                $('main.__ispadding').css('padding-top', navbarHeight + 'px')
                $('.navbar__mobile__inner').css('padding-top', navbarHeight + 'px')
            }
            if(bannerWidth && bannerWidth > 380) {
                $('.navbar__mobile').css('max-width', bannerWidth + 'px')
            }else {
                $('.navbar__mobile').css('max-width','380px')
            }
        }

        function fixeNavbar() {
            var scrolling = $(document).scrollTop()
            var navbar = $('.navbar')
            if(scrolling > navbar.innerHeight()) {
                navbar.addClass('is--dark')
            }
            if(scrolling < navbar.innerHeight() && !navbar.hasClass('is--rdark')) {
                navbar.removeClass('is--dark')
            }
        }

        $(window).resize(function() {
            setNavbar()
        })

        $(window).scroll(function() {
            fixeNavbar()
        })

        $('.navbar__mbtn button').on('click', function() {
            $(this).toggleClass('is-active')
            $('body').toggleClass('is--mobile-menu').toggleClass('is--overlay')
        })

        $('#overlay').on('click', function() {
            $('body').removeAttr('class')
            $('.navbar__mbtn button').removeClass('is-active')
        })

    })
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3IuanMiLCJmb3Jtcy5qcyIsIm5hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgc3RlcDFfcHJpY2UgPSAgIDAsXHJcbiAgICAgICAgICAgIHN0ZXAyX3ByaWNlID0gICAwLFxyXG4gICAgICAgICAgICBzdGVwM19tZXRlcnMgPSAgMCxcclxuICAgICAgICAgICAgY3VycmVudF9zdGVwID0gIDEsXHJcbiAgICAgICAgICAgIHJ1YmxlID0gJCgnaW5wdXQjY2FsYzMxJykudmFsKCksXHJcbiAgICAgICAgICAgIHRvdGFsID0gMCxcclxuICAgICAgICAgICAgdGl0bGVzID0gW1xyXG4gICAgICAgICAgICAgICAgJzEuINCS0YvQsdC10YDQuNGC0LUg0YLQuNC/INC00L7QvNCwOicsXHJcbiAgICAgICAgICAgICAgICAnMi4g0JLRi9Cx0LXRgNC40YLQtSDRgtC40L8g0YDQtdC80L7QvdGC0LA6JyxcclxuICAgICAgICAgICAgICAgICczLiDQn9GA0L7QuNC30LLQvtC00LjRgtGB0Y8g0YDQsNGB0YfQtdGCINGB0YLQvtC40LzQvtGB0YLQuCDRgNC10LzQvtC90YLQsCwg0L3QsNGIINC80LXQvdC10LTQttC10YAg0JLQsNGBINC/0L7QtNGA0L7QsdC90L4g0L/RgNC+0LrQvtC90YHRg9C70YzRgtC40YDRg9C10YIuINCe0YHRgtCw0LLRjNGC0LUg0L3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwINC00LvRjyDRgdCy0Y/Qt9C4LidcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgdGl0bGVCbG9jayA9ICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3VidGl0bGUnKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTdGVwKG51bSkge1xyXG4gICAgICAgICAgICB0aXRsZUJsb2NrLmh0bWwodGl0bGVzW2N1cnJlbnRfc3RlcCAtIDFdKVxyXG4gICAgICAgICAgICAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXAnKS5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3RlcFtkYXRhLXN0ZXBpZD1cIicgKyBudW0gKydcIl0nKS5hZGRDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFN0ZXAoY3VycmVudF9zdGVwKVxyXG5cclxuICAgICAgICAkKCcuY2FsY3VsYXRvcl9fYnRuIGJ1dHRvblt0eXBlPVwic3VibWl0XCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICAgICAgICBpZihjdXJyZW50X3N0ZXAgPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dHMgPSAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXBzJykuZmluZCgnaW5wdXRbbmFtZT1cImNhbGMxXCJdOmNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMTEnKSBzdGVwMV9wcmljZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMTInKSBzdGVwMV9wcmljZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMTMnKSBzdGVwMV9wcmljZSA9IDFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RlcDFfcHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfc3RlcCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnRfc3RlcCA9PSAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0cyA9ICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3RlcHMnKS5maW5kKCdpbnB1dFtuYW1lPVwiY2FsYzJcIl06Y2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzIxJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwMl9wcmljZSA9IDc1MDBcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzIyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwMl9wcmljZSA9IDEyNTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzdGVwMl9wcmljZSA+IDAgJiYgJCgnaW5wdXRbaWQ9XCJjYWxjMjNcIl0nKS52YWwoKSAhPSBudWxsICYmICQoJ2lucHV0W2lkPVwiY2FsYzIzXCJdJykudmFsKCkgIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwgPSBzdGVwMV9wcmljZSAqIHN0ZXAyX3ByaWNlICogJCgnaW5wdXRbaWQ9XCJjYWxjMjNcIl0nKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdpbnB1dCNjYWxjMzEnKS52YWwodG90YWwudG9Mb2NhbGVTdHJpbmcoJ3J1LVJVJykgKyBydWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudF9zdGVwID0gM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VycmVudF9zdGVwID09IDMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkKCdpbnB1dCNjYWxjMzInKS52YWwoKS5sZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2Zvcm0ucGhwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI21vZGFsX2NhbGN1bGF0b3InKS5tb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Nsb3NlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhZGVEdXJhdGlvbjogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmNhbGN1bGF0b3JfX2J0bi5pcy0tcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZihjdXJyZW50X3N0ZXAgPiAwKSBjdXJyZW50X3N0ZXAtLVxyXG4gICAgICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICBzZXROYXZiYXIoKVxyXG4gICAgICAgIGZpeGVOYXZiYXIoKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXROYXZiYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYXZiYXJIZWlnaHQgPSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICB2YXIgYmFubmVyV2lkdGggPSAkKCcuYmFubmVyX19sZWZ0JykuaW5uZXJXaWR0aCgpXHJcbiAgICAgICAgICAgIGlmKG5hdmJhckhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgJCgnbWFpbi5fX2lzcGFkZGluZycpLmNzcygncGFkZGluZy10b3AnLCBuYXZiYXJIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fbW9iaWxlX19pbm5lcicpLmNzcygncGFkZGluZy10b3AnLCBuYXZiYXJIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGJhbm5lcldpZHRoICYmIGJhbm5lcldpZHRoID4gMzgwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19tb2JpbGUnKS5jc3MoJ21heC13aWR0aCcsIGJhbm5lcldpZHRoICsgJ3B4JylcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fbW9iaWxlJykuY3NzKCdtYXgtd2lkdGgnLCczODBweCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpeGVOYXZiYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxpbmcgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKVxyXG4gICAgICAgICAgICB2YXIgbmF2YmFyID0gJCgnLm5hdmJhcicpXHJcbiAgICAgICAgICAgIGlmKHNjcm9sbGluZyA+IG5hdmJhci5pbm5lckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZiYXIuYWRkQ2xhc3MoJ2lzLS1kYXJrJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihzY3JvbGxpbmcgPCBuYXZiYXIuaW5uZXJIZWlnaHQoKSAmJiAhbmF2YmFyLmhhc0NsYXNzKCdpcy0tcmRhcmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKCdpcy0tZGFyaycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldE5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZml4ZU5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fbWJ0biBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJylcclxuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdpcy0tbW9iaWxlLW1lbnUnKS50b2dnbGVDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJyNvdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKCdjbGFzcycpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX21idG4gYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyJdfQ==
