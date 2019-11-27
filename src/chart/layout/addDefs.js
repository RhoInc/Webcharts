export default function addDefs() {
    const defs = this.svg.append('defs');

    //Add pattern.
    defs.append('pattern')
        .attr({
            id: 'diagonal-stripes',
            x: 0,
            y: 0,
            width: 3,
            height: 8,
            patternUnits: 'userSpaceOnUse',
            patternTransform: 'rotate(30)'
        })
        .append('rect')
        .attr({
            x: '0',
            y: '0',
            width: '2',
            height: '8'
        })
        .style({
            stroke: 'none',
            fill: 'black'
        });

    //Add clipPath.
    defs.append('clipPath')
        .attr('id', this.id)
        .append('rect')
        .attr('class', 'plotting-area');
}
