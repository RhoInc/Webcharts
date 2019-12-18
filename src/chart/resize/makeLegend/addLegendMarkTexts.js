export default function addLegendMarkTexts(legend_items, scale) {
    const legend_mark_texts = legend_items
        .append('span')
        .classed('legend-mark-text', true)
        .style('color', d => scale(d.label));

    return legend_mark_texts;
}
