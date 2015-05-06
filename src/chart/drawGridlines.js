chart.prototype.drawGridlines = function(){
  var svg = this.svg;
  var gridlines = this.config.gridlines// === "none" ? null : config.gridlines;
  this.wrap.classed("gridlines", gridlines);
  if(gridlines){
    svg.select(".y.axis").selectAll(".tick line").attr("x1", 0);
    svg.select(".x.axis").selectAll(".tick line").attr("y1", 0);
    if(gridlines === "y" || gridlines === "xy")
      svg.select(".y.axis").selectAll(".tick line").attr("x1", this.plot_width);
    if(gridlines === "x" || gridlines === "xy")
      svg.select(".x.axis").selectAll(".tick line").attr("y1", -this.plot_height);
  }
  else{
    svg.select(".y.axis").selectAll(".tick line").attr("x1", 0);
    svg.select(".x.axis").selectAll(".tick line").attr("y1", 0);
  } 
}