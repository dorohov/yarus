document.querySelector('body').style.opacity = 0;
var opacity = 0; 

window.addEventListener('load', function() {
    setInterval(function() {
        if(opacity < 1) {
            document.querySelector('body').style.opacity = opacity;
            opacity += 0.05;
        }else {
            document.querySelector('body').style.opacity = 1;
        }
    }, 10)
})