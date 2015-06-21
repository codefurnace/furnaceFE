var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');

var config = {
    bootstrapDir: 'bower_components/bootstrap-sass',
    bowerDir: 'bower_components',
    publicDir: 'public',
    scssDirectory: 'sources/scss/**/*.scss'
};

gulp.task('styles', function() {
    gulp.src(config.scssDirectory)
        .pipe(sass({
            errLogToConsole: true,
            style: 'compressed',
            includePaths: [config.bootstrapDir + '/assets/stylesheets']
        }))
        .pipe(gulp.dest(config.publicDir+'/assets/css/'));
});

gulp.task('js', function() {
  gulp.src([
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
  ])
  .pipe(uglify('app.js', {
    compress: true,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(config.publicDir + '/assets/js'));
});

gulp.task('fonts', function() {
    gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/assets/fonts'));
});

gulp.task('watch',function() {
    gulp.watch(config.scssDirectory,['styles']);
    gulp.watch('sources/js/**/*.js',['js']);
});

gulp.task('default', ['styles', 'js', 'fonts']);
