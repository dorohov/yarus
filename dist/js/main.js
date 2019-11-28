
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
// var images2 = document.querySelectorAll('.swiper-container.gallery-top');
// var images3 = document.querySelectorAll('.lazy2.is--small');
// var prof = 0;

// window.addEventListener('load', function() {
//     for(var i = 0; i < images2.length; i++) {
//         images2[i].src = images2[i].dataset.src;

//         var image = new Image();
//         image.src = images2[i].dataset.src;

//         image.onload = function(e) {
//             prof++;
//             if(prof == images2.length) {
//                 for(var i = 0; i < images3.length; i++) {
//                     images3[i].src = images3[i].dataset.src;
//                 }
//             }
//         };
        
//     }
// })

(function($) {
    "use strict"
    $(function() {

        var images1 = $('.__lz1 .swiper-wrapper .swiper-slide:first-child a img')
        var images2 = $('.__lz1 .swiper-wrapper .swiper-slide a img')
        var images3 = $('.lazy2.is--small')
        var prof = 0;

        window.addEventListener('load', function() {
            for(var i = 0; i < images1.length; i++) {
                images1[i].src = images1[i].dataset.src;
        
                var image = new Image();
                image.src = images1[i].dataset.src;
        
                image.onload = function(e) {
                    prof++;
                    if(prof == images1.length) {
                        for(var i = 0; i < images3.length; i++) {
                            images3[i].src = images3[i].dataset.src;
                        }
                        for(var i = 0; i < images2.length; i++) {
                            images2[i].src = images2[i].dataset.src;
                        }
                    }
                };
                
            }
        })
        
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

        function openNavbarDrop(_this) {
            closeNavbarDrop()
            $(_this).addClass('is--open')
            $(_this).find('button').addClass('is-active')
        }

        function closeNavbarDrop() {
            $('.__navbar-drop').removeClass('is--open')
            $('.__navbar-drop').find('button').removeClass('is-active')
        }

        function toggleNavbarDrop(_this) {
            if($(_this).hasClass('is--open')) {
                closeNavbarDrop()
            }else {
                openNavbarDrop(_this)
            }
        }

        $('.__navbar-drop__label').on('click', function() {

            var _this = $(this).parent('.__navbar-drop')

            toggleNavbarDrop(_this)
        })

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

        $(document).on('click', function(e) {
            var targets = $(e.target).closest('.__navbar-drop')
            if(targets.length <= 0) closeNavbarDrop()
        })

        function setPaddings() {

            var classes = {
                paddingLeft: '.is--c-pl',
                paddingRight: '.is--c-pr',
                height100Per: '.is--h100'
            }

            var padding = document.getElementsByClassName('container')[0].getBoundingClientRect()
            var height = $('.navbar').innerHeight() + $('.footer').innerHeight()

            $(classes.paddingLeft).css({
                paddingLeft: padding.left + 30
            })
            $(classes.paddingRight).css({
                paddingRight: padding.left + 30
            })
            $(classes.height100Per).css({
                minHeight: 'calc(100vh - ' + height + 'px)'
            })
            $('.is--c-pt').css({
                paddingTop: $('.navbar').innerHeight()
            })
        }

        setPaddings()

        $(window).resize(function() {
            setPaddings()
        })


        $('.banner__slides__inner').slick({
            prevArrow: '.banner__nav__right button.is--prev',
            nextArrow: '.banner__nav__right button.is--next',
            fade: true,
            cssEase: 'linear',
            touchMove: false,
            swipe: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        autoplay: true
                    }
                }
            ]
        })

        function setSlidesInfo(fTitle, fAddress, fLink, sTitle) {
            $('.banner__title').html(fTitle)
            $('.banner__address').html(fAddress)
            $('.banner__btn a').attr('href', fLink)
            $('.banner__nav__left__desc').html(sTitle)
        }

        $('.banner__slides__inner').on('afterChange', function(event, slick, currentSlide) {

            if(currentSlide >= slick.slideCount - 1) {
                var nextSlide = 0
            }else {
                var nextSlide = currentSlide + 1
            }

            var _currentSlide = $('.banner__slides__slide[data-slick-index="' + currentSlide + '"]'),
                _nextSlide = $('.banner__slides__slide[data-slick-index="' + nextSlide + '"]')

            console.log(_currentSlide, _nextSlide)

            setSlidesInfo($(_currentSlide).data('text'), $(_currentSlide).data('address'), $(_currentSlide).data('link'), $(_nextSlide).data('text') )

        });
        
        function setBaseSlides() {
            var _currentSlide = $('.banner__slides__slide[data-slick-index="0"]')[0],
                _nextSlide = $('.banner__slides__slide[data-slick-index="1"]')[0]

            setSlidesInfo($(_currentSlide).data('text'), $(_currentSlide).data('address'), $(_currentSlide).data('link'), $(_nextSlide).data('text') )
        
        }

        setBaseSlides()

    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {
        
        $('.rews__slides').slick({
            prevArrow: '.rews__controls button.is--prev',
            nextArrow: '.rews__controls button.is--next',
            swipe: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        autoplay: true,
                        swipe: true
                    }
                }
            ]
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0LmpzIiwiYW5jaG9yLmpzIiwiY2FsY3VsYXRvci5qcyIsImNhcm91c2VsLmpzIiwiZm9ybXMuanMiLCJpbC5qcyIsImxpbmtfaW9zX2J1Z2ZpeC5qcyIsIm1hcC5qcyIsIm5hdmJhci5qcyIsInJld3MuanMiLCJ0YWJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICAkKCcuX19pcy0tYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKVxyXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wIC0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KClcclxuICAgICAgICAgICAgfSwgMTUwMCwgXCJzd2luZ1wiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgc3RlcDFfcHJpY2UgPSAgIDAsXHJcbiAgICAgICAgICAgIHN0ZXAyX3ByaWNlID0gICAwLFxyXG4gICAgICAgICAgICBzdGVwM19tZXRlcnMgPSAgMCxcclxuICAgICAgICAgICAgY3VycmVudF9zdGVwID0gIDEsXHJcbiAgICAgICAgICAgIHJ1YmxlID0gJCgnaW5wdXQjY2FsYzMxJykudmFsKCksXHJcbiAgICAgICAgICAgIHRvdGFsID0gMCxcclxuICAgICAgICAgICAgdGl0bGVzID0gW1xyXG4gICAgICAgICAgICAgICAgJzEuINCS0YvQsdC10YDQuNGC0LUg0YLQuNC/INC00L7QvNCwOicsXHJcbiAgICAgICAgICAgICAgICAnMi4g0JLRi9Cx0LXRgNC40YLQtSDRgtC40L8g0YDQtdC80L7QvdGC0LA6JyxcclxuICAgICAgICAgICAgICAgICczLiDQn9GA0L7QuNC30LLQvtC00LjRgtGB0Y8g0YDQsNGB0YfRkdGCINGB0YLQvtC40LzQvtGB0YLQuCDRgNC10LzQvtC90YLQsCwg0L3QsNGIINC80LXQvdC10LTQttC10YAg0JLQsNGBINC/0L7QtNGA0L7QsdC90L4g0L/RgNC+0LrQvtC90YHRg9C70YzRgtC40YDRg9C10YIuINCe0YHRgtCw0LLRjNGC0LUg0L3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwINC00LvRjyDRgdCy0Y/Qt9C4LidcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgdGl0bGVCbG9jayA9ICQoJy5jYWxjdWxhdG9yX19yaWdodF9fc3VidGl0bGUnKSxcclxuICAgICAgICAgICAgZXJyb3JCbG9jayA9ICQoJy5jYWxjdWxhdG9yX19yaWdodF9fZXJyb3InKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRFcnJvcih0ZXh0KSB7XHJcbiAgICAgICAgICAgIGVycm9yQmxvY2suaHRtbCh0ZXh0KVxyXG4gICAgICAgICAgICBlcnJvckJsb2NrLmFkZENsYXNzKCdpcy0tYWN0aXZlJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyRXJyb3IoKSB7XHJcbiAgICAgICAgICAgIGVycm9yQmxvY2sucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgICAgICBlcnJvckJsb2NrLmh0bWwoJyAnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U3RlcChudW0pIHtcclxuICAgICAgICAgICAgdGl0bGVCbG9jay5odG1sKHRpdGxlc1tjdXJyZW50X3N0ZXAgLSAxXSlcclxuICAgICAgICAgICAgJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdGVwJykucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgICAgICAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXBbZGF0YS1zdGVwaWQ9XCInICsgbnVtICsnXCJdJykuYWRkQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuXHJcbiAgICAgICAgJCgnLmNhbGN1bGF0b3JfX2J0biBidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNsZWFyRXJyb3IoKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICAgICAgICBpZihjdXJyZW50X3N0ZXAgPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dHMgPSAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXBzJykuZmluZCgnaW5wdXRbbmFtZT1cImNhbGMxXCJdOmNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMTEnKSBzdGVwMV9wcmljZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMTInKSBzdGVwMV9wcmljZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMTMnKSBzdGVwMV9wcmljZSA9IDFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RlcDFfcHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfc3RlcCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCfQktGL0LHQtdGA0LjRgtC1INGC0LjQvyDQtNC+0LzQsCwg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VycmVudF9zdGVwID09IDIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRzID0gJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdGVwcycpLmZpbmQoJ2lucHV0W25hbWU9XCJjYWxjMlwiXTpjaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMjEnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAyX3ByaWNlID0gNzUwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGlucHV0cy5hdHRyKCdpZCcpID09ICdjYWxjMjInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAyX3ByaWNlID0gMTI1MDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0ZXAyX3ByaWNlID4gMCAmJiAkKCdpbnB1dFtpZD1cImNhbGMyM1wiXScpLnZhbCgpICE9IG51bGwgJiYgJCgnaW5wdXRbaWQ9XCJjYWxjMjNcIl0nKS52YWwoKSA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsID0gc3RlcDFfcHJpY2UgKiBzdGVwMl9wcmljZSAqICQoJ2lucHV0W2lkPVwiY2FsYzIzXCJdJykudmFsKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnaW5wdXQjY2FsYzMxJykudmFsKHRvdGFsLnRvTG9jYWxlU3RyaW5nKCdydS1SVScpICsgcnVibGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfc3RlcCA9IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcign0JLQstC10LTQuNGC0LUg0LrQvtGA0YDQtdC60YLQvdGD0Y4g0L/Qu9C+0YnQsNC00YwsINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YwnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcign0JLRi9Cx0LXRgNC40YLQtSDRgtC40L8g0YDQtdC80L7QvdGC0LAsINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YwnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnRfc3RlcCA9PSAzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoJCgnaW5wdXQjY2FsYzMyJykudmFsKCkubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdmb3JtLnBocCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSA9PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNtb2RhbF9jYWxjdWxhdG9yJykubW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDbG9zZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWRlRHVyYXRpb246IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCfQktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90YvQuSDQvdC+0LzQtdGAINGC0LXQu9C10YTQvtC90LAsINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YwnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5jYWxjdWxhdG9yX19idG4uaXMtLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoY3VycmVudF9zdGVwID4gMCkgY3VycmVudF9zdGVwLS1cclxuICAgICAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcbiAgICAgICAgICAgIGNsZWFyRXJyb3IoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNhbGMzMlxyXG5cclxuICAgICAgICB2YXIgcGhvbmVJbnB1dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsYzMyJyk7XHJcblxyXG4gICAgICAgIG5ldyBJTWFzayhcclxuICAgICAgICAgICAgcGhvbmVJbnB1dHMsIHtcclxuICAgICAgICAgICAgbWFzazogJyt7N30oOTAwKTAwMC0wMC0wMCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICAkKCcudGNhcmRfX2xlZnRfX2Nhcm91c2VsX19pbm5lcicpLnNsaWNrKHtcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLnRjYXJkX19sZWZ0X19jYXJvdXNlbF9fY29udHJvbHNfX2J0bi5pcy0tcHJldicsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy50Y2FyZF9fbGVmdF9fY2Fyb3VzZWxfX2NvbnRyb2xzX19idG4uaXMtLW5leHQnXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmFib3V0X19zbGlkZXNfX2Jsb2NrX19jYXJvdXNlbF9faW5uZXInKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLXByZXYnKSxcclxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLW5leHQnKSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuYWJvdXRfX3NsaWRlc19fYmxvY2tfX2Nhcm91c2VsX19pbm5lcicpLm9uKCdzZXRQb3NpdGlvbicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZXJJZCA9ICQodGhpcylbMF0uc2xpY2suY3VycmVudFNsaWRlXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSAkKCQodGhpcylbMF0uc2xpY2suJHNsaWRlc1tjdXJyZW50U2xpZGVySWRdKVxyXG4gICAgICAgICAgICB2YXIgdGhpc0lkID0gY3VycmVudFNsaWRlLmF0dHIoJ2RhdGEtaWQnKVxyXG4gICAgICAgICAgICB2YXIgdGhpc1RpdGxlID0gY3VycmVudFNsaWRlLmF0dHIoJ2RhdGEtdGl0bGUnKTtcclxuICAgICAgICAgICAgdmFyIHRoaXNDb250ZW50ID0gY3VycmVudFNsaWRlLmF0dHIoJ2RhdGEtZGVzYycpO1xyXG4gICAgICAgICAgICB2YXIgdGhpc1RpdGxlQmxvY2sgPSAkKCcuYWJvdXRfX3NsaWRlc19fYmxvY2tfX3RleHRfX3RpdGxlW2RhdGEtaWQ9XCInICsgdGhpc0lkICsgJ1wiXScpXHJcbiAgICAgICAgICAgIHZhciB0aGlzQ29udGVudEJsb2NrID0gJCgnLmFib3V0X19zbGlkZXNfX2Jsb2NrX190ZXh0X19kZXNjW2RhdGEtaWQ9XCInICsgdGhpc0lkICsgJ1wiXScpXHJcbiAgICAgICAgICAgIHRoaXNUaXRsZUJsb2NrLmh0bWwodGhpc1RpdGxlKVxyXG4gICAgICAgICAgICB0aGlzQ29udGVudEJsb2NrLmh0bWwodGhpc0NvbnRlbnQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gJCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9fbGlzdCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICQodGhpcykuc2xpY2soe1xyXG4gICAgICAgIC8vICAgICAgICAgcHJldkFycm93OiAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbi5pcy0tcHJldicpLFxyXG4gICAgICAgIC8vICAgICAgICAgbmV4dEFycm93OiAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbi5pcy0tbmV4dCcpLFxyXG4gICAgICAgIC8vICAgICAgICAgYXNOYXZGb3I6ICcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19pdGVtcyB1bCcsXHJcbiAgICAgICAgLy8gICAgICAgICBpbmZpbml0ZTogZmFsc2VcclxuXHJcbiAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgLy8gJCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9faXRlbS5zbGljay1jbG9uZWQnKS5yZW1vdmVBdHRyKCdkYXRhLWZhbmN5Ym94JylcclxuXHJcbiAgICAgICAgLy8gJCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9faXRlbXMgdWwnKS5zbGljayh7XHJcbiAgICAgICAgLy8gICAgIHNsaWRlc1RvU2hvdzogNixcclxuICAgICAgICAvLyAgICAgYXNOYXZGb3I6ICcud29ya2luZ19fYmxvY2tfX2Nhcm91c2VsX19saXN0JyxcclxuICAgICAgICAvLyAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICBwcmV2QXJyb3c6ICcnLFxyXG4gICAgICAgIC8vICAgICBuZXh0QXJyb3c6ICcnXHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgLy8gJCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9faXRlbXMgdWwgbGknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgdmFyIF9faXRlbSA9IHtcclxuICAgICAgICAvLyAgICAgICAgIGlkOiAkKHRoaXMpLmRhdGEoJ2l0ZW1pZCcpLFxyXG4gICAgICAgIC8vICAgICAgICAgY2Fyb3VzZWw6ICQodGhpcykuZGF0YSgnY2Fyb3VzZWxpZCcpXHJcbiAgICAgICAgLy8gICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgICQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2xpc3RbZGF0YS1jYXJvdXNlbGlkPVwiJyArIF9faXRlbS5jYXJvdXNlbCArICdcIl0nKS5zbGljaygnc2xpY2tHb1RvJywgX19pdGVtLmlkKTtcclxuXHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKF9faXRlbSlcclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICB2YXIgY1QgPSBbXSwgY1RIID0gW107XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkKCcud29ya2luZ19fYmxvY2tfX2xlZnQnKS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGJsb2NrID0gJCgnLndvcmtpbmdfX2Jsb2NrX19sZWZ0JylbaV1cclxuXHJcbiAgICAgICAgICAgIHZhciBnYWxsZXJ5VGh1bWJzID0gbmV3IFN3aXBlcigkKGJsb2NrKS5maW5kKCcuZ2FsbGVyeS10aHVtYnMnKSAsIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA2LFxyXG4gICAgICAgICAgICAgICAgZnJlZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3YXRjaFNsaWRlc1Zpc2liaWxpdHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNUSC5wdXNoKGdhbGxlcnlUaHVtYnMpXHJcbiAgICAgICAgICAgIHZhciBnYWxsZXJ5VG9wID0gbmV3IFN3aXBlcigkKGJsb2NrKS5maW5kKCcuZ2FsbGVyeS10b3AnKSwge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgICAgICAgICAgICAgbGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0RWw6ICQoYmxvY2spLmZpbmQoJy53b3JraW5nX19ibG9ja19fY2Fyb3VzZWxfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tbmV4dCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZFbDogJChibG9jaykuZmluZCgnLndvcmtpbmdfX2Jsb2NrX19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1wcmV2JyksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGh1bWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyOiBnYWxsZXJ5VGh1bWJzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY1QucHVzaChnYWxsZXJ5VG9wKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5zd2lwZXItd3JhcHBlciAuc3dpcGVyLXNsaWRlIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgICAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIHRoaXNJZCA9IF90aGlzLmRhdGEoJ2lkJyksXHJcbiAgICAgICAgICAgICAgICB0aGlzSXRlbXMgPSAkKCcuc3dpcGVyLXNsaWRlIGltZ1tkYXRhLWlkPVwiJyArIHRoaXNJZCArICdcIl0nKSxcclxuICAgICAgICAgICAgICAgIHRoaXNDYXJvdXNlbCA9IF90aGlzLmNsb3Nlc3QoJy5nYWxsZXJ5LXRvcCcpLFxyXG4gICAgICAgICAgICAgICAgdGhpc1RodW1icyA9IF90aGlzLmNsb3Nlc3QoJy5nYWxsZXJ5LXRvcCcpLnNpYmxpbmdzKCcuZ2FsbGVyeS10aHVtYnMnKSxcclxuICAgICAgICAgICAgICAgIHRoaXNOdW1iZXIgPSBfdGhpcy5kYXRhKCdpZG4nKVxyXG5cclxuICAgICAgICAgICAgJC5mYW5jeWJveC5vcGVuKHRoaXNJdGVtcywge1xyXG4gICAgICAgICAgICAgICAgYmVmb3JlU2hvdzogZnVuY3Rpb24oaW5zdGFuY2UsIHNsaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc051bWJlciA9IHNsaWRlLmluZGV4XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNUW3RoaXNJZCAtIDFdLnNsaWRlVG8odGhpc051bWJlcilcclxuICAgICAgICAgICAgICAgICAgICBjVEhbdGhpc0lkIC0gMV0uc2xpZGVUbyh0aGlzTnVtYmVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzTnVtYmVyLCBzbGlkZS5pbmRleClcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXNOdW1iZXIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICAkKCcuZm9ybV9fZ3JvdXAuaXMtLWJvcmRlciBpbnB1dCcpLmZvY3VzKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb3JtX19ncm91cC5pcy0tYm9yZGVyJykuYWRkQ2xhc3MoJ2lzLS1mb2N1cycpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmZvcm1fX2dyb3VwLmlzLS1ib3JkZXIgaW5wdXQnKS5mb2N1c291dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9ybV9fZ3JvdXAuaXMtLWJvcmRlcicpLnJlbW92ZUNsYXNzKCdpcy0tZm9jdXMnKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJ2Zvcm0nKS5wYXJzbGV5KClcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIi8vIHZhciBpbWFnZXMyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1jb250YWluZXIuZ2FsbGVyeS10b3AnKTtcclxuLy8gdmFyIGltYWdlczMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGF6eTIuaXMtLXNtYWxsJyk7XHJcbi8vIHZhciBwcm9mID0gMDtcclxuXHJcbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcbi8vICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW1hZ2VzMi5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgICAgIGltYWdlczJbaV0uc3JjID0gaW1hZ2VzMltpXS5kYXRhc2V0LnNyYztcclxuXHJcbi8vICAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XHJcbi8vICAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VzMltpXS5kYXRhc2V0LnNyYztcclxuXHJcbi8vICAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oZSkge1xyXG4vLyAgICAgICAgICAgICBwcm9mKys7XHJcbi8vICAgICAgICAgICAgIGlmKHByb2YgPT0gaW1hZ2VzMi5sZW5ndGgpIHtcclxuLy8gICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbWFnZXMzLmxlbmd0aDsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzM1tpXS5zcmMgPSBpbWFnZXMzW2ldLmRhdGFzZXQuc3JjO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfTtcclxuICAgICAgICBcclxuLy8gICAgIH1cclxuLy8gfSlcclxuXHJcbihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlczEgPSAkKCcuX19sejEgLnN3aXBlci13cmFwcGVyIC5zd2lwZXItc2xpZGU6Zmlyc3QtY2hpbGQgYSBpbWcnKVxyXG4gICAgICAgIHZhciBpbWFnZXMyID0gJCgnLl9fbHoxIC5zd2lwZXItd3JhcHBlciAuc3dpcGVyLXNsaWRlIGEgaW1nJylcclxuICAgICAgICB2YXIgaW1hZ2VzMyA9ICQoJy5sYXp5Mi5pcy0tc21hbGwnKVxyXG4gICAgICAgIHZhciBwcm9mID0gMDtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGltYWdlczEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGltYWdlczFbaV0uc3JjID0gaW1hZ2VzMVtpXS5kYXRhc2V0LnNyYztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VzMVtpXS5kYXRhc2V0LnNyYztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9mKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvZiA9PSBpbWFnZXMxLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW1hZ2VzMy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzM1tpXS5zcmMgPSBpbWFnZXMzW2ldLmRhdGFzZXQuc3JjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbWFnZXMyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXMyW2ldLnNyYyA9IGltYWdlczJbaV0uZGF0YXNldC5zcmM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAkKFwiYS5idG4sIC5uYXZiYXJfbWVudSB1bCBsaSBhLCAubmF2YmFyX19tb2JpbGVfX21lbnUgdWwgbGkgYVwiKS5vbihcImNsaWNrIHRvdWNoZW5kXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBlbCA9ICQodGhpcyk7XHJcbiAgICB2YXIgbGluayA9IGVsLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgaWYoISQoZWwpLmhhc0NsYXNzKCdfX25vaHJlZicpICYmIFxyXG4gICAgISQoZWwpLmF0dHIoJ3RhcmdldCcpICYmIFxyXG4gICAgISQoZWwpLmF0dHIoZGF0YS1mYW5jeWJveCkgJiZcclxuICAgICEkKGVsKS5oYXNDbGFzcygnbW9kYWxfX2Nsb3NlJylcclxuICAgICkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBsaW5rO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0U2l6ZUZvcmlGcmFtZSgpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFNpemVGb3JpRnJhbWUoKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAkKCcuY29udGFjdHNfX2luZm8nKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgICQoJyNtYXAgaWZyYW1lJykuY3NzKCdtaW4taGVpZ2h0JywgaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2l6ZUZvcmlGcmFtZSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICBzZXROYXZiYXIoKVxyXG4gICAgICAgIGZpeGVOYXZiYXIoKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXROYXZiYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYXZiYXJIZWlnaHQgPSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICB2YXIgYmFubmVyV2lkdGggPSAkKCcuYmFubmVyX19sZWZ0JykuaW5uZXJXaWR0aCgpXHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbk1pbkhlaWdodCA9ICQod2luZG93KS5pbm5lckhlaWdodCgpIC0gJCgnLmZvb3RlcicpLmlubmVySGVpZ2h0KClcclxuXHJcbiAgICAgICAgICAgIGlmKG5hdmJhckhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgJCgnbWFpbi5fX2lzcGFkZGluZycpLmNzcygncGFkZGluZy10b3AnLCBuYXZiYXJIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fbW9iaWxlX19pbm5lcicpLmNzcygncGFkZGluZy10b3AnLCBuYXZiYXJIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGJhbm5lcldpZHRoICYmIGJhbm5lcldpZHRoID4gMzgwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19tb2JpbGUnKS5jc3MoJ21heC13aWR0aCcsIGJhbm5lcldpZHRoICsgJ3B4JylcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fbW9iaWxlJykuY3NzKCdtYXgtd2lkdGgnLCczODBweCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnbWFpbicpLmNzcyhcIm1pbi1oZWlnaHRcIiwgbWFpbk1pbkhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmaXhlTmF2YmFyKCkge1xyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsaW5nID0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKClcclxuICAgICAgICAgICAgdmFyIG5hdmJhciA9ICQoJy5uYXZiYXInKVxyXG4gICAgICAgICAgICBpZihzY3JvbGxpbmcgPiBuYXZiYXIuaW5uZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2YmFyLmFkZENsYXNzKCdpcy0tZGFyaycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2Nyb2xsaW5nIDwgbmF2YmFyLmlubmVySGVpZ2h0KCkgJiYgIW5hdmJhci5oYXNDbGFzcygnaXMtLXJkYXJrJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdmJhci5yZW1vdmVDbGFzcygnaXMtLWRhcmsnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuTmF2YmFyRHJvcChfdGhpcykge1xyXG4gICAgICAgICAgICBjbG9zZU5hdmJhckRyb3AoKVxyXG4gICAgICAgICAgICAkKF90aGlzKS5hZGRDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgICAgICAkKF90aGlzKS5maW5kKCdidXR0b24nKS5hZGRDbGFzcygnaXMtYWN0aXZlJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlTmF2YmFyRHJvcCgpIHtcclxuICAgICAgICAgICAgJCgnLl9fbmF2YmFyLWRyb3AnKS5yZW1vdmVDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgICAgICAkKCcuX19uYXZiYXItZHJvcCcpLmZpbmQoJ2J1dHRvbicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlTmF2YmFyRHJvcChfdGhpcykge1xyXG4gICAgICAgICAgICBpZigkKF90aGlzKS5oYXNDbGFzcygnaXMtLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VOYXZiYXJEcm9wKClcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3Blbk5hdmJhckRyb3AoX3RoaXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5fX25hdmJhci1kcm9wX19sYWJlbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKS5wYXJlbnQoJy5fX25hdmJhci1kcm9wJylcclxuXHJcbiAgICAgICAgICAgIHRvZ2dsZU5hdmJhckRyb3AoX3RoaXMpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0TmF2YmFyKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmaXhlTmF2YmFyKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcubmF2YmFyX19tYnRuIGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKVxyXG4gICAgICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ2lzLS1tb2JpbGUtbWVudScpLnRvZ2dsZUNsYXNzKCdpcy0tb3ZlcmxheScpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnI292ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUF0dHIoJ2NsYXNzJylcclxuICAgICAgICAgICAgJCgnLm5hdmJhcl9fbWJ0biBidXR0b24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRzID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLl9fbmF2YmFyLWRyb3AnKVxyXG4gICAgICAgICAgICBpZih0YXJnZXRzLmxlbmd0aCA8PSAwKSBjbG9zZU5hdmJhckRyb3AoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFBhZGRpbmdzKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogJy5pcy0tYy1wbCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcuaXMtLWMtcHInLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0MTAwUGVyOiAnLmlzLS1oMTAwJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFkZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKSArICQoJy5mb290ZXInKS5pbm5lckhlaWdodCgpXHJcblxyXG4gICAgICAgICAgICAkKGNsYXNzZXMucGFkZGluZ0xlZnQpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChjbGFzc2VzLnBhZGRpbmdSaWdodCkuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChjbGFzc2VzLmhlaWdodDEwMFBlcikuY3NzKHtcclxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogJ2NhbGMoMTAwdmggLSAnICsgaGVpZ2h0ICsgJ3B4KSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJCgnLmlzLS1jLXB0JykuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRQYWRkaW5ncygpXHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFBhZGRpbmdzKClcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgJCgnLmJhbm5lcl9fc2xpZGVzX19pbm5lcicpLnNsaWNrKHtcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJhbm5lcl9fbmF2X19yaWdodCBidXR0b24uaXMtLXByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYmFubmVyX19uYXZfX3JpZ2h0IGJ1dHRvbi5pcy0tbmV4dCcsXHJcbiAgICAgICAgICAgIGZhZGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxyXG4gICAgICAgICAgICB0b3VjaE1vdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzd2lwZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTbGlkZXNJbmZvKGZUaXRsZSwgZkFkZHJlc3MsIGZMaW5rLCBzVGl0bGUpIHtcclxuICAgICAgICAgICAgJCgnLmJhbm5lcl9fdGl0bGUnKS5odG1sKGZUaXRsZSlcclxuICAgICAgICAgICAgJCgnLmJhbm5lcl9fYWRkcmVzcycpLmh0bWwoZkFkZHJlc3MpXHJcbiAgICAgICAgICAgICQoJy5iYW5uZXJfX2J0biBhJykuYXR0cignaHJlZicsIGZMaW5rKVxyXG4gICAgICAgICAgICAkKCcuYmFubmVyX19uYXZfX2xlZnRfX2Rlc2MnKS5odG1sKHNUaXRsZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5iYW5uZXJfX3NsaWRlc19faW5uZXInKS5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSkge1xyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFNsaWRlID49IHNsaWNrLnNsaWRlQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNsaWRlID0gMFxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNsaWRlID0gY3VycmVudFNsaWRlICsgMVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgX2N1cnJlbnRTbGlkZSA9ICQoJy5iYW5uZXJfX3NsaWRlc19fc2xpZGVbZGF0YS1zbGljay1pbmRleD1cIicgKyBjdXJyZW50U2xpZGUgKyAnXCJdJyksXHJcbiAgICAgICAgICAgICAgICBfbmV4dFNsaWRlID0gJCgnLmJhbm5lcl9fc2xpZGVzX19zbGlkZVtkYXRhLXNsaWNrLWluZGV4PVwiJyArIG5leHRTbGlkZSArICdcIl0nKVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coX2N1cnJlbnRTbGlkZSwgX25leHRTbGlkZSlcclxuXHJcbiAgICAgICAgICAgIHNldFNsaWRlc0luZm8oJChfY3VycmVudFNsaWRlKS5kYXRhKCd0ZXh0JyksICQoX2N1cnJlbnRTbGlkZSkuZGF0YSgnYWRkcmVzcycpLCAkKF9jdXJyZW50U2xpZGUpLmRhdGEoJ2xpbmsnKSwgJChfbmV4dFNsaWRlKS5kYXRhKCd0ZXh0JykgKVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBzZXRCYXNlU2xpZGVzKCkge1xyXG4gICAgICAgICAgICB2YXIgX2N1cnJlbnRTbGlkZSA9ICQoJy5iYW5uZXJfX3NsaWRlc19fc2xpZGVbZGF0YS1zbGljay1pbmRleD1cIjBcIl0nKVswXSxcclxuICAgICAgICAgICAgICAgIF9uZXh0U2xpZGUgPSAkKCcuYmFubmVyX19zbGlkZXNfX3NsaWRlW2RhdGEtc2xpY2staW5kZXg9XCIxXCJdJylbMF1cclxuXHJcbiAgICAgICAgICAgIHNldFNsaWRlc0luZm8oJChfY3VycmVudFNsaWRlKS5kYXRhKCd0ZXh0JyksICQoX2N1cnJlbnRTbGlkZSkuZGF0YSgnYWRkcmVzcycpLCAkKF9jdXJyZW50U2xpZGUpLmRhdGEoJ2xpbmsnKSwgJChfbmV4dFNsaWRlKS5kYXRhKCd0ZXh0JykgKVxyXG4gICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0QmFzZVNsaWRlcygpXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLnJld3NfX3NsaWRlcycpLnNsaWNrKHtcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLnJld3NfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tcHJldicsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5yZXdzX19jb250cm9scyBidXR0b24uaXMtLW5leHQnLFxyXG4gICAgICAgICAgICBzd2lwZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgQ0xBU1NFUyA9IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBcIi5fdGFiLXRhcmdldFwiLFxyXG4gICAgICAgICAgICBibG9jazogXCIuX3RhYi1ibG9ja1wiLFxyXG4gICAgICAgICAgICBhY3RpdmU6IFwiaXMtLW9wZW5cIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChDTEFTU0VTLnRhcmdldCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKENMQVNTRVMudGFyZ2V0KS5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy0tYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZigkKHRoaXMpLmRhdGEoJ3RhYmlkJykpIHtcclxuICAgICAgICAgICAgICAgIG9wZW5UYWIoJCh0aGlzKS5kYXRhKCd0YWJpZCcpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5UYWIoaWQpIHtcclxuICAgICAgICAgICAgJChDTEFTU0VTLmJsb2NrKS5yZW1vdmVDbGFzcyhDTEFTU0VTLmFjdGl2ZSk7XHJcbiAgICAgICAgICAgICQoQ0xBU1NFUy5ibG9jayArICdbZGF0YS10YWJpZD1cIicgKyBpZCArICdcIl0nKS5hZGRDbGFzcyhDTEFTU0VTLmFjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7Il19
