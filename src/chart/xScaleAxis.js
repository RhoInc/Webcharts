export function xScaleAxis(type, max_range, domain){
  let config = this.config;
  let x;

  if(type === 'log')
    x = d3.scale.log();
  else if(type === 'ordinal')
    x = d3.scale.ordinal();
  else if(type === 'time')
    x = d3.time.scale();
  else
    x = d3.scale.linear();

  x.domain(domain);

  if(type === 'ordinal')
    x.rangeBands([0, +max_range], config.padding, config.outer_pad);
  else
    x.range([0, +max_range]).clamp(Boolean(config.x_clamp));

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
