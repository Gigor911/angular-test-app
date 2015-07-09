// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('styles', function () {
    return gulp.src('./app/assets/less/style.less')
        .pipe(less())
        .pipe(plumber())
        .pipe(autoprefixer('last 10 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./app/assets/css'));
});
gulp.task('watch', function () {
    gulp.watch(['./app/assets/**/*.less'], ['styles']);
});