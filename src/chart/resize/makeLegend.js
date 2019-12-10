import { ascending, select } from 'd3';
import positionLegend from './makeLegend/positionLegend';
import legendTitle from './makeLegend/legendTitle';
import defineMark from './makeLegend/defineMark';
import defineLegendData from './makeLegend/defineLegendData';

export default function makeLegend(scale = this.colorScale, label = '', custom_data = null) {
    const config = this.config;

    this.legend = positionLegend.call(this)
    this.legend.title = legendTitle.call(this, label);
    this.legend.data = defineLegendData.call(this, custom_data, scale);
    this.legend.mark = defineMark.call(this);

    // legend-item
    const leg_parts = this.legend
        .selectAll('.legend-item')
        .data(legend_data, d => d.label + d.mark);
    leg_parts
        .exit()
        .remove();
    const new_parts = leg_parts
        .enter()
        .append('li')
        .classed('legend-item', true);

    // legend-mark-text
    new_parts
        .append('span')
        .attr('class', 'legend-mark-text')
        .style('color', d => scale(d.label));

    // legend-color-block
    new_parts
        .append('svg')
        .attr('class', 'legend-color-block');

    leg_parts
        .classed('legend-item--display-block', !['bottom', 'top'].includes(this.config.legend.location));

    if (config.legend.order) {
        leg_parts.sort((a, b) =>
            ascending(config.legend.order.indexOf(a.label), config.legend.order.indexOf(b.label))
        );
    }

    leg_parts
        .selectAll('.legend-color-block')
        .select('.legend-mark')
        .remove();
    leg_parts.selectAll('.legend-color-block').each(function(e) {
        const svg = select(this);
        if (e.mark === 'circle') {
            svg.append('circle').attr({
                cx: '.5em',
                cy: '.5em',
                r: '.45em',
                class: 'legend-mark'
            });
        } else if (e.mark === 'line') {
            svg.append('line').attr({
                x1: 0,
                y1: '.5em',
                x2: '1em',
                y2: '.5em',
                'stroke-width': 2,
                'shape-rendering': 'crispEdges',
                class: 'legend-mark'
            });
        } else if (e.mark === 'square') {
            svg.append('rect').attr({
                height: '1em',
                width: '1em',
                class: 'legend-mark',
                'shape-rendering': 'crispEdges'
            });
        }
    });
    leg_parts
        .selectAll('.legend-color-block')
        .select('.legend-mark')
        .attr('fill', d => d.color || scale(d.label))
        .attr('stroke', d => d.color || scale(d.label))
        .each(function(e) {
            select(this).attr(e.attributes);
        });

    new_parts
        .append('span')
        .attr('class', 'legend-label')
        .text(d => d.label);

    if (scale.domain().length > 0) {
        const legendDisplay =
            (this.config.legend.location === 'bottom' || this.config.legend.location === 'top') &&
            !this.parent
                ? 'block'
                : 'inline-block';
        this.legend.style('display', legendDisplay);
    } else {
        this.legend.style('display', 'none');
    }
}
