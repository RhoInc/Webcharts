import addLinks from './addLinks';
import addArrows from './addArrows';
import updatePagination from './updatePagination';
import { select } from 'd3';

export default function addPagination() {
    const listing = this;

    //Render page links.
    addLinks.call(this);

    //Render a different page on click.
    this.pagination.links.on('click', function() {
        listing.pagination.settings.activePage = +select(this).attr('rel');
        updatePagination.call(listing);
    });

    //Render arrow links.
    addArrows.call(this);

    //Render a different page on click.
    this.pagination.arrows.on('click', function() {
        if (listing.pagination.settings.activePage !== +select(this).attr('rel')) {
            listing.pagination.settings.activePage = +select(this).attr('rel');
            listing.pagination.prev.attr(
                'rel',
                listing.pagination.settings.activePage > 0
                    ? listing.pagination.settings.activePage - 1
                    : 0
            );
            listing.pagination.next.attr(
                'rel',
                listing.pagination.settings.activePage < listing.pagination.settings.nPages
                    ? listing.pagination.settings.activePage + 1
                    : listing.pagination.settings.nPages - 1
            );
            updatePagination.call(listing);
        }
    });

    //Render a different page on click.
    this.pagination.doubleArrows.on('click', function() {
        listing.pagination.settings.activePage = +select(this).attr('rel');
        updatePagination.call(listing);
    });
}
