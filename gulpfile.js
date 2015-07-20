/*global -$ */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var scripts = [
  'src/version.js',
  'src/colors.js',
  'src/dataOps.js',
  'src/chart.js',
  'src/webtable.js'
];

var wcWrapper = '(function (root, factory) {  if(typeof define === "function" && define.amd) {    define(["d3"], factory);  } else if(typeof module === "object" && module.exports) {    module.exports = factory(require("d3"));  } else {    root.webCharts = factory(root.d3);  }}(this, function(d3){<%= contents %>\n return webCharts; }));';

var dcWrapper = '(function (root, factory) { if(typeof define === "function" && define.amd) { define(["webCharts"], factory); } else if(typeof module === "object" && module.exports) {module.exports = factory(require("webCharts")); } else { root.dataControls = factory(root.webCharts); } }(this, function(webCharts){<%= contents %>\n return dataControls; }));';

gulp.task('wrapper', ['chart-bundle', 'data-ops-wrap'], function() {
  return gulp.src(scripts)
    .pipe($.concat('webcharts.js'))
    .pipe($.wrap(wcWrapper))
    // .pipe($.defineModule('hybrid', {require: {d3: 'd3'}} ))
    // .pipe($.babel())
    .pipe(gulp.dest('build'));
});

gulp.task('dc-wrapper', ['controls-bundle'], function() {
  return gulp.src(['src/dc-version.js', 'src/controls.js'])
    // .pipe($.sourcemaps.init())
    .pipe($.concat('datacontrols.js'))
    // .pipe($.sourcemaps.write('/maps'))
    .pipe($.wrap(dcWrapper))
    // .pipe($.babel())
    .pipe(gulp.dest('build'));
});

gulp.task('data-ops-wrap', function() {
  return gulp.src('src/dataOps/*.js')
    .pipe($.concat('dataOps.js', {newLine: ','}))
    .pipe($.wrap('webCharts.dataOps = {<%= contents %>}'))
    .pipe(gulp.dest('src'));
});

gulp.task('chart-bundle', function(){
  return gulp.src(['src/chart/main.js', 'src/chart/*.js'])
    .pipe($.concat('chart.js'))
    .pipe(gulp.dest('src')) ;
});

gulp.task('controls-bundle', function(){
  return gulp.src(['src/datacontrols/main.js', 'src/datacontrols/*.js'])
    .pipe($.sourcemaps.init())
    .pipe($.concat('controls.js'))
    .pipe($.sourcemaps.write('/maps'))
    .pipe(gulp.dest('src')) ;
});

gulp.task('watch', function(){
  // gulp.watch(scripts, ['wrapper']);
  gulp.watch('src/chart/*', ['wrapper']);
  gulp.watch(['src/dc-version.js', 'src/datacontrols.js', 'src/datacontrols/*'], ['dc-wrapper']);
});
