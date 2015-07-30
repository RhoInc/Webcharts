/*global -$ */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');

var scripts = [
  'src/version.js',
  'src/colors.js',
  'src/dataOps.js',
  'src/chart.js',
  'src/controls.js'
];

var buildScripts = [
  'src/version.js',
  'src/multiply.js',
  'src/dataOps/dataOpsMain.js',
  'src/dataOps/*',
  'src/chart/main.js',
  'src/chart/*',
  'src/controls/controlMain.js',
  'src/controls/*',
  'src/table/tableMain.js',
  'src/table/*',
  'src/prototypes.js'
];

var wcWrapper = '(function (root, factory) {  if(typeof define === "function" && define.amd) {    define(["d3"], factory);  } else if(typeof module === "object" && module.exports) {    module.exports = factory(require("d3"));  } else {    root.webCharts = factory(root.d3);  }}(this, function(d3){\n<%= contents %>\n return webCharts; }));';

gulp.task('build', function() {
  return gulp.src(buildScripts)
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      modules: 'ignore'
    }))
    .pipe($.concat('webcharts.js'))
    .pipe($.wrap(wcWrapper))
    .pipe($.sourcemaps.write('../maps'))
    // .pipe($.uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('minify', function(){
  return gulp.src('build/webcharts.js')
    .pipe($.rename('webcharts.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('wrapper', ['chart-bundle', 'controls-bundle', 'dataops-bundle'], function() {
  return gulp.src(scripts)
    .pipe($.sourcemaps.init())
    .pipe($.concat('webcharts.js'))
    .pipe($.wrap(wcWrapper))
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest('build'));
});

gulp.task('dataops-bundle', function() {
  return gulp.src(['src/dataOps/main.js','src/dataOps/*.js'])
    // .pipe($.sourcemaps.init())
    .pipe($.concat('dataOps.js'))
    // .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest('src'));
});

gulp.task('chart-bundle', function(){
  return gulp.src(['src/chart/main.js', 'src/chart/*.js'])
    // .pipe($.sourcemaps.init())
    .pipe($.babel({
      modules: 'ignore'
    }))
    .pipe($.concat('chart.js'))
    // .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest('src')) ;
});

gulp.task('controls-bundle', function(){
  return gulp.src(['src/controls/main.js', 'src/controls/*.js'])
    // .pipe($.sourcemaps.init())
    .pipe($.babel({
      modules: 'ignore'
    }))
    .pipe($.concat('controls.js'))
    // .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest('src')) ;
});

gulp.task('watch', function(){
  // gulp.watch(scripts, ['wrapper']);
  gulp.watch('src/chart/*', ['wrapper']);
  gulp.watch('src/controls/*', ['wrapper']);
  // gulp.watch(['src/dc-version.js', 'src/controls.js', 'src/controls/*'], ['dc-wrapper']);
});
