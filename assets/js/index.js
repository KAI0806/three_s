$(window).on('load', function (){
  $(".index .kv__news .arrow").on('webkitAnimationEnd', function(){
    $('.index .kv__slider').on('init', function() {
      if ($('.slide').length > 1) {
          $('.slick-slide[data-slick-index="0"]').addClass('-moving');
      }
    })
    .slick({
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3500,
      speed: 2000,
      slidesToShow: 1,
      fade: true,
      slide: ".slide",
      vertical: false,
      pauseOnFocus: false,
      pauseOnHover: false,
    })
    .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      if ($('.slide').length > 1) {
          var slide_num = $('.slide').length;

          $('.slide[data-slick-index="' + (currentSlide - 1) + '"]').removeClass('-moving');
          $('.slide[data-slick-index="' + nextSlide + '"]').addClass('-moving');

          if (currentSlide == 0) {
              $('.slide[data-slick-index="' + (slide_num - 1) + '"]').removeClass('-moving');
          }
      };
    });
    $('.index .kv__slider').addClass('active');
  });

  var ww = $(window).width();
  var tab = ww < 769;
  if(tab) {
    $('.index .sec--work .card-wrap').slick({
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

$('.index .news .arrow').on('click', function (){
  $(this).parent('.news').toggleClass('open');
});
