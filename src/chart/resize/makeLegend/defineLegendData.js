export default function defineLegendData(custom_data, scale) {
    const legend_data = custom_data ||
        scale
            .domain()
            .slice(0)
            .filter(f => f !== undefined && f !== null)
            .map(m => {
                return { label: m, mark: this.config.legend.mark };
            });

    return legend_data;
}
