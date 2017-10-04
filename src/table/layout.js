import { select } from 'd3';

export default function layout() {
    //Clear loading indicator.
    select(this.div).select('.loader').remove();

    //Attach container before table.
    this.wrap.append('div').classed('table-top', true);

    //Attach search container.
    this.searchable.layout.call(this);

    //Attach sort container.
    this.sortable.layout.call(this);

    //Attach table to DOM.
    this.table = this.wrap.append('table').classed('table', this.config.bootstrap); // apply class to incorporate bootstrap styling
    this.thead = this.table.append('thead');
    this.thead
        .append('tr')
        .selectAll('th')
        .data(this.config.headers)
        .enter()
        .append('th')
        .attr('class', d => this.config.cols[this.config.headers.indexOf(d)]) // associate column header with column name
        .text(d => d);

    this.tbody = this.table.append('tbody');

    //Attach container after table.
    this.wrap.append('div').classed('table-bottom', true);

    //Attach pagination container.
    this.pagination.layout.call(this);

    //Attach data export container.
    this.exportable.layout.call(this);

    //Call layout callback.
    this.events.onLayout.call(this);
}
