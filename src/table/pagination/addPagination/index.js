import addLinks from './addLinks';
import addArrows from './addArrows';
import updatePagination from './updatePagination';
import { select } from 'd3';

export default function addPagination() {
    const listing = this;
    //Calculate number of pages needed and create a link for each page.
    this.config.nRows = this.data.filtered[0].values.length;
    this.config.nPages = Math.ceil(this.config.nRows / this.config.nRowsPerPage);

    //hide the pagination if there is only one page
    this.config.paginationHidden = this.config.nPages == 1
    this.pagination.wrap.classed('hidden',this.config.paginationHidden);

    //Render page links.
    addLinks.call(this);

    //Render a different page on click.
    this.pagination.links.on('click', function() {
        listing.config.activePage = +select(this).attr('rel');
        updatePagination.call(listing);
    });

    //Render arrow links.
    addArrows.call(this);

    //Render a different page on click.
    this.pagination.arrows.on('click', function() {
        if (listing.config.activePage !== +select(this).attr('rel')) {
            listing.config.activePage = +select(this).attr('rel');
            listing.pagination.prev.attr(
                'rel',
                listing.config.activePage > 0 ? listing.config.activePage - 1 : 0
            );
            listing.pagination.next.attr(
                'rel',
                listing.config.activePage < listing.config.nPages
                    ? listing.config.activePage + 1
                    : listing.config.nPages - 1
            );
            updatePagination.call(listing);
        }
    });

    //Render a different page on click.
    this.pagination.doubleArrows.on('click', function() {
        listing.config.activePage = +select(this).attr('rel');
        updatePagination.call(listing);
    });
}
