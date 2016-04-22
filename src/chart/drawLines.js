import { svg, format, select } from 'd3';

export default function drawLines(marks) {
  const config = this.config;

  const line = svg.line()
    .interpolate(config.interpolate)
    .x(d =>
      config.x.type === 'linear' ? this.x(+d.values.x) :
        config.x.type === 'time' ? this.x(new Date(d.values.x)) :
        this.x(d.values.x) + this.x.rangeBand() / 2
    )
    .y(d =>
      config.y.type === 'linear' ? this.y(+d.values.y) :
        config.y.type === 'time' ? this.y(new Date(d.values.y)) :
        this.y(d.values.y) + this.y.rangeBand() / 2
    );

  const xformat = config.x.summary === 'percent' ? format('0%') : format(config.x.format);
  const yformat = config.y.summary === 'percent' ? format('0%') : format(config.y.format);

  const lineSuperGroups = this.svg.selectAll('.line-supergroup').data(marks, (d, i) => `${i}-${d.per.join('-')}`);
  lineSuperGroups.enter().append('g').attr('class', 'line-supergroup');
  lineSuperGroups.exit().remove();

  const lineGroups = lineSuperGroups.selectAll('.line')
    .data(d => d.data, d => d.key);

  lineGroups.exit().remove();

  const nuLineGroups = lineGroups.enter().append('g').attr('class', d => `${d.key} line`);
  nuLineGroups.append('path');
  nuLineGroups.append('title');

  const linePaths = lineGroups.select('path').attr('class', 'wc-data-mark')
    .datum(d => d.values)
    .attr('stroke', d => this.colorScale(d[0].values.raw[0][config.color_by]))
    .attr('stroke-width', config.stroke_width ? config.stroke_width : config.flex_stroke_width)
    .attr('stroke-linecap', 'round')
    .attr('fill', 'none');

  const linePathsTrans = config.transitions ? linePaths.transition() : linePaths;
  linePathsTrans.attr('d', line);

  lineGroups.each(function assignMark(d) {
    const mark = select(this.parentNode).datum();
    d.tooltip = mark.tooltip;
    select(this).select('path').attr(mark.attributes);
  });

  lineGroups.select('title').text(d => {
    const tt = d.tooltip || '';
    return tt.replace(/\$x/g, xformat(d.values.x))
      .replace(/\$y/g, yformat(d.values.y))
      .replace(/\[(.+?)\]/g, (str, orig) => d.values[0].values.raw[0][orig]);
  });

  return lineGroups;
}
