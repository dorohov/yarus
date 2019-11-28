// var images2 = document.querySelectorAll('.swiper-container.gallery-top');
// var images3 = document.querySelectorAll('.lazy2.is--small');
// var prof = 0;

// window.addEventListener('load', function() {
//     for(var i = 0; i < images2.length; i++) {
//         images2[i].src = images2[i].dataset.src;

//         var image = new Image();
//         image.src = images2[i].dataset.src;

//         image.onload = function(e) {
//             prof++;
//             if(prof == images2.length) {
//                 for(var i = 0; i < images3.length; i++) {
//                     images3[i].src = images3[i].dataset.src;
//                 }
//             }
//         };
        
//     }
// })

(function($) {
    "use strict"
    $(function() {

        var images1 = $('.__lz1 .swiper-wrapper .swiper-slide:first-child a img')
        var images2 = $('.__lz1 .swiper-wrapper .swiper-slide a img')
        var images3 = $('.lazy2.is--small')
        var prof = 0;

        window.addEventListener('load', function() {
            for(var i = 0; i < images1.length; i++) {
                images1[i].src = images1[i].dataset.src;
        
                var image = new Image();
                image.src = images1[i].dataset.src;
        
                image.onload = function(e) {
                    prof++;
                    if(prof == images1.length) {
                        for(var i = 0; i < images3.length; i++) {
                            images3[i].src = images3[i].dataset.src;
                        }
                        for(var i = 0; i < images2.length; i++) {
                            images2[i].src = images2[i].dataset.src;
                        }
                    }
                };
                
            }
        })
        
    })
})(jQuery);