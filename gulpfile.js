const gulp = require('gulp')

const reload = require('gulp-livereload')

gulp.task('default', ['build','server','watch'] )
gulp.task('build', ['less'] )

gulp.task('server', function () {
  const app = require('./express/app.js')
  // reload.listen()
} )

gulp.task('bower', function () {
  return require('gulp-bower')()
})

gulp.task('less', function () {
  gulp.src('./less/page.less')
  .pipe(require('gulp-less-sourcemap')({
    sourceMap: {
      sourceMapRootpath: '../less' // Optional absolute or relative path to your LESS files
    }
  }))
  .pipe(gulp.dest('./css/'))
  .pipe(reload())
})

gulp.task('reload', function () {
  reload.reload()
})

gulp.task('watch', function () {
  reload.listen()
  gulp.watch(['less/*.less'], ['less'] )
  gulp.watch(['md/*'], ['reload'] )
})
