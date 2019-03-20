(function($) {
    "use strict"
    $(function() {
        
        setNavbarPadding()

        function setNavbarPadding() {
            var navbarHeight = $('.navbar').innerHeight()
            if(navbarHeight) $('main').css('padding-top', navbarHeight + 'px')
        }

        $(window).resize(function() {
            setNavbarPadding()
        })

    })
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0TmF2YmFyUGFkZGluZygpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldE5hdmJhclBhZGRpbmcoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYXZiYXJIZWlnaHQgPSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICBpZihuYXZiYXJIZWlnaHQpICQoJ21haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgbmF2YmFySGVpZ2h0ICsgJ3B4JylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldE5hdmJhclBhZGRpbmcoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiXX0=
