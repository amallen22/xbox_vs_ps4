$(function(){
	$('#form_firstname').keyup(function(){
		var start = this.selectionStart,
        end = this.selectionEnd;
		$('#form_firstname').val(ucwords(strtolower($('#form_firstname').val())));
		this.setSelectionRange(start, end);
		});
	$('#form_lastname').keyup(function(){
		var start = this.selectionStart,
        end = this.selectionEnd;
		$('#form_lastname').val(ucwords(strtolower($('#form_lastname').val())));
		this.setSelectionRange(start, end);
		});
	/*
	$('#form_email').keyup(function(){
		var start = this.selectionStart,
        end = this.selectionEnd;
		$('#form_email').val(strtolower($('#form_email').val()));
		this.setSelectionRange(start, end);
		});*/
	$('#form_adult').click(function() {
	    $("#nacimiento").toggle(this.checked);
	});
	if($('#form_adult').is(':checked')){
		$("#nacimiento").show();
		}
	$("#subform").click(function() {
		$("#regform").submit();
		});
	$(".item").click(function(){
		$('html, body').animate({
			scrollTop: $("#title-form").offset().top
			}, 1000);
		});
	});

function strtolower(str) {
	return (str + '').toLowerCase();
	}

function ucwords(str) {
	return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
		return $1.toUpperCase();
    	});
	}

function str_replace(search, replace, subject, count) {
	var i = 0,
	j = 0,
	temp = '',
	repl = '',
	sl = 0,
	fl = 0,
	f = [].concat(search),
	r = [].concat(replace),
	s = subject,
	ra = Object.prototype.toString.call(r) === '[object Array]',
	sa = Object.prototype.toString.call(s) === '[object Array]';
	s = [].concat(s);
	if (count) {
		this.window[count] = 0;
		}
	for (i = 0, sl = s.length; i < sl; i++) {
		if (s[i] === '') {
			continue;
			}
		for (j = 0, fl = f.length; j < fl; j++) {
			temp = s[i] + '';
			repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
			s[i] = (temp)
			.split(f[j])
			.join(repl);
			if (count && s[i] !== temp) {
				this.window[count] += (temp.length - s[i].length) / f[j].length;
				}
			}
		}
	return sa ? s : s[0];
	}

function addslashes(str) {
	return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
	}