(function($) {

    //index 为默认索引
   $.fn.bbiSlider = function(opts){
        var defaults = {
            currentIndex: 1 // 当前索引
        };
        var options = $.extend(defaults, opts);

       var lis = $(this).find('ul.slider-list li');


    //循环背景
    var interval = setInterval(function(){
      slideSwitch();
    }, 5000);

    $("div.slider-nav a:first").addClass("active");
    var sid = $("div.slider-nav a.active").attr("data-id");
    ChangBodyBg(sid);


    $("div.slider-nav a").click(function (e) {
        e.preventDefault();
        clearInterval(interval); // stop the interval
        var sid = $(this).attr("data-id");
        ChangBodyBg(sid);

        $("div.slider-nav a.active").removeClass("active");
        $(this).addClass("active");

        interval = setInterval(function(){
               slideSwitch();
            }, 5000);

    });


       $(this).children('a.prev').click(function (e) {
            e.preventDefault();
            clearInterval(interval); // stop the interval

           var  currentLink = $("div.slider-nav a.active"),  prevLink = currentLink.prev("a"), lastLink = $("div.slider-nav a:last");

            if (prevLink.length) {
                currentLink.removeClass("active");
                prevLink.addClass("active");

            } else {
                currentLink.removeClass("active");
                lastLink.addClass("active");
            }
            var activeLine = $("div.slider-nav a.active");

            var sid = activeLine.attr("data-id");
            ChangBodyBg(sid);

            interval = setInterval(function(){
                   slideSwitch();
                }, 5000);

    })


       $(this).children('a.next').click(function (e) {

            e.preventDefault();

            clearInterval(interval); // stop the interval

           var  currentLink = $("div.slider-nav a.active"),  nextLink = currentLink.next("a"), firstLink = $("div.slider-nav a:first");

            if (currentLink.next("a").length) {
                currentLink.removeClass("active");
                nextLink.addClass("active");
            } else {
                currentLink.removeClass("active");
                firstLink.addClass("active");
            }

            var activeLine = $("div.slider-nav a.active");

            var sid = activeLine.attr("data-id");
            ChangBodyBg(sid);

            interval = setInterval(function(){
               slideSwitch();
            }, 5000);

        });



        /**

        *   ON RESIZE, check again

        */


        var pageWidth = $(window).width(), pageHeight = $(window).height();

        //图片缓冲
        lis.each(function () {

            var $currli = $(this);
            $currli.html("<div class='loading'></div>");
            var imgurl = $(this).attr("data-pc-img");
            var image = new Image();
            $(image).attr('src', imgurl).load(function () {
                $(this).remove();
                $currli.find('div.loading').remove();
                $currli.css("background-image", 'url(' + imgurl + ')');

            });

        });


   }

   // loop display nav
        function slideSwitch() {

            var $active = $('div.slider-nav a.active');
            // var $next = $active.next();

            if ($active.length == 0) $active = $('div.slider-nav  a:last');
            var $next = $active.next().length ? $active.next()
                : $('div.slider-nav a:first');

            $next.addClass('active');
            $active.removeClass('active');
            var sid = $("div.slider-nav a.active").attr("data-id");

            ChangBodyBg(sid);

        }


        function ChangBodyBg(sid) {
            $("ul.slider-list li.active").fadeIn('slow', function () {
                $(this).fadeOut('slow');
                $(this).removeClass("active");

            });
            // $("#slider li#" + sid).addClass('active');
            $("ul.slider-list li#" + sid).fadeOut('slow', function () {
                $(this).fadeIn('slow');
                $(this).addClass("active");
            });

          //  $("a.slider-link").attr("href", url);

        }


})(jQuery);
