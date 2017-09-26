export default function layout() {
    this.exportData.wrap = this.wrap
        .insert('div', ':first-child')
        .classed('export-data-container', true);

    this.exportData.wrap.append('span').text('Download data:');

    if (this.config.exportFormats && this.config.exportFormats.length)
        this.config.exportFormats.forEach(fmt => {
            this.exportData.wrap
                .append('a')
                .classed('download', true)
                .attr({
                    id: fmt
                })
                .text(fmt.toUpperCase());
        });
}
