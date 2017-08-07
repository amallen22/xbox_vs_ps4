function scrollToAnchor(aid){
    var aTag = $("a[id='"+ aid +"']");
//     offsetExtra = -45;
//     var position = aTag.offset().top + offsetExtra;
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}
$(document).ready(function() {
// calculate viewport width

    var page = $("html, body");

    page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
         page.stop();
    });

    if ((responsive() == 'mobile') || (responsive() == 'tablet')) {
    // load mobile js
        
        // Click sticker

            $(".sticker").click(function() {
                scrollToAnchor('id3');
            });
            
            // past 1.8" scroll down to form
    
            $('html, body').delay(5000).animate ({
                scrollTop: $("#id3").offset().top
            }, 1500);
            $('html, body').animate({
                scrollTop: $("#id3").offset().top
            }, 1000);
        
            $(".form-box").removeClass("bounceIn");
        
        }

    if (responsive() == 'tablet') {
    // load tablet js
        
       
    }

    if (responsive() == 'desktop') {
       // full page scroll

    /* $('#fullpage').fullpage({
              anchors: ['first', 'second', 'third'],
              css3:false,
              scrollBar:true,
              fitToSection: false,
              afterLoad: function(anchorLink, index){
              var loadedSection = $(this);
                //using anchorLink
              if(anchorLink == 'first'){
                    $( "#nombre" ).focus();
                }
              }	
     });	*/
    }
   
});
