// Include gulp
var gulp = require('gulp');

// Include Our Plugins
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

gulp.task('scripts', function () {
    return gulp.src('./app/assets/angular-source/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./app/'));
});
gulp.task('styles', function () {
    return gulp.src('./app/assets/less/style.less')
        .pipe(less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(sourcemaps.write())
        .pipe(plumber());
});
gulp.task('watch', function () {
    gulp.watch(['./app/assets/**/*.less'], ['styles']);
    gulp.watch(['./app/assets/angular-source/**/*.js'], ['scripts']);
});