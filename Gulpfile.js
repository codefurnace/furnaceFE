var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var notify = require("gulp-notify");

var config = {
    materializeDir: 'bower_components/materialize',
    bowerDir: 'bower_components',
    publicDir: 'public',
    scssDirectory: 'sources/scss/**/*.scss'
};

gulp.task('styles', function() {
    gulp.src(config.scssDirectory)
        .pipe(sass({
            errLogToConsole: true,
            style: 'compressed',
            includePaths: [config.materializeDir + '/sass']
        }))
        .pipe(gulp.dest(config.publicDir+'/assets/css/'))
        .pipe(notify("Scss compiled!"));
});

gulp.task('js', function() {
  gulp.src([
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/materialize/assets/javascripts/bootstrap.js',
  ])
  .pipe(uglify('app.js', {
    compress: true,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(config.publicDir + '/assets/js'))
  .pipe(notify("Javascript Compiled!"));
});

gulp.task('fonts', function() {
    gulp.src(config.materializeDir + '/font/**/*')
    .pipe(gulp.dest(config.publicDir + '/assets/fonts'));
});

gulp.task('watch',function() {
    gulp.watch(config.scssDirectory,['styles']);
    gulp.watch('sources/js/**/*.js',['js']);
});

gulp.task('default', ['styles', 'js', 'fonts']);
