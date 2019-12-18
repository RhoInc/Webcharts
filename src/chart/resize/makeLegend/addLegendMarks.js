import { select } from 'd3';

export default function addLegendMarks(legend_color_blocks, scale) {
    legend_color_blocks.each(function(e) {
        const svg = select(this);
        svg.select('.legend-mark').remove();

        if (e.mark === 'circle') {
            svg.append('circle')
                .classed('legend-mark', true)
                .attr({
                    cx: '.5em',
                    cy: '.5em',
                    r: '.45em'
                });
        } else if (e.mark === 'line') {
            svg.append('line')
                .classed('legend-mark', true)
                .attr({
                    x1: 0,
                    y1: '.5em',
                    x2: '1em',
                    y2: '.5em',
                    'stroke-width': 2,
                    'shape-rendering': 'crispEdges'
                });
        } else if (e.mark === 'square') {
            svg.append('rect')
                .classed('legend-mark', true)
                .attr({
                    height: '1em',
                    width: '1em',
                    'shape-rendering': 'crispEdges'
                });
        }
    });

    const legend_marks = legend_color_blocks
        .select('.legend-mark')
        .attr({
            fill: d => d.color || scale(d.label),
            stroke: d => d.color || scale(d.label)
        })
        .each(function(e) {
            // apply custom mark attributes
            select(this).attr(e.attributes);
        });
}
