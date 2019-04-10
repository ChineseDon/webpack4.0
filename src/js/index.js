import './../css/index.css';
require('jquery')

// wxShare.setWxConfig(document.location.href.split('#')[0]);

var indexNav = $("#indexNav");
var doc = $(document);
var indexNavTop = indexNav.offset().top;
var _index = {
  tab: function(el, index) {
    $(el).hide().fadeOut();
    $(el).eq(index).fadeIn().show();
  },
  toPage: function() {
      window.location.href= website.addr + "/hbgStationApply/identity.html";
  },
  fixNav: function() {
    if(doc.scrollTop() >= indexNavTop) {
      indexNav.addClass("tab-nav-fixed");
    }else{
      if(indexNav.hasClass("tab-nav-fixed")) {
         indexNav.removeClass("tab-nav-fixed");
      }
    }
  }
};

$("ul.tab-nav > li").click(function() {
    $("ul.tab-nav > li").removeClass("active");
    $(this).addClass("active");
    if(indexNav.hasClass("tab-nav-fixed")) {
      $("html,body").animate({scrollTop: Math.ceil($(".index-tab").offset().top)},300);
    }else {
      $("html,body").animate({scrollTop: Math.ceil($(this).offset().top)},300);
    }
    _index.tab("ul.tab-content > li", $(this).index());
});

// 监听滚动
$(window).scroll(function() {
    _index.fixNav();
});

$(function(){
    $(".nav-hook").height(indexNav.height() + 'px');

    // 默认选第一个
    _index.tab("ul.tab-content > li", 0);
    
    // 固定
    _index.fixNav();
    if(indexNav.hasClass("tab-nav-fixed")) {
        $("html,body").animate({scrollTop: Math.ceil($(".index-tab").offset().top)},300);
    }
})

