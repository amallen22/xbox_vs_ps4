$(document).ready(function() {
	$("#reg-form").validate({
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);
			//$(element.form).find("label[for=" + element.id + "]").addClass(errorClass);
			},
		unhighlight: function(element, errorClass, validClass) {
			if (this.numberOfInvalids() == 0) {
				$("#error-placeholder").hide();
				}
			$(element).removeClass(errorClass).addClass(validClass);
			//$(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
			},
		errorElement: "li",
		errorLabelContainer: $(".error-list"),
		errorClass: "error",
		rules: {
			form_gender: { required: true },
			form_firstname: { required: true },
			form_lastname: { required: true },
			form_email: { required: true, email: true },
			form_mobile: { required: true, number: true },
			form_zip: { required: true, number: true },
			form_street: { required: true },
			form_number: { required: true },
			form_adult: { required: true },
			form_birth_day: { required: true },
			form_birth_month: { required: true },
			form_birth_year: { required: true },
			form_nationality: { required: true },
			form_terms: { required: true }
			},
		messages: {
			form_gender: "Tratamiento",
			form_firstname: "Nombre",
			form_lastname: "Apellidos",
			form_email: "E-mail",
			form_mobile: "Móvil",
			form_zip: "C. Postal",
			form_street: "Dirección",
			form_number: "Número",
			form_adult: "Declara ser mayor de 18 años",
			form_birth_day: "Día de nacimiento",
			form_birth_month: "Mes de nacimiento",
			form_birth_year: "Año de nacimiento",
			form_nationality: "Nacionalidad",
			form_terms: "Aceptar las Condiciones de Uso"
			},
		invalidHandler: function(form, validator) {
			$("#error-placeholder").show();
			$('html, body').animate({
				scrollTop: $("#title-form").offset().top
				}, 1000);
        	},
		submitHandler: function(form) {
			var nbcities = checkBeforeSubmit('sub');
			//console.log("form.validate.js: " + nbcities);
			if(nbcities > 1)
				return false;
			$("#submitButton").hide();
			$("#form-loading").dialog({
				modal: true,
				});
			form.submit();
			}
		});
	});