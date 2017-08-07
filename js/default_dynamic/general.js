function responsive(){
    var scaffolding = '';
    var w = parseInt($(window).innerWidth(), 10);
    if (w < 480) { scaffolding = 'mobile'; }
    if (w >= 480 && w <= 768) { scaffolding = 'tablet'; }
    if (w > 990) { scaffolding = 'desktop'; }
    return scaffolding;
}

$(document).ready(function() {
     $('.modal').on('shown.bs.modal', function() {
        var modal = this;
        var hash = modal.id;
        window.location.hash = hash;
        window.onhashchange = function() {
          if (!location.hash){
            $(modal).modal('hide');
          }
        }
      });

     //prelanding links replace
    var url = window.location.href;
    $( '.linkToLanding' ).each(function() {
        layoutName = $(this).attr("href");
        console.log("1 - "+layoutName);
        layoutUrl = url.replace("/prelanding/" , "/"+layoutName+"/");
        console.log("2 - "+layoutUrl);
        layoutUrl = layoutUrl.replace("/default/" , "/"+layoutName+"/");
        console.log("3 - "+layoutUrl);
        $(this).attr("href", layoutUrl);
        
    });
    //end prelanding links replace

      $('.buttonParticipaAhora').click(function() {
          $('html, body').animate({
              scrollTop: $( $(this).attr('href') ).offset().top
          }, 3000);
          return false;
      });

      // sticky menu

            $(window).scroll(function() {
                if ($(this).scrollTop() > 1){  
                    $('header').addClass("sticky");
                }
                else{
                    $('header').removeClass("sticky");
                }
            });
              
                
     //Functions for modal window (condiciones & patros) 
        
        $(function() {
          $('.legal').on('click', function() {
              var tab = $(this).index();
              if ($(this).attr("id") =="modal-patros") tab = 1;
              else tab = 0;
              $('#modal-container-1 .modal-body .nav-tabs a:eq('+tab+')').tab('show');
              if ($(this).attr("id") =="modal-patros") showPatros();
          });
        });  
        
        
        function showPatros(){
            //alert($("#partnersframe").attr("src"));
            if($("#partnersframe").attr("src") == "") $("#partnersframe").attr("src", url_sponsors_iframe);
        }
        
         $('#partnersframe').load(function() {
            $("#logoSpinPatros").hide();
         });
               
        $("#showpartners").click(function(){
            showPatros();
        });
        
        
    // end functions for modal window (condiciones & patros)

    //Functions for modal window (imprenta y ganadores) 
          $('#modal-2-1').on('click', function() {
              $('#modal-container-2 .modal-body .nav-tabs a:eq(0)').tab('show');
          });
       
          $('#modal-2-2').on('click', function() {
                $('#modal-container-2 .modal-body .nav-tabs a:eq(1)').tab('show');
          });
      // end functions for modal window (imprenta y ganadores) 
      
          metas = document.getElementsByTagName('meta'); 

          for (var i=0; i< metas.length; i++) { 
            if (metas[i].getAttribute('name') == 'theme-color' || metas[i].getAttribute('name') == 'msapplication-navbutton-color') { 
              gameColorDiv = document.getElementById('GameColorDiv');
              if (gameColorDiv != null) {
                gameColor = getComputedStyle(gameColorDiv).getPropertyValue("color");
                metas[i].setAttribute('content', gameColor);
              }
            } 
          } 

          // If we are in thankyouPage -> AutoScroll
          if(document.getElementById('AnchorThankyou')){
            var aTag = $("#AnchorThankyou");
            var position = aTag.offset().top - 45;
            $('html,body').animate({scrollTop: position},'slow');
          }
   }); 