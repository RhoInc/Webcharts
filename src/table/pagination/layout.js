export default function layout() {
    this.pagination.wrap = this.wrap.select('.table-bottom')
        .append('div')
        .classed('interactivity pagination-container', true)
        .classed('hidden', !this.config.pagination);
}
