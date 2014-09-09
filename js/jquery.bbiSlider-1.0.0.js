/*
Plugin Name: bbiSlider 1.0.0
Author: Wuya
Homepage: http://heiniaozhi.cn
Github: https://github.com/doubletong/jQuerypulgins
*/
(function($) {

    //index 为默认索引
   $.fn.bbiSlider = function(opts){
        var defaults = {
            delay: 3000, // 当前索引
            prevNext: true,
            dotNav: true
        };
        var options = $.extend(defaults, opts);


       var lis = $(this).find('ul.slider-list li');

       //初始化
       slider.initialize($(this),lis);
        var links = $(this).find('div.slider-nav a');

       //循环背景
        var interval = setInterval(function(){
          slider.slideSwitch(lis,links);
        }, options.delay);


       if(options.dotNav){
            // 幻片导航
            links.click(function (e) {
                e.preventDefault();
                clearInterval(interval); // stop the interval

                var linkIndex = $(this).index();
                slider.chang(linkIndex,lis,links); //切换图片

                interval = setInterval(function(){
                       slider.slideSwitch(lis,links);
                    }, options.delay);

            });
       }else{
           links.hide();
       }

       if(options.prevNext){
           //左右导航
           $(this).children('a.prev,a.next').click(function (e) {

                e.preventDefault();
                clearInterval(interval); // stop the interval

               var dir = $(this).hasClass('prev') ? -1 : 1;
                // Get the li that is currently visible
               var current = links.filter('a.active');

               var currentIndex = links.index(current);
               // Get the element that should be shown next according to direction
               var newIndex = dir < 0 ? (currentIndex-1) : (currentIndex+1);

               // If we've reached the end, select first/last depending on direction
                if(newIndex < 0 || newIndex > (links.length-1)) {
                    newIndex = dir < 0 ? (links.length-1) : 0;
                }

                slider.chang(newIndex,lis,links);


                interval = setInterval(function(){
                       slider.slideSwitch(lis,links);
                    }, options.delay);

            });
       }else{
           $(this).children('a.prev,a.next').hide();
       }



       // var pageWidth = $(window).width(), pageHeight = $(window).height();

        //图片缓冲
        lis.each(function () {
            var $currli = $(this);
            $currli.append("<div class='loading'></div>");
            var imgurl = $(this).attr("data-pc-img");
            var image = new Image();
            $(image).attr('src', imgurl).load(function () {
                $(this).remove();
                $currli.find('div.loading').remove();
                $currli.css("background-image", 'url(' + imgurl + ')');

            });

        });


   }


       var slider = {
           initialize : function(slider,lis){ //initialize slider
           var prevNext = '<a href="#" class="prev"><i class="icon-prev"></i></a><a href="#" class="next"><i class="icon-next"></i></a>';
               slider.append(prevNext);

               var navs = "";
               for(var i=0;i<lis.length;i++){
                   navs += '<a href="#"></a>';
               }
               slider.append('<div class="slider-nav">' + navs + '</div>');
               var links = $('.slider-nav a');
               this.chang(0,lis,links);
           },
           chang:function(index,lis,links){  //set slider active
               lis.eq(index).fadeIn().siblings().fadeOut();
               links.eq(index).addClass("active").siblings().removeClass("active");
           },

           slideSwitch:function(lis, links){ //loop display slider
               var current = links.filter(".active");
               var currentIndex = links.index(current);
               var nextIndex = (currentIndex == (links.length-1)) ? 0 : currentIndex + 1

               this.chang(nextIndex, lis, links);

           }
       }


})(jQuery);
