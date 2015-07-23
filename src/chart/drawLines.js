Chart.prototype.drawLines = function(marks){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  // var mark_data = mark.type === 'line' ? mark.data : [];

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
  var line_supergroups = context.svg.selectAll(".line-supergroup").data(marks, function(d){return d.per.join('-')});
  line_supergroups.enter().append('g').attr('class', 'line-supergroup');
  line_supergroups.exit().remove();

  var line_grps = line_supergroups.selectAll(".line")
    .data(function(d){return d.data}, function(d){return d.key});
  line_grps.exit().remove();
  var nu_line_grps = line_grps.enter().append("g").attr("class", function(d){return d.key+" line"});
  nu_line_grps.append("path");
  nu_line_grps.append("title");
  line_grps.select("path").attr("class", "wc-data-mark")
    .datum(function(d){return d.values})
    .attr("stroke", function(d){
      return colorScale(d[0].values.raw[0][config.color_by]);
    })
    .attr("stroke-width", config.stroke_width ? config.stroke_width : config.flex_stroke_width)
    .attr("stroke-linecap", "round")
    .attr("fill", "none")
    .transition()
    .attr("d", line);

  line_grps.each(function(d){
    var mark = d3.select(this.parentNode).datum();
    d.tooltip = mark.tooltip;
    d3.select(this).select('path').attr(mark.attributes)
  });

  line_grps.select('title').text(function(d){
    var tt = d.tooltip || '';
    var xformat = config.x.summary === 'percent' ? d3.format('0%') : d3.format(config.x.format);
    var yformat = config.y.summary === 'percent' ? d3.format('0%') : d3.format(config.y.format);
    return tt.replace(/\$x/g, xformat(d.values.x))
      .replace(/\$y/g, yformat(d.values.y))
      .replace(/\[(.+?)\]/g, function(str, orig){
        return d.values[0].values.raw[0][orig];
      });
  });

  return line_grps;
}
