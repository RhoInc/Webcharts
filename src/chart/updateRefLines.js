export function updateRefLines(){
  //define/draw reference lines, if any
  let config = this.config;
  let ref_line_data = !config.reference_lines ? [] : config.reference_lines.map(m => {
    let xx = m.x;
    let yy = m.y;
    if(config.x.type === 'time' && m.x)
      xx = d3.time.format(config.date_format).parse(m.x);
    if(config.y.type === 'time' && m.y)
      yy = d3.time.format(config.date_format).parse(m.y);
    return {xs: !m.x && +m.x !== 0 ? [0, this.plot_width,true] : [xx, xx], ys: !m.y && +m.y !== 0 ? [0,this.plot_height,true] : [yy, yy], attributes: m.attributes};
  });

  this.drawSimpleLines(ref_line_data).style('clip-path', 'url(#'+this.clippath_id+')');
}
