(function($) {
    "use strict"
    $(function() {
        
        $('.calculator__btn button[type="submit"]').on('click', function(e) {
            
            e.preventDefault()

            var
                step1_price =   0,
                step2_price =   0,
                step3_meters =  0,
                current_step =  1

            if(current_step == 1) {

                var inputs = $('.calculator__right__steps').find('input[name="calc1"]:checked')
                
                if(inputs.length > 0) {
                    if(inputs.attr('id') == 'calc11') step1_price = 1
                    else if(inputs.attr('id') == 'calc12') step1_price = 1
                    else if(inputs.attr('id') == 'calc13') step1_price = 1

                    if(step1_price > 0) {
                        console.log('Идем дальше')
                    }
                }

            }else if(current_step == 2) {

            }

        })

    })
})(jQuery);