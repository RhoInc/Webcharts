import { select, ascending } from 'd3';

export default function makeLegend(scale = this.colorScale, label = '', customData = null) {
  const config = this.config;

  config.legend.mark = config.legend.mark ? config.legend.mark :
    config.marks.length && config.marks[0].type === 'bar' ? 'square' :
    config.marks.length ? config.marks[0].type :
    'square';

  const legendLabel = Boolean(label) ? label :
   typeof config.legend.label === 'string' ? config.legend.label : '';

  const legendOriginal = this.legend || this.wrap.select('.legend');
  const legend = legendOriginal;

  if (this.config.legend.location === 'top' || this.config.legend.location === 'left') {
    this.wrap.node().insertBefore(legendOriginal.node(), this.svg.node().parentNode);
  }
  else {
    this.wrap.node().appendChild(legendOriginal.node());
  }
  legend.style('padding', 0);

  const legendData = customData || scale.domain()
    .slice(0)
    .filter(f => f !== undefined && f !== null)
    .map(m =>
      ({ label: m, mark: config.legend.mark })
    );

  legend.select('.legend-title')
    .text(legendLabel)
    .style('display', legendLabel ? 'inline' : 'none')
    .style('margin-right', '1em');

  const legParts = legend.selectAll('.legend-item')
    .data(legendData, d => d.label + d.mark);

  legParts.exit().remove();

  const legendPartDisplay = this.config.legend.location === 'bottom' || this.config.legend.location === 'top' ?
    'inline-block' : 'block';
  const newParts = legParts.enter().append('li')
    .attr('class', 'legend-item')
    .style({ 'list-style-type': 'none', 'margin-right': '1em' });
  newParts.append('span')
    .attr('class', 'legend-mark-text')
    .style('color', d => scale(d.label));
  newParts.append('svg')
    .attr('class', 'legend-color-block')
    .attr('width', '1.1em')
    .attr('height', '1.1em')
    .style({
      'position': 'relative',
      'top': '0.2em'
    });

  legParts.style('display', legendPartDisplay);

  if (config.legend.order) {
    legParts.sort((a, b) => ascending(config.legend.order.indexOf(a.label), config.legend.order.indexOf(b.label)));
  }

  legParts.selectAll('.legend-color-block').select('.legend-mark').remove();
  legParts.selectAll('.legend-color-block').each(function addSVG(e) {
    const svg = select(this);
    if (e.mark === 'circle') {
      svg.append('circle')
        .attr({
          'cx': '.5em',
          'cy': '.45em',
          'r': '.45em',
          'class': 'legend-mark'
        });
    }
    else if (e.mark === 'line') {
      svg.append('line')
        .attr({
          'x1': 0,
          'y1': '.5em',
          'x2': '1em',
          'y2': '.5em',
          'stroke-width': 2,
          'shape-rendering': 'crispEdges',
          'class': 'legend-mark'
        });
    }
    else if (e.mark === 'square') {
      svg.append('rect')
        .attr({
          'height': '1em',
          'width': '1em',
          'class': 'legend-mark',
          'shape-rendering': 'crispEdges'
        });
    }
  });

  legParts.selectAll('.legend-color-block').select('.legend-mark')
    .attr('fill', d => d.color || scale(d.label))
    .attr('stroke', d => d.color || scale(d.label))
    .each(function addAttr(e) {
      select(this).attr(e.attributes);
    });

  newParts.append('span')
    .attr('class', 'legend-label')
    .style('margin-left', '0.25em')
    .text(d => d.label);

  if (scale.domain().length > 0) {
    const legendDisplay = this.config.legend.location === 'bottom' || this.config.legend.location === 'top' ?
      'block' :
      'inline-block';
    legend.style('display', legendDisplay);
  }
  else {
    legend.style('display', 'none');
  }

  this.legend = legend;
}
