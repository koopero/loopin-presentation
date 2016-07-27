# Animation
## Making Javascript work for its money.

``` js
const NUM_TENTACLES = 7

for ( var i = 0; i < NUM_TENTACLES; i ++ ) {
  var value = { /* Tentacle setup. */ }
    , path = 'render/tentacles/layer/' + i

  loopin.patch( value, path )
}

loopin.listen('frame', function ( frame ) {
  /* Do animation here. */
  return true
})
```
