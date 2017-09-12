import updatePagination from './updatePagination';
import { select } from 'd3';

export default function addLinks() {
    //Count rows.
    this.config.nRows = this.data.filtered[0].values.length;

    //Calculate number of pages needed and create a link for each page.
    this.config.nPages = Math.ceil(this.config.nRows / this.config.nRowsPerPage);
    this.pagination.wrap.selectAll('a,span').remove();

    for (let i = 0; i < this.config.nPages; i++) {
        this.pagination.wrap
            .append('a')
            .datum({ rel: i })
            .attr({
                href: '#',
                rel: i
            })
            .text(i + 1)
            .classed('page-link', true)
            .classed('active', d => d.rel == this.config.activePage)
            .classed('hidden', () => {
                return this.config.activePage < this.config.nPageLinksDisplayed
                    ? i >= this.config.nPageLinksDisplayed // first nPageLinksDisplayed pages
                    : this.config.activePage >= this.config.nPages - this.config.nPageLinksDisplayed
                      ? i < this.config.nPages - this.config.nPageLinksDisplayed // last nPageLinksDisplayed pages
                      : i <
                            this.config.activePage -
                                (Math.ceil(this.config.nPageLinksDisplayed / 2) - 1) ||
                            this.config.activePage + this.config.nPageLinksDisplayed / 2 < i; // nPageLinksDisplayed < activePage or activePage < (nPages - nPageLinksDisplayed)
            });
    }

    this.pagination.links = this.pagination.wrap.selectAll('a.page-link');
}
