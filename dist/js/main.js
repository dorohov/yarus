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

        calc32

        var phoneInputs = document.getElementById('calc32');

        new IMask(
            phoneInputs, {
            mask: '+{7}(900)000-00-00'
        });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuY2hvci5qcyIsImNhbGN1bGF0b3IuanMiLCJjYXJvdXNlbC5qcyIsImZvcm1zLmpzIiwibGlua19pb3NfYnVnZml4LmpzIiwibWFwLmpzIiwibmF2YmFyLmpzIiwidGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJy5fX2lzLS1hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9ICQodGhpcykuYXR0cignaHJlZicpXHJcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJChlbGVtZW50KS5vZmZzZXQoKS50b3AgLSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICB9LCAxNTAwLCBcInN3aW5nXCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICBzdGVwMV9wcmljZSA9ICAgMCxcclxuICAgICAgICAgICAgc3RlcDJfcHJpY2UgPSAgIDAsXHJcbiAgICAgICAgICAgIHN0ZXAzX21ldGVycyA9ICAwLFxyXG4gICAgICAgICAgICBjdXJyZW50X3N0ZXAgPSAgMSxcclxuICAgICAgICAgICAgcnVibGUgPSAkKCdpbnB1dCNjYWxjMzEnKS52YWwoKSxcclxuICAgICAgICAgICAgdG90YWwgPSAwLFxyXG4gICAgICAgICAgICB0aXRsZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAnMS4g0JLRi9Cx0LXRgNC40YLQtSDRgtC40L8g0LTQvtC80LA6JyxcclxuICAgICAgICAgICAgICAgICcyLiDQktGL0LHQtdGA0LjRgtC1INGC0LjQvyDRgNC10LzQvtC90YLQsDonLFxyXG4gICAgICAgICAgICAgICAgJzMuINCf0YDQvtC40LfQstC+0LTQuNGC0YHRjyDRgNCw0YHRh9GR0YIg0YHRgtC+0LjQvNC+0YHRgtC4INGA0LXQvNC+0L3RgtCwLCDQvdCw0Ygg0LzQtdC90LXQtNC20LXRgCDQktCw0YEg0L/QvtC00YDQvtCx0L3QviDQv9GA0L7QutC+0L3RgdGD0LvRjNGC0LjRgNGD0LXRgi4g0J7RgdGC0LDQstGM0YLQtSDQvdC+0LzQtdGAINGC0LXQu9C10YTQvtC90LAg0LTQu9GPINGB0LLRj9C30LguJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0aXRsZUJsb2NrID0gJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdWJ0aXRsZScpLFxyXG4gICAgICAgICAgICBlcnJvckJsb2NrID0gJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19lcnJvcicpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEVycm9yKHRleHQpIHtcclxuICAgICAgICAgICAgZXJyb3JCbG9jay5odG1sKHRleHQpXHJcbiAgICAgICAgICAgIGVycm9yQmxvY2suYWRkQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xlYXJFcnJvcigpIHtcclxuICAgICAgICAgICAgZXJyb3JCbG9jay5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgICAgIGVycm9yQmxvY2suaHRtbCgnICcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTdGVwKG51bSkge1xyXG4gICAgICAgICAgICB0aXRsZUJsb2NrLmh0bWwodGl0bGVzW2N1cnJlbnRfc3RlcCAtIDFdKVxyXG4gICAgICAgICAgICAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXAnKS5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3RlcFtkYXRhLXN0ZXBpZD1cIicgKyBudW0gKydcIl0nKS5hZGRDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFN0ZXAoY3VycmVudF9zdGVwKVxyXG5cclxuICAgICAgICAkKCcuY2FsY3VsYXRvcl9fYnRuIGJ1dHRvblt0eXBlPVwic3VibWl0XCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgY2xlYXJFcnJvcigpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRfc3RlcCA9PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0cyA9ICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3RlcHMnKS5maW5kKCdpbnB1dFtuYW1lPVwiY2FsYzFcIl06Y2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMxMScpIHN0ZXAxX3ByaWNlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMxMicpIHN0ZXAxX3ByaWNlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMxMycpIHN0ZXAxX3ByaWNlID0gMVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzdGVwMV9wcmljZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudF9zdGVwID0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ9CS0YvQsdC10YDQuNGC0LUg0YLQuNC/INC00L7QvNCwLCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMJylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJyZW50X3N0ZXAgPT0gMikge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dHMgPSAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXBzJykuZmluZCgnaW5wdXRbbmFtZT1cImNhbGMyXCJdOmNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlucHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMyMScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDJfcHJpY2UgPSA3NTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMyMicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDJfcHJpY2UgPSAxMjUwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RlcDJfcHJpY2UgPiAwICYmICQoJ2lucHV0W2lkPVwiY2FsYzIzXCJdJykudmFsKCkgIT0gbnVsbCAmJiAkKCdpbnB1dFtpZD1cImNhbGMyM1wiXScpLnZhbCgpID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwgPSBzdGVwMV9wcmljZSAqIHN0ZXAyX3ByaWNlICogJCgnaW5wdXRbaWQ9XCJjYWxjMjNcIl0nKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdpbnB1dCNjYWxjMzEnKS52YWwodG90YWwudG9Mb2NhbGVTdHJpbmcoJ3J1LVJVJykgKyBydWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudF9zdGVwID0gM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCfQktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90YPRjiDQv9C70L7RidCw0LTRjCwg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCfQktGL0LHQtdGA0LjRgtC1INGC0LjQvyDRgNC10LzQvtC90YLQsCwg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VycmVudF9zdGVwID09IDMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkKCdpbnB1dCNjYWxjMzInKS52YWwoKS5sZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2Zvcm0ucGhwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI21vZGFsX2NhbGN1bGF0b3InKS5tb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Nsb3NlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhZGVEdXJhdGlvbjogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ9CS0LLQtdC00LjRgtC1INC60L7RgNGA0LXQutGC0L3Ri9C5INC90L7QvNC10YAg0YLQtdC70LXRhNC+0L3QsCwg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmNhbGN1bGF0b3JfX2J0bi5pcy0tcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZihjdXJyZW50X3N0ZXAgPiAwKSBjdXJyZW50X3N0ZXAtLVxyXG4gICAgICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuICAgICAgICAgICAgY2xlYXJFcnJvcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY2FsYzMyXHJcblxyXG4gICAgICAgIHZhciBwaG9uZUlucHV0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjMzInKTtcclxuXHJcbiAgICAgICAgbmV3IElNYXNrKFxyXG4gICAgICAgICAgICBwaG9uZUlucHV0cywge1xyXG4gICAgICAgICAgICBtYXNrOiAnK3s3fSg5MDApMDAwLTAwLTAwJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJy50Y2FyZF9fbGVmdF9fY2Fyb3VzZWxfX2lubmVyJykuc2xpY2soe1xyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcudGNhcmRfX2xlZnRfX2Nhcm91c2VsX19jb250cm9sc19fYnRuLmlzLS1wcmV2JyxcclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLnRjYXJkX19sZWZ0X19jYXJvdXNlbF9fY29udHJvbHNfX2J0bi5pcy0tbmV4dCdcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuYWJvdXRfX3NsaWRlc19fYmxvY2tfX2Nhcm91c2VsX19pbm5lcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbi5pcy0tcHJldicpLFxyXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OiAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbi5pcy0tbmV4dCcpLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5hYm91dF9fc2xpZGVzX19ibG9ja19fY2Fyb3VzZWxfX2lubmVyJykub24oJ3NldFBvc2l0aW9uJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFNsaWRlcklkID0gJCh0aGlzKVswXS5zbGljay5jdXJyZW50U2xpZGVcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9ICQoJCh0aGlzKVswXS5zbGljay4kc2xpZGVzW2N1cnJlbnRTbGlkZXJJZF0pXHJcbiAgICAgICAgICAgIHZhciB0aGlzSWQgPSBjdXJyZW50U2xpZGUuYXR0cignZGF0YS1pZCcpXHJcbiAgICAgICAgICAgIHZhciB0aGlzVGl0bGUgPSBjdXJyZW50U2xpZGUuYXR0cignZGF0YS10aXRsZScpO1xyXG4gICAgICAgICAgICB2YXIgdGhpc0NvbnRlbnQgPSBjdXJyZW50U2xpZGUuYXR0cignZGF0YS1kZXNjJyk7XHJcbiAgICAgICAgICAgIHZhciB0aGlzVGl0bGVCbG9jayA9ICQoJy5hYm91dF9fc2xpZGVzX19ibG9ja19fdGV4dF9fdGl0bGVbZGF0YS1pZD1cIicgKyB0aGlzSWQgKyAnXCJdJylcclxuICAgICAgICAgICAgdmFyIHRoaXNDb250ZW50QmxvY2sgPSAkKCcuYWJvdXRfX3NsaWRlc19fYmxvY2tfX3RleHRfX2Rlc2NbZGF0YS1pZD1cIicgKyB0aGlzSWQgKyAnXCJdJylcclxuICAgICAgICAgICAgdGhpc1RpdGxlQmxvY2suaHRtbCh0aGlzVGl0bGUpXHJcbiAgICAgICAgICAgIHRoaXNDb250ZW50QmxvY2suaHRtbCh0aGlzQ29udGVudClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyAkKCcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19saXN0JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgJCh0aGlzKS5zbGljayh7XHJcbiAgICAgICAgLy8gICAgICAgICBwcmV2QXJyb3c6ICQodGhpcykucGFyZW50KCkuZmluZCgnYnV0dG9uLmlzLS1wcmV2JyksXHJcbiAgICAgICAgLy8gICAgICAgICBuZXh0QXJyb3c6ICQodGhpcykucGFyZW50KCkuZmluZCgnYnV0dG9uLmlzLS1uZXh0JyksXHJcbiAgICAgICAgLy8gICAgICAgICBhc05hdkZvcjogJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2l0ZW1zIHVsJyxcclxuICAgICAgICAvLyAgICAgICAgIGluZmluaXRlOiBmYWxzZVxyXG5cclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAvLyAkKCcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19pdGVtLnNsaWNrLWNsb25lZCcpLnJlbW92ZUF0dHIoJ2RhdGEtZmFuY3lib3gnKVxyXG5cclxuICAgICAgICAvLyAkKCcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19pdGVtcyB1bCcpLnNsaWNrKHtcclxuICAgICAgICAvLyAgICAgc2xpZGVzVG9TaG93OiA2LFxyXG4gICAgICAgIC8vICAgICBhc05hdkZvcjogJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2xpc3QnLFxyXG4gICAgICAgIC8vICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgIHByZXZBcnJvdzogJycsXHJcbiAgICAgICAgLy8gICAgIG5leHRBcnJvdzogJydcclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAvLyAkKCcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19pdGVtcyB1bCBsaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICB2YXIgX19pdGVtID0ge1xyXG4gICAgICAgIC8vICAgICAgICAgaWQ6ICQodGhpcykuZGF0YSgnaXRlbWlkJyksXHJcbiAgICAgICAgLy8gICAgICAgICBjYXJvdXNlbDogJCh0aGlzKS5kYXRhKCdjYXJvdXNlbGlkJylcclxuICAgICAgICAvLyAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgJCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9fbGlzdFtkYXRhLWNhcm91c2VsaWQ9XCInICsgX19pdGVtLmNhcm91c2VsICsgJ1wiXScpLnNsaWNrKCdzbGlja0dvVG8nLCBfX2l0ZW0uaWQpO1xyXG5cclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coX19pdGVtKVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkKCcud29ya2luZ19fYmxvY2tfX2xlZnQnKS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGJsb2NrID0gJCgnLndvcmtpbmdfX2Jsb2NrX19sZWZ0JylbaV1cclxuICAgICAgICAgICAgdmFyIGdhbGxlcnlUaHVtYnMgPSBuZXcgU3dpcGVyKCQoYmxvY2spLmZpbmQoJy5nYWxsZXJ5LXRodW1icycpICwge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDYsXHJcbiAgICAgICAgICAgICAgICBmcmVlTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHdhdGNoU2xpZGVzVmlzaWJpbGl0eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBsYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA1XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGdhbGxlcnlUb3AgPSBuZXcgU3dpcGVyKCQoYmxvY2spLmZpbmQoJy5nYWxsZXJ5LXRvcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXHJcbiAgICAgICAgICAgICAgICBsYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRFbDogJChibG9jaykuZmluZCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1uZXh0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkVsOiAkKGJsb2NrKS5maW5kKCcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLXByZXYnKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aHVtYnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXI6IGdhbGxlcnlUaHVtYnNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLmZvcm1fX2dyb3VwLmlzLS1ib3JkZXIgaW5wdXQnKS5mb2N1cyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9ybV9fZ3JvdXAuaXMtLWJvcmRlcicpLmFkZENsYXNzKCdpcy0tZm9jdXMnKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5mb3JtX19ncm91cC5pcy0tYm9yZGVyIGlucHV0JykuZm9jdXNvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvcm1fX2dyb3VwLmlzLS1ib3JkZXInKS5yZW1vdmVDbGFzcygnaXMtLWZvY3VzJylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCdmb3JtJykucGFyc2xleSgpXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAkKFwiYS5idG4sIC5uYXZiYXJfbWVudSB1bCBsaSBhLCAubmF2YmFyX19tb2JpbGVfX21lbnUgdWwgbGkgYVwiKS5vbihcImNsaWNrIHRvdWNoZW5kXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBlbCA9ICQodGhpcyk7XHJcbiAgICB2YXIgbGluayA9IGVsLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgaWYoISQoZWwpLmhhc0NsYXNzKCdfX25vaHJlZicpICYmIFxyXG4gICAgISQoZWwpLmF0dHIoJ3RhcmdldCcpICYmIFxyXG4gICAgISQoZWwpLmF0dHIoZGF0YS1mYW5jeWJveCkgJiZcclxuICAgICEkKGVsKS5oYXNDbGFzcygnbW9kYWxfX2Nsb3NlJylcclxuICAgICkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBsaW5rO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0U2l6ZUZvcmlGcmFtZSgpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFNpemVGb3JpRnJhbWUoKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAkKCcuY29udGFjdHNfX2luZm8nKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgICQoJyNtYXAgaWZyYW1lJykuY3NzKCdtaW4taGVpZ2h0JywgaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2l6ZUZvcmlGcmFtZSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICBzZXROYXZiYXIoKVxyXG4gICAgICAgIGZpeGVOYXZiYXIoKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXROYXZiYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYXZiYXJIZWlnaHQgPSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICB2YXIgYmFubmVyV2lkdGggPSAkKCcuYmFubmVyX19sZWZ0JykuaW5uZXJXaWR0aCgpXHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbk1pbkhlaWdodCA9ICQod2luZG93KS5pbm5lckhlaWdodCgpIC0gJCgnLmZvb3RlcicpLmlubmVySGVpZ2h0KClcclxuXHJcbiAgICAgICAgICAgIGlmKG5hdmJhckhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgJCgnbWFpbi5fX2lzcGFkZGluZycpLmNzcygncGFkZGluZy10b3AnLCBuYXZiYXJIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fbW9iaWxlX19pbm5lcicpLmNzcygncGFkZGluZy10b3AnLCBuYXZiYXJIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGJhbm5lcldpZHRoICYmIGJhbm5lcldpZHRoID4gMzgwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19tb2JpbGUnKS5jc3MoJ21heC13aWR0aCcsIGJhbm5lcldpZHRoICsgJ3B4JylcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fbW9iaWxlJykuY3NzKCdtYXgtd2lkdGgnLCczODBweCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnbWFpbicpLmNzcyhcIm1pbi1oZWlnaHRcIiwgbWFpbk1pbkhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmaXhlTmF2YmFyKCkge1xyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsaW5nID0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKClcclxuICAgICAgICAgICAgdmFyIG5hdmJhciA9ICQoJy5uYXZiYXInKVxyXG4gICAgICAgICAgICBpZihzY3JvbGxpbmcgPiBuYXZiYXIuaW5uZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2YmFyLmFkZENsYXNzKCdpcy0tZGFyaycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2Nyb2xsaW5nIDwgbmF2YmFyLmlubmVySGVpZ2h0KCkgJiYgIW5hdmJhci5oYXNDbGFzcygnaXMtLXJkYXJrJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdmJhci5yZW1vdmVDbGFzcygnaXMtLWRhcmsnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuQ2l0eSgpIHtcclxuICAgICAgICAgICAgJCgnLm5hdmJhcl9fY2l0eScpLmFkZENsYXNzKCdpcy0tb3BlbicpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbG9zZUNpdHkoKSB7XHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX2NpdHknKS5yZW1vdmVDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlQ2l0eSgpIHtcclxuICAgICAgICAgICAgaWYoJCgnLm5hdmJhcl9fY2l0eScpLmhhc0NsYXNzKCdpcy0tb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZUNpdHkoKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcGVuQ2l0eSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldE5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZml4ZU5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fbWJ0biBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJylcclxuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdpcy0tbW9iaWxlLW1lbnUnKS50b2dnbGVDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJyNvdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKCdjbGFzcycpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX21idG4gYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fY2l0eV9fbGFiZWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdG9nZ2xlQ2l0eSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0cyA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5uYXZiYXJfX2NpdHknKVxyXG4gICAgICAgICAgICBpZih0YXJnZXRzLmxlbmd0aCA8PSAwKSBjbG9zZUNpdHkoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIENMQVNTRVMgPSB7XHJcbiAgICAgICAgICAgIHRhcmdldDogXCIuX3RhYi10YXJnZXRcIixcclxuICAgICAgICAgICAgYmxvY2s6IFwiLl90YWItYmxvY2tcIixcclxuICAgICAgICAgICAgYWN0aXZlOiBcImlzLS1vcGVuXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoQ0xBU1NFUy50YXJnZXQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJChDTEFTU0VTLnRhcmdldCkucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5kYXRhKCd0YWJpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBvcGVuVGFiKCQodGhpcykuZGF0YSgndGFiaWQnKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuVGFiKGlkKSB7XHJcbiAgICAgICAgICAgICQoQ0xBU1NFUy5ibG9jaykucmVtb3ZlQ2xhc3MoQ0xBU1NFUy5hY3RpdmUpO1xyXG4gICAgICAgICAgICAkKENMQVNTRVMuYmxvY2sgKyAnW2RhdGEtdGFiaWQ9XCInICsgaWQgKyAnXCJdJykuYWRkQ2xhc3MoQ0xBU1NFUy5hY3RpdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyJdfQ==
