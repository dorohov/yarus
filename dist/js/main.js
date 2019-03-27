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
        
        $('.tcard__left__carousel__inner').slick({
            prevArrow: '.tcard__left__carousel__controls__btn.is--prev',
            nextArrow: '.tcard__left__carousel__controls__btn.is--next'
        })

        $('.about__slides__block__carousel__inner').each(function() {
            $(this).slick({
                prevArrow: $(this).parent().find('button.is--prev'),
                nextArrow: $(this).parent().find('button.is--next')
            })
            
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

    })
})(jQuery);
var map;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(52.974394, 36.059105),
            zoom: 17,
            disableDefaultUI: true,
            styles: [
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "saturation": "-100"
                        },
                        {
                            "weight": "1.37"
                        },
                        {
                            "lightness": "0"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.attraction",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.attraction",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#e8e4e4"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.government",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.medical",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#dcd7d7"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#666262"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.place_of_worship",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.school",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.sports_complex",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#d3cfcf"
                        }
                    ]
                },
                {
                    "featureType": "poi.sports_complex",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#656565"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#2b2b2b"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }
            ]
          });
          var icon = 'http://frontend.dorohovdesign.ru/yarus/img/marker.png';

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(52.974394, 36.059105),
                icon: icon,
                map: map
            });
        }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3IuanMiLCJjYXJvdXNlbC5qcyIsImZvcm1zLmpzIiwibWFwLmpzIiwibmF2YmFyLmpzIiwidGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdllBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgIHN0ZXAxX3ByaWNlID0gICAwLFxyXG4gICAgICAgICAgICBzdGVwMl9wcmljZSA9ICAgMCxcclxuICAgICAgICAgICAgc3RlcDNfbWV0ZXJzID0gIDAsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RlcCA9ICAxLFxyXG4gICAgICAgICAgICBydWJsZSA9ICQoJ2lucHV0I2NhbGMzMScpLnZhbCgpLFxyXG4gICAgICAgICAgICB0b3RhbCA9IDAsXHJcbiAgICAgICAgICAgIHRpdGxlcyA9IFtcclxuICAgICAgICAgICAgICAgICcxLiDQktGL0LHQtdGA0LjRgtC1INGC0LjQvyDQtNC+0LzQsDonLFxyXG4gICAgICAgICAgICAgICAgJzIuINCS0YvQsdC10YDQuNGC0LUg0YLQuNC/INGA0LXQvNC+0L3RgtCwOicsXHJcbiAgICAgICAgICAgICAgICAnMy4g0J/RgNC+0LjQt9Cy0L7QtNC40YLRgdGPINGA0LDRgdGH0LXRgiDRgdGC0L7QuNC80L7RgdGC0Lgg0YDQtdC80L7QvdGC0LAsINC90LDRiCDQvNC10L3QtdC00LbQtdGAINCS0LDRgSDQv9C+0LTRgNC+0LHQvdC+INC/0YDQvtC60L7QvdGB0YPQu9GM0YLQuNGA0YPQtdGCLiDQntGB0YLQsNCy0YzRgtC1INC90L7QvNC10YAg0YLQtdC70LXRhNC+0L3QsCDQtNC70Y8g0YHQstGP0LfQuC4nXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRpdGxlQmxvY2sgPSAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N1YnRpdGxlJylcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U3RlcChudW0pIHtcclxuICAgICAgICAgICAgdGl0bGVCbG9jay5odG1sKHRpdGxlc1tjdXJyZW50X3N0ZXAgLSAxXSlcclxuICAgICAgICAgICAgJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdGVwJykucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgICAgICAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXBbZGF0YS1zdGVwaWQ9XCInICsgbnVtICsnXCJdJykuYWRkQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXRTdGVwKGN1cnJlbnRfc3RlcClcclxuXHJcbiAgICAgICAgJCgnLmNhbGN1bGF0b3JfX2J0biBidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudF9zdGVwID09IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRzID0gJCgnLmNhbGN1bGF0b3JfX3JpZ2h0X19zdGVwcycpLmZpbmQoJ2lucHV0W25hbWU9XCJjYWxjMVwiXTpjaGVja2VkJylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzExJykgc3RlcDFfcHJpY2UgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzEyJykgc3RlcDFfcHJpY2UgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpbnB1dHMuYXR0cignaWQnKSA9PSAnY2FsYzEzJykgc3RlcDFfcHJpY2UgPSAxXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0ZXAxX3ByaWNlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50X3N0ZXAgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFN0ZXAoY3VycmVudF9zdGVwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJyZW50X3N0ZXAgPT0gMikge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dHMgPSAkKCcuY2FsY3VsYXRvcl9fcmlnaHRfX3N0ZXBzJykuZmluZCgnaW5wdXRbbmFtZT1cImNhbGMyXCJdOmNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlucHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMyMScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDJfcHJpY2UgPSA3NTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5wdXRzLmF0dHIoJ2lkJykgPT0gJ2NhbGMyMicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDJfcHJpY2UgPSAxMjUwMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RlcDJfcHJpY2UgPiAwICYmICQoJ2lucHV0W2lkPVwiY2FsYzIzXCJdJykudmFsKCkgIT0gbnVsbCAmJiAkKCdpbnB1dFtpZD1cImNhbGMyM1wiXScpLnZhbCgpICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsID0gc3RlcDFfcHJpY2UgKiBzdGVwMl9wcmljZSAqICQoJ2lucHV0W2lkPVwiY2FsYzIzXCJdJykudmFsKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnaW5wdXQjY2FsYzMxJykudmFsKHRvdGFsLnRvTG9jYWxlU3RyaW5nKCdydS1SVScpICsgcnVibGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfc3RlcCA9IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnRfc3RlcCA9PSAzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoJCgnaW5wdXQjY2FsYzMyJykudmFsKCkubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdmb3JtLnBocCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSA9PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNtb2RhbF9jYWxjdWxhdG9yJykubW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDbG9zZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWRlRHVyYXRpb246IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5jYWxjdWxhdG9yX19idG4uaXMtLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoY3VycmVudF9zdGVwID4gMCkgY3VycmVudF9zdGVwLS1cclxuICAgICAgICAgICAgc2V0U3RlcChjdXJyZW50X3N0ZXApXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICAkKCcudGNhcmRfX2xlZnRfX2Nhcm91c2VsX19pbm5lcicpLnNsaWNrKHtcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLnRjYXJkX19sZWZ0X19jYXJvdXNlbF9fY29udHJvbHNfX2J0bi5pcy0tcHJldicsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy50Y2FyZF9fbGVmdF9fY2Fyb3VzZWxfX2NvbnRyb2xzX19idG4uaXMtLW5leHQnXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmFib3V0X19zbGlkZXNfX2Jsb2NrX19jYXJvdXNlbF9faW5uZXInKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLXByZXYnKSxcclxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b24uaXMtLW5leHQnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJy5mb3JtX19ncm91cC5pcy0tYm9yZGVyIGlucHV0JykuZm9jdXMoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvcm1fX2dyb3VwLmlzLS1ib3JkZXInKS5hZGRDbGFzcygnaXMtLWZvY3VzJylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuZm9ybV9fZ3JvdXAuaXMtLWJvcmRlciBpbnB1dCcpLmZvY3Vzb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb3JtX19ncm91cC5pcy0tYm9yZGVyJykucmVtb3ZlQ2xhc3MoJ2lzLS1mb2N1cycpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsInZhciBtYXA7XHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuICAgICAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1Mi45NzQzOTQsIDM2LjA1OTEwNSksXHJcbiAgICAgICAgICAgIHpvb206IDE3LFxyXG4gICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IFwiLTEwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMS4zN1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmF0dHJhY3Rpb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5hdHRyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5idXNpbmVzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2U4ZTRlNFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuYnVzaW5lc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmdvdmVybm1lbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLm1lZGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNkY2Q3ZDdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjY2MjYyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wbGFjZV9vZl93b3JzaGlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5zY2hvb2xcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnNwb3J0c19jb21wbGV4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2QzY2ZjZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuc3BvcnRzX2NvbXBsZXhcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzY1NjU2NVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheS5jb250cm9sbGVkX2FjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQubGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LnN0YXRpb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMyYjJiMmJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhciBpY29uID0gJ2h0dHA6Ly9mcm9udGVuZC5kb3JvaG92ZGVzaWduLnJ1L3lhcnVzL2ltZy9tYXJrZXIucG5nJztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDUyLjk3NDM5NCwgMzYuMDU5MTA1KSxcclxuICAgICAgICAgICAgICAgIGljb246IGljb24sXHJcbiAgICAgICAgICAgICAgICBtYXA6IG1hcFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNldE5hdmJhcigpXHJcbiAgICAgICAgZml4ZU5hdmJhcigpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldE5hdmJhcigpIHtcclxuICAgICAgICAgICAgdmFyIG5hdmJhckhlaWdodCA9ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgIHZhciBiYW5uZXJXaWR0aCA9ICQoJy5iYW5uZXJfX2xlZnQnKS5pbm5lcldpZHRoKClcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluTWluSGVpZ2h0ID0gJCh3aW5kb3cpLmlubmVySGVpZ2h0KCkgLSAkKCcuZm9vdGVyJykuaW5uZXJIZWlnaHQoKVxyXG5cclxuICAgICAgICAgICAgaWYobmF2YmFySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAkKCdtYWluLl9faXNwYWRkaW5nJykuY3NzKCdwYWRkaW5nLXRvcCcsIG5hdmJhckhlaWdodCArICdweCcpXHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19tb2JpbGVfX2lubmVyJykuY3NzKCdwYWRkaW5nLXRvcCcsIG5hdmJhckhlaWdodCArICdweCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoYmFubmVyV2lkdGggJiYgYmFubmVyV2lkdGggPiAzODApIHtcclxuICAgICAgICAgICAgICAgICQoJy5uYXZiYXJfX21vYmlsZScpLmNzcygnbWF4LXdpZHRoJywgYmFubmVyV2lkdGggKyAncHgnKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19tb2JpbGUnKS5jc3MoJ21heC13aWR0aCcsJzM4MHB4JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCdtYWluJykuY3NzKFwibWluLWhlaWdodFwiLCBtYWluTWluSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpeGVOYXZiYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxpbmcgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKVxyXG4gICAgICAgICAgICB2YXIgbmF2YmFyID0gJCgnLm5hdmJhcicpXHJcbiAgICAgICAgICAgIGlmKHNjcm9sbGluZyA+IG5hdmJhci5pbm5lckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZiYXIuYWRkQ2xhc3MoJ2lzLS1kYXJrJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihzY3JvbGxpbmcgPCBuYXZiYXIuaW5uZXJIZWlnaHQoKSAmJiAhbmF2YmFyLmhhc0NsYXNzKCdpcy0tcmRhcmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKCdpcy0tZGFyaycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldE5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZml4ZU5hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fbWJ0biBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJylcclxuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdpcy0tbW9iaWxlLW1lbnUnKS50b2dnbGVDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJyNvdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKCdjbGFzcycpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX21idG4gYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgQ0xBU1NFUyA9IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBcIi5fdGFiLXRhcmdldFwiLFxyXG4gICAgICAgICAgICBibG9jazogXCIuX3RhYi1ibG9ja1wiLFxyXG4gICAgICAgICAgICBhY3RpdmU6IFwiaXMtLW9wZW5cIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChDTEFTU0VTLnRhcmdldCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKENMQVNTRVMudGFyZ2V0KS5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy0tYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZigkKHRoaXMpLmRhdGEoJ3RhYmlkJykpIHtcclxuICAgICAgICAgICAgICAgIG9wZW5UYWIoJCh0aGlzKS5kYXRhKCd0YWJpZCcpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5UYWIoaWQpIHtcclxuICAgICAgICAgICAgJChDTEFTU0VTLmJsb2NrKS5yZW1vdmVDbGFzcyhDTEFTU0VTLmFjdGl2ZSk7XHJcbiAgICAgICAgICAgICQoQ0xBU1NFUy5ibG9jayArICdbZGF0YS10YWJpZD1cIicgKyBpZCArICdcIl0nKS5hZGRDbGFzcyhDTEFTU0VTLmFjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7Il19
