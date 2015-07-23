export function drawRects(rect_data, container = this.svg, class_match = 'reference-region'){
  container = container || this.svg;
  let config = this.config;
  let rects = container.selectAll('.'+class_match).data(rect_data);
  rects.exit().remove();
  rects.enter().append('rect').attr('class', class_match).append('title');
  rects.attr({'stroke': 'none', 'shape-rendering': 'crispEdges'})
    .transition()
    .attr('x', d => config.x.type === 'ordinal' ? d.xs[0] : this.x(d.xs[0])  )
    .attr('y', d => config.y.type === 'ordinal' ? d.ys[0] : this.y(d.ys[1]) )
    .attr('width', d => config.x.type === 'ordinal' ? d.xs[1] - d.xs[0] : this.x(d.xs[1]) - this.x(d.xs[0]) )
    .attr('height', d => config.y.type === 'ordinal' ? Math.abs(d.ys[0] - d.ys[1]) : this.y(d.ys[0]) - this.y(d.ys[1]) );

  rects.each(function(e){
    e.attributes = e.attributes || {};
    e.attributes['fill'] = e.attributes['fill'] || '#eee';
    d3.select(this).attr(e.attributes);
  });
  return rects;
}
