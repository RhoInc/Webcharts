import { select } from 'd3';

export default function layout() {
    //Clear loading indicator.
    select(this.div).select('.loader').remove();

    this.wrap.append('div')
        .classed('table-top', true);

        //Attach sort container.
        this.sortable.layout.call(this);

        //Attach search container.
        this.searchable.layout.call(this);

    //Attach table to DOM.
    this.table = this.wrap.append('table');
    this.table
        .append('thead')
        .append('tr')
        .classed('headers', true);

    this.wrap.append('div')
        .classed('table-bottom', true);

        //Attach data export container.
        this.exportable.layout.call(this);

        //Attach pagination container.
        this.pagination.layout.call(this);

    //Call layout callback.
    this.events.onLayout.call(this);
}
