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
				if(data == 'NOK') {
					$("#form_zip").val('');
					$("input[id=form_city]").val('');
					$("input[id=form_province]").val('');
					alert("No existe ninguna ciudad con este codigo postal! Por favor, modificalo.");
					}
				else {
					data = data.responseJSON;
					var items = [];
					nb = data.length;
					var province = data[0].PROVINCE;
					var classbg = 'dark';
					var one = "<div style='font-weight: bold; margin-bottom: 10px'>Por favor, confirma tu ciudad:</div>"
					var multi = "<div style='font-weight: bold; margin-bottom: 10px'>Por favor, elige tu ciudad en la lista debajo:</div>"
					var notlisted = '';
					
					$.each(data, function(key, list){
						classbg = (classbg == 'dark') ? 'clear' : 'dark';
						var box = (nb == 1) ? 'geopc-one' : 'geopc-multi';
						var city = list.City;
						var link = '<a class="elegirciudad ' + classbg + '" id="city_' + key + '" onclick="chooseCity(\'' + addslashes(city) + '\', \'' + addslashes(list.PROVINCE) + '\', \''+ todo +'\'); $(\'#' + box + '\').dialog( \'close\' )">'  + list.City + ' / ' + list.Region2 + '</a>' + "\n";
						items.push(link);
						
						if (nb == 1) {
							$("input[id=form_city]").val(city);
							$("input[id=form_province]").val(list.PROVINCE);
							}
						});
					if (nb > 1) {
						$("#geopc-multi").html(multi + items.join('') + notlisted).dialog({
							resizable: false,
							modal: true,
							width: 400,
							buttons: {
								"Modificar": function() {
									$("#form_zip").val('');
									$("#cp_2").val('');
									$("input[id=form_city]").val('');
									$("input[id=form_province]").val('');
									$( this ).dialog( "close" );
									}
								}
							});
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
	if(todo == 'sub'){
		//$("#submitButton").hide();
		$("#form-loading").dialog({
			modal: true,
			});
		document.game.submit();
		}
	}