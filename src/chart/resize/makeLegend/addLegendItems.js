export default function addLegendItems(leg_parts, scale) {
    const new_parts = leg_parts
        .enter()
        .append('li')
        .attr('class', 'legend-item')
        .style({ 'list-style-type': 'none', 'margin-right': '1em' });
    new_parts
        .append('span')
        .attr('class', 'legend-mark-text')
        .style('color', d => scale(d.label));
    new_parts
        .append('svg')
        .attr('class', 'legend-color-block')
        .attr('width', '1.1em')
        .attr('height', '1.1em')
        .style({
            position: 'relative',
            top: '0.2em'
        });

    return new_parts;
}
