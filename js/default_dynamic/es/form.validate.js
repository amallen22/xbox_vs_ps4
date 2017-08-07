//SCRIPT That deals with the js form verification

$(function(){

//form step by step
    
     var navListItems = $('div.setup-panel div a'),
            allNextBtn = $('.nextBtn');

     var lastFieldOnFocus = ""; 

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
       if($(this).attr('id')!="submitButton"){ //as it has already its own verif function
        removeErrors();
        //console.log($(this).attr('id'));
        checkForErrors($(this), 's');            
    }
    });
    
    $('div.setup-panel div a.btn-primary').trigger('click');
    
    
    //Single field automatic validation.
    $('.form-control').focusout(function (e) {
        fieldValid = checkSpecificField($(this)[0]);
     });
    

    
    $("#lbl_gender_f").click(function (e) {
        $(this).closest(".form-group").removeClass("has-error");
     });
    $("#lbl_gender_m").click(function (e) {
        $(this).closest(".form-group").removeClass("has-error");
     });

    $('input').on('ifChecked', function(event){
        $(this).closest("label").removeClass("has-error-shadow");
    });

    $('input').on('ifUnchecked', function(event){
        $(this).closest("label").addClass("has-error-shadow");
    });
    
}); 
    // type (form type)
        // s -> steps
        // c -> complete
    function checkForErrors(btn, type){
        var curStep = btn.closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                curInputs = curStep.find("input[type='text'],input[type='number'],input[type='email'],input[type='radio'],input[type='checkbox'],select"),
                isValid = true;
        
        //console.log(btn.attr('id'));    
        if (btn.attr('id') == "btnStep2") {
            validity = checkForErrors($("#btnStep1"), type);
            if (!validity) isValid = false;
            console.log("->"+btn.attr('id')+" "+isValid);
        }
        if (btn.attr('id') == "btnStep3") {
            validity = checkForErrors($("#btnStep2"), type);
            if (!validity) isValid = false;
            console.log("-<"+btn.attr('id')+" "+isValid);
        }
            var genderIsChecked = false;
            var genderIsVerified = false;
            for(var i=0; i<curInputs.length; i++){
                //isValid=true;
                console.log(isValid);
                if (curInputs[i].name=="form_gender"){
                    genderIsVerified = true;
                    genderarea=curInputs[i];
                    if (curInputs[i].checked) genderIsChecked = true;
                }else{ 
                    //console.log(curInputs[i]);
                    //console.log(isValid);
                    if(!checkSpecificField(curInputs[i])) isValid = false;
                }
            }
            
            if (!genderIsChecked && genderIsVerified){
                isValid = false;
                $(genderarea).closest(".form-group").addClass("has-error");
            }

            if (isValid){
                if(type == 's'){
                    btn.hide();
                    nextStepWizard.removeAttr('disabled').trigger('click');
                    //$(this).hide();
                }
            }else{
                var list = document.getElementsByClassName("has-error")[0];
                if(list.classList.contains("gender")){
                    // Gender -> Special case
                    if(responsive() == 'mobile' || responsive() == 'tablet'){
                        scrollToAnchor('id3');
                    }
                }else if(list.parentElement.parentElement.classList.contains("terms_and_conditions")){
                    // Terms and conditions -> Special case
                    if(responsive() == 'mobile' || responsive() == 'tablet'){
                        scrollToAnchor('t_and_c');
                    }
                }else{
                    // Usually case -> inputs
                    var elem = list.getElementsByClassName("form-control")[0];
                    if(elem != null) {
                        $(elem).focus();
                    }
                }
            }
        console.log(btn.attr('id')+" "+isValid);
        return isValid;    
    } 
    
    function removeErrors(){
        $(".form-group").removeClass("has-error");
        $("#mayorQue").removeClass("has-error-shadow"); 
        $("#termsandcond").removeClass("has-error-shadow");
        
    }
    
    function checkSpecificField(field){
        isValid = true;
        if (!field.validity.valid){
                    isValid = false;
                    if (field.name=="form_adult") $("#mayorQue").addClass("has-error-shadow"); 
                    else if (field.name=="form_terms") $("#termsandcond").addClass("has-error-shadow");
                    else $(field).closest(".form-group").addClass("has-error");
                    $(field).closest(".form-group").removeClass("has-done");
       }else{
           $(field).closest(".form-group").removeClass("has-error");
           $(field).closest(".form-group").addClass("has-done");
       }
        return  isValid;
    }


