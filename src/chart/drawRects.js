chart.prototype.drawRects = function(rect_data, container, class_match){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var w = context.plot_width;
  var h = context.plot_height;
  container = container || svg;
  class_match = class_match || "reference-region";
  var rects = container.selectAll("."+class_match).data(rect_data);
  rects.exit().remove();
  rects.enter().append("rect").attr("class", class_match).append("title");
  rects.attr({"stroke": "none", "shape-rendering": "crispEdges"})
    .transition()
    .attr("x", function(d){return config.x.type === "ordinal" ? d.xs[0] : context.x(d.xs[0]) } )
    .attr("y", function(d){return config.y.type === "ordinal" ? d.ys[0] : context.y(d.ys[1])})
    .attr("width", function(d){return config.x.type === "ordinal" ? d.xs[1] - d.xs[0] : context.x(d.xs[1]) - context.x(d.xs[0]) })
    .attr("height", function(d){return config.y.type === "ordinal" ? Math.abs(d.ys[0] - d.ys[1]) : context.y(d.ys[0]) - context.y(d.ys[1]) });
  rects.each(function(e){
    e.attributes = e.attributes || {};
    e.attributes["fill"] = e.attributes["fill"] || "#eee"; 
    d3.select(this).attr(e.attributes); 
  });
  return rects;
}