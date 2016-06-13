import { scale, time, format, svg } from 'd3';

export default function xScaleAxis(maxRange = this.plot_width, domain = this.x_dom, type = this.config.x.type) {
  const config = this.config;
  let x;

  if (type === 'log') {
    x = scale.log();
  }
  else if (type === 'ordinal') {
    x = scale.ordinal();
  }
  else if (type === 'time') {
    x = time.scale();
  }
  else {
    x = scale.linear();
  }

  x.domain(domain);

  if (type === 'ordinal') {
    x.rangeBands([0, +maxRange], config.x.padding, config.x.outer_pad);
  }
  else {
    x.range([0, +maxRange]).clamp(Boolean(config.x.clamp));
  }

  const axisFormat = config.x.format ?
    config.x.format :
    config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1 ?
    '0%' :
    type === 'time' ?
    '%x' :
    '.0f';
  const tickCount = Math.max(2, Math.min(maxRange / 80, 8));
  const xAxis = svg.axis()
    .scale(x)
    .orient(config.x.location)
    .ticks(tickCount)
    .tickFormat(type === 'ordinal' ? null : type === 'time' ? time.format(axisFormat) : format(axisFormat))
    .tickValues(config.x.ticks ? config.x.ticks : null)
    .innerTickSize(6)
    .outerTickSize(3);

  this.svg.select('g.x.axis').attr('class', `x axis ${type}`);
  this.x = x;
  this.xAxis = xAxis;
}
