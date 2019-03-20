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