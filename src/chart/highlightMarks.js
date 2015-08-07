export function highlightMarks(){
  let context = this;
  let leg_parts = this.legend.selectAll('.legend-item');

  leg_parts.on('mouseover', function(d){
    var fill = d3.select(this).select('.legend-mark').attr('fill');
    context.svg.selectAll('.wc-data-mark').attr('opacity', 0.1).filter(function(f){
      return d3.select(this).attr('fill') === fill || d3.select(this).attr('stroke') === fill;
    }).attr('opacity', 1);
  })
  .on('mouseout', d => {
     this.svg.selectAll('.wc-data-mark').attr('opacity', 1);
  });
}