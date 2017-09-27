export default function layout() {
    const table = this;

    this.searchable.wrap = this.wrap.select('.table-top')
        .append('div')
        .classed('interactivity searchable-container', true)
        .classed('hidden', !this.config.searchable);
    this.searchable.wrap.append('span').classed('description', true).text('Search:');
    this.searchable.wrap.append('input').classed('search-box', true).on('input', function() {
        table.searchable.filterRows.call(table, this);
    });
}
