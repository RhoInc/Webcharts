export default function addLegendColorBlocks(legend_items) {
    const legend_color_blocks = legend_items
        .append('svg')
        .classed('legend-color-block', true)
        .attr({
            width: '1.1em',
            height: '1.1em',
        });

    return legend_color_blocks;
}
