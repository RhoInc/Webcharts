Chart.prototype.setMargins = function(){
  var context = this;
  var x_ticks = context.xAxis.tickFormat() ? context.x.domain().map(function(m){return context.xAxis.tickFormat()(m)}) : context.x.domain();
  var y_ticks = context.yAxis.tickFormat() ? context.y.domain().map(function(m){return context.yAxis.tickFormat()(m)}) : context.y.domain();

  var max_y_text_length = d3.max( y_ticks.map(function(m){return String(m).length}) );
  if(this.config.y_format && this.config.y_format.indexOf("%") > -1 )
    max_y_text_length += 1
  max_y_text_length = Math.max(2, max_y_text_length);
  var x_label_on = this.config.x.label ? 1.5 : 0;
  var y_label_on = this.config.y.label ? 1.5 : 0.25;
  var font_size = parseInt(this.wrap.style("font-size"));
  var x_second = this.config.x2_interval ? 1 : 0;
  var y_margin = max_y_text_length*font_size*.5+ (font_size*y_label_on*1.5) || 8;
  var x_margin = font_size+(font_size/1.5) + (font_size*x_label_on)+(font_size*x_second) || 8;

  y_margin += 6;
  x_margin += 3;

  return {top: this.config.margin && this.config.margin.top ? this.config.margin.top : 8, 
      right: this.config.margin && this.config.margin.right ? this.config.margin.right : 16, 
      bottom: this.config.margin && this.config.margin.bottom ? this.config.margin.bottom : x_margin, 
      left: this.config.margin && this.config.margin.left ? this.config.margin.left : y_margin};
}