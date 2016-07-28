# Meshes
## Food for vertex shaders.
``` yaml
# Use a different shader to show mesh cells
shader:
  tentacle:
    vert: shader/cells.vert
    frag: shader/cells.frag

show:
  pondcreature
```

``` yaml
# Low resolution mesh
mesh:
  tentacle:
    grid:
      cols: 1
      rows: 4
      split: true
```

``` yaml
# High resolution mesh
mesh:
  tentacle:
    grid:
      cols: 4
      rows: 24
      split: true
```


``` yaml
# Direct mesh editing
mesh:
  tentacle:
    vertex:
      0: [ -2.5, -1]
      1: { y: -1.8 }  
```
