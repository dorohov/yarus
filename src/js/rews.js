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