# Loopin
## The best of all worlds... And more.





# ofxLoopin

* A video virtual device.
* Does as many things as need doing, as simply as possible.
* Makes default behaviours as easy as possible.
* Everything is controllable with the same function: `patch( value, key )`
* Almost everything is a **Buffer**.
* Nested layering through `render` subdevice.
* The state can be read using `read( path )`.
* Sends **Events** as JSON.
* Remote control of OS and hardware ( fullscreen ).


# Buffers

* Automatic double buffering on demand. Sweet feedback effect.
* Defines rendering resolution.
* Can be used as a texture *anywhere*.
* Output to jpeg or png.

``` yaml
buffer:
  # Everything rendered to 'SNES' will be pleasantly pixelated.
  SNES:
    width: 320
    height: 252

# The `show` sub-device sets the buffer that is shown on screen.
show: SNES
```

# Layers

* Arbitrary number of textures, referencing **Buffers**, with control over cropping and tiling. This can include the **Buffer** currently being drawn.
* Reference to one **Shader**.
* Can include a **Model**, or default to a billboard.
* Control over all shader parameters ( uniforms ).
* Multi-pass rendering of complicated shaders.
* Can be nested.

## Example
``` yaml
render:
  example:
    # Everthing outside layer is rendered first.
    src: background

    layer:
      # Note that due to implementation details,
      # layers will be rendered alphabetically.
      a:
        src: midground
        blend: over

      b:
        src: foreground
        blend: add
```


# Shaders

* Are referenced by `layers`.
* Can include controllable default uniforms.

## Example

``` yaml
shader:
  dazzle:
    # Load the shader from two GLSL files.
    vert: shader/dazzle.vert
    frag: shader/dazzle.frag

    float:
      # Custom uniform 'amount' shader value.  
      amount: 0.4

render:
  example:
    shader: dazzle
    float:

```

# IO

* Windowed
* Fullscreen
* PNG / JPEG async read/write.
* Video ( ofVideo )
* Kinect 1 ( ofxKinect )

## Example
``` yaml
# Sets the device to fullscreen mode.
window:
  fullscreen: true


# Opens default kinect and writes to 'kinectBuffer' buffer,  
kinect:
  kinectBuffer: true


# Reads the file 'image/stars.png' into the `foreground` buffer.
image:
  foreground: image/stars.png


# Saves the buffer 'example' to a file called `output.png`
save:
  example:
    dest: output.png
    format: png


# Loads a video and skips to one minute in.
video:
  videoBuffer:
    playing: true
    src: video/exampleVideo.mov
    playhead: 60
```

# Bonus Architectures
* One node.js application can control *many* independent screens.
* Dumb devices like Raspberry Pi & iOS can be controlled remotely.
* OSC can be used for realtime control over specific parameters.
