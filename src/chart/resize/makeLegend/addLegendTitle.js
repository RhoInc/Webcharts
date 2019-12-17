export default function addLegendTitle(legend_label) {
    const legend_title = this.legend
        .select('.legend-title')
        .text(legend_label);

    return legend_title;
}
