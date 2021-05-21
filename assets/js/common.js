var ww = $(window).width();
var wh = $(window).height();
var mobile = (ww <= 1023);
var tab = (ww <= 768);
var sp = (ww <= 767);
var hh = $('.header').height();

// <!-- スムーズスクロール部分の記述 -->
$(function(){
  var urlHash = location.hash;
  if(urlHash) {
    $('body,html').stop().scrollTop(0);
    setTimeout(function(){
      var speed = 400;
      var target = $(urlHash);
      var position = target.offset().top - hh;
      $('body,html').stop().animate({scrollTop:position}, speed, 'swing');
    }, 1000);
  }
  $('a[href^="#"]').not(".popup-modal, .header__search").click(function(e) {
    e.preventDefault();
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - hh;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
  });
});

$(function(){
  $(window).on("load scroll",function (){
    $(".sec-anim, .animtrigger, .index .kv").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight){
        $(this).addClass('view');
      }
    });
  });
});

// toggle系メソッドを使ったアコーディオン演出
function acMenu(){
  $(".acMenu dt").on("click", function(e) {
    var $self = $(this);
    var $next = $self.next();
    $next.slideToggle(500, function() {
      if ($next.is(":visible")) {
        $self.addClass('add_plus');
        $(this).addClass('active');
      } else {
        $self.removeClass('add_plus');
        $(this).removeClass('active');
      }
    });
  });
};
acMenu();
// toggle系メソッドを使ったアコーディオン演出
$(function(){
  $(".acMenu li").on("click", function(e) {
    var $self = $(this);
    var $navilink = $self.find(".navi-link");
    $navilink.slideToggle(500, function() {
      if ($navilink.is(":visible")) {
        $self.addClass('add_plus')
      } else {
        $self.removeClass('add_plus')
      }
    });
  });
});


function imageSwitch() {
  $('.js-image-switch').each(function () {
    var $this = $(this);
    if (sp) {
      $this.attr('src', $this.attr('src').replace("_pc", "_sp"));
    } else {
      $this.attr('src', $this.attr('src').replace("_sp", "_pc"));
    }
  });
}
imageSwitch();

function bgSwitch() {
  $('.js-bg-switch').each(function () {
    if (sp) {
      var bg = $(this).css('background-image');
      bg = bg.replace("_pc", "_sp");
      $(this).css('background-image', bg);
    } else {
      var bg = $(this).css('background-image');
      bg = bg.replace("_sp", "_pc");
      $(this).css('background-image', bg);
    }
  });
}
bgSwitch();

$('.header__menu').on('click', function(e) {
  var $self = $(this);
  var $navilink = $(".header__navi");
  var scrollpos = $(window).scrollTop();
  $navilink.toggleClass('active');
  if ($navilink.hasClass('active')) {
    if(mobile) {
      $($navilink).css({
        'height': wh - hh + 'px'
      });
    } else {
      $($navilink).css({
        'height': wh - hh + 'px'
      });
      $('.header__navi .inner.navi').css({
        'min-height': wh - hh - 140 + 'px'
      });
    }
    $self.addClass('add_plus');
    $('#wrap_top').addClass('fixed').css({ 'top': -scrollpos });
    scrollpos2 = scrollpos;
  } else {
    if(mobile) {
      $($navilink).css({
        'height': ''
      });
    } else {
      $($navilink).css({
        'height': ''
      });
      $('.header__navi .inner.navi').css({
        'min-height': ''
      });
    }
    $self.removeClass('add_plus');
    $('#wrap_top').removeClass('fixed').css({ 'top': '0' });
    window.scrollTo(0, scrollpos2);
  }
});

$(function () {
  $('.popup-modal').magnificPopup({
    type: 'inline',
    preloader: false,
    removalDelay: 500,
    mainClass: 'mfp-fade'
  });
  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
});

$(function () {
  $('.header__search').magnificPopup({
    type: 'inline',
    preloader: false,
    removalDelay: 500,
    mainClass: 'mfp-fade',
    // callbacks: {
    //   open: function(){
    //     var tagH = $('.tags').height();
    //     if(tab) {
    //       if(tagH < 105) {
    //         $('.more').css({'display':'none'});
    //       }
    //     } else {
    //       if(tagH < 175) {
    //         $('.more').css({'display':'none'});
    //       }
    //     }
    //   }
    // }
  });
  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
});

