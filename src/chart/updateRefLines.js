Chart.prototype.updateRefLines = function(){
  //define/draw reference lines, if any
  var config = this.config;
  var context = this;
  var ref_line_data = !config.reference_lines ? [] : config.reference_lines.map(function(m){
    var xx = m.x;
    var yy = m.y;
    if(config.x.type === "time" && m.x)
      xx = d3.time.format(config.date_format).parse(m.x);
    if(config.y.type === "time" && m.y)
      yy = d3.time.format(config.date_format).parse(m.y);
    return {xs: !m.x && +m.x !== 0 ? [0, context.plot_width,true] : [xx, xx], ys: !m.y && +m.y !== 0 ? [0,context.plot_height,true] : [yy, yy], attributes: m.attributes};
  });
  var ref_lines = context.drawSimpleLines(ref_line_data).style("clip-path", "url(#"+context.clippath_id+")");
}