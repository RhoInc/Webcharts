import { select } from 'd3';

export default function layout() {
    select(this.div).select('.loader').remove();
    let table = this.wrap.append('table');
    table.append('thead').append('tr').attr('class', 'headers');
    this.table = table;
    this.events.onLayout.call(this);
}
