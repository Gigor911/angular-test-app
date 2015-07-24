// Gulp include =================================================
var gulp = require('gulp');

// Gulp modules =================================================
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 20 versions", "> 0.5%"] });
var sourcemaps = require('gulp-sourcemaps');

// Gulp tasks =================================================
// Gulp concat for angular =================================================
gulp.task('scripts', function () {
    return gulp.src('./app/scripts/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./app/'));
});

// Gulp less =================================================
gulp.task('styles', function () {
    return gulp.src('./app/assets/less/style.less')
        .pipe(less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(sourcemaps.write())
        .pipe(plumber());
});

// Gulp watch =================================================
gulp.task('watch', function () {
    gulp.watch(['./app/assets/**/*.less'], ['styles']);
    gulp.watch(['./app/scripts/**/*.js'], ['scripts']);
});