$('#search-modal .more, #keywords .more').on('click', function(){
  $(this).toggleClass('add_plus');
  $(this).prev('.tags').toggleClass('tags_all');
});

$(window).on('load', function(){
  $('body').addClass('loaded');

  $(function () {
    $('.gallery-popup').magnificPopup({
      delegate : 'a',
      type : 'image',
      mainClass : 'mfp-gallery',
      gallery : {
        enabled : true,
        navigateByImgClick : true,
        preload : [ 0, 1 ],
        arrowMarkup: '<span title="%title%" role="button" class="gallery-arrow gallery-arrow-%dir%"></span>',
      },
      image : {
        verticalFit : true // ブラウザ縦幅に合わせる
      },
      callbacks: {
        resize: function() {
          if (timer !== false) {
            clearTimeout(timer);
          }
          timer = setTimeout(function() {
            galleryArrowPosition();
          }, 200);
        },
      }
    });
  });
  var timer = false;
  var arrowWidth = 40; //矢印ボタンのwidth
  var arrowGap = 0;   //矢印ボタンとポップアップコンテナの距離
  
  //矢印の配置を調整する関数
  function galleryArrowPosition(){
    var contWidth = $('.mfp-gallery .mfp-content').width();
    var contHeight = $('.mfp-gallery .mfp-content').height();
    var left = contWidth/2;
    var right = contWidth/2 - arrowWidth;
    var top = contHeight/2 + 30;
    $('.gallery-arrow').css('margin-top',top+'px');
    $('.gallery-arrow-left').css('margin-left','-'+left+'px');
    $('.gallery-arrow-right').css('margin-left',right+'px');
  }

});

// URLのパラメータを取得
var urlParam = location.search.substring(1);

