# Uniforms
## Talking to shaders.

``` glsl
// GLSL uniform declarations

// shader/reflect.frag
uniform float waterline = 0.9;

// shader/tentacle.frag
uniform float hue;
```

``` yaml
# High Water
render:
  pondcreature:
    layer:
      critter:
        float:
          waterline: 0.8
```

``` yaml
# Low Water
render:
  pondcreature:
    layer:
      critter:
        float:
          waterline: 0.9
```

``` yaml
# Turn the middle tentacle blue
render:
  tentacles:
    layer:
      3:
        float:
          hue: 0.7
```

``` yaml
# Turn the middle tentacle orange
render:
  tentacles:
    layer:
      3:
        float:
          hue: 0.1
```
