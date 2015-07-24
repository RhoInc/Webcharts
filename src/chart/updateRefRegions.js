export function updateRefRegions(){
  //define/draw reference regions, if any
  let config = this.config;
  let ref_region_data = this.config.reference_regions.slice(0).map(m => {
    let xx = m.x;
    let yy = m.y;
    if(config.x.type === 'time')
      if(m.x)
        xx = m.x.map(w => d3.time.format(config.date_format).parse(w));
      else
        xx = this.x_dom;
    if(config.y.type === 'time')
      if(m.y)
        yy = m.y.map(w => d3.time.format(config.date_format).parse(w));
      else
        yy = this.y_dom;
    return {xs: !xx ? [1, this.plot_width] : xx, ys: !m.y ? [0, this.plot_height-1] : yy, attributes: m.attributes};
  });
  this.drawRects(ref_region_data).style('clip-path', 'url(#'+this.clippath_id+')');
}
