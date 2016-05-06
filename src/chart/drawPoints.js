import { select, format, time } from 'd3';

export default function drawPoints(marks) {
  const config = this.config;

  const xformat = config.x.summary === 'percent' ?
    format('0%') :
    config.x.type === 'time' ?
    time.format(config.x.format) :
    format(config.x.format);
  const yformat = config.y.summary === 'percent' ?
    format('0%') :
    config.y.type === 'time' ?
    time.format(config.y.format) :
    format(config.y.format);

  const pointSuperGroups = this.svg.selectAll('.point-supergroup').data(marks, (d, i) => `${i}-${d.per.join('-')}`);
  pointSuperGroups.enter().append('g').attr('class', 'point-supergroup');
  pointSuperGroups.exit().remove();

  const points = pointSuperGroups.selectAll('.point')
    .data(d => d.data, d => d.key);
  const oldPoints = points.exit();

  const oldPointsTrans = config.transitions ? oldPoints.selectAll('circle').transition() : oldPoints.selectAll('circle');
  oldPointsTrans.attr('r', 0);

  const oldPointGroupTrans = config.transitions ? oldPoints.transition() : oldPoints;
  oldPointGroupTrans.remove();

  const nupoints = points.enter().append('g').attr('class', d => `${d.key} point`);
  nupoints.append('circle')
    .attr('class', 'WebchartsDataMark WebchartsDataMark--Circle wc-data-mark')
    .attr('r', 0);

  nupoints.append('title');

  // static attributes
  points.select('circle')
    .attr('fill-opacity', config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : 0.6)
    .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]))
    .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]));

  // attach mark info
  points.each(function assignMark(d) {
    const mark = select(this.parentNode).datum();
    d.mark = mark;
    select(this).select('circle').attr(mark.attributes);
  });

  // animated attributes
  const pointsTrans = config.transitions ?
    points.select('circle').transition() :
    points.select('circle');

  pointsTrans
    .attr('r', d => d.mark.radius || config.flex_point_size)
    .attr('cx', d => {
      const xPos = this.x(d.values.x) || 0;
      return config.x.type === 'ordinal' ? xPos + this.x.rangeBand() / 2 : xPos;
    })
    .attr('cy', d => {
      const yPos = this.y(d.values.y) || 0;
      return config.y.type === 'ordinal' ? yPos + this.y.rangeBand() / 2 : yPos;
    });


  points.select('title').text(d => {
    const tt = d.mark.tooltip || '';
    return tt.replace(/\$x/g, config.x.type === 'time' ? xformat(new Date(d.values.x)) : xformat(d.values.x))
      .replace(/\$y/g, config.y.type === 'time' ? yformat(new Date(d.values.y)) : yformat(d.values.y))
      .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
  });

  return points;
}
