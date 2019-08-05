(function($) {
    "use strict"
    $(function() {
        
        $('.__is--anchor').on('click', function(e) {
            e.preventDefault()
            var element = $(this).attr('href')
            $('html, body').animate({
                scrollTop: $(element).offset().top - $('.navbar').innerHeight()
            }, 1500, "swing");
        })

    })
})(jQuery);
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
                '3. Производится расчёт стоимости ремонта, наш менеджер Вас подробно проконсультирует. Оставьте номер телефона для связи.'
            ],
            titleBlock = $('.calculator__right__subtitle'),
            errorBlock = $('.calculator__right__error')

        function setError(text) {
            errorBlock.html(text)
            errorBlock.addClass('is--active')
        }

        function clearError() {
            errorBlock.removeClass('is--active')
            errorBlock.html(' ')
        }

        function setStep(num) {
            titleBlock.html(titles[current_step - 1])
            $('.calculator__right__step').removeClass('is--active')
            $('.calculator__right__step[data-stepid="' + num +'"]').addClass('is--active')
        }
        
        setStep(current_step)

        $('.calculator__btn button[type="submit"]').on('click', function(e) {

            clearError()
            
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
                }else {
                    setError('Выберите тип дома, чтобы продолжить')
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

                    if(step2_price > 0 && $('input[id="calc23"]').val() != null && $('input[id="calc23"]').val() > 0) {

                        total = step1_price * step2_price * $('input[id="calc23"]').val()
                        $('input#calc31').val(total.toLocaleString('ru-RU') + ruble)
                        current_step = 3
                        setStep(current_step)
                    }else {
                        setError('Введите корректную площадь, чтобы продолжить')
                    }
                }else {
                    setError('Выберите тип ремонта, чтобы продолжить')
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
                }else {
                    setError('Введите корректный номер телефона, чтобы продолжить')
                }
                 
            }

        })

        $('.calculator__btn.is--prev').on('click', function() {
            if(current_step > 0) current_step--
            setStep(current_step)
            clearError()
        })

    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {
        
        $('.tcard__left__carousel__inner').slick({
            prevArrow: '.tcard__left__carousel__controls__btn.is--prev',
            nextArrow: '.tcard__left__carousel__controls__btn.is--next'
        })

        $('.about__slides__block__carousel__inner').each(function() {
            $(this).slick({
                prevArrow: $(this).parent().find('button.is--prev'),
                nextArrow: $(this).parent().find('button.is--next'),
            })
        })

        $('.about__slides__block__carousel__inner').on('setPosition', function(e) {
            var currentSliderId = $(this)[0].slick.currentSlide
            var currentSlide = $($(this)[0].slick.$slides[currentSliderId])
            var thisId = currentSlide.attr('data-id')
            var thisTitle = currentSlide.attr('data-title');
            var thisContent = currentSlide.attr('data-desc');
            var thisTitleBlock = $('.about__slides__block__text__title[data-id="' + thisId + '"]')
            var thisContentBlock = $('.about__slides__block__text__desc[data-id="' + thisId + '"]')
            thisTitleBlock.html(thisTitle)
            thisContentBlock.html(thisContent)
        })

        // $('.working__block__carousel__list').each(function() {
        //     $(this).slick({
        //         prevArrow: $(this).parent().find('button.is--prev'),
        //         nextArrow: $(this).parent().find('button.is--next'),
        //         asNavFor: '.working__block__carousel__items ul',
        //         infinite: false

        //     })
        // })

        // $('.working__block__carousel__item.slick-cloned').removeAttr('data-fancybox')

        // $('.working__block__carousel__items ul').slick({
        //     slidesToShow: 6,
        //     asNavFor: '.working__block__carousel__list',
        //     infinite: false,
        //     prevArrow: '',
        //     nextArrow: ''
        // })

        // $('.working__block__carousel__items ul li').on('click', function() {
        //     var __item = {
        //         id: $(this).data('itemid'),
        //         carousel: $(this).data('carouselid')
        //     }

        //     $('.working__block__carousel__list[data-carouselid="' + __item.carousel + '"]').slick('slickGoTo', __item.id);

        //     console.log(__item)
        // })

        for(var i = 0; i < $('.working__block__left').length; i++) {

            var block = $('.working__block__left')[i]
            var galleryThumbs = new Swiper($(block).find('.gallery-thumbs') , {
                spaceBetween: 24,
                slidesPerView: 6,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                lazy: true,
                breakpoints: {
                    1200: {
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 5
                    }
                }
            });
            var galleryTop = new Swiper($(block).find('.gallery-top'), {
                spaceBetween: 0,
                lazy: true,
                navigation: {
                    nextEl: $(block).find('.working__block__carousel__controls button.is--next'),
                    prevEl: $(block).find('.working__block__carousel__controls button.is--prev'),
                },
                thumbs: {
                    swiper: galleryThumbs
                }
            });
        }
        
    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {
        
        $('.form__group.is--border input').focus(function() {
            $(this).closest('.form__group.is--border').addClass('is--focus')
        })

        $('.form__group.is--border input').focusout(function() {
            $(this).closest('.form__group.is--border').removeClass('is--focus')
        })

        $('form').parsley()

    })
})(jQuery);
$(document).ready(function() {
  $("a.btn, .navbar_menu ul li a, .navbar__mobile__menu ul li a").on("click touchend", function(e) {
    var el = $(this);
    var link = el.attr("href");
    if(!$(el).hasClass('__nohref') && 
    !$(el).attr('target') && 
    !$(el).attr(data-fancybox) &&
    !$(el).hasClass('modal__close')
    ) {
      window.location = link;
    }
  });
});
(function($) {
    "use strict"
    $(function() {
        
        setSizeForiFrame()

        function setSizeForiFrame() {
            var height = $('.contacts__info').innerHeight()
            $('#map iframe').css('min-height', height)
        }

        $(window).resize(function() {
            setSizeForiFrame()
        })

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

            var mainMinHeight = $(window).innerHeight() - $('.footer').innerHeight()

            if(navbarHeight) {
                $('main.__ispadding').css('padding-top', navbarHeight + 'px')
                $('.navbar__mobile__inner').css('padding-top', navbarHeight + 'px')
            }
            if(bannerWidth && bannerWidth > 380) {
                $('.navbar__mobile').css('max-width', bannerWidth + 'px')
            }else {
                $('.navbar__mobile').css('max-width','380px')
            }
            $('main').css("min-height", mainMinHeight);
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
(function($) {
    "use strict"
    $(function() {
        
        var CLASSES = {
            target: "._tab-target",
            block: "._tab-block",
            active: "is--open"
        }

        $(CLASSES.target).on('click', function() {

            $(CLASSES.target).removeClass('is--active');
            $(this).addClass('is--active');

            if($(this).data('tabid')) {
                openTab($(this).data('tabid'))
            }

        })

        function openTab(id) {
            $(CLASSES.block).removeClass(CLASSES.active);
            $(CLASSES.block + '[data-tabid="' + id + '"]').addClass(CLASSES.active);
        }

    })
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuY2hvci5qcyIsImNhbGN1bGF0b3IuanMiLCJjYXJvdXNlbC5qcyIsImZvcm1zLmpzIiwibGlua19pb3NfYnVnZml4LmpzIiwibWFwLmpzIiwibmF2YmFyLmpzIiwidGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICAkKCcuX19pcy0tYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKVxyXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wIC0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KClcclxuICAgICAgICAgICAgfSwgMTUwMCwgXCJzd2luZ1wiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgc3RlcDFfcHJpY2UgPSAgIDAsXHJcbiAgICAgICAgICAgIHN0ZXAyX3ByaWNlID0gICAwLFxyXG4gICAgICAgICAgICBzdGVwM19tZXRlcnMgPSAgMCxcclxuICAgICAgICAgICAgY3VycmVudF9zdGVwID0gIDEsXHJcbiAgICAgICAgICAgIHJ1YmxlID0gJCgnaW5wdXQjY2FsYzMxJykudmFsKCksXHJcbiAgICAgICAgICAgIHRvdGFsID0gMCxcclxuICAgICAgICAgICAgdGl0bGVzID0gW1xyXG4gICAgICAgICAgICAgICAgJzEuINCS0YvQsdC10YDQuNGC0LUg0YLQuNC/INC00L7QvNCwOicsXHJcbiAgICAgICAgICAgICAgICAnMi4g0JLRi9Cx0LXRgNC40YLQtSDRgtC40L8g0YDQtdC80L7QvdGC0LA6JyxcclxuICAgICAgICAgICAgICAgICczLiDQn9GA0L7QuNC30LLQvtC00LjRgtGB0Y8g0YDQsNGB0YfRkdGCINGB0YLQvtC40LzQvtGB0YLQuCDRgNC10LzQvtC90YLQsCwg0L3QsNGIINC80LXQvdC10LTQttC10YAg0JLQsNGBINC/0L7QtNGA0L7QsdC90L4g0L/RgNC+0LrQvtC90YHRg9C70YzRgtC40YDRg9C10YIuINCe0YHRgtCw0LLRjNGC0LUg0L3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwINC00LvRjyDRgdCy0Y/Qt9C4LidcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgdGl0bGVCbG9jayA9ICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3VidGl0bGUnKSxcclxuICAgICAgICAgICAgZXJyb3JCbG9jayA9ICQoJy5jYWxjdWxhdG9yX19yaWdodF9fZXJyb3InKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRFcnJvcih0ZXh0KSB7XHJcbiAgICAgICAgICAgIGVycm9yQmxvY2suaHRtbCh0ZXh0KVxyXG4gICAgICAgICAgICBlcnJvckJsb2NrLmFkZENsYXNzKCdpcy0tYWN0aXZlJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyRXJyb3IoKSB7XHJcbiAgICAgICAgICAgIGVycm9yQmxvY2sucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgICAgICBlcnJvckJsb2NrLmh0bWwoJyAnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U3RlcChudW0pIHtcclxuICAgICAgICAgICAgdGl0bGVCbG9jay5odG1sKHRpdGxlc1tjdXJyZW50X3N0ZXAgLSAxXSlcclxuICAgICAgICAgICAgJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdGVwJykucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgICAgICAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXBbZGF0YS1zdGVwaWQ9XCInICsgbnVtICsnXCJdJykuYWRkQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuXHJcbiAgICAgICAgJCgnLmNhbGN1bGF0b3JfX2J0biBidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNsZWFyRXJyb3IoKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICAgICAgICBpZihjdXJyZW50X3N0ZXAgPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dHMgPSAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXBzJykuZmluZCgnaW5wdXRbbmFtZT1cImNhbGMxXCJdOmNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMTEnKSBzdGVwMV9wcmljZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMTInKSBzdGVwMV9wcmljZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMTMnKSBzdGVwMV9wcmljZSA9IDFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RlcDFfcHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfc3RlcCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCfQktGL0LHQtdGA0LjRgtC1INGC0LjQvyDQtNC+0LzQsCwg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VycmVudF9zdGVwID09IDIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRzID0gJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdGVwcycpLmZpbmQoJ2lucHV0W25hbWU9XCJjYWxjMlwiXTpjaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMjEnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAyX3ByaWNlID0gNzUwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMjInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAyX3ByaWNlID0gMTI1MDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0ZXAyX3ByaWNlID4gMCAmJiAkKCdpbnB1dFtpZD1cImNhbGMyM1wiXScpLnZhbCgpICE9IG51bGwgJiYgJCgnaW5wdXRbaWQ9XCJjYWxjMjNcIl0nKS52YWwoKSA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsID0gc3RlcDFfcHJpY2UgKiBzdGVwMl9wcmljZSAqICQoJ2lucHV0W2lkPVwiY2FsYzIzXCJdJykudmFsKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnaW5wdXQjY2FsYzMxJykudmFsKHRvdGFsLnRvTG9jYWxlU3RyaW5nKCdydS1SVScpICsgcnVibGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfc3RlcCA9IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcign0JLQstC10LTQuNGC0LUg0LrQvtGA0YDQtdC60YLQvdGD0Y4g0L/Qu9C+0YnQsNC00YwsINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YwnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcign0JLRi9Cx0LXRgNC40YLQtSDRgtC40L8g0YDQtdC80L7QvdGC0LAsINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YwnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnRfc3RlcCA9PSAzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoJCgnaW5wdXQjY2FsYzMyJykudmFsKCkubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdmb3JtLnBocCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSA9PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNtb2RhbF9jYWxjdWxhdG9yJykubW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDbG9zZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWRlRHVyYXRpb246IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCfQktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90YvQuSDQvdC+0LzQtdGAINGC0LXQu9C10YTQvtC90LAsINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YwnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5jYWxjdWxhdG9yX19idG4uaXMtLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoY3VycmVudF9zdGVwID4gMCkgY3VycmVudF9zdGVwLS1cclxuICAgICAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcbiAgICAgICAgICAgIGNsZWFyRXJyb3IoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLnRjYXJkX19sZWZ0X19jYXJvdXNlbF9faW5uZXInKS5zbGljayh7XHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy50Y2FyZF9fbGVmdF9fY2Fyb3VzZWxfX2NvbnRyb2xzX19idG4uaXMtLXByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcudGNhcmRfX2xlZnRfX2Nhcm91c2VsX19jb250cm9sc19fYnRuLmlzLS1uZXh0J1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5hYm91dF9fc2xpZGVzX19ibG9ja19fY2Fyb3VzZWxfX2lubmVyJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICQodGhpcykucGFyZW50KCkuZmluZCgnYnV0dG9uLmlzLS1wcmV2JyksXHJcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICQodGhpcykucGFyZW50KCkuZmluZCgnYnV0dG9uLmlzLS1uZXh0JyksXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmFib3V0X19zbGlkZXNfX2Jsb2NrX19jYXJvdXNlbF9faW5uZXInKS5vbignc2V0UG9zaXRpb24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGVySWQgPSAkKHRoaXMpWzBdLnNsaWNrLmN1cnJlbnRTbGlkZVxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFNsaWRlID0gJCgkKHRoaXMpWzBdLnNsaWNrLiRzbGlkZXNbY3VycmVudFNsaWRlcklkXSlcclxuICAgICAgICAgICAgdmFyIHRoaXNJZCA9IGN1cnJlbnRTbGlkZS5hdHRyKCdkYXRhLWlkJylcclxuICAgICAgICAgICAgdmFyIHRoaXNUaXRsZSA9IGN1cnJlbnRTbGlkZS5hdHRyKCdkYXRhLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIHZhciB0aGlzQ29udGVudCA9IGN1cnJlbnRTbGlkZS5hdHRyKCdkYXRhLWRlc2MnKTtcclxuICAgICAgICAgICAgdmFyIHRoaXNUaXRsZUJsb2NrID0gJCgnLmFib3V0X19zbGlkZXNfX2Jsb2NrX190ZXh0X190aXRsZVtkYXRhLWlkPVwiJyArIHRoaXNJZCArICdcIl0nKVxyXG4gICAgICAgICAgICB2YXIgdGhpc0NvbnRlbnRCbG9jayA9ICQoJy5hYm91dF9fc2xpZGVzX19ibG9ja19fdGV4dF9fZGVzY1tkYXRhLWlkPVwiJyArIHRoaXNJZCArICdcIl0nKVxyXG4gICAgICAgICAgICB0aGlzVGl0bGVCbG9jay5odG1sKHRoaXNUaXRsZSlcclxuICAgICAgICAgICAgdGhpc0NvbnRlbnRCbG9jay5odG1sKHRoaXNDb250ZW50KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2xpc3QnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAkKHRoaXMpLnNsaWNrKHtcclxuICAgICAgICAvLyAgICAgICAgIHByZXZBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLXByZXYnKSxcclxuICAgICAgICAvLyAgICAgICAgIG5leHRBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLW5leHQnKSxcclxuICAgICAgICAvLyAgICAgICAgIGFzTmF2Rm9yOiAnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9faXRlbXMgdWwnLFxyXG4gICAgICAgIC8vICAgICAgICAgaW5maW5pdGU6IGZhbHNlXHJcblxyXG4gICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2l0ZW0uc2xpY2stY2xvbmVkJykucmVtb3ZlQXR0cignZGF0YS1mYW5jeWJveCcpXHJcblxyXG4gICAgICAgIC8vICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2l0ZW1zIHVsJykuc2xpY2soe1xyXG4gICAgICAgIC8vICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcbiAgICAgICAgLy8gICAgIGFzTmF2Rm9yOiAnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9fbGlzdCcsXHJcbiAgICAgICAgLy8gICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgcHJldkFycm93OiAnJyxcclxuICAgICAgICAvLyAgICAgbmV4dEFycm93OiAnJ1xyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2l0ZW1zIHVsIGxpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgIHZhciBfX2l0ZW0gPSB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZDogJCh0aGlzKS5kYXRhKCdpdGVtaWQnKSxcclxuICAgICAgICAvLyAgICAgICAgIGNhcm91c2VsOiAkKHRoaXMpLmRhdGEoJ2Nhcm91c2VsaWQnKVxyXG4gICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICAkKCcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19saXN0W2RhdGEtY2Fyb3VzZWxpZD1cIicgKyBfX2l0ZW0uY2Fyb3VzZWwgKyAnXCJdJykuc2xpY2soJ3NsaWNrR29UbycsIF9faXRlbS5pZCk7XHJcblxyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhfX2l0ZW0pXHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8ICQoJy53b3JraW5nX19ibG9ja19fbGVmdCcpLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmxvY2sgPSAkKCcud29ya2luZ19fYmxvY2tfX2xlZnQnKVtpXVxyXG4gICAgICAgICAgICB2YXIgZ2FsbGVyeVRodW1icyA9IG5ldyBTd2lwZXIoJChibG9jaykuZmluZCgnLmdhbGxlcnktdGh1bWJzJykgLCB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNixcclxuICAgICAgICAgICAgICAgIGZyZWVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgIDEyMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgZ2FsbGVyeVRvcCA9IG5ldyBTd2lwZXIoJChibG9jaykuZmluZCgnLmdhbGxlcnktdG9wJyksIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcclxuICAgICAgICAgICAgICAgIGxhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsOiAkKGJsb2NrKS5maW5kKCcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLW5leHQnKSxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2RWw6ICQoYmxvY2spLmZpbmQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tcHJldicpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRodW1iczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlcjogZ2FsbGVyeVRodW1ic1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICAkKCcuZm9ybV9fZ3JvdXAuaXMtLWJvcmRlciBpbnB1dCcpLmZvY3VzKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb3JtX19ncm91cC5pcy0tYm9yZGVyJykuYWRkQ2xhc3MoJ2lzLS1mb2N1cycpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmZvcm1fX2dyb3VwLmlzLS1ib3JkZXIgaW5wdXQnKS5mb2N1c291dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9ybV9fZ3JvdXAuaXMtLWJvcmRlcicpLnJlbW92ZUNsYXNzKCdpcy0tZm9jdXMnKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJ2Zvcm0nKS5wYXJzbGV5KClcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICQoXCJhLmJ0biwgLm5hdmJhcl9tZW51IHVsIGxpIGEsIC5uYXZiYXJfX21vYmlsZV9fbWVudSB1bCBsaSBhXCIpLm9uKFwiY2xpY2sgdG91Y2hlbmRcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIGVsID0gJCh0aGlzKTtcclxuICAgIHZhciBsaW5rID0gZWwuYXR0cihcImhyZWZcIik7XHJcbiAgICBpZighJChlbCkuaGFzQ2xhc3MoJ19fbm9ocmVmJykgJiYgXHJcbiAgICAhJChlbCkuYXR0cigndGFyZ2V0JykgJiYgXHJcbiAgICAhJChlbCkuYXR0cihkYXRhLWZhbmN5Ym94KSAmJlxyXG4gICAgISQoZWwpLmhhc0NsYXNzKCdtb2RhbF9fY2xvc2UnKVxyXG4gICAgKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGxpbms7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICBzZXRTaXplRm9yaUZyYW1lKClcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U2l6ZUZvcmlGcmFtZSgpIHtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9ICQoJy5jb250YWN0c19faW5mbycpLmlubmVySGVpZ2h0KClcclxuICAgICAgICAgICAgJCgnI21hcCBpZnJhbWUnKS5jc3MoJ21pbi1oZWlnaHQnLCBoZWlnaHQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRTaXplRm9yaUZyYW1lKClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNldE5hdmJhcigpXHJcbiAgICAgICAgZml4ZU5hdmJhcigpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldE5hdmJhcigpIHtcclxuICAgICAgICAgICAgdmFyIG5hdmJhckhlaWdodCA9ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgIHZhciBiYW5uZXJXaWR0aCA9ICQoJy5iYW5uZXJfX2xlZnQnKS5pbm5lcldpZHRoKClcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluTWluSGVpZ2h0ID0gJCh3aW5kb3cpLmlubmVySGVpZ2h0KCkgLSAkKCcuZm9vdGVyJykuaW5uZXJIZWlnaHQoKVxyXG5cclxuICAgICAgICAgICAgaWYobmF2YmFySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAkKCdtYWluLl9faXNwYWRkaW5nJykuY3NzKCdwYWRkaW5nLXRvcCcsIG5hdmJhckhlaWdodCArICdweCcpXHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19tb2JpbGVfX2lubmVyJykuY3NzKCdwYWRkaW5nLXRvcCcsIG5hdmJhckhlaWdodCArICdweCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoYmFubmVyV2lkdGggJiYgYmFubmVyV2lkdGggPiAzODApIHtcclxuICAgICAgICAgICAgICAgICQoJy5uYXZiYXJfX21vYmlsZScpLmNzcygnbWF4LXdpZHRoJywgYmFubmVyV2lkdGggKyAncHgnKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19tb2JpbGUnKS5jc3MoJ21heC13aWR0aCcsJzM4MHB4JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCdtYWluJykuY3NzKFwibWluLWhlaWdodFwiLCBtYWluTWluSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpeGVOYXZiYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxpbmcgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKVxyXG4gICAgICAgICAgICB2YXIgbmF2YmFyID0gJCgnLm5hdmJhcicpXHJcbiAgICAgICAgICAgIGlmKHNjcm9sbGluZyA+IG5hdmJhci5pbm5lckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZiYXIuYWRkQ2xhc3MoJ2lzLS1kYXJrJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihzY3JvbGxpbmcgPCBuYXZiYXIuaW5uZXJIZWlnaHQoKSAmJiAhbmF2YmFyLmhhc0NsYXNzKCdpcy0tcmRhcmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKCdpcy0tZGFyaycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldE5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZml4ZU5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fbWJ0biBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJylcclxuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdpcy0tbW9iaWxlLW1lbnUnKS50b2dnbGVDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJyNvdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKCdjbGFzcycpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX21idG4gYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgQ0xBU1NFUyA9IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBcIi5fdGFiLXRhcmdldFwiLFxyXG4gICAgICAgICAgICBibG9jazogXCIuX3RhYi1ibG9ja1wiLFxyXG4gICAgICAgICAgICBhY3RpdmU6IFwiaXMtLW9wZW5cIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChDTEFTU0VTLnRhcmdldCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKENMQVNTRVMudGFyZ2V0KS5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy0tYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZigkKHRoaXMpLmRhdGEoJ3RhYmlkJykpIHtcclxuICAgICAgICAgICAgICAgIG9wZW5UYWIoJCh0aGlzKS5kYXRhKCd0YWJpZCcpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5UYWIoaWQpIHtcclxuICAgICAgICAgICAgJChDTEFTU0VTLmJsb2NrKS5yZW1vdmVDbGFzcyhDTEFTU0VTLmFjdGl2ZSk7XHJcbiAgICAgICAgICAgICQoQ0xBU1NFUy5ibG9jayArICdbZGF0YS10YWJpZD1cIicgKyBpZCArICdcIl0nKS5hZGRDbGFzcyhDTEFTU0VTLmFjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7Il19
