(function($) {
    //index 为默认索引
   $.fn.bbiTab = function(index){
       var lis = $(this).find('header.tab-header li');
       var tabs = $(this).find('div.tab-body section.tab-content');
       
       lis.eq(index).addClass("active");
       tabs.hide().eq(index).show();
       
       lis.children("a").hover(function(){
           $(this).closest("li").addClass('active').siblings().removeClass("active");
            var id = $(this).attr("href");       
            $(id).show().siblings().hide();           
       }).click(function(e){
            e.preventDefault();
       });
     
   }
    
})(jQuery);