var gulp = require('gulp');

var scripts = [
  'public/javascripts/lib/jquery-3.2.1.min.js',
  'public/javascripts/lib/underscore-min.js',
  'public/javascripts/lib/backbone-min.js',
  'public/javascripts/backbone_views.js'
];
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('scripts', function() {
  gulp.src(scripts)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'));
});


var stylesheets = [
  'public/stylesheets/style.scss'
];
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('stylesheets', function () {
  gulp.src(stylesheets)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: 'last 5 versions'}))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(rename('style.min.css'));
});

gulp.task('watch', function () {
  gulp.watch(scripts, ['scripts']);
  gulp.watch(stylesheets, ['stylesheets'])
});
