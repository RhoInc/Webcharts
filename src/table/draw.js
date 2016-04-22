import { keys } from 'd3';

export default function draw(rawData = this.raw_data, processedData) {
  const config = this.config;
  const table = this.table;
  const data = processedData || this.transformData(rawData);
  this.wrap.datum(data);

  const colList = config.cols.length ? config.cols : data.length ? keys(data[0].values[0].raw) : [];

  if (config.bootstrap) {
    table.classed('table', true);
  }
  else {
    table.classed('table', false);
  }

  const headerData = !data.length ? [] : config.headers && config.headers.length ? config.headers : colList;
  const headerRow = table.select('thead').select('tr.headers');
  const ths = headerRow.selectAll('th').data(headerData);
  ths.exit().remove();
  ths.enter().append('th');
  ths.text(d => d);

  const tbodies = table.selectAll('tbody').data(data, d => d.key);
  tbodies.exit().remove();
  tbodies.enter().append('tbody');

  if (config.row_per) {
    const revOrder = config.row_per.slice(0).reverse();
    revOrder.forEach(e => {
      tbodies.sort((a, b) => a.values[0].raw[e] - b.values[0].raw[e]);
    });
  }
  const rows = tbodies.selectAll('tr').data(d => d.values);
  rows.exit().remove();
  rows.enter().append('tr');

  if (config.sort_rows) {
    const rowOrder = config.sort_rows.slice(0);
    rowOrder.unshift('0');

    rows.sort((a, b) => {
      let i = 0;
      while (i < rowOrder.length && a.raw[rowOrder[i]] === b.raw[rowOrder[i]]) {
        i++;
      }
      if (a.raw[rowOrder[i]] < b.raw[rowOrder[i]]) {
        return -1;
      }
      if (a.raw[rowOrder[i]] > b.raw[rowOrder[i]]) {
        return 1;
      }
      return 0;
    });
  }

  const tds = rows.selectAll('td')
    .data(d => d.cells.filter(f => colList.indexOf(f.col) > -1));
  tds.exit().remove();
  tds.enter().append('td');
  tds.attr('class', d => d.col);
  if (config.as_html) {
    tds.html(d => d.text);
  }
  else {
    tds.text(d => d.text);
  }

  if (config.row_per) {
    rows.filter((f, i) => i > 0).selectAll('td').filter(f => config.row_per.indexOf(f.col) > -1).text('');
  }

  this.events.onDraw.call(this);
}
