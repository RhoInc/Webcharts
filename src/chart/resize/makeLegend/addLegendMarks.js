import { select } from 'd3';

export default function addLegendMarks(leg_parts, scale) {
    leg_parts
        .selectAll('.legend-color-block')
        .select('.legend-mark')
        .remove();

    leg_parts
        .selectAll('.legend-color-block')
        .each(function(e) {
            let svg = select(this);
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
}
