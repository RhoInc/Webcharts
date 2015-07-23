export function drawPoints(marks){
  let config = this.config;

  let point_supergroups = this.svg.selectAll('.point-supergroup').data(marks, d => d.per.join('-') );
  point_supergroups.enter().append('g').attr('class', 'point-supergroup');
  point_supergroups.exit().remove();

  let points = point_supergroups.selectAll('.point')
    .data(d => d.data, d => d.key );
  let oldPoints = points.exit();
  oldPoints.selectAll('circle')
    .transition()
    .attr('r', 0);
  oldPoints.transition().remove();

  let nupoints = points.enter().append('g').attr('class', d => d.key+' point');
  nupoints.append('circle').attr('class', 'wc-data-mark')
    .attr('r', 0);
  nupoints.append('title');
  points.select('circle')
    .attr('fill-opacity', config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : 0.6)
    .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) )
    .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]) )
    .transition()
    .attr('r', config.point_size ? config.point_size : config.flex_point_size)
    .attr('cx', d => {
      let x_pos = this.x(d.values.x) || 0;
      return this.x.type === 'ordinal' ? x_pos + this.x.rangeBand()/2 : x_pos;
    })
    .attr('cy', d => {
      let y_pos = this.y(d.values.y) || 0;
      return config.y.type === 'ordinal' ? y_pos + this.y.rangeBand()/2 : y_pos;
    });

  points.each(function(d){
    var mark = d3.select(this.parentNode).datum();
    d.tooltip = mark.tooltip;
    d3.select(this).select('circle').attr(mark.attributes);
  });

  points.select('title').text(d => {
    let tt = d.tooltip || '';
    let xformat = config.x.summary === 'percent' ? d3.format('0%') : d3.format(config.x.format);
    let yformat = config.y.summary === 'percent' ? d3.format('0%') : d3.format(config.y.format);
    return tt.replace(/\$x/g, xformat(d.values.x))
      .replace(/\$y/g, yformat(d.values.y))
      .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig] );
  });
  
  return points;
}