if(urlParam) {
  var param = urlParam.split('&');
  var paramArray = [];

  // 用意した配列にパラメータを格納
  for (i = 0; i < param.length; i++) {
    var paramItem = param[i].split('=');
    paramArray[paramItem[0]] = paramItem[1];
  }

  var paramId = paramArray.id;
  var resultItem = $('.sec--result .inner .card');

  $('.sec--result .inner').find('.' + paramId);
  $('.' + paramId).addClass('active');
  if(paramId == 'tag01') {
    $('title').html('#入社1〜9年目｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#入社1〜9年目｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('入社1〜9年目');
    $('.breadcrumb__ttl').text('入社1〜9年目');
    $('.sec--result .lead').html('“入社1〜9年目” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag02') {
    $('title').html('#入社10年目以上｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#入社10年目以上｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('入社10年目以上');
    $('.breadcrumb__ttl').text('入社10年目以上');
    $('.sec--result .lead').html('“入社10年目以上” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag03') {
    $('title').html('#リーダー｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#リーダー｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('リーダー');
    $('.breadcrumb__ttl').text('リーダー');
    $('.sec--result .lead').html('“リーダー” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag04') {
    $('title').html('#指導者｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#指導者｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('指導者');
    $('.breadcrumb__ttl').text('指導者');
    $('.sec--result .lead').html('“指導者” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag05') {
    $('title').html('#教育の現場を支える｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#教育の現場を支える｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('教育の現場を支える');
    $('.breadcrumb__ttl').text('教育の現場を支える');
    $('.sec--result .lead').html('“教育の現場を支える” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag06') {
    $('title').html('#全国の教室・会社全体を支える｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#全国の教室・会社全体を支える｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('全国の教室・会社全体を支える');
    $('.breadcrumb__ttl').text('全国の教室・会社全体を支える');
    $('.sec--result .lead').html('“全国の教室・会社全体を支える” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag07') {
    $('title').html('#様々な事業の広がりを支える｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#様々な事業の広がりを支える｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('様々な事業の広がりを支える');
    $('.breadcrumb__ttl').text('様々な事業の広がりを支える');
    $('.sec--result .lead').html('“様々な事業の広がりを支える” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag08') {
    $('title').html('#KUMONを知る｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#KUMONを知る｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('KUMONを知る');
    $('.breadcrumb__ttl').text('KUMONを知る');
    $('.sec--result .lead').html('“KUMONを知る” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag09') {
    $('title').html('#仕事を知る｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#仕事を知る｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('仕事を知る');
    $('.breadcrumb__ttl').text('仕事を知る');
    $('.sec--result .lead').html('“仕事を知る” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag10') {
    $('title').html('#社員を知る｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#社員を知る｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('社員を知る');
    $('.breadcrumb__ttl').text('社員を知る');
    $('.sec--result .lead').html('“社員を知る” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag11') {
    $('title').html('#働く環境を知る｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#働く環境を知る｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('働く環境を知る');
    $('.breadcrumb__ttl').text('働く環境を知る');
    $('.sec--result .lead').html('“働く環境を知る” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag12') {
    $('title').html('#採用情報｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#採用情報｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('採用情報');
    $('.breadcrumb__ttl').text('採用情報');
    $('.sec--result .lead').html('“採用情報” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag13') {
    $('title').html('#公文の理念｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#公文の理念｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('公文の理念');
    $('.breadcrumb__ttl').text('公文の理念');
    $('.sec--result .lead').html('“公文の理念” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag14') {
    $('title').html('#これからのKUMON｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#これからのKUMON｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('これからのKUMON');
    $('.breadcrumb__ttl').text('これからのKUMON');
    $('.sec--result .lead').html('“これからのKUMON” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag15') {
    $('title').html('#社長インタビュー｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#社長インタビュー｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('社長インタビュー');
    $('.breadcrumb__ttl').text('社長インタビュー');
    $('.sec--result .lead').html('“社長インタビュー” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag16') {
    $('title').html('#グローバル｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#グローバル｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('グローバル');
    $('.breadcrumb__ttl').text('グローバル');
    $('.sec--result .lead').html('“グローバル” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag17') {
    $('title').html('#SDGs｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#SDGs｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('SDGs');
    $('.breadcrumb__ttl').text('SDGs');
    $('.sec--result .lead').html('“SDGs” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag18') {
    $('title').html('#公文式学習法｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#公文式学習法｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('公文式学習法');
    $('.breadcrumb__ttl').text('公文式学習法');
    $('.sec--result .lead').html('“公文式学習法” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag19') {
    $('title').html('#コンサルティング職｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#コンサルティング職｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('コンサルティング職');
    $('.breadcrumb__ttl').text('コンサルティング職');
    $('.sec--result .lead').html('“コンサルティング職” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag20') {
    $('title').html('#リクルート・育成職｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#リクルート・育成職｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('リクルート・育成職');
    $('.breadcrumb__ttl').text('リクルート・育成職');
    $('.sec--result .lead').html('“リクルート・育成職” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag21') {
    $('title').html('#若手社員の活躍｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#若手社員の活躍｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('若手社員の活躍');
    $('.breadcrumb__ttl').text('若手社員の活躍');
    $('.sec--result .lead').html('“若手社員の活躍” のキーワードが含まれる<br>コンテンツを表示しています。');
  } else if(paramId == 'tag22') {
    $('title').html('#社会の変化を捉える｜採用情報｜公文教育研究会');
    $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="#社会の変化を捉える｜採用情報｜公文教育研究会">');
    $('.kv__ttl .quot').text('社会の変化を捉える');
    $('.breadcrumb__ttl').text('社会の変化を捉える');
    $('.sec--result .lead').html('“社会の変化を捉える” のキーワードが含まれる<br>コンテンツを表示しています。');
  }
}

//IE 11のときのsearchアイコン
const ua = navigator.userAgent;
if(ua.indexOf('Trident') !== -1) {
  if($('body').hasClass('index') || $('body').hasClass('keyword')) {
    $('.header__search .icon').html('<img src="./assets/img/common/icon_search.svg">');
    var timestamp = new Date().getTime();
    var svgImg = ('./assets/img/common/icon_search.svg');
    var gifImg = ('./assets/img/common/icon_search.gif' + '?' + timestamp);
    $('.header__search .icon').on('mouseover', function(){
      $('.header__search .icon').children('img').attr('src', gifImg);
    });
    $('.header__search .icon').on('mouseout', function(){
      $('.header__search .icon').children('img').attr('src', svgImg);
    });
  } else {
    $('.header__search .icon').html('<img src="../assets/img/common/icon_search.svg">');
    var timestamp = new Date().getTime();
    var svgImg = ('../assets/img/common/icon_search.svg');
    var gifImg = ('../assets/img/common/icon_search.gif' + '?' + timestamp);
    $('.header__search .icon').on('mouseover', function(){
      $('.header__search .icon').children('img').attr('src', gifImg);
    });
    $('.header__search .icon').on('mouseout', function(){
      $('.header__search .icon').children('img').attr('src', svgImg);
    });
  }
}
