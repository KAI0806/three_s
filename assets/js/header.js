$(function() {
  var tabletWidth = 768;
  var nav = $("header .nav");
  var hamburger = $(".header_menu");
  hamburger.on({
    click: function(e) {
      e.preventDefault();
      $(this).toggleClass("on");
      nav.toggleClass("on");

      var $top_header = $("#top_header");
      if ($top_header.length != 0) {
        var $th_top;
        $th_top = $top_header.offset().top;
        var y = $(window).scrollTop();
        //ヘッダー対応
        if (y < $th_top) {
          $("body,html").animate({ scrollTop: $th_top }, 400, "swing");
        }
      }
    }
  });
});
