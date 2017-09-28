import { select } from 'd3';

export default function layout() {
    const context = this;

    //Add sort container.
    this.sortable.wrap = this.wrap
        .select('.table-top')
        .append('div')
        .classed('interactivity sortable-container', true)
        .classed('hidden', !this.config.sortable);
    this.sortable.wrap
        .append('span')
        .classed('instruction', true)
        .text('Click any column header to sort that column.');
}