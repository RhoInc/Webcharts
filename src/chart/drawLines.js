chart.prototype.drawLines = function(mark){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  var mark_data = mark.type === 'line' ? mark.data : [];

  var line = d3.svg.line()
    .interpolate(config.interpolate)
    .x(function(d){ 
      return config.x.type === "linear" ? context.x(+d.values.x) : 
        config.x.type === "time" ? context.x(new Date(d.values.x)) :
        context.x(d.values.x) + context.x.rangeBand()/2 
    }) 
    .y(function(d){ 
      return config.y.type === "linear" ? context.y(+d.values.y) : 
        config.y.type === "time" ? context.y(new Date(d.values.y)) :
        context.y(d.values.y) + context.y.rangeBand()/2 
    }) 

  // var line_grps = svg.selectAll(mark.per.length ? ".line."+mark.per : ".line")
  var line_grps = svg.selectAll(".wc-data-mark.line")
    .data(mark_data, function(d){return d.key});
  line_grps.exit().remove();
  var nu_line_grps = line_grps.enter().append("g").attr("class", function(d){return d.key+" "+mark.per+" wc-data-mark line"});
  nu_line_grps.append("path");
  nu_line_grps.append("title");
  line_grps.select("path")
    .datum(function(d){return d.values})
    .attr("stroke", function(d){
      return colorScale(d[0].values.raw[0][config.color_by]);
    })
    .attr("stroke-width", config.stroke_width ? config.stroke_width : config.flex_stroke_width)
    .attr("stroke-linecap", "round")
    .attr("fill", "none")
    .transition()
    .attr("d", line)
    .attr(mark.attributes);

  return line_grps;
}