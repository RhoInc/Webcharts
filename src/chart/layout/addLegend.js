export default function addLegend() {
    //The legend is contained in the parent object of multiples so each multiple does not need its own legend.
    if (!this.parent) {
        const legend = this.wrap
            .append('ul')
            .datum(() => null) // prevent data inheritance
            .classed('legend', true);
        const legend_title = legend.append('span').classed('legend-title', true);
    }
}
