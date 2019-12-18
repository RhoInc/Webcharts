export default function addLegendLabels(legend_items) {
    const legend_labels = legend_items
        .append('span')
        .classed('legend-label', true)
        .text(d => d.label);

    return legend_labels;
}
