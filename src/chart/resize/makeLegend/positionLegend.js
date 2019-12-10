export default function positionLegend() {
    let legend;

    if (!this.hasOwnProperty('legend'))
        legend = this.wrap.select('.legend');
    else
        legend = this.legend;


    if (!this.parent) {
        // singular chart
        if (this.config.legend.location === 'top' || this.config.legend.location === 'left') {
            this.wrap.node().insertBefore(legend.node(), this.svg.node().parentNode);
        } else {
            this.wrap.node().appendChild(legend.node());
        }

        legend = this.wrap.select('.legend');
    } else {
        // multiples - keep legend outside of individual charts' wraps
        if (this.config.legend.location === 'top' || this.config.legend.location === 'left') {
            this.parent.wrap
                .node()
                .insertBefore(legend.node(), this.parent.wrap.select('.wc-chart').node());
        } else {
            this.parent.wrap.node().appendChild(legend.node());
        }

        legend = this.parent.wrap.select('.legend');
    }

    return legend;
}
