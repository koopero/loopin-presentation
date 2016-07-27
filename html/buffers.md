# Buffers
## Pushing pixels from input to output.

``` yaml
# Show the pond background
show: pond
```

``` yaml
# Show the water mask
show: water
```

``` yaml
# Show the tentacles
show: tentacles
```



``` yaml
# Change render resolution.
buffer:
  tentacles:
    width: 160
    height: 90

show: pondcreature
```

``` yaml
# Load a different tentacle
image:
  tentacle: image/finger.png
```

``` yaml
# Load a different pond
image:
  pond: image/otherpond.png
```


``` yaml
# Back to HD
buffer:
  tentacles:
    width: 1920
    height: 1080
  pondcreature:
    width: 1920
    height: 1080

show: pondcreature
```

``` yaml
# Default images
image:
  tentacle: image/tentacle.png
  pond: image/pond.jpg
