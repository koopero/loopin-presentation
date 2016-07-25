const Loopin = require('loopin')
    , loopin = module.exports = Loopin()

loopin.plugin('log')
loopin.plugin('files')

loopin.filesRoot( __dirname )

loopin.plugin('shaderDir')
loopin.shaderDir()

loopin.plugin('imageDir')
loopin.imageDir()

loopin.plugin('presetDir')
loopin.preset('setup')

loopin.patch({ osd: -1 }, 'window')

loopin.plugin('bootstrap', {
  builder: {
    verbose: true,
    cwd: __dirname
  }
})