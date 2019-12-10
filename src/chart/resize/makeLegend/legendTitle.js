export default function legendTitle(label) {
    const legendTitle = this.legend
        .select('.legend-title')
        .text(
            label
                ? label
                : typeof this.config.legend.label === 'string'
                ? this.config.legend.label
                : ''
        );

    return legendTitle;
}
