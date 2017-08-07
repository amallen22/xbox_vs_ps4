$('.body').addClass('vs')
$(document).ready(function () {
  function getJsGradient ($idcanvas) {
    element = document.getElementById($idcanvas)
    if (element != null) {
      $black = '#000'

      if ($idcanvas == 'canvas-xbox') {
        $ultralight = '#5cb922'
        $light = '#01a33e'
        $dark = '#005d23'
      } else {
        $ultralight = '#00cdec'
        $light = '#26cbff'
        $dark = '#054493'
      }

      var granimInstance = new Granim({
        element: '#' + $idcanvas,
        name: 'radial-gradient',
        direction: 'radial',
        opacity: [0, 0.4, 0.6, 0.8],
        stateTransitionSpeed: 1000,
        isPausedWhenNotInView: true,
        states: {
          'default-state': {
            gradients: [
                            [$black, $dark, $light, $ultralight],
                            [$black, $black, $dark, $light]
            ]
          }
        }
      })
    }
  }

  var URLactual = window.location.href
  var parameters = URLactual.split('/')

  var urlReference = parameters[parameters.length - 1].split('.')

  if (urlReference[0]) {
    if (urlReference[0] == 'xbox') {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%' // optional
      })
    } else if (urlReference[0] == 'ps4') {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      })
    }
  }

  getJsGradient('canvas-ps4')
  getJsGradient('canvas-xbox')
})
