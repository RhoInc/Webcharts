/** Sets up x-scale and x-axis functions
*@memberof chart
*@method xScaleAxis
*@param {number} max_range Maximum SVG x-coordinate that can be used. Typically set to the width of the chart's plotting area.
*@param {array} [domain={@link webCharts~chart.x_dom}] Domain passed to the scale function
*@param {string} [type={@link webCharts~chart.config.x.type}] Type of scale to define. Can be 'linear', 'log', 'ordinal' or 'time'.
*/
export function xScaleAxis(max_range, domain, type){
  if(max_range === undefined){
    max_range = this.plot_width;
  }
  if(domain === undefined){
    domain = this.x_dom;
  }
  if(type === undefined){
    type = this.config.x.type;
  }
  let config = this.config;
  let x;

  if(type === 'log'){
    x = d3.scale.log();
  }
  else if(type === 'ordinal'){
    x = d3.scale.ordinal();
  }
  else if(type === 'time'){
    x = d3.time.scale();
  }
  else{
    x = d3.scale.linear();
  }

  x.domain(domain);

  if(type === 'ordinal'){
    x.rangeBands([0, +max_range], config.padding, config.outer_pad);
  }
  else{
    x.range([0, +max_range]).clamp(Boolean(config.x.clamp));
  }

  let format = config.x.format ? config.x.format : type === 'percent' ? '0%' : type === 'time' ? '%x' : '.0f';
  let tick_count = Math.max(2, Math.min(max_range/80,8));
  let xAxis = d3.svg.axis()
    .scale(x)
    .orient(config.x.location)
    .ticks(tick_count)
    .tickFormat(type === 'ordinal' ? null : type === 'time' ? d3.time.format(format) : d3.format(format))
    .tickValues(config.x.ticks ? config.x.ticks : null)
    .innerTickSize(6)
    .outerTickSize(3);

  this.svg.select('g.x.axis').attr('class', 'x axis '+type);
  this.x = x;
  this.xAxis = xAxis;
}
