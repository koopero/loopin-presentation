# Layers
## Building a scene.

``` yaml
# The Pond Creature
render:
  pondcreature:
    src: pond
    blend: alpha
    shader: ripple
    tex:
      water: water

    layer:
      critter:
        blend: alpha
        src: tentacles
        shader: reflect

show: pondcreature
```

``` yaml
# One Tentacle
render:
  onetentacle:
    layer:
      0:
        src: tentacle
        blend: alpha
        shader: tentacle
        mesh: tentacle
        transform:
          mode: contain
          x: 0
          y: 0.1
          aspect: 0.2
          scale: 0.8
          rotate: 0

  pondcreature: { layer: { critter: { src: onetentacle }}}
```

``` yaml
# Set transform parameters
render: { onetentacle: { layer: { 0: { transform: { x: 0.5, aspect: 0.2, rotate: -10 }}}}}
```

``` yaml
# Set transform parameters
render: { onetentacle: { layer: { 0: { transform: { x: -0.5, aspect: 1 }}}}}
```
