$(document).ready(function(){
        
    $("body").addClass("coregs");
     //  $('.wp_radio').iCheck('destroy');
    $('.wp_submit').addClass('btn btn-primary btn-lg leadBtn');
    $('.contentLoading').hide();
    document.getElementById("containercoregs").style.visibility="";
     
     $('.iCheck-helper').click(function () {
     		if($(this).parent().parent().hasClass("wp_selecter")) makeCoregDisappear($(this)); 
     	
   	});
   	
   	$('label').click(function () {
       labelID = $(this).attr('for');
       if((labelID.indexOf("coreg_yes_")==0) || (labelID.indexOf("coreg_no_")==0)){
       		makeCoregDisappear($(this)); 
       	}
   	});

    if((responsive() == 'mobile') || (responsive() == 'tablet')){
      // past 1.8" scroll down to form
      $('html, body').delay(1000).animate ({
          scrollTop: $(".coregsHeader").offset().top - 45
      }, 1500);
      $('html, body').animate({
          scrollTop: $(".coregsHeader").offset().top - 45
      }, 1000);
    }
   	
   	function makeCoregDisappear(element){
		element.closest(".wp_coreg_outline").hide(500);
		var anyCoregVisible = false;
		setTimeout(function(){
			$(".wp_coreg_outline").each(function() {
				if ($(this).is(":visible")){
					anyCoregVisible = true;
				}	
			});
			if(!anyCoregVisible){
				$(".wp_submit").click();
				$(".wp_submit").prop('disabled', true);
				$(".wp_submit").prop('value', "Enviando...");
			}
		}, 501);
	
   	}

});