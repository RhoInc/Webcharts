chart.prototype.updateDataMarks = function(mark){
  var context = this;
  var config = context.config;

  context.drawPoints(mark);

  context.drawLines(mark);

  context.drawBars(mark);

  return this;

}