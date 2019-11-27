import updatePagination from './updatePagination';
import { select } from 'd3';

export default function addLinks() {
    //Count rows.

    this.pagination.wrap.selectAll('a,span').remove();

    for (let i = 0; i < this.config.nPages; i++) {
        this.pagination.wrap
            .append('a')
            .datum({ rel: i })
            .attr({
                rel: i
            })
            .text(i + 1)
            .classed('wc-button page-link', true)
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