function checkBeforeSubmit(todo){
	var calle = str_replace(',', ' ', $("#form_street").val());
	$("#form_street").val(calle);
	var nbcities = 0;
	if($("#form_city").val() == ""){
		$("#cp_2").val('');
		nbcities = checkCP(document.getElementById("form_zip"), todo);
		}
	return nbcities;
	}


function checkCP(cp, todo){
	var nb = 0;
	if(zipcodeExp.test(cp.value) && cp.value != $("#cp_2").val()) {
		$.ajax({
			url: "/pf2/geopc/" + cp.value + "/" + country,
			type: "POST",
			async: false,
			dataType: "json",
			complete: function(data){
                data = data.responseJSON;
                if(data == 'NOK') {
                    // $("#form_zip").val('');
                    $("input[id=form_city]").val('');
                    $("input[id=form_province]").val('');
                    }
                else {
					var items = [];
					nb = data.length;
					var province = data[0].PROVINCE;
					var classbg = 'dark';
					var one = "<div style='font-weight: bold; margin-bottom: 10px'>Por favor, confirma tu ciudad:</div>"
					var multi = "<div style='font-weight: bold; margin-bottom: 10px'>Por favor, selecciona tu población:</div>"
					var notlisted = '';
					
					$.each(data, function(key, list){
						classbg = (classbg == 'dark') ? 'clear' : 'dark';
						var box = (nb == 1) ? 'geopc-one' : 'geopc-multi';
						var city = list.City;
						var link = '<span><a class="elegirciudad ' + classbg + '" id="city_' + key + '" onclick="chooseCity(\'' + addslashes(city) + '\', \'' + addslashes(list.PROVINCE) + '\', \''+ todo +'\');">'  + list.City + ' / ' + list.Region2 + '</a>' + "</span>";
						items.push(link);
						
						if (nb == 1) {
                            $("input[id=form_city]").val(city);
							$("input[id=form_province]").val(list.PROVINCE);
							}
						});
					if (nb > 1) {
                        $('#modal-choose-city-body').html(multi + items.join('') + notlisted);
                        $('#modal-choose-city').modal({
                              backdrop: 'static',
                              keyboard: false
                        })
                    }
                }				
            }
        });
    }
	$("#cp_2").val(cp.value);
    //console.log("form.zipcode.js:" + nb);
	return nb;
	}

function chooseCity(ciudad, provincia, todo) {
    //console.log("TODO: " + todo);
    $("input[id=form_city]").val(ciudad);
    $("input[id=form_province]").val(provincia);
    $('#modal-choose-city').modal('hide');
    if(todo == 'sub'){
        submitForm();
    }   
}

function submitForm(){
    $('#submitButton').hide();
    $('#modalSubmit').modal({
          backdrop: 'static',
          keyboard: false
    })
    document.game.submit();
    
}

$(document).ready(function() {

    
    //city modal buttons 
     $("#modal-choose-city button").on("click", function(){
            $("#form_zip").val('');
            $("#cp_2").val('');
            $("input[id=form_city]").val('');
            $("input[id=form_province]").val('');
            $('#modal-choose-city').modal('hide');
        }); 
    
    
    // button gender

        $("label.label_gender").on("click", function(){
            $("label.label_gender").removeClass("active");
            $(this).toggleClass("active");
        });   


    // button submit

        $('#submitButton').click(function(){
            removeErrors();
            stepsValid= checkForErrors($("#btnStep3"), 'c');
            if(stepsValid){
                numberOfCities = checkBeforeSubmit('sub');
                if (numberOfCities <= 1) submitForm(); //if no need of displaying the choose city modal, then submit
            }
         });

               if($("#form_adult_special").is(":checked")){
            $('#form_adult_special').iCheck('check');
        }
        if($("#form_terms").is(":checked")) 
        $('#form_terms').iCheck('check');

        $("label#mayorQue div .iCheck-helper, label#mayorQue").click(function(){
            ($("#form_adult_special").is(":checked")) ? $('#nacimiento').show() : $('#nacimiento').hide();
        });



    // on focus show label

        $("form.noLabel :input, form.noLabel select").focus(function() {
            $("label.control-label[for='" + this.id + "']").addClass("labelFocus");
        })

        .blur(function() {
            $("label.control-label").removeClass("labelFocus");
        })
    });  
