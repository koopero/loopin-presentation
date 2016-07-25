module.exports = function ( loopin ) {
  const SimplexNoise = require('simplex-noise')
      , simplex = new SimplexNoise()

  const tentacle = {
    src: 'tentacle',
    blend: 'alpha',
    shader: 'tentacle',
    mesh: 'tentacle',
    transform: {
      mode: 'contain',
      y: 0.1,
      aspect: 0.2,
      scale: 0.8
    }
  }

  const NUM_TENTACLES = 7
      , TENTACLE_SPEED = 0.3

  for ( var i = 0; i < NUM_TENTACLES; i ++ ) {
    var x = ( i / (NUM_TENTACLES-1) * 2 - 1 ) * 0.8

    loopin.patch( tentacle, 'render/tentacles/layer/'+i )
    loopin.patch( x, 'render/tentacles/layer/'+i+'/transform/x' )
    loopin.patch( {
      hue: Math.random() * 0.3,
      phase: Math.random(),
    }, 'render/tentacles/layer/'+i+'/float' )


  }

  loopin.listen('frame', function ( frame ) {
    frame = frame.data
    for ( var i = 0; i < NUM_TENTACLES; i ++ ) {
      var x = ( i / (NUM_TENTACLES-1) * 2 - 1 )
      var transform = {}
      transform.rotate = simplex.noise2D( i * 654.234, frame.time * 0.2 ) * 15 + x * 50
      transform.x = Math.sin( transform.rotate / 180 * Math.PI ) * 0.2 + x * 0.3
      transform.y = 1.2 + simplex.noise2D( i , 320+ frame.time * TENTACLE_SPEED ) * 0.14 - Math.cos( transform.rotate / 180 * Math.PI )
      loopin.patch( transform, 'render/tentacles/layer/'+i+'/transform/' )
    }
    return true
  })
}
