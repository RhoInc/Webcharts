export default function layout() {
    this.exportable.wrap = this.wrap.select('.table-bottom')
        .append('div')
        .classed('interactivity exportable-container', true)
        .classed('hidden', !this.config.exportable);

    this.exportable.wrap.append('span').text('Export:');

    if (this.config.exports && this.config.exports.length)
        this.config.exports.forEach(fmt => {
            this.exportable.wrap
                .append('a')
                .classed('export', true)
                .attr({
                    id: fmt
                })
                .text(fmt.toUpperCase());
        });
}
