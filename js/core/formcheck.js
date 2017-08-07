function showDS() {
	dsinfo=window.open('','ds','width=800,height=600,status=0,location=0,directories=0,toolbar=0,scrollbars=yes');
	dsinfo.focus();
	}

function showTB() {
	width=600;height=600;
	tbinfo=window.open('','tb','width='+width+',height='+height+',status=0,location=0,directories=0,toolbar=0,scrollbars=yes');
	tbinfo.focus();
	}

function checkFormPT(){
	var regPLZ = /^\d{4}([-])\d{3}$/;
	var regPhone = /^\d{9}?$/;
	
	gform=document.forms["game"];
	errm='';
	if(gform.UD_ANREDE.value == '') errm += "N�o preencheu o campo: Tratamento";
	if(gform.UD_VORNAME.value=='') errm += "N�o preencheu o campo: Nome\n";
	if(gform.UD_NACHNAME.value=='') errm += "N�o preencheu o campo: Apelido\n";
	if(gform.UD_EMAIL.value =='') errm += "N�o preencheu o campo: Email\n";
	
	if(gform.UD_ORT.value=='') errm += "O C�digo Postal n�o � valido!";//"N�o preencheu o campo: Localidade\n";
	
	if(gform.UD_PLZ.value.length > 8 || gform.UD_PLZ.value.length < 8 || !regPLZ.test(gform.UD_PLZ.value)) errm += 'O c�digo postal deve ser composto de 4+3 algarismos\n';
	
	if(gform.UD_TELEFON.value.length > 9 || gform.UD_TELEFON.value.length < 9 || !regPhone.test(gform.UD_TELEFON.value) ) errm += 'O N� de telefone deve ter 9 algarismos\n';
	
	if(gform.geb_year == '' && gform.geb_month == '' && gform.geb_day == '') errm += 'Por favor preencha a Data de Nascimento';
	
	if(gform.adult && gform.adult.checked==false){
		errm+='Por favor, declare ser maior de 18 anos!\n';
		}
		
	if (errm != '') {
		alert(errm);
		return false;
	}
	
	if(gform.teilnbed && gform.teilnbed.checked==false) {
		confirm('Por favor aceite as condic�es de participa��o!');
		return false;
	}

	if(document.forms["game"].UD_TELOPTIN && document.forms["game"].UD_TELOPTIN.checked==false) {
		if(confirm('Por favor aceite a pol�tica de privacidade!')==true) {
			document.forms["game"].UD_TELOPTIN.checked=true;
			return false;
		} else {
			return false;
		}
	}
	return true;
}

function checkForm() {
	gform=document.forms["game"];
	errm='';
	// adult?
	if(gform.adult && gform.adult.checked==false){
		errm+='�Por favor, declara ser mayor de 18 a�os!\n';
		}
	if(gform.UD_VORNAME.value=='') errm += "No has rellenado el campo: Nombre\n";
	if(gform.UD_NACHNAME.value=='') errm += "No has rellenado el campo: Apellidos\n";
	if(gform.UD_STRASSE.value=='') errm += "No has rellenado el campo: Calle\n";
	//if(gform.UD_ORT.value=='') errm += "No has rellenado el campo: Poblaci�n\n";
	if(gform.UD_STRASSENTYP.value == '-') errm += '�Escoge el tipo de calle!\n';
	if(gform.UD_PLZ.value.length != 5) errm += '�El c�digo postal no es v�lido!\n';
	if (errm != '') {
		alert(errm);
		return false;
	}
	if(gform.teilnbed && gform.teilnbed.checked==false) {
		alert('�Por favor acepta las condiciones de participaci�n!');
		return false;
		/*if(confirm('�Por favor acepta las condiciones de participaci�n!')==true) {
			gform.teilnbed.checked=true;
			return false;
		} else {
			return false;
		} */
	}

	if(document.forms["game"].UD_TELOPTIN && document.forms["game"].UD_TELOPTIN.checked==false) {
		if(confirm('�Por favor acepta la pol�tica de privacidad!')==true) {
			document.forms["game"].UD_TELOPTIN.checked=true;
			return false;
		} else {
			return false;
		}
	}
	return true;
}

function checkCoregs() {
  regform = document.forms['coregform'];
  var len = regform.elements["CK_IDS[]"].length;
  if(!document.forms['coregform'].elements["CK_IDS[]"][0][0]) {
      // only one coreg shown
      if(regform.elements["CK_IDS[]"].selectedIndex == 0) {
        alert('�Por favor, marca todas las ofertas con s� o no!');
        return false;         
      }
  }
  else {
    for(i=0; i<len; i++) {
      // alle select smuessen explizit au fsi oder no gesetzt werden  
      if(regform.elements["CK_IDS[]"][i].selectedIndex == 0) {
        alert('�Por favor, marca todas las ofertas con s� o no!');
        return false;
        }
      }
    }
    return true;
}

function goBack(){
	document.forms["game"].todo.value="";
	document.forms["game"].submit();
	}