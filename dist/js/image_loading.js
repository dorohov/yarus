var images = document.querySelectorAll('.lazy');
    window.addEventListener('load', function() {
        images.forEach(function(img) {
            img.src = img.dataset.src;
        });
})