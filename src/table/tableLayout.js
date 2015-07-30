export function tableLayout(){
  d3.select(this.div).select('.loader').remove();
  let table = this.wrap.append('table');
  table.append('thead').append('tr').attr('class', 'headers');
  this.table = table;
  this.events.onLayout(this);
}
