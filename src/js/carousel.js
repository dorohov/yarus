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

        var slickClickAccess = true

        function getWorkingSlider(id) {
            return '.working__block__carousel__list[data-carouselid="' + id + '"]'
        }

        function setWorkingSlide(carousel_id, item_id) {
            if(slickClickAccess) {
                $('.__working-nav-item').removeClass('is--active')
                $('.__working-nav-item[data-carouselid="' + carousel_id + '"][data-itemid="' + item_id + '"]').addClass('is--active');
                if(carousel_id && item_id) {
                    $(getWorkingSlider(carousel_id)).slick('slickGoTo', item_id)
                }
                slickClickAccess = false
            }
        }

        $('.working__block__carousel__list').each(function() {
            $(this).slick({
                prevArrow: $(this).parent().find('button.is--prev'),
                nextArrow: $(this).parent().find('button.is--next'),

            })
        })

        $('.working__block__carousel__list').on('afterChange', function(event, slick, currentSlide, nextSlide) {
            var carousel_id = $(this).data('carouselid')
            setWorkingSlide(carousel_id, currentSlide)
            slickClickAccess = true
        })

        $('.__working-nav-item').on('click', function() {
            var carousel_id = $(this).data('carouselid'),
                item_id = $(this).data('itemid')

                setWorkingSlide(carousel_id, item_id)
        })

        $('.working__block__carousel__item.slick-cloned').removeAttr('data-fancybox')

        
    })
})(jQuery);