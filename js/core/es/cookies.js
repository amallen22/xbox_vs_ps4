//<![CDATA[
cookieControl({ 
	introText: 'Esta web utiliza \'cookies\' propias y de terceros para ofrecerte una mejor experiencia y servicio. Al navegar o utilizar nuestros servicios, aceptas el uso que hacemos de las \'cookies\'.',
	fullText: 'Puedes obtener m&aacute;s informaci&oacute;n al respecto, incluyendo detalladas instrucciones sobre c&oacute;mo cambiar la configuraci&oacute;n de su navegador en esta materia, <a href="http://test.www.premiosfaciles.com/game/cookies_policy_es.php" target="cp" onClick="showCP()">aqu&iacute; </a>',
	position:'right', // left or right
	shape:'triangle', // triangle or diamond
	theme: 'light', // light or dark
	startOpen:true,
	autoHide:4000,
	subdomains:true,
	protectedCookies: [], //list the cookies you do not want deleted ['analytics', 'twitter']
	consentModel:'information_only',
	onReady:function(){},
	onCookiesAllowed:function(){},
	onCookiesNotAllowed:function(){},
	countries:'' // Or supply a list ['United Kingdom', 'Greece']
	});
//]]>