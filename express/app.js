const pathlib = require('path')

const pug = require('pug')

const express = require('express')
    , app = module.exports.app = exports.app = express()


const loopin = require('../loopin')
    , loopinServer = loopin.plugin( require('loopin-server'), { port: 0 } )

require('../loopin/pondcreature')( loopin )

const content = require('./content')

app.engine('pug', pug.__express )

app.set('views', pathlib.resolve( __dirname, '..', 'pug' ))
app.set('view engine', 'pug');

app.use(require('connect-livereload')())


app.get('/', function ( req, res ) {
  content.sections()
  .then( function ( sections ) {
    res.render('index', { sections: sections } )
  })
})

app.use('/loopin', loopinServer.app )

app.use( express.static( pathlib.resolve(__dirname, '..')))


app.listen(7004)
