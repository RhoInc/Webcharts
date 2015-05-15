chart.prototype.updateDataMarks = function(mark, index){
  var context = this;
  var config = context.config;

if(mark.type === 'circle')
  context.drawPoints(mark,index);
else{
	context.svg.selectAll(".wc-data-mark.point.index-"+index).remove();
}
if(mark.type === 'line')
  context.drawLines(mark,index);
else{
	context.svg.selectAll(".wc-data-mark.line.index-"+index).remove();
}
if(mark.type === 'bar')
  context.drawBars(mark,index);
else{
	context.svg.selectAll(".bar-group.index-"+index).remove();
}

  return this;

}