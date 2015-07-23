export function drawGridlines(){
  this.wrap.classed('gridlines', this.config.gridlines);
  if(this.config.gridlines){
    this.svg.select('.y.axis').selectAll('.tick line').attr('x1', 0);
    this.svg.select('.x.axis').selectAll('.tick line').attr('y1', 0);
    if(this.config.gridlines === 'y' || this.config.gridlines === 'xy')
      this.svg.select('.y.axis').selectAll('.tick line').attr('x1', this.plot_width);
    if(this.config.gridlines === 'x' || this.config.gridlines === 'xy')
      this.svg.select('.x.axis').selectAll('.tick line').attr('y1', -this.plot_height);
  }
  else{
    this.svg.select('.y.axis').selectAll('.tick line').attr('x1', 0);
    this.svg.select('.x.axis').selectAll('.tick line').attr('y1', 0);
  }
};
