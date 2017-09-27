import { select } from 'd3';

export default function layout() {
    const context = this;

    //Add sort container.
    this.sort.wrap = this.wrap.insert('div', ':first-child').classed('sort-container', true);
    this.sort.wrap
        .append('span')
        .classed('instruction', true)
        .text('Click any column header to sort that column.');
}
