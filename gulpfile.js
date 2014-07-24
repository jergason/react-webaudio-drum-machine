var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var path = require('path');


gulp.task('build', function() {
var bundler = browserify('./scripts/app.js', {basedir: __dirname});
  bundler.transform(reactify);
  var stream = bundler.bundle();
  return stream
    .pipe(source('bundle.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./scripts/**', ['build']);
});


gulp.task('default', ['build', 'watch']);
