(function($) {
   
    
    //index 为默认索引
   $.fn.bbiTab = function(opts){
       
        var defaults = {
            currentIndex: 1 // 当前索引
        };
        var options = $.extend(defaults, opts);
       
       var lis = $(this).find('header.tab-header li');
       var tabs = $(this).find('div.tab-body section.tab-content');
       var i = options.currentIndex-1;
       
       lis.eq(i).addClass("active");
       tabs.hide().eq(i).show();
       
       lis.children("a").hover(function(){
           $(this).closest("li").addClass('active').siblings().removeClass("active");
            var id = $(this).attr("href");       
            $(id).show().siblings().hide();           
       }).click(function(e){
            e.preventDefault();
       });     
   }
   
   
    
})(jQuery);