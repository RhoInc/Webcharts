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
        listing.pagination.settings.activeLink = +select(this).attr('rel');
        updatePagination.call(listing);
    });

    //Render arrow links.
    addArrows.call(this);

    //Render a different page on click.
    this.pagination.arrows.on('click', function() {
        if (listing.pagination.settings.activeLink !== +select(this).attr('rel')) {
            listing.pagination.settings.activeLink = +select(this).attr('rel');
            listing.pagination.prev.attr(
                'rel',
                listing.pagination.settings.activeLink > 0 ? listing.pagination.settings.activeLink - 1 : 0
            );
            listing.pagination.next.attr(
                'rel',
                listing.pagination.settings.activeLink < listing.pagination.settings.numPages
                    ? listing.pagination.settings.activeLink + 1
                    : listing.pagination.settings.numPages - 1
            );
            updatePagination.call(listing);
        }
    });

    //Render a different page on click.
    this.pagination.doubleArrows.on('click', function() {
        listing.pagination.settings.activeLink = +select(this).attr('rel');
        updatePagination.call(listing);
    });
}
