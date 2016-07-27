const RUN_LOCAL = false

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
loopin.preset('pondcreature')


loopin.patch({ osd: -1 }, 'window')


var sshConfig
try {
  sshConfig = require('./sshConfig.json')
} catch ( e ) {
  sshConfig = null
}

if ( !RUN_LOCAL && sshConfig )
  loopin.plugin( require('loopin-ssh'), sshConfig )
else
  loopin.plugin('bootstrap', {})
