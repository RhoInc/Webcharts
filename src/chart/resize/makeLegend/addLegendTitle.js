export default function addLegendTitle(legend_label) {
    const legend_title = this.legend
        .select('.legend-title')
        .text(legend_label)
        .style('display', legend_label ? 'inline' : 'none')
        .style('margin-right', '1em');

    return legend_title;
}
