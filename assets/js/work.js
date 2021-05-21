$(window).on('load', function (){
  var ww = $(window).width();
  var tab = ww < 769;
  if(tab) {
    $('.sec--work .card-wrap').slick({
      slidesToShow: 1,
      centerMode: true,
      prevArrow: '<div class="prev"><div class="arrow"></div></div>',
      nextArrow: '<div class="next"><div class="arrow"></div></div>',
      responsive: [{
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        }
      },{
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }]
    });
  }
});
