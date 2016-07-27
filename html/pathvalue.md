# Value / Path
## Operatives and data are the same thing.

``` yaml
# YAML Object
image:
  foobar:
    src: image/space.jpg

show: foobar
```

```
# List of key/value pairs.
image/foobar/src/     = 'image/space.jpg'
show/                 = 'foobar'
```

``` yaml
image:
  foobar: image/jeb.jpg
```

```
image/foobar/    = 'image/jeb.jpg'
```
