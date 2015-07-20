chart.prototype.updateDataMarks = function(){
  var context = this;
  var config = context.config;

  context.drawPoints( context.marks.filter(function(f){return f.type === 'circle'}));
  context.drawLines( context.marks.filter(function(f){return f.type === 'line'}));
  context.drawBars( context.marks.filter(function(f){return f.type === 'bar'}));

  return this;
}