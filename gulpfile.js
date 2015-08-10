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

gulp.task('document', $.shell.task( [
  'jsdoc2md build/webcharts.js > doc.md'
] ));

//parse documentation comments for controls object
gulp.task('controls-doc', $.shell.task( [
  'jsdoc2md src/controls/* > ../webcharts.wiki/controls.md'
] ));
//parse documentation comments for table object
gulp.task('table-doc', $.shell.task( [
  'jsdoc2md src/table/* > ../webcharts.wiki/table.md'
] ));

//do some custom editing on .md files produced by jsdoc2md
gulp.task('strip', ['controls-doc', 'table-doc'], function(){
  return gulp.src(['../webcharts.wiki/*'])
    .pipe($.replace(/\*\*Kind\*\*.*\n/g, ''))//strip out the lines that document **Kind** because that's stupid
    .pipe($.replace(/^\*\s\[.*\n/m, '')) //remove first item in menu/list because it's redundant
    .pipe($.replace(/(^\s+\*\s){1}/m, '\n')) //keep newline before table of contents
    .pipe($.replace(/^\s+\*\s/gm, '<br>')) //swap bullets for line breaks
    .pipe(gulp.dest('../webcharts.wiki/'));
});

gulp.task('watch', function(){
  gulp.watch('src/controls/*', ['strip']);
  gulp.watch('src/table/*', ['strip']);
});

gulp.task('watch-all', function(){
  gulp.watch('src/**/*', ['build']);
});

//use dox to get json instead of full-blown html files
// dox < build/webcharts.js > doc.json
//or go straight to markdown
// jsdoc2md build/webcharts.js > doc.md
