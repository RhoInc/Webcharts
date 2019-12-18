// TODO: consider moving legend around DOM on layout rather than on resize
export default function moveLegend(scale) {
    const legend = this.legend || this.wrap.select('.legend');

    if (!this.parent) {
        //singular chart
        if (this.config.legend.location === 'top' || this.config.legend.location === 'left') {
            this.wrap.node().insertBefore(legend.node(), this.svg.node().parentNode);
        } else {
            this.wrap.node().appendChild(legend.node());
        }
    } else {
        //multiples - keep legend outside of individual charts' wraps
        if (this.config.legend.location === 'top' || this.config.legend.location === 'left') {
            this.parent.wrap
                .node()
                .insertBefore(legend.node(), this.parent.wrap.select('.wc-chart').node());
        } else {
            this.parent.wrap.node().appendChild(legend.node());
        }
    }

    legend
        .classed(`legend--${this.config.legend.location}`, true)
        .classed('legend--empty', scale.domain().length === 0); // display: none when color_by is not set?

    return legend;
}
