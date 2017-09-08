import updatePagination from './updatePagination';
import { select } from 'd3';

export default function addLinks() {
    //Count rows.
    this.pagination.settings.nRows = this.data.filtered[0].values.length;

    //Calculate number of pages needed and create a link for each page.
    this.pagination.settings.nPages = Math.ceil(
        this.pagination.settings.nRows / this.pagination.settings.nRowsPerPage
    );
    this.pagination.wrap.selectAll('a,span').remove();

    for (let i = 0; i < this.pagination.settings.nPages; i++) {
        this.pagination.wrap
            .append('a')
            .datum({ rel: i })
            .attr({
                href: '#',
                rel: i
            })
            .text(i + 1)
            .classed('page-link', true)
            .classed('active', d => d.rel == this.pagination.settings.activePage)
            .classed(
                'hidden',
                this.pagination.settings.activePage < this.pagination.settings.nPageLinksDisplayed
                    ? i >= this.pagination.settings.nPageLinksDisplayed
                    : this.pagination.settings.activePage >=
                          this.pagination.settings.nPages -
                              this.pagination.settings.nPageLinksDisplayed
                      ? i <
                            this.pagination.settings.nPages -
                                this.pagination.settings.nPageLinksDisplayed
                      : i < this.pagination.settings.activePage - 2 ||
                            this.pagination.settings.activePage + 2 < i
            );
    }

    this.pagination.links = this.pagination.wrap.selectAll('a.page-link');
}
