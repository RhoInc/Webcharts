import { ascending } from 'd3';

export default function addLegendItems(legend_data, scale) {
    // join data to legend-item selection
    const all_legend_items = this.legend
        .selectAll('.legend-item')
        .data(legend_data, d => d.label + d.mark);

    // exit and remove
    all_legend_items.exit().remove();

    // enter and append
    const legend_items = all_legend_items
        .enter()
        .append('li')
        .classed('legend-item', true);

    // update order of legend items in DOM
    if (this.config.legend.order) {
        legend_items.sort((a, b) =>
            ascending(
                this.config.legend.order.indexOf(a.label),
                this.config.legend.order.indexOf(b.label)
            )
        );
    }

    return legend_items;
}
