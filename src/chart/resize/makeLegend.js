import moveLegend from './makeLegend/moveLegend';
import defineLegendData from './makeLegend/defineLegendData';
import addLegendTitle from './makeLegend/addLegendTitle';
import addLegendItems from './makeLegend/addLegendItems';
import addLegendMarks from './makeLegend/addLegendMarks';
import { ascending, select } from 'd3';

export default function makeLegend(scale = this.colorScale, label = '', custom_data = null) {
    // should the legend be moved on layout?
    this.legend = moveLegend.call(this);

    // determine appropriate legend mark type
    this.config.legend.mark = (this.config.legend.mark || this.config.marks[0].type).replace(/bar|text/, 'square');

    const legend_label = label || this.config.legend.label || '';
    const legend_data = defineLegendData.call(this, custom_data, scale);
    const legend_title = addLegendTitle.call(this, legend_label);
    const legend_items = this.legend
        .selectAll('.legend-item')
        .data(legend_data, d => d.label + d.mark);

    legend_items.exit().remove();

    const legendPartDisplay =
        this.config.legend.location === 'bottom' || this.config.legend.location === 'top'
            ? 'inline-block'
            : 'block';

    const new_parts = addLegendItems.call(this, legend_items, scale);

    legend_items.style('display', legendPartDisplay);

    if (this.config.legend.order) {
        legend_items.sort((a, b) =>
            ascending(this.config.legend.order.indexOf(a.label), this.config.legend.order.indexOf(b.label))
        );
    }

    const legend_marks = addLegendMarks.call(this, legend_items, scale);

    new_parts
        .append('span')
        .attr('class', 'legend-label')
        .style('margin-left', '0.25em')
        .text(d => d.label);

    if (scale.domain().length > 0) {
        const legendDisplay =
            (this.config.legend.location === 'bottom' || this.config.legend.location === 'top') &&
            !this.parent
                ? 'block'
                : 'inline-block';
        this.legend.style('display', legendDisplay);
    } else {
        this.legend.style('display', 'none');
    }
}
