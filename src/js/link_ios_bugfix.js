$(document).ready(function() {
  $("a").on("click touchend", function(e) {
    var el = $(this);
    var link = el.attr("href");
    if(!$(el).hasClass('__nohref') && !$(el).attr('target')) {
      window.location = link;
    }
  });
});