import { scale, time, format, svg } from 'd3';

export default function yScaleAxis(maxRange = this.plot_height, domain = this.y_dom, type = this.config.y.type) {
  const config = this.config;
  let y;

  if (type === 'log') {
    y = scale.log();
  }
  else if (type === 'ordinal') {
    y = scale.ordinal();
  }
  else if (type === 'time') {
    y = time.scale();
  }
  else {
    y = scale.linear();
  }

  y.domain(domain);

  if (type === 'ordinal') {
    y.rangeBands([+maxRange, 0], config.y.padding, config.y.outer_pad);
  }
  else {
    y.range([+maxRange, 0]).clamp(Boolean(config.y.clamp));
  }

  const yFormat = config.y.format ? config.y.format : config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1 ? '0%' : '.0f';
  const tickCount = Math.max(2, Math.min(maxRange / 80, 8));
  const yAxis = svg.axis()
    .scale(y)
    .orient('left')
    .ticks(tickCount)
    .tickFormat(type === 'ordinal' ? null : type === 'time' ? time.format(yFormat) : format(yFormat))
    .tickValues(config.y.ticks ? config.y.ticks : null)
    .innerTickSize(6)
    .outerTickSize(3);

  this.svg.select('g.y.axis').attr('class', `y axis ${type}`);

  this.y = y;
  this.yAxis = yAxis;
}
