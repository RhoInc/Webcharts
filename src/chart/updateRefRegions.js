chart.prototype.updateRefRegions = function(){
  //define/draw reference regions, if any
  var config = this.config;
  var context = this;
  var ref_region_data = context.config.reference_regions.slice(0).map(function(m){
    var xx = m.x;
    var yy = m.y;
    if(config.x.type === "time")
      if(m.x)
        xx = m.x.map(function(w){return d3.time.format(config.date_format).parse(w)});
      else
        xx = context.x_dom;
    if(config.y.type === "time")
      if(m.y)
        yy = m.y.map(function(w){return d3.time.format(config.date_format).parse(w)});
      else
        yy = context.y_dom;
    return {xs: !xx ? [1, context.plot_width] : xx, ys: !m.y ? [0, context.plot_height-1] : yy, attributes: m.attributes};
  });
  context.drawRects(ref_region_data).style("clip-path", "url(#"+context.clippath_id+")");
}