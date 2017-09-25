import { select } from 'd3';

export default function layout() {
    select(this.div).select('.loader').remove();
    let table = this.wrap.append('table');
    table.append('thead').append('tr').attr('class', 'headers');
    this.table = table;

    //Define pagination container.
    this.pagination.layout.call(this);

    //Define search container.
    this.search.layout.call(this);

    //Call layout callback.
    this.events.onLayout.call(this);
}
