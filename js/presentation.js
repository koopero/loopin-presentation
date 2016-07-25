
const slides = slidesInit()
console.log( slides.names )


slides.set(window.location.hash.substr(1))

$(function () {
  $(window).on( 'keydown', function( e ) {
    switch(e.which) {
        case 37: // left
        case 38: // up
          slides.prev()
        break

        case 39: // right
        case 40: // down
          slides.next()
        break;

        default: return // exit this handler for other keys
    }
    e.preventDefault()
  })
})

function slidesInit() {
  const self = {}

  self.set = slideSet

  self.next = function () {
    slideSet( self.cur + 1 )
  }

  self.prev = function () {
    slideSet( self.cur - 1 )
  }

  gather()

  return self

  function gather() {
    var $slides = $('#slides section')

    self.cur = -1
    self.names = []
    self.slides = []

    $slides.each( function () {
      var $this = $(this)
      $this.hide()
      self.slides.push( $this )
      self.names.push( $this.attr('id') )
    })
  }

  function slideSet( id ) {
    var $slide
    if ( 'string' == typeof id ) {
      id = self.names.indexOf( id )
    }

    id = parseInt( id ) || 0

    if ( id < 0 )
      id += self.slides.length

    if ( id >= self.slides.length )
      id = 0

    $slide = self.slides[id]

    if ( self.$cur ) {
      self.$cur.hide()
    }

    self.cur = id
    self.$cur = $slide
    window.location.hash = self.names[id]
    slide( $slide )

    if ( self.$cur ) {
      self.$cur.show()
    }
  }
}

function slide( $slide ) {
  var windowHeight = $(window).height()
    , slideHeight = $slide.height()

  $slide.css( 'top', ( windowHeight - slideHeight ) / 2 )

  var $script = $slide.find('script[type="application/x-loopin-yaml"]')
  if ( $script.length ) {
    var source = $script.text()
      , data = jsyaml.load( source )

    loopinPatch( data )
  }
}

function loopinPatch( value, path ) {
  path = path || ''

  var url = '/loopin/patch/'+path

  $.ajax( url, {
    method: 'POST',
    data: JSON.stringify( value ),
    contentType: "application/json",
    dataType: 'json'
  })
}
