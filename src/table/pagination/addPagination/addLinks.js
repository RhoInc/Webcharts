import updatePagination from './updatePagination';
import { select } from 'd3';

export default function addLinks() {
    //Count rows.
    this.pagination.settings.rowsTotal = this.raw_data.length;

    //Calculate number of pages needed and create a link for each page.
    this.pagination.settings.numPages = Math.ceil(this.pagination.settings.rowsTotal / this.pagination.settings.rowsShown);
    this.pagination.wrap.selectAll('a,span').remove();

    for (let i = 0; i < this.pagination.settings.numPages; i++) {
        this.pagination.wrap
            .append('a')
            .datum({ rel: i })
            .attr({
                href: '#',
                rel: i
            })
            .text(i + 1)
            .classed('page-link', true)
            .classed('active', d => d.rel == this.pagination.settings.activeLink)
            .classed(
                'hidden',
                this.pagination.settings.activeLink <= 4
                    ? i > 4
                    : this.pagination.settings.activeLink >= this.pagination.settings.numPages - 5
                      ? i < this.pagination.settings.numPages - 5
                      : i < this.pagination.settings.activeLink - 2 || this.pagination.settings.activeLink + 2 < i
            );
    }

    this.pagination.links = this.pagination.wrap.selectAll('a.page-link');
}
