Chart.prototype.drawSimpleLines = function(line_data, container, class_match, bind_accessor){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var w = context.plot_width;
  var h = context.plot_height;
  container = container || svg;
  class_match = class_match || "reference-line";
  var lines = container.selectAll("."+class_match).data(line_data, bind_accessor);
  lines.exit().remove();
  lines.enter().append("line").attr("class", class_match).append("title");
  lines.attr("shape-rendering", "crispEdges")
    .transition()
    .attr("x1", function(d){var unscale = d.xs ? d.xs[2] : false; var x1 = !d.xs ? 0 : context.x(d.xs[0]); return unscale ? d.xs[0] : config.x.type === "ordinal" ? x1 + context.x.rangeBand()/2 : x1})
    .attr("x2", function(d){var unscale = d.xs ? d.xs[2] : false; var x2 = !d.xs ? 0 : context.x(d.xs[1]); return unscale ? d.xs[1] : config.x.type === "ordinal" ? x2 + context.x.rangeBand()/2 : x2})
    .attr("y1", function(d){var unscale = d.ys ? d.ys[2] : false; var y1 = !d.ys ? 0 : context.y(d.ys[0]); return unscale ? d.ys[0] : config.y.type === "ordinal" ? y1 + context.y.rangeBand()/2 : y1})
    .attr("y2", function(d){var unscale = d.ys ? d.ys[2] : false; var y2 = !d.ys ? 0 : context.y(d.ys[1]); return unscale ? d.ys[1] : config.y.type === "ordinal" ? y2 + context.y.rangeBand()/2 : y2});
  lines.each(function(e){
    e.attributes = e.attributes || {};
    e.attributes["stroke-opacity"] = e.attributes["stroke-opacity"] || config.stroke_opacity || 1;
    e.attributes["stroke-width"] = e.attributes["stroke-width"] || config.stroke_width || 1;
    e.attributes["stroke"] = e.attributes["stroke"] || "black"; 
    d3.select(this).attr(e.attributes); 
    d3.select(this).select("title").datum(e);
  });
  return lines;
}