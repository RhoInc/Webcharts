export default function layout() {
    const context = this;

    this.searchable.wrap = this.wrap
        .select('.table-top')
        .append('div')
        .classed('interactivity searchable-container', true)
        .classed('hidden', !this.config.searchable);
    this.searchable.wrap.append('div').classed('search', true);
    this.searchable.wrap.select('.search').append('span').classed('nNrecords', true);
    this.searchable.wrap
        .select('.search')
        .append('input')
        .classed('search-box', true)
        .attr('placeholder', 'Search')
        .on('input', function() {
            context.searchable.searchTerm = this.value.toLowerCase() || null;
            context.config.activePage = 0;
            context.config.startIndex = context.config.activePage * context.config.nRowsPerPage; // first row shown
            context.config.endIndex = context.config.startIndex + context.config.nRowsPerPage; // last row shown
            context.draw();
        });
}
