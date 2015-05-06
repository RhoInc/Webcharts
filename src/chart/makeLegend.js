chart.prototype.makeLegend = function(scale, label, custom_data){
  var context = this;
  var config = this.config;
  config.legend_mark = config.legend_mark ? config.legend_mark :
    config.marks && config.marks[0].type === 'bar' ? 'square' :
    config.marks ? config.marks[0].type :
    'square';
  var legend = context.legend || context.wrap.select(".legend")//.style("padding-left", context.margin.left+"px");
  scale = scale || context.colorScale;
  label = !label && !config.meta_map ? "" : label || label === "" ? label : 
    context.metaMap.domain().indexOf(context.config.color_by) < 0 ? "" :
    context.metaMap(context.config.color_by);

  var legend_data = custom_data || scale.domain().slice(0).filter(function(f){return f !== undefined && f !== null}).map(function(m){
    return {label: m,  mark: config.legend_mark};
  });
  legend.select(".legend-title").text(label).style("display", label ? "inline" : "none");
  var leg_parts = legend.selectAll(".legend-item")
      .data(legend_data, function(d){return d.label});
  leg_parts.exit().remove()
  var new_parts = leg_parts.enter().append("li")
      .attr("class", "legend-item")

  new_parts.each(drawMark)
  
  function drawMark(e){
    if(!e.mark)
      return;
    d3.select(this).append("span").attr("class", "legend-mark-text").style("color", scale(e.label));
    var svg = d3.select(this).append("svg").attr("class", "legend-color-block");
    //e.mark = e.mark || "square";
    if(e.mark === "circle")
      svg.append("circle").attr({"cx": ".5em", "cy": ".45em", "r": ".45em", "class": "legend-mark"});
    else if(e.mark === "line")
      svg.append("line").attr({"x1": 0, "y1": ".5em", "x2": "1em", "y2": ".5em", "stroke-width": 2, "shape-rendering": "crispEdges", "class": "legend-mark"});
    else if(e.mark === "square")
      svg.append("rect").attr({"height": "1em", "width": "1em", "class": "legend-mark"});
  };

  leg_parts.sort(function(a,b){
    return scale.domain().indexOf(a) - scale.domain().indexOf(b);
  });
    
  leg_parts.selectAll(".legend-color-block").select(".legend-mark")
    .attr("fill", function(d){return d.color || scale(d.label)})
    .attr("stroke", function(d){return d.color || scale(d.label)})
    .each(function(e){
      d3.select(this).attr(e.attributes)
    });

  new_parts.append("span").attr("class", "legend-label").text(function(d){
    return context.metaMap.domain().indexOf(d.label) > -1 ? context.metaMap(d.label) : d.label;
  });

  leg_parts.on("mouseover", function(d){
    if(!config.highlight_on_legend)
      return;
    var fill = d3.select(this).select(".legend-mark").attr("fill");
    console.log(fill)
    context.svg.selectAll(".wc-data-mark").attr("opacity", 0.1).filter(function(f){
      return d3.select(this).attr("fill") === fill || d3.select(this).attr("stroke") === fill;
    }).attr("opacity", 1)
  }).on("mouseout", function(d){
    if(!config.highlight_on_legend)
      return;
     context.svg.selectAll(".wc-data-mark").attr("opacity", 1)
  })

  if(scale.domain().length > 1)
    legend.style("display", "block");
  else
    legend.style("display", "none");

  context.legend = legend;
}