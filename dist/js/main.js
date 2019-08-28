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

        var cT = [], cTH = [];

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
            cTH.push(galleryThumbs)
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

            cT.push(galleryTop)

        }

        $('.swiper-wrapper .swiper-slide a').on('click', function(e) {
            e.preventDefault()

            var _this = $(this),
                thisId = _this.data('id'),
                thisItems = $('.swiper-slide img[data-id="' + thisId + '"]'),
                thisCarousel = _this.closest('.gallery-top'),
                thisThumbs = _this.closest('.gallery-top').siblings('.gallery-thumbs'),
                thisNumber = _this.data('idn')

            $.fancybox.open(thisItems, {
                beforeShow: function(instance, slide) {
                    
                    thisNumber = slide.index

                    cT[thisId - 1].slideTo(thisNumber)
                    cTH[thisId - 1].slideTo(thisNumber)

                    console.log(thisNumber, slide.index)

                }
            }, thisNumber);
        })
        
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuY2hvci5qcyIsImNhbGN1bGF0b3IuanMiLCJjYXJvdXNlbC5qcyIsImZvcm1zLmpzIiwibGlua19pb3NfYnVnZml4LmpzIiwibWFwLmpzIiwibmF2YmFyLmpzIiwidGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLl9faXMtLWFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gJCh0aGlzKS5hdHRyKCdocmVmJylcclxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKGVsZW1lbnQpLm9mZnNldCgpLnRvcCAtICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgIH0sIDE1MDAsIFwic3dpbmdcIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgIHN0ZXAxX3ByaWNlID0gICAwLFxyXG4gICAgICAgICAgICBzdGVwMl9wcmljZSA9ICAgMCxcclxuICAgICAgICAgICAgc3RlcDNfbWV0ZXJzID0gIDAsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RlcCA9ICAxLFxyXG4gICAgICAgICAgICBydWJsZSA9ICQoJ2lucHV0I2NhbGMzMScpLnZhbCgpLFxyXG4gICAgICAgICAgICB0b3RhbCA9IDAsXHJcbiAgICAgICAgICAgIHRpdGxlcyA9IFtcclxuICAgICAgICAgICAgICAgICcxLiDQktGL0LHQtdGA0LjRgtC1INGC0LjQvyDQtNC+0LzQsDonLFxyXG4gICAgICAgICAgICAgICAgJzIuINCS0YvQsdC10YDQuNGC0LUg0YLQuNC/INGA0LXQvNC+0L3RgtCwOicsXHJcbiAgICAgICAgICAgICAgICAnMy4g0J/RgNC+0LjQt9Cy0L7QtNC40YLRgdGPINGA0LDRgdGH0ZHRgiDRgdGC0L7QuNC80L7RgdGC0Lgg0YDQtdC80L7QvdGC0LAsINC90LDRiCDQvNC10L3QtdC00LbQtdGAINCS0LDRgSDQv9C+0LTRgNC+0LHQvdC+INC/0YDQvtC60L7QvdGB0YPQu9GM0YLQuNGA0YPQtdGCLiDQntGB0YLQsNCy0YzRgtC1INC90L7QvNC10YAg0YLQtdC70LXRhNC+0L3QsCDQtNC70Y8g0YHQstGP0LfQuC4nXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRpdGxlQmxvY2sgPSAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N1YnRpdGxlJyksXHJcbiAgICAgICAgICAgIGVycm9yQmxvY2sgPSAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX2Vycm9yJylcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0RXJyb3IodGV4dCkge1xyXG4gICAgICAgICAgICBlcnJvckJsb2NrLmh0bWwodGV4dClcclxuICAgICAgICAgICAgZXJyb3JCbG9jay5hZGRDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGVhckVycm9yKCkge1xyXG4gICAgICAgICAgICBlcnJvckJsb2NrLnJlbW92ZUNsYXNzKCdpcy0tYWN0aXZlJylcclxuICAgICAgICAgICAgZXJyb3JCbG9jay5odG1sKCcgJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFN0ZXAobnVtKSB7XHJcbiAgICAgICAgICAgIHRpdGxlQmxvY2suaHRtbCh0aXRsZXNbY3VycmVudF9zdGVwIC0gMV0pXHJcbiAgICAgICAgICAgICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3RlcCcpLnJlbW92ZUNsYXNzKCdpcy0tYWN0aXZlJylcclxuICAgICAgICAgICAgJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdGVwW2RhdGEtc3RlcGlkPVwiJyArIG51bSArJ1wiXScpLmFkZENsYXNzKCdpcy0tYWN0aXZlJylcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcblxyXG4gICAgICAgICQoJy5jYWxjdWxhdG9yX19idG4gYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBjbGVhckVycm9yKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudF9zdGVwID09IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRzID0gJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdGVwcycpLmZpbmQoJ2lucHV0W25hbWU9XCJjYWxjMVwiXTpjaGVja2VkJylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzExJykgc3RlcDFfcHJpY2UgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzEyJykgc3RlcDFfcHJpY2UgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzEzJykgc3RlcDFfcHJpY2UgPSAxXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0ZXAxX3ByaWNlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50X3N0ZXAgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFN0ZXAoY3VycmVudF9zdGVwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcign0JLRi9Cx0LXRgNC40YLQtSDRgtC40L8g0LTQvtC80LAsINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YwnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnRfc3RlcCA9PSAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0cyA9ICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3RlcHMnKS5maW5kKCdpbnB1dFtuYW1lPVwiY2FsYzJcIl06Y2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzIxJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwMl9wcmljZSA9IDc1MDBcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzIyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwMl9wcmljZSA9IDEyNTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzdGVwMl9wcmljZSA+IDAgJiYgJCgnaW5wdXRbaWQ9XCJjYWxjMjNcIl0nKS52YWwoKSAhPSBudWxsICYmICQoJ2lucHV0W2lkPVwiY2FsYzIzXCJdJykudmFsKCkgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbCA9IHN0ZXAxX3ByaWNlICogc3RlcDJfcHJpY2UgKiAkKCdpbnB1dFtpZD1cImNhbGMyM1wiXScpLnZhbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2lucHV0I2NhbGMzMScpLnZhbCh0b3RhbC50b0xvY2FsZVN0cmluZygncnUtUlUnKSArIHJ1YmxlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50X3N0ZXAgPSAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFN0ZXAoY3VycmVudF9zdGVwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ9CS0LLQtdC00LjRgtC1INC60L7RgNGA0LXQutGC0L3Rg9GOINC/0LvQvtGJ0LDQtNGMLCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ9CS0YvQsdC10YDQuNGC0LUg0YLQuNC/INGA0LXQvNC+0L3RgtCwLCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMJylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJyZW50X3N0ZXAgPT0gMykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCQoJ2lucHV0I2NhbGMzMicpLnZhbCgpLmxlbmd0aCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnZm9ybS5waHAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjbW9kYWxfY2FsY3VsYXRvcicpLm1vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2xvc2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFkZUR1cmF0aW9uOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcign0JLQstC10LTQuNGC0LUg0LrQvtGA0YDQtdC60YLQvdGL0Lkg0L3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwLCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuY2FsY3VsYXRvcl9fYnRuLmlzLS1wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRfc3RlcCA+IDApIGN1cnJlbnRfc3RlcC0tXHJcbiAgICAgICAgICAgIHNldFN0ZXAoY3VycmVudF9zdGVwKVxyXG4gICAgICAgICAgICBjbGVhckVycm9yKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjYWxjMzJcclxuXHJcbiAgICAgICAgdmFyIHBob25lSW5wdXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGMzMicpO1xyXG5cclxuICAgICAgICBuZXcgSU1hc2soXHJcbiAgICAgICAgICAgIHBob25lSW5wdXRzLCB7XHJcbiAgICAgICAgICAgIG1hc2s6ICcrezd9KDkwMCkwMDAtMDAtMDAnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLnRjYXJkX19sZWZ0X19jYXJvdXNlbF9faW5uZXInKS5zbGljayh7XHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy50Y2FyZF9fbGVmdF9fY2Fyb3VzZWxfX2NvbnRyb2xzX19idG4uaXMtLXByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcudGNhcmRfX2xlZnRfX2Nhcm91c2VsX19jb250cm9sc19fYnRuLmlzLS1uZXh0J1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5hYm91dF9fc2xpZGVzX19ibG9ja19fY2Fyb3VzZWxfX2lubmVyJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICQodGhpcykucGFyZW50KCkuZmluZCgnYnV0dG9uLmlzLS1wcmV2JyksXHJcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICQodGhpcykucGFyZW50KCkuZmluZCgnYnV0dG9uLmlzLS1uZXh0JyksXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmFib3V0X19zbGlkZXNfX2Jsb2NrX19jYXJvdXNlbF9faW5uZXInKS5vbignc2V0UG9zaXRpb24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGVySWQgPSAkKHRoaXMpWzBdLnNsaWNrLmN1cnJlbnRTbGlkZVxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFNsaWRlID0gJCgkKHRoaXMpWzBdLnNsaWNrLiRzbGlkZXNbY3VycmVudFNsaWRlcklkXSlcclxuICAgICAgICAgICAgdmFyIHRoaXNJZCA9IGN1cnJlbnRTbGlkZS5hdHRyKCdkYXRhLWlkJylcclxuICAgICAgICAgICAgdmFyIHRoaXNUaXRsZSA9IGN1cnJlbnRTbGlkZS5hdHRyKCdkYXRhLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIHZhciB0aGlzQ29udGVudCA9IGN1cnJlbnRTbGlkZS5hdHRyKCdkYXRhLWRlc2MnKTtcclxuICAgICAgICAgICAgdmFyIHRoaXNUaXRsZUJsb2NrID0gJCgnLmFib3V0X19zbGlkZXNfX2Jsb2NrX190ZXh0X190aXRsZVtkYXRhLWlkPVwiJyArIHRoaXNJZCArICdcIl0nKVxyXG4gICAgICAgICAgICB2YXIgdGhpc0NvbnRlbnRCbG9jayA9ICQoJy5hYm91dF9fc2xpZGVzX19ibG9ja19fdGV4dF9fZGVzY1tkYXRhLWlkPVwiJyArIHRoaXNJZCArICdcIl0nKVxyXG4gICAgICAgICAgICB0aGlzVGl0bGVCbG9jay5odG1sKHRoaXNUaXRsZSlcclxuICAgICAgICAgICAgdGhpc0NvbnRlbnRCbG9jay5odG1sKHRoaXNDb250ZW50KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2xpc3QnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAkKHRoaXMpLnNsaWNrKHtcclxuICAgICAgICAvLyAgICAgICAgIHByZXZBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLXByZXYnKSxcclxuICAgICAgICAvLyAgICAgICAgIG5leHRBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLW5leHQnKSxcclxuICAgICAgICAvLyAgICAgICAgIGFzTmF2Rm9yOiAnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9faXRlbXMgdWwnLFxyXG4gICAgICAgIC8vICAgICAgICAgaW5maW5pdGU6IGZhbHNlXHJcblxyXG4gICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2l0ZW0uc2xpY2stY2xvbmVkJykucmVtb3ZlQXR0cignZGF0YS1mYW5jeWJveCcpXHJcblxyXG4gICAgICAgIC8vICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2l0ZW1zIHVsJykuc2xpY2soe1xyXG4gICAgICAgIC8vICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcbiAgICAgICAgLy8gICAgIGFzTmF2Rm9yOiAnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9fbGlzdCcsXHJcbiAgICAgICAgLy8gICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgcHJldkFycm93OiAnJyxcclxuICAgICAgICAvLyAgICAgbmV4dEFycm93OiAnJ1xyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2l0ZW1zIHVsIGxpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgIHZhciBfX2l0ZW0gPSB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZDogJCh0aGlzKS5kYXRhKCdpdGVtaWQnKSxcclxuICAgICAgICAvLyAgICAgICAgIGNhcm91c2VsOiAkKHRoaXMpLmRhdGEoJ2Nhcm91c2VsaWQnKVxyXG4gICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICAkKCcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19saXN0W2RhdGEtY2Fyb3VzZWxpZD1cIicgKyBfX2l0ZW0uY2Fyb3VzZWwgKyAnXCJdJykuc2xpY2soJ3NsaWNrR29UbycsIF9faXRlbS5pZCk7XHJcblxyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhfX2l0ZW0pXHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgdmFyIGNUID0gW10sIGNUSCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgJCgnLndvcmtpbmdfX2Jsb2NrX19sZWZ0JykubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBibG9jayA9ICQoJy53b3JraW5nX19ibG9ja19fbGVmdCcpW2ldXHJcblxyXG4gICAgICAgICAgICB2YXIgZ2FsbGVyeVRodW1icyA9IG5ldyBTd2lwZXIoJChibG9jaykuZmluZCgnLmdhbGxlcnktdGh1bWJzJykgLCB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNixcclxuICAgICAgICAgICAgICAgIGZyZWVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgIDEyMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjVEgucHVzaChnYWxsZXJ5VGh1bWJzKVxyXG4gICAgICAgICAgICB2YXIgZ2FsbGVyeVRvcCA9IG5ldyBTd2lwZXIoJChibG9jaykuZmluZCgnLmdhbGxlcnktdG9wJyksIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcclxuICAgICAgICAgICAgICAgIGxhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsOiAkKGJsb2NrKS5maW5kKCcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLW5leHQnKSxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2RWw6ICQoYmxvY2spLmZpbmQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tcHJldicpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRodW1iczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlcjogZ2FsbGVyeVRodW1ic1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNULnB1c2goZ2FsbGVyeVRvcClcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuc3dpcGVyLXdyYXBwZXIgLnN3aXBlci1zbGlkZSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICB0aGlzSWQgPSBfdGhpcy5kYXRhKCdpZCcpLFxyXG4gICAgICAgICAgICAgICAgdGhpc0l0ZW1zID0gJCgnLnN3aXBlci1zbGlkZSBpbWdbZGF0YS1pZD1cIicgKyB0aGlzSWQgKyAnXCJdJyksXHJcbiAgICAgICAgICAgICAgICB0aGlzQ2Fyb3VzZWwgPSBfdGhpcy5jbG9zZXN0KCcuZ2FsbGVyeS10b3AnKSxcclxuICAgICAgICAgICAgICAgIHRoaXNUaHVtYnMgPSBfdGhpcy5jbG9zZXN0KCcuZ2FsbGVyeS10b3AnKS5zaWJsaW5ncygnLmdhbGxlcnktdGh1bWJzJyksXHJcbiAgICAgICAgICAgICAgICB0aGlzTnVtYmVyID0gX3RoaXMuZGF0YSgnaWRuJylcclxuXHJcbiAgICAgICAgICAgICQuZmFuY3lib3gub3Blbih0aGlzSXRlbXMsIHtcclxuICAgICAgICAgICAgICAgIGJlZm9yZVNob3c6IGZ1bmN0aW9uKGluc3RhbmNlLCBzbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNOdW1iZXIgPSBzbGlkZS5pbmRleFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjVFt0aGlzSWQgLSAxXS5zbGlkZVRvKHRoaXNOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgY1RIW3RoaXNJZCAtIDFdLnNsaWRlVG8odGhpc051bWJlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpc051bWJlciwgc2xpZGUuaW5kZXgpXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzTnVtYmVyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLmZvcm1fX2dyb3VwLmlzLS1ib3JkZXIgaW5wdXQnKS5mb2N1cyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9ybV9fZ3JvdXAuaXMtLWJvcmRlcicpLmFkZENsYXNzKCdpcy0tZm9jdXMnKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5mb3JtX19ncm91cC5pcy0tYm9yZGVyIGlucHV0JykuZm9jdXNvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvcm1fX2dyb3VwLmlzLS1ib3JkZXInKS5yZW1vdmVDbGFzcygnaXMtLWZvY3VzJylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCdmb3JtJykucGFyc2xleSgpXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAkKFwiYS5idG4sIC5uYXZiYXJfbWVudSB1bCBsaSBhLCAubmF2YmFyX19tb2JpbGVfX21lbnUgdWwgbGkgYVwiKS5vbihcImNsaWNrIHRvdWNoZW5kXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBlbCA9ICQodGhpcyk7XHJcbiAgICB2YXIgbGluayA9IGVsLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgaWYoISQoZWwpLmhhc0NsYXNzKCdfX25vaHJlZicpICYmIFxyXG4gICAgISQoZWwpLmF0dHIoJ3RhcmdldCcpICYmIFxyXG4gICAgISQoZWwpLmF0dHIoZGF0YS1mYW5jeWJveCkgJiZcclxuICAgICEkKGVsKS5oYXNDbGFzcygnbW9kYWxfX2Nsb3NlJylcclxuICAgICkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBsaW5rO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0U2l6ZUZvcmlGcmFtZSgpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFNpemVGb3JpRnJhbWUoKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAkKCcuY29udGFjdHNfX2luZm8nKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgICQoJyNtYXAgaWZyYW1lJykuY3NzKCdtaW4taGVpZ2h0JywgaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2l6ZUZvcmlGcmFtZSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICBzZXROYXZiYXIoKVxyXG4gICAgICAgIGZpeGVOYXZiYXIoKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXROYXZiYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYXZiYXJIZWlnaHQgPSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICB2YXIgYmFubmVyV2lkdGggPSAkKCcuYmFubmVyX19sZWZ0JykuaW5uZXJXaWR0aCgpXHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbk1pbkhlaWdodCA9ICQod2luZG93KS5pbm5lckhlaWdodCgpIC0gJCgnLmZvb3RlcicpLmlubmVySGVpZ2h0KClcclxuXHJcbiAgICAgICAgICAgIGlmKG5hdmJhckhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgJCgnbWFpbi5fX2lzcGFkZGluZycpLmNzcygncGFkZGluZy10b3AnLCBuYXZiYXJIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fbW9iaWxlX19pbm5lcicpLmNzcygncGFkZGluZy10b3AnLCBuYXZiYXJIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGJhbm5lcldpZHRoICYmIGJhbm5lcldpZHRoID4gMzgwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19tb2JpbGUnKS5jc3MoJ21heC13aWR0aCcsIGJhbm5lcldpZHRoICsgJ3B4JylcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fbW9iaWxlJykuY3NzKCdtYXgtd2lkdGgnLCczODBweCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnbWFpbicpLmNzcyhcIm1pbi1oZWlnaHRcIiwgbWFpbk1pbkhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmaXhlTmF2YmFyKCkge1xyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsaW5nID0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKClcclxuICAgICAgICAgICAgdmFyIG5hdmJhciA9ICQoJy5uYXZiYXInKVxyXG4gICAgICAgICAgICBpZihzY3JvbGxpbmcgPiBuYXZiYXIuaW5uZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2YmFyLmFkZENsYXNzKCdpcy0tZGFyaycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2Nyb2xsaW5nIDwgbmF2YmFyLmlubmVySGVpZ2h0KCkgJiYgIW5hdmJhci5oYXNDbGFzcygnaXMtLXJkYXJrJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdmJhci5yZW1vdmVDbGFzcygnaXMtLWRhcmsnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuQ2l0eSgpIHtcclxuICAgICAgICAgICAgJCgnLm5hdmJhcl9fY2l0eScpLmFkZENsYXNzKCdpcy0tb3BlbicpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbG9zZUNpdHkoKSB7XHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX2NpdHknKS5yZW1vdmVDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlQ2l0eSgpIHtcclxuICAgICAgICAgICAgaWYoJCgnLm5hdmJhcl9fY2l0eScpLmhhc0NsYXNzKCdpcy0tb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZUNpdHkoKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcGVuQ2l0eSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldE5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZml4ZU5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fbWJ0biBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJylcclxuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdpcy0tbW9iaWxlLW1lbnUnKS50b2dnbGVDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJyNvdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKCdjbGFzcycpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX21idG4gYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fY2l0eV9fbGFiZWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdG9nZ2xlQ2l0eSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0cyA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5uYXZiYXJfX2NpdHknKVxyXG4gICAgICAgICAgICBpZih0YXJnZXRzLmxlbmd0aCA8PSAwKSBjbG9zZUNpdHkoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIENMQVNTRVMgPSB7XHJcbiAgICAgICAgICAgIHRhcmdldDogXCIuX3RhYi10YXJnZXRcIixcclxuICAgICAgICAgICAgYmxvY2s6IFwiLl90YWItYmxvY2tcIixcclxuICAgICAgICAgICAgYWN0aXZlOiBcImlzLS1vcGVuXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoQ0xBU1NFUy50YXJnZXQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJChDTEFTU0VTLnRhcmdldCkucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5kYXRhKCd0YWJpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBvcGVuVGFiKCQodGhpcykuZGF0YSgndGFiaWQnKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuVGFiKGlkKSB7XHJcbiAgICAgICAgICAgICQoQ0xBU1NFUy5ibG9jaykucmVtb3ZlQ2xhc3MoQ0xBU1NFUy5hY3RpdmUpO1xyXG4gICAgICAgICAgICAkKENMQVNTRVMuYmxvY2sgKyAnW2RhdGEtdGFiaWQ9XCInICsgaWQgKyAnXCJdJykuYWRkQ2xhc3MoQ0xBU1NFUy5hY3RpdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyJdfQ==
