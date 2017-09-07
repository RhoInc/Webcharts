export default function layout() {
    this.pagination.wrap = this.wrap
        .append('div')
        .classed('pagination-container', true);
}
