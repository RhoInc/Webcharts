import { select } from 'd3';

export default function layout() {
    //Clear loading indicator.
    select(this.div).select('.loader').remove();

  //Attach container before table.
    this.wrap.append('div')
        .classed('table-top', true);

        //Attach sort container.
        this.sortable.layout.call(this);

        //Attach search container.
        this.searchable.layout.call(this);

    //Attach table to DOM.
    this.table = this.wrap
        .append('table')
        .classed('table', this.config.bootstrap); // apply class to incorporate bootstrap styling
    this.thead = this.table
        .append('thead');
    this.tbody = this.table
        .append('tbody');

  //Attach container after table.
    this.wrap.append('div')
        .classed('table-bottom', true);

        //Attach data export container.
        this.exportable.layout.call(this);

        //Attach pagination container.
        this.pagination.layout.call(this);

    //Call layout callback.
    this.events.onLayout.call(this);
}
