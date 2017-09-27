import { select } from 'd3';

export default function layout() {
    select(this.div).select('.loader').remove();
    let table = this.wrap.append('table');
    table.append('thead').append('tr').attr('class', 'headers');
    this.table = table;

    //Define search container.
    this.search.layout.call(this);

    //Define data export container.
    this.exportData.layout.call(this);

    //Define sort container.
    this.sort.layout.call(this);

    //Define pagination container.
    this.pagination.layout.call(this);

    //Call layout callback.
    this.events.onLayout.call(this);
}
