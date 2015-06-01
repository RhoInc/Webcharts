chart.prototype.updateDataMarks = function(){
  var context = this;
  var config = context.config;

  // context.marks.filter(function(f){return f.type === 'circle'}).forEach(function(mark){
  // 	context.drawPoints(mark);
  // })
  // context.marks.filter(function(f){return f.type === 'line'}).forEach(function(mark){
  // 	context.drawLines(mark);
  // })
  // context.marks.filter(function(f){return f.type === 'bar'}).forEach(function(mark){
  // 	context.drawBars(mark);
  // })
  context.drawPoints( context.marks.filter(function(f){return f.type === 'circle'}));
  context.drawLines( context.marks.filter(function(f){return f.type === 'line'}));
  context.drawBars( context.marks.filter(function(f){return f.type === 'bar'}));
  
  // context.drawPoints(mark);

  // context.drawLines(mark);

  // context.drawBars(mark);

  return this;

}