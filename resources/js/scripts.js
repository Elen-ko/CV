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
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    var menu =   $('#nav .menu');
    var links = menu.find('a');
    var topPosition;
    var topSpace = 70;

    (scrollPos > topSpace) ? menu.addClass('fixed') : menu.removeClass('fixed');

    links.each(function () {
        var currLink = $(this);
        var refElement = currLink.attr("href");

        if ( $(refElement).length > 0){
          topPosition = $(refElement).position().top;

          if ( topPosition <= scrollPos + topSpace && topPosition + $(refElement).height() > scrollPos) {
              links.removeClass("active");
              currLink.addClass("active");
          }
          else{
              currLink.removeClass("active");
          }
        }
    });
}
