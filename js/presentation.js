hljs.initHighlightingOnLoad()

const slides = slidesInit()


slides.set(window.location.hash.substr(1))
doRead()

$(function () {
  $(window).on( 'keydown', function( e ) {
    switch(e.which) {

        case 40: // down
          $('#read-wrapper').hide()
        break

        case 38: // up
          doRead()
        break

        case 37: // left

          slides.prev()
        break

        case 39: // right

          slides.next()
        break;

        default: return // exit this handler for other keys
    }
    e.preventDefault()
  })

  $('section').each( function () {
    var $this = $(this)
      , $codes = $('<div class="codes grid"></div>')

    $this.append($codes)
    $this.find('pre')
      .appendTo($codes)
      .addClass('grid-item')
  })

  $('code.lang-yaml')
  .addClass('runnable')
  .on('click', function () {
    var $code = $(this)
      , source = $code.text()

    loopinPatch( source )
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

  // $slide.find('.grid').masonry('layout')

  var $script = $slide.find('script[type="application/x-loopin-yaml"]')
  if ( $script.length ) {
    var source = $script.text()

    loopinPatch( source )
  }
}

function loopinPatch( value, path ) {
  if ( 'string' == typeof value )
    value = jsyaml.load( value )

  path = path || ''

  var url = '/loopin/patch/'+path

  $.ajax( url, {
    method: 'POST',
    data: JSON.stringify( value ),
    contentType: "application/json",
    dataType: 'json'
  })
}


function doRead() {
  var url = '/loopin/read/'
  $.getJSON( url, function ( data ) {
    data = jsyaml.dump( data )
    $('#read-wrapper').html('<pre><code class="lang-yaml">'+data+"</code></pre>").show()

    $('#read-wrapper code').each(function(i, block) {
      hljs.highlightBlock(block);
    })

    console.log( data )
  })
}
