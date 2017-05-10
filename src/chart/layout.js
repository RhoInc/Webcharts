export default function() {
    this.svg = this.wrap
        .append('svg')
        .attr({
            class: 'wc-svg',
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            xlink: 'http://www.w3.org/1999/xlink'
        })
        .append('g')
        .style('display', 'inline-block');

    let defs = this.svg.append('defs');
    defs
        .append('pattern')
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
            height: '8',
            style: 'stroke:none; fill:black'
        });

    defs.append('clipPath').attr('id', this.id).append('rect').attr('class', 'plotting-area');

    //y axis
    this.svg
        .append('g')
        .attr('class', 'y axis')
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('dy', '.75em')
        .attr('text-anchor', 'middle');
    //x axis
    this.svg
        .append('g')
        .attr('class', 'x axis')
        .append('text')
        .attr('class', 'axis-title')
        .attr('dy', '-.35em')
        .attr('text-anchor', 'middle');
    //overlay
    this.svg
        .append('rect')
        .attr('class', 'overlay')
        .attr('opacity', 0)
        .attr('fill', 'none')
        .style('pointer-events', 'all');
    //add legend
    const legend = this.wrap.append('ul');
    legend
        .attr('class', 'legend')
        .style('vertical-align', 'top')
        .append('span')
        .attr('class', 'legend-title');

    d3.select(this.div).select('.loader').remove();

    this.events.onLayout.call(this);
}
