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