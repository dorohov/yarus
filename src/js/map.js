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