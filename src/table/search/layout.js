export default function layout() {
    const
        searchContainer = this.wrap
            .append('div')
            .classed('search-container', true);
    searchContainer.append('span').classed('description', true).text('Search:');
    searchContainer.append('input').attr('class', 'search-box');
}
