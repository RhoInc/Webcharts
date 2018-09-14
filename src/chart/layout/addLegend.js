export default function addLegend() {
    if (!this.parent)
        this.wrap
            .append('ul')
            .datum(() => null) // prevent data inheritance
            .attr('class', 'legend')
            .style('vertical-align', 'top')
            .append('span')
            .attr('class', 'legend-title');
}
