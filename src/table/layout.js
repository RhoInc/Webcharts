import { select } from 'd3';

export default function layout() {
  select(this.div).select('.loader').remove();
  const table = this.wrap.append('table')
    .attr('class', 'WebchartsTable');
  table
  .append('thead')
    .append('tr')
    .attr('class', 'WebchartsTable__HeaderRow headers');
  this.table = table;
  this.events.onLayout.call(this);
}
