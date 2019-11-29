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

        $('.form__file input[type="file"]').on('change', function(e) {
            var name = e.target.files[0].name

            $(this).siblings('label').find('span').html(name)

            console.log($(this).siblings('label').find('span'))
        })

    })
})(jQuery);