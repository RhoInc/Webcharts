export default function moveLegend() {
    const legend = this.wrap.select('.legend');

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

    return this.legend || legend;
}
