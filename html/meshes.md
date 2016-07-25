# Meshes

``` yaml
# Change the resolution of the mesh
mesh:
  tentacle:
    grid:
      cols: 1
      rows: 4
      split: true
```

``` yaml
# Change the resolution of the mesh
mesh:
  tentacle:
    grid:
      cols: 2
      rows: 8
      split: false
```


``` yaml
# Use a different shader to show cells

shader:
  tentacle:
    vert: shader/cells.vert
    frag: shader/cells.frag

show:
  pondcreature
```
