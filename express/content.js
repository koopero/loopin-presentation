const Promise = require('bluebird-extra')
    , pathlib = require('path')
    , fs = Promise.promisifyAll( require('fs') )
    , markedOrig = require('marked')
    , marked = Promise.promisify( markedOrig )

const sections = [
  'platforms',
  'javascript',
  'cplusplus',
  'quartz',
  'architecture',
]

exports.sections = function ( key ) {
  const result = {}
  return Promise.resolve( sections )
  .mapSeries( function ( section ) {
    return loadEither( section )
    .then( function ( sectionContent ) {
      result[section] = sectionContent
    })
  })
  .then( function () {
    return result
  })
}

function loadEither( section ) {
  const mdPath = pathlib.resolve( __dirname, '..', 'md', section+'.md')
      , htmlPath = pathlib.resolve( __dirname, '..', 'md', section+'.html')

  return fileExists( htmlPath )
  .then( function ( htmlExists ) {
    return htmlExists ? loadHTML( htmlPath ) : loadMarkdown( mdPath )
  })
}

function loadMarkdown( path ) {
  return fs.readFileAsync( path, 'utf8' )
  .then( marked )
}

function loadHTML( path ) {
  return fs.readFileAsync( path, 'utf8' )
}

function fileExists( path ) {
  return new Promise( function ( resolve ) {
    fs.exists( path, function ( exists ) {
      resolve( exists )
    })
  })
}
