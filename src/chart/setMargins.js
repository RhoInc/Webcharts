/** Automatically determines margins for the chart based on axis ticks, labels, etc.
*@memberof webCharts.objects.chart
*@method setMargins
*/
export function setMargins(){
  let x_ticks = this.xAxis.tickFormat() ? this.x.domain().map(m => this.xAxis.tickFormat()(m)) : this.x.domain();
  let y_ticks = this.yAxis.tickFormat() ? this.y.domain().map(m => this.yAxis.tickFormat()(m)) : this.y.domain();

  let max_y_text_length = d3.max( y_ticks.map(m => String(m).length) );
  if(this.config.y_format && this.config.y_format.indexOf('%') > -1 )
    max_y_text_length += 1
  max_y_text_length = Math.max(2, max_y_text_length);
  let x_label_on = this.config.x.label ? 1.5 : 0;
  let y_label_on = this.config.y.label ? 1.5 : 0.25;
  let font_size = parseInt(this.wrap.style('font-size'));
  let x_second = this.config.x2_interval ? 1 : 0;
  let y_margin = max_y_text_length*font_size*.5+ (font_size*y_label_on*1.5) || 8;
  let x_margin = font_size+(font_size/1.5) + (font_size*x_label_on)+(font_size*x_second) || 8;

  y_margin += 6;
  x_margin += 3;

  return {
    top: this.config.margin && this.config.margin.top ? this.config.margin.top : 8,
    right: this.config.margin && this.config.margin.right ? this.config.margin.right : 16,
    bottom: this.config.margin && this.config.margin.bottom ? this.config.margin.bottom : x_margin,
    left: this.config.margin && this.config.margin.left ? this.config.margin.left : y_margin
  };
}
