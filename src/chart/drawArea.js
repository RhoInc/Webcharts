Chart.prototype.drawArea = function(area_drawer, area_data, datum_accessor, class_match, bind_accessor, attr_accessor){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  var x = context.x;
  var y = context.y;
  class_match = class_match ? class_match : "chart-area";
  attr_accessor = attr_accessor ? attr_accessor : function(d){return d};

  var area_grps = svg.selectAll("."+class_match)
    .data(area_data, bind_accessor);
  area_grps.exit().remove();
  area_grps.enter().append("g").attr("class", function(d){return class_match+" "+d.key})
    .append("path");
  area_grps.select("path")
    .datum(datum_accessor)
    .attr("fill", function(d){
      var d_attr = attr_accessor(d);
      return d_attr ? colorScale(d_attr[config.color_by]) : null;
    })
    .attr("fill-opacity", config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : 0.3)
    .transition()
    .attr("d", area_drawer);

  return area_grps;
}