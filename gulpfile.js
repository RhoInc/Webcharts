/*global -$ */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

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

var wcWrapper = '(function (root, factory) {  if(typeof define === "function" && define.amd) {    define(["d3"], factory);  } else if(typeof module === "object" && module.exports) {    module.exports = factory(require("d3"));  } else {    root.webCharts = factory(root.d3);  }}(this, function(d3){\n<%= contents %>\n return webCharts;\n }));';

gulp.task('build', ['concat', 'document'], function() {
  return gulp.src('build/webcharts.js')
    .pipe($.rename('webcharts.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('concat', function() {
  return gulp.src(buildScripts)
    .pipe($.sourcemaps.init())
    .pipe($.concat('webcharts.js'))
    .pipe($.babel({
      modules: 'ignore'
    }))
    .pipe($.wrap(wcWrapper))
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest('build'));
});

gulp.task('minify', function(){ 
  return gulp.src('build/webcharts.js')
    .pipe($.rename('webcharts.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('watch-all', function(){
  gulp.watch('src/**/*', ['build']);
});
