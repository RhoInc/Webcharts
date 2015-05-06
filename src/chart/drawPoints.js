chart.prototype.drawPoints = function(mark, container){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  var x = context.x;
  var y = context.y;
  var mark_data = mark.type === 'circle' ? mark.data : [];

  container = container || svg;

  var points = container.selectAll(".wc-data-mark.point")
    .data(mark_data, function(d){return d.key});
  var oldPoints = points.exit();
  oldPoints.selectAll("circle")
    .transition()
    .attr("r", 0)
  oldPoints.transition().remove();

  var nupoints = points.enter().append("g").attr("class", function(d){return d.key+" "+mark.per.join(" ")+" wc-data-mark point"});
  nupoints.append("circle")
    .attr("r", 0);
  nupoints.append("title");
  // points.select("circle")
  //   .attr("fill-opacity", config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : .6)
  //   .attr("fill", function(d){
  //     return colorScale(d.values.raw[0][config.color_by])
  //   })
  //   .attr("stroke", function(d){
  //     return colorScale(d.values.raw[0][config.color_by])
  //   })
  //   .transition()
  //   .attr("r", config.point_size ? config.point_size : config.flex_point_size)
  //   .attr("cx", function(d){
  //     var x_pos = x(d.values.x) || 0;
  //     return config.x.type === "ordinal" ? x_pos+x.rangeBand()/2 : x_pos;
  //   })
  //   .attr("cy", function(d){
  //     var y_pos = y(d.values.y) || 0;
  //     return config.y.type === "ordinal" ? y_pos+y.rangeBand()/2 : y_pos;
  //   })
  //   .attr(mark.attributes);
  points.select("circle")
    .attr("fill-opacity", config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : .6)
    .attr("fill", function(d){
      return colorScale(d.values[0].values.raw[0][config.color_by])
    })
    .attr("stroke", function(d){
      return colorScale(d.values[0].values.raw[0][config.color_by])
    })
    .transition()
    .attr("r", config.point_size ? config.point_size : config.flex_point_size)
    .attr("cx", function(d){
      var x_pos = x(d.values[0].values.x) || 0;
      return config.x.type === "ordinal" ? x_pos+x.rangeBand()/2 : x_pos;
    })
    .attr("cy", function(d){
      var y_pos = y(d.values[0].values.y) || 0;
      return config.y.type === "ordinal" ? y_pos+y.rangeBand()/2 : y_pos;
    })
    .attr(mark.attributes);

  return points;
}