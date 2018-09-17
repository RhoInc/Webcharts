export default function addLegend() {
    //The legend is contained in the parent object of multiples so each multiple does not need its own legend.
    if (!this.parent)
        this.wrap
            .append('ul')
            .datum(() => null) // prevent data inheritance
            .attr('class', 'legend')
            .style('vertical-align', 'top')
            .append('span')
            .attr('class', 'legend-title');
}
