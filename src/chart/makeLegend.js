import { ascending, select } from 'd3';

export default function makeLegend(scale = this.colorScale, label = '', custom_data = null) {
    let config = this.config;

    config.legend.mark = config.legend.mark
        ? config.legend.mark
        : config.marks.length && config.marks[0].type === 'bar'
              ? 'square'
              : config.marks.length ? config.marks[0].type : 'square';

    let legend_label = label
        ? label
        : typeof config.legend.label === 'string' ? config.legend.label : '';

    let legendOriginal = this.legend || this.wrap.select('.legend');
    let legend = legendOriginal;

    if (this.config.legend.location === 'top' || this.config.legend.location === 'left') {
        this.wrap.node().insertBefore(legendOriginal.node(), this.svg.node().parentNode);
    } else {
        this.wrap.node().appendChild(legendOriginal.node());
    }
    legend.style('padding', 0);

    let legend_data =
        custom_data ||
        scale.domain().slice(0).filter(f => f !== undefined && f !== null).map(m => {
            return { label: m, mark: config.legend.mark };
        });

    legend
        .select('.legend-title')
        .text(legend_label)
        .style('display', legend_label ? 'inline' : 'none')
        .style('margin-right', '1em');

    let leg_parts = legend.selectAll('.legend-item').data(legend_data, d => d.label + d.mark);

    leg_parts.exit().remove();

    const legendPartDisplay = this.config.legend.location === 'bottom' ||
        this.config.legend.location === 'top'
        ? 'inline-block'
        : 'block';
    let new_parts = leg_parts
        .enter()
        .append('li')
        .attr('class', 'legend-item')
        .style({ 'list-style-type': 'none', 'margin-right': '1em' });
    new_parts.append('span').attr('class', 'legend-mark-text').style('color', d => scale(d.label));
    new_parts
        .append('svg')
        .attr('class', 'legend-color-block')
        .attr('width', '1.1em')
        .attr('height', '1.1em')
        .style({
            position: 'relative',
            top: '0.2em'
        });

    leg_parts.style('display', legendPartDisplay);

    if (config.legend.order) {
        leg_parts.sort((a, b) =>
            ascending(config.legend.order.indexOf(a.label), config.legend.order.indexOf(b.label))
        );
    }

    leg_parts.selectAll('.legend-color-block').select('.legend-mark').remove();
    leg_parts.selectAll('.legend-color-block').each(function(e) {
        let svg = select(this);
        if (e.mark === 'circle') {
            svg
                .append('circle')
                .attr({ cx: '.5em', cy: '.45em', r: '.45em', class: 'legend-mark' });
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
        .style('margin-left', '0.25em')
        .text(d => d.label);

    if (scale.domain().length > 0) {
        const legendDisplay = this.config.legend.location === 'bottom' ||
            this.config.legend.location === 'top'
            ? 'block'
            : 'inline-block';
        legend.style('display', legendDisplay);
    } else {
        legend.style('display', 'none');
    }

    this.legend = legend;
}
