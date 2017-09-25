export default function addArrows() {
    let prev = this.config.activePage - 1,
        next = this.config.activePage + 1;
    if (prev < 0) prev = 0; // nothing before the first page
    if (next >= this.config.nPages) next = this.config.nPages - 1; // nothing after the last page

    /**-------------------------------------------------------------------------------------------\
      Left side
    \-------------------------------------------------------------------------------------------**/

    this.pagination.wrap
        .insert('span', ':first-child')
        .classed('dot-dot-dot', true)
        .text('...')
        .classed('hidden', this.config.activePage < this.config.nPageLinksDisplayed);

    this.pagination.prev = this.pagination.wrap
        .insert('a', ':first-child')
        .classed('left arrow-link', true)
        .classed('hidden', this.config.activePage == 0)
        .attr({
            rel: prev
        })
        .text('<');

    this.pagination.doublePrev = this.pagination.wrap
        .insert('a', ':first-child')
        .classed('left double-arrow-link', true)
        .classed('hidden', this.config.activePage == 0)
        .attr({
            rel: 0
        })
        .text('<<');

    /**-------------------------------------------------------------------------------------------\
      Right side
    \-------------------------------------------------------------------------------------------**/

    this.pagination.wrap
        .append('span')
        .classed('dot-dot-dot', true)
        .text('...')
        .classed(
            'hidden',
            this.config.activePage >=
                Math.max(
                    this.config.nPageLinksDisplayed,
                    this.config.nPages - this.config.nPageLinksDisplayed
                ) || this.config.nPages <= this.config.nPageLinksDisplayed
        );
    this.pagination.next = this.pagination.wrap
        .append('a')
        .classed('right arrow-link', true)
        .classed("hidden",this.config.activePage==this.config.nPages - 1 || this.config.nPages == 0)
        .attr({
            rel: next
        })
        .text('>');

    this.pagination.doubleNext = this.pagination.wrap
        .append('a')
        .classed('right double-arrow-link', true)
        .classed("hidden",this.config.activePage==this.config.nPages - 1 || this.config.nPages == 0)
        .attr({
            rel: this.config.nPages - 1
        })
        .text('>>');

    this.pagination.arrows = this.pagination.wrap.selectAll('a.arrow-link');
    this.pagination.doubleArrows = this.pagination.wrap.selectAll('a.double-arrow-link');
}
