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
        .append('div')
        .classed('instruction', true)
        .text('Click column headers to sort.');
}
