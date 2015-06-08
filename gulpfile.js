/*global -$ */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');
var smash = require('smash');

var scripts = [
  'src/version.js',
  'src/colors.js',
  'src/dataOps.js',
  'src/chart.js',
  'src/webtable.js'
];

var wrapper = '(function (root, factory) {  if(typeof define === "function" && define.amd) {    define(["d3"], factory);  } else if(typeof module === "object" && module.exports) {    module.exports = factory(require("d3"));  } else {    root.webCharts = factory(root.d3);  }}(this, function(d3){<%= contents %> return webCharts; }));';

gulp.task('wrapper', ['chart-bundle', 'data-ops-wrap'], function() {
  return gulp.src(scripts)
    .pipe($.concat('webcharts.js'))
    .pipe($.wrap(wrapper))
    // .pipe($.defineModule('hybrid', {require: {d3: 'd3'}} ))
    .pipe(gulp.dest('build'));
});

gulp.task('data-ops-wrap', function() {
  return gulp.src('src/dataOps/*.js')
    .pipe($.concat('dataOps.js', {newLine: ','}))
    .pipe($.wrap('webCharts.dataOps = {<%= contents %>}'))
    .pipe(gulp.dest('src'));
});

gulp.task('test-wrap', $.folders('src', function(folder) {

  return gulp.src(path.join('src', folder, '*.js'))
    .pipe($.concat(folder + '.js', {newLine: ','}))
    .pipe($.wrap(folder+' = {<%= contents %>}'))
    .pipe(gulp.dest('build'))
}));

gulp.task('chart-bundle', function(){
  return gulp.src(['src/chart/main.js', 'src/chart/*.js'])
    .pipe($.concat('chart.js'))
    .pipe(gulp.dest('src')) ;
});

gulp.task('watch', function(){
  gulp.watch('src/**/*', ['wrapper']);
});
