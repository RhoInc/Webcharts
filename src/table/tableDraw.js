export function tableDraw(raw_data, processed_data){
  let raw = raw_data ? raw_data : this.raw_data;
  let config = this.config;
  let data = processed_data || this.transformData(raw);
  this.wrap.datum(data);
  let table = this.table;

  let col_list = config.cols.length ? config.cols : data.length ? d3.keys(data[0].values[0].raw) : [];

  if(config.bootstrap){
    table.classed('table', true);
  }
  else{
    table.classed('table', false);
  }

  let header_data = !data.length ? [] : config.headers && config.headers.length ? config.headers : col_list;
  let headerRow = table.select('thead').select('tr.headers');
  let ths = headerRow.selectAll('th').data(header_data);
  ths.exit().remove();
  ths.enter().append('th');
  ths.text(d => d);

  let tbodies = table.selectAll('tbody').data(data, d => d.key);
  tbodies.exit().remove();
  tbodies.enter().append('tbody');

  if(config.row_per){
    let rev_order = config.row_per.slice(0).reverse();
    rev_order.forEach(e => {
        tbodies.sort((a,b) => a.values[0].raw[e] -  b.values[0].raw[e] );
    });
  }
  let rows = tbodies.selectAll('tr').data(d => d.values );
  rows.exit().remove();
  rows.enter().append('tr');

  if(config.sort_rows){
    let row_order = config.sort_rows.slice(0);
    row_order.unshift('0');

    rows.sort((a,b) => {
        let i = 0;
        while(i < row_order.length && a.raw[row_order[i]] == b.raw[row_order[i]] ){
          i++;
        }
        if(a.raw[row_order[i]] < b.raw[row_order[i]]){
          return -1;
        }
        if(a.raw[row_order[i]] > b.raw[row_order[i]]){
          return 1;
        }
        return 0;
    });
  }

  let tds = rows.selectAll('td').data(d => d.cells.filter(f => col_list.indexOf(f.col) > -1) );
  tds.exit().remove();
  tds.enter().append('td');
  tds.attr('class', d => d.col);
  if(config.as_html){
    tds.html(d => d.text);
  }
  else{
    tds.text(d => d.text);
  }

  if(config.row_per){
    rows.filter((f,i) => i > 0).selectAll('td').filter(f => config.row_per.indexOf(f.col) > -1).text('');
  }

  if(config.data_tables){
    if(jQuery() && jQuery().dataTable){
      let dt_config = config.data_tables;
      dt_config.searching = config.searchable ? config.searchable : false;
      $(table.node()).dataTable(dt_config);
      let print_btn = $('.print-btn', wrap.node());
      print_btn.addClass('pull-right');
      $('.dataTables_wrapper').prepend( print_btn );
    }
    else{
      throw new Error('dataTables jQuery plugin not available');
    }
  }

  this.events.onDraw(this);
}
