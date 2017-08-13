var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var scripts = [
  'client_js/lib/jquery-3.2.1.min.js',
  'client_js/lib/underscore-min.js',
  'client_js/lib/backbone-min.js',
  'client_js/backbone_views.js'
];
gulp.task('scripts', function() {
  gulp.src(scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public'));
});


var stylesheets = ['scss/*.scss'];
gulp.task('stylesheets', function () {
  gulp.src('scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: 'last 20 versions'}))
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
  gulp.watch(scripts, ['scripts']);
  gulp.watch(stylesheets, ['stylesheets'])
});

gulp.task('default', ['scripts', 'stylesheets']);