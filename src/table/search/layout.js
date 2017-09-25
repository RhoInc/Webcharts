export default function layout() {
    const table = this;

    this.search.wrap = this.wrap
        .insert('div', ':first-child')
        .classed('search-container', true)
        .classed('hidden', !this.config.searchable);
    this.search.wrap.append('span').classed('description', true).text('Search:');
    this.search.wrap.append('input').classed('search-box', true).on('input', function() {
      table.search.filterRows.call(this, table)
    });
}
