export default function addArrows() {
    let prev = this.pagination.settings.activeLink - 1,
        next = this.pagination.settings.activeLink + 1;
    if (prev < 0)
        prev = 0; // nothing before the first page
    if (next >= this.pagination.settings.numPages)
        next = this.pagination.settings.numPages - 1; // nothing after the last page

    this.pagination.wrap
        .insert('span', ':first-child')
        .text('...')
        .classed('hidden', this.pagination.settings.activeLink <= 4);

    this.pagination.prev = this.pagination.wrap
        .insert('a', ':first-child')
        .classed('left arrow-link', true)
        .attr({
            href: '#',
            rel: prev
        })
        .text('<');

    this.pagination.doublePrev = this.pagination.wrap
        .insert('a', ':first-child')
        .classed('left double-arrow-link', true)
        .attr({
            href: '#',
            rel: 0
        })
        .text('<<');

    this.pagination.wrap
        .append('span')
        .text('...')
        .classed('hidden', this.pagination.settings.activeLink >= this.pagination.settings.numPages - 5);

    this.pagination.next = this.pagination.wrap
        .append('a')
        .classed('right arrow-link', true)
        .attr({
            href: '#',
            rel: next
        })
        .text('>');

    this.pagination.doubleNext = this.pagination.wrap
        .append('a')
        .classed('right double-arrow-link', true)
        .attr({
            href: '#',
            rel: this.pagination.settings.numPages - 1
        })
        .text('>>');

    this.pagination.arrows = this.pagination.wrap.selectAll('a.arrow-link');
    this.pagination.doubleArrows = this.pagination.wrap.selectAll('a.double-arrow-link');
}
