import { select } from 'd3';
import addLinks from './addLinks';
import addArrows from './addArrows';
import updatePagination from './updatePagination';

export default function addPagination(data) {
    const context = this;

    //Calculate number of pages needed and create a link for each page.
    this.config.nRows = data.length;
    this.config.nPages = Math.ceil(this.config.nRows / this.config.nRowsPerPage);

    //hide the pagination if there is only one page
    this.config.paginationHidden = this.config.nPages === 1;
    this.pagination.wrap.classed('hidden', this.config.paginationHidden);

    //Render page links.
    addLinks.call(this);

    //Render a different page on click.
    this.pagination.links.on('click', function() {
        context.config.activePage = +select(this).attr('rel');
        updatePagination.call(context);
    });

    //Render arrow links.
    addArrows.call(this);

    //Render a different page on click.
    this.pagination.arrows.on('click', function() {
        if (context.config.activePage !== +select(this).attr('rel')) {
            context.config.activePage = +select(this).attr('rel');
            context.pagination.prev.attr(
                'rel',
                context.config.activePage > 0 ? context.config.activePage - 1 : 0
            );
            context.pagination.next.attr(
                'rel',
                context.config.activePage < context.config.nPages
                    ? context.config.activePage + 1
                    : context.config.nPages - 1
            );
            updatePagination.call(context);
        }
    });

    //Render a different page on click.
    this.pagination.doubleArrows.on('click', function() {
        context.config.activePage = +select(this).attr('rel');
        updatePagination.call(context);
    });

    return {
        addLinks: addLinks,
        addArrows: addArrows,
        updatePagination: updatePagination
    };
}
