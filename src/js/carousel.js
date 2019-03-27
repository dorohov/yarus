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