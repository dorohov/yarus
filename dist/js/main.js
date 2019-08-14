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

        function openCity() {
            $('.navbar__city').addClass('is--open')
        }

        function closeCity() {
            $('.navbar__city').removeClass('is--open')
        }

        function toggleCity() {
            if($('.navbar__city').hasClass('is--open')) {
                closeCity()
            }else {
                openCity()
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

        $('.navbar__city__label').on('click', function() {
            toggleCity()
        })

        $(document).on('click', function(e) {
            var targets = $(e.target).closest('.navbar__city')
            if(targets.length <= 0) closeCity()
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuY2hvci5qcyIsImNhbGN1bGF0b3IuanMiLCJjYXJvdXNlbC5qcyIsImZvcm1zLmpzIiwibGlua19pb3NfYnVnZml4LmpzIiwibWFwLmpzIiwibmF2YmFyLmpzIiwidGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJy5fX2lzLS1hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9ICQodGhpcykuYXR0cignaHJlZicpXHJcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJChlbGVtZW50KS5vZmZzZXQoKS50b3AgLSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICB9LCAxNTAwLCBcInN3aW5nXCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICBzdGVwMV9wcmljZSA9ICAgMCxcclxuICAgICAgICAgICAgc3RlcDJfcHJpY2UgPSAgIDAsXHJcbiAgICAgICAgICAgIHN0ZXAzX21ldGVycyA9ICAwLFxyXG4gICAgICAgICAgICBjdXJyZW50X3N0ZXAgPSAgMSxcclxuICAgICAgICAgICAgcnVibGUgPSAkKCdpbnB1dCNjYWxjMzEnKS52YWwoKSxcclxuICAgICAgICAgICAgdG90YWwgPSAwLFxyXG4gICAgICAgICAgICB0aXRsZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAnMS4g0JLRi9Cx0LXRgNC40YLQtSDRgtC40L8g0LTQvtC80LA6JyxcclxuICAgICAgICAgICAgICAgICcyLiDQktGL0LHQtdGA0LjRgtC1INGC0LjQvyDRgNC10LzQvtC90YLQsDonLFxyXG4gICAgICAgICAgICAgICAgJzMuINCf0YDQvtC40LfQstC+0LTQuNGC0YHRjyDRgNCw0YHRh9GR0YIg0YHRgtC+0LjQvNC+0YHRgtC4INGA0LXQvNC+0L3RgtCwLCDQvdCw0Ygg0LzQtdC90LXQtNC20LXRgCDQktCw0YEg0L/QvtC00YDQvtCx0L3QviDQv9GA0L7QutC+0L3RgdGD0LvRjNGC0LjRgNGD0LXRgi4g0J7RgdGC0LDQstGM0YLQtSDQvdC+0LzQtdGAINGC0LXQu9C10YTQvtC90LAg0LTQu9GPINGB0LLRj9C30LguJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0aXRsZUJsb2NrID0gJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdWJ0aXRsZScpLFxyXG4gICAgICAgICAgICBlcnJvckJsb2NrID0gJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19lcnJvcicpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEVycm9yKHRleHQpIHtcclxuICAgICAgICAgICAgZXJyb3JCbG9jay5odG1sKHRleHQpXHJcbiAgICAgICAgICAgIGVycm9yQmxvY2suYWRkQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xlYXJFcnJvcigpIHtcclxuICAgICAgICAgICAgZXJyb3JCbG9jay5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgICAgIGVycm9yQmxvY2suaHRtbCgnICcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTdGVwKG51bSkge1xyXG4gICAgICAgICAgICB0aXRsZUJsb2NrLmh0bWwodGl0bGVzW2N1cnJlbnRfc3RlcCAtIDFdKVxyXG4gICAgICAgICAgICAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXAnKS5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3RlcFtkYXRhLXN0ZXBpZD1cIicgKyBudW0gKydcIl0nKS5hZGRDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFN0ZXAoY3VycmVudF9zdGVwKVxyXG5cclxuICAgICAgICAkKCcuY2FsY3VsYXRvcl9fYnRuIGJ1dHRvblt0eXBlPVwic3VibWl0XCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgY2xlYXJFcnJvcigpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRfc3RlcCA9PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0cyA9ICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3RlcHMnKS5maW5kKCdpbnB1dFtuYW1lPVwiY2FsYzFcIl06Y2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMxMScpIHN0ZXAxX3ByaWNlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMxMicpIHN0ZXAxX3ByaWNlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMxMycpIHN0ZXAxX3ByaWNlID0gMVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzdGVwMV9wcmljZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudF9zdGVwID0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ9CS0YvQsdC10YDQuNGC0LUg0YLQuNC/INC00L7QvNCwLCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMJylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJyZW50X3N0ZXAgPT0gMikge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dHMgPSAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXBzJykuZmluZCgnaW5wdXRbbmFtZT1cImNhbGMyXCJdOmNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlucHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMyMScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDJfcHJpY2UgPSA3NTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMyMicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDJfcHJpY2UgPSAxMjUwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RlcDJfcHJpY2UgPiAwICYmICQoJ2lucHV0W2lkPVwiY2FsYzIzXCJdJykudmFsKCkgIT0gbnVsbCAmJiAkKCdpbnB1dFtpZD1cImNhbGMyM1wiXScpLnZhbCgpID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwgPSBzdGVwMV9wcmljZSAqIHN0ZXAyX3ByaWNlICogJCgnaW5wdXRbaWQ9XCJjYWxjMjNcIl0nKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdpbnB1dCNjYWxjMzEnKS52YWwodG90YWwudG9Mb2NhbGVTdHJpbmcoJ3J1LVJVJykgKyBydWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudF9zdGVwID0gM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCfQktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90YPRjiDQv9C70L7RidCw0LTRjCwg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCfQktGL0LHQtdGA0LjRgtC1INGC0LjQvyDRgNC10LzQvtC90YLQsCwg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VycmVudF9zdGVwID09IDMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkKCdpbnB1dCNjYWxjMzInKS52YWwoKS5sZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2Zvcm0ucGhwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI21vZGFsX2NhbGN1bGF0b3InKS5tb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Nsb3NlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhZGVEdXJhdGlvbjogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ9CS0LLQtdC00LjRgtC1INC60L7RgNGA0LXQutGC0L3Ri9C5INC90L7QvNC10YAg0YLQtdC70LXRhNC+0L3QsCwg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmNhbGN1bGF0b3JfX2J0bi5pcy0tcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZihjdXJyZW50X3N0ZXAgPiAwKSBjdXJyZW50X3N0ZXAtLVxyXG4gICAgICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuICAgICAgICAgICAgY2xlYXJFcnJvcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICAkKCcudGNhcmRfX2xlZnRfX2Nhcm91c2VsX19pbm5lcicpLnNsaWNrKHtcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLnRjYXJkX19sZWZ0X19jYXJvdXNlbF9fY29udHJvbHNfX2J0bi5pcy0tcHJldicsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy50Y2FyZF9fbGVmdF9fY2Fyb3VzZWxfX2NvbnRyb2xzX19idG4uaXMtLW5leHQnXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmFib3V0X19zbGlkZXNfX2Jsb2NrX19jYXJvdXNlbF9faW5uZXInKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLXByZXYnKSxcclxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLW5leHQnKSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuYWJvdXRfX3NsaWRlc19fYmxvY2tfX2Nhcm91c2VsX19pbm5lcicpLm9uKCdzZXRQb3NpdGlvbicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZXJJZCA9ICQodGhpcylbMF0uc2xpY2suY3VycmVudFNsaWRlXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSAkKCQodGhpcylbMF0uc2xpY2suJHNsaWRlc1tjdXJyZW50U2xpZGVySWRdKVxyXG4gICAgICAgICAgICB2YXIgdGhpc0lkID0gY3VycmVudFNsaWRlLmF0dHIoJ2RhdGEtaWQnKVxyXG4gICAgICAgICAgICB2YXIgdGhpc1RpdGxlID0gY3VycmVudFNsaWRlLmF0dHIoJ2RhdGEtdGl0bGUnKTtcclxuICAgICAgICAgICAgdmFyIHRoaXNDb250ZW50ID0gY3VycmVudFNsaWRlLmF0dHIoJ2RhdGEtZGVzYycpO1xyXG4gICAgICAgICAgICB2YXIgdGhpc1RpdGxlQmxvY2sgPSAkKCcuYWJvdXRfX3NsaWRlc19fYmxvY2tfX3RleHRfX3RpdGxlW2RhdGEtaWQ9XCInICsgdGhpc0lkICsgJ1wiXScpXHJcbiAgICAgICAgICAgIHZhciB0aGlzQ29udGVudEJsb2NrID0gJCgnLmFib3V0X19zbGlkZXNfX2Jsb2NrX190ZXh0X19kZXNjW2RhdGEtaWQ9XCInICsgdGhpc0lkICsgJ1wiXScpXHJcbiAgICAgICAgICAgIHRoaXNUaXRsZUJsb2NrLmh0bWwodGhpc1RpdGxlKVxyXG4gICAgICAgICAgICB0aGlzQ29udGVudEJsb2NrLmh0bWwodGhpc0NvbnRlbnQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gJCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9fbGlzdCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICQodGhpcykuc2xpY2soe1xyXG4gICAgICAgIC8vICAgICAgICAgcHJldkFycm93OiAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbi5pcy0tcHJldicpLFxyXG4gICAgICAgIC8vICAgICAgICAgbmV4dEFycm93OiAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbi5pcy0tbmV4dCcpLFxyXG4gICAgICAgIC8vICAgICAgICAgYXNOYXZGb3I6ICcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19pdGVtcyB1bCcsXHJcbiAgICAgICAgLy8gICAgICAgICBpbmZpbml0ZTogZmFsc2VcclxuXHJcbiAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgLy8gJCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9faXRlbS5zbGljay1jbG9uZWQnKS5yZW1vdmVBdHRyKCdkYXRhLWZhbmN5Ym94JylcclxuXHJcbiAgICAgICAgLy8gJCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9faXRlbXMgdWwnKS5zbGljayh7XHJcbiAgICAgICAgLy8gICAgIHNsaWRlc1RvU2hvdzogNixcclxuICAgICAgICAvLyAgICAgYXNOYXZGb3I6ICcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19saXN0JyxcclxuICAgICAgICAvLyAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICBwcmV2QXJyb3c6ICcnLFxyXG4gICAgICAgIC8vICAgICBuZXh0QXJyb3c6ICcnXHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgLy8gJCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9faXRlbXMgdWwgbGknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgdmFyIF9faXRlbSA9IHtcclxuICAgICAgICAvLyAgICAgICAgIGlkOiAkKHRoaXMpLmRhdGEoJ2l0ZW1pZCcpLFxyXG4gICAgICAgIC8vICAgICAgICAgY2Fyb3VzZWw6ICQodGhpcykuZGF0YSgnY2Fyb3VzZWxpZCcpXHJcbiAgICAgICAgLy8gICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2xpc3RbZGF0YS1jYXJvdXNlbGlkPVwiJyArIF9faXRlbS5jYXJvdXNlbCArICdcIl0nKS5zbGljaygnc2xpY2tHb1RvJywgX19pdGVtLmlkKTtcclxuXHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKF9faXRlbSlcclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgJCgnLndvcmtpbmdfX2Jsb2NrX19sZWZ0JykubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBibG9jayA9ICQoJy53b3JraW5nX19ibG9ja19fbGVmdCcpW2ldXHJcbiAgICAgICAgICAgIHZhciBnYWxsZXJ5VGh1bWJzID0gbmV3IFN3aXBlcigkKGJsb2NrKS5maW5kKCcuZ2FsbGVyeS10aHVtYnMnKSAsIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA2LFxyXG4gICAgICAgICAgICAgICAgZnJlZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3YXRjaFNsaWRlc1Zpc2liaWxpdHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBnYWxsZXJ5VG9wID0gbmV3IFN3aXBlcigkKGJsb2NrKS5maW5kKCcuZ2FsbGVyeS10b3AnKSwge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgICAgICAgICAgICAgbGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0RWw6ICQoYmxvY2spLmZpbmQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tbmV4dCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZFbDogJChibG9jaykuZmluZCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1wcmV2JyksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGh1bWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyOiBnYWxsZXJ5VGh1bWJzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJy5mb3JtX19ncm91cC5pcy0tYm9yZGVyIGlucHV0JykuZm9jdXMoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvcm1fX2dyb3VwLmlzLS1ib3JkZXInKS5hZGRDbGFzcygnaXMtLWZvY3VzJylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuZm9ybV9fZ3JvdXAuaXMtLWJvcmRlciBpbnB1dCcpLmZvY3Vzb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb3JtX19ncm91cC5pcy0tYm9yZGVyJykucmVtb3ZlQ2xhc3MoJ2lzLS1mb2N1cycpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnZm9ybScpLnBhcnNsZXkoKVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgJChcImEuYnRuLCAubmF2YmFyX21lbnUgdWwgbGkgYSwgLm5hdmJhcl9fbW9iaWxlX19tZW51IHVsIGxpIGFcIikub24oXCJjbGljayB0b3VjaGVuZFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgZWwgPSAkKHRoaXMpO1xyXG4gICAgdmFyIGxpbmsgPSBlbC5hdHRyKFwiaHJlZlwiKTtcclxuICAgIGlmKCEkKGVsKS5oYXNDbGFzcygnX19ub2hyZWYnKSAmJiBcclxuICAgICEkKGVsKS5hdHRyKCd0YXJnZXQnKSAmJiBcclxuICAgICEkKGVsKS5hdHRyKGRhdGEtZmFuY3lib3gpICYmXHJcbiAgICAhJChlbCkuaGFzQ2xhc3MoJ21vZGFsX19jbG9zZScpXHJcbiAgICApIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uID0gbGluaztcclxuICAgIH1cclxuICB9KTtcclxufSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFNpemVGb3JpRnJhbWUoKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTaXplRm9yaUZyYW1lKCkge1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gJCgnLmNvbnRhY3RzX19pbmZvJykuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICAkKCcjbWFwIGlmcmFtZScpLmNzcygnbWluLWhlaWdodCcsIGhlaWdodClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNpemVGb3JpRnJhbWUoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0TmF2YmFyKClcclxuICAgICAgICBmaXhlTmF2YmFyKClcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0TmF2YmFyKCkge1xyXG4gICAgICAgICAgICB2YXIgbmF2YmFySGVpZ2h0ID0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KClcclxuICAgICAgICAgICAgdmFyIGJhbm5lcldpZHRoID0gJCgnLmJhbm5lcl9fbGVmdCcpLmlubmVyV2lkdGgoKVxyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5NaW5IZWlnaHQgPSAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKSAtICQoJy5mb290ZXInKS5pbm5lckhlaWdodCgpXHJcblxyXG4gICAgICAgICAgICBpZihuYXZiYXJIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICQoJ21haW4uX19pc3BhZGRpbmcnKS5jc3MoJ3BhZGRpbmctdG9wJywgbmF2YmFySGVpZ2h0ICsgJ3B4JylcclxuICAgICAgICAgICAgICAgICQoJy5uYXZiYXJfX21vYmlsZV9faW5uZXInKS5jc3MoJ3BhZGRpbmctdG9wJywgbmF2YmFySGVpZ2h0ICsgJ3B4JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihiYW5uZXJXaWR0aCAmJiBiYW5uZXJXaWR0aCA+IDM4MCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fbW9iaWxlJykuY3NzKCdtYXgtd2lkdGgnLCBiYW5uZXJXaWR0aCArICdweCcpXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5uYXZiYXJfX21vYmlsZScpLmNzcygnbWF4LXdpZHRoJywnMzgwcHgnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJ21haW4nKS5jc3MoXCJtaW4taGVpZ2h0XCIsIG1haW5NaW5IZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZml4ZU5hdmJhcigpIHtcclxuICAgICAgICAgICAgdmFyIHNjcm9sbGluZyA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpXHJcbiAgICAgICAgICAgIHZhciBuYXZiYXIgPSAkKCcubmF2YmFyJylcclxuICAgICAgICAgICAgaWYoc2Nyb2xsaW5nID4gbmF2YmFyLmlubmVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgIG5hdmJhci5hZGRDbGFzcygnaXMtLWRhcmsnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNjcm9sbGluZyA8IG5hdmJhci5pbm5lckhlaWdodCgpICYmICFuYXZiYXIuaGFzQ2xhc3MoJ2lzLS1yZGFyaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZiYXIucmVtb3ZlQ2xhc3MoJ2lzLS1kYXJrJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3BlbkNpdHkoKSB7XHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX2NpdHknKS5hZGRDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VDaXR5KCkge1xyXG4gICAgICAgICAgICAkKCcubmF2YmFyX19jaXR5JykucmVtb3ZlQ2xhc3MoJ2lzLS1vcGVuJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZUNpdHkoKSB7XHJcbiAgICAgICAgICAgIGlmKCQoJy5uYXZiYXJfX2NpdHknKS5oYXNDbGFzcygnaXMtLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VDaXR5KClcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3BlbkNpdHkoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXROYXZiYXIoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZpeGVOYXZiYXIoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5uYXZiYXJfX21idG4gYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnaXMtLW1vYmlsZS1tZW51JykudG9nZ2xlQ2xhc3MoJ2lzLS1vdmVybGF5JylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcjb3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQXR0cignY2xhc3MnKVxyXG4gICAgICAgICAgICAkKCcubmF2YmFyX19tYnRuIGJ1dHRvbicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5uYXZiYXJfX2NpdHlfX2xhYmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNpdHkoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldHMgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcubmF2YmFyX19jaXR5JylcclxuICAgICAgICAgICAgaWYodGFyZ2V0cy5sZW5ndGggPD0gMCkgY2xvc2VDaXR5KClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBDTEFTU0VTID0ge1xyXG4gICAgICAgICAgICB0YXJnZXQ6IFwiLl90YWItdGFyZ2V0XCIsXHJcbiAgICAgICAgICAgIGJsb2NrOiBcIi5fdGFiLWJsb2NrXCIsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogXCJpcy0tb3BlblwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKENMQVNTRVMudGFyZ2V0KS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoQ0xBU1NFUy50YXJnZXQpLnJlbW92ZUNsYXNzKCdpcy0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuZGF0YSgndGFiaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgb3BlblRhYigkKHRoaXMpLmRhdGEoJ3RhYmlkJykpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3BlblRhYihpZCkge1xyXG4gICAgICAgICAgICAkKENMQVNTRVMuYmxvY2spLnJlbW92ZUNsYXNzKENMQVNTRVMuYWN0aXZlKTtcclxuICAgICAgICAgICAgJChDTEFTU0VTLmJsb2NrICsgJ1tkYXRhLXRhYmlkPVwiJyArIGlkICsgJ1wiXScpLmFkZENsYXNzKENMQVNTRVMuYWN0aXZlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiXX0=
