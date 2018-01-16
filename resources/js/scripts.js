$(function(){
  //var s = skrollr.init();

  $(document).on("scroll", onScroll);

    $('.menu a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target,
            speed = 900;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, speed, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    // collapsed menu on small devices
    $('#nav ~ .bar').on('click', function(){
        $('#nav').toggleClass('openned');
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    var menu =   $('#nav .menu');
    var links = menu.find('a');
    var lastLink = menu.find('li:last-child a');
    var topPosition;
    var topSpace = menu.height() + 30;

    (scrollPos > topSpace) ? menu.addClass('fixed') : menu.removeClass('fixed');

    activateProgressCircles(scrollPos);

    links.each(function () {
        var currLink = $(this);
        var refElement = currLink.attr("href");

        if ( $(refElement).length > 0){
          topPosition = $(refElement).position().top;

          if ( topPosition <= scrollPos + topSpace ) {
              links.removeClass("active");
              currLink.addClass("active");
          }
          else{
              currLink.removeClass("active");
          }
        }
    });
    // activate the last link when hit the bottom of a page
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
           links.removeClass("active");
           lastLink.addClass("active");
    }
};

function activateProgressCircles(pos) {
  var progressObj = $('.progress-circles');
  var _this, progressObjTop, parentTop, diff;

  progressObj.each(function(){
    _this = $(this);
    progressObjTop = _this.position().top;
    parentTop = _this.parent().position().top;
    diff = progressObjTop - parentTop + 100;

    if (progressObjTop <= pos + diff) {
      if (!_this.hasClass('activated')) {
        _this.addClass('activated');
      }
    }
  });

};
