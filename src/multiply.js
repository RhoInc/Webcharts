webCharts.multiply = function(chart, split_by, constrain_domains, order){
  // let context = this;
  let config = chart.config;
  let wrap = chart.wrap.classed('wc-layout wc-small-multiples', true).classed('wc-chart', false);
  let master_legend = wrap.append('ul').attr('class', 'legend');

  d3.csv(chart.filepath, function(error, csv){
    chart.raw_data = csv;
    chart.onDataError(error);
    chart.checkRequired(csv);
    goAhead(csv);
  });

  function goAhead(data){
    let split_vals = d3.set(data.map(m => m[split_by])).values().filter(f => f);
    if(order)
      split_vals = split_vals.sort((a,b) => d3.ascending(order.indexOf(a), order.indexOf(b)) );

    split_vals.forEach(e => {
      let split_data = data.filter(f => f[split_by] === e);
      var mchart = webCharts.chart(chart.wrap.node(), null, config, chart.controls);
      mchart.events = chart.events;
      mchart.legend = master_legend;
      // mchart.multiplied = {col: split_by, value: e};
      mchart.filters.unshift({col: split_by, val: e, choices: split_vals});
      mchart.wrap.insert('span', 'svg').attr('class', 'wc-chart-title').text(e);
      mchart.init(data);

    });
  }

};
