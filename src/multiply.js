/** A shortcut for creating many charts at once. Given a {@link webCharts~chart chart} object and a variable from its dataset, a new chart is created for each unique value of that variable. Each new chart rendered using a filtered version of the original dataset.
*@method multiply
*@memberof webCharts
*@param {chart} chart the {@link chart.md chart} object used as a template
*@param {string} split_by a header from the chart's dataset, the values of which are used to panel the resulting charts
*@param {array} order an array of the values defined by split_by, the order of which defines the order of the charts
*/
webCharts.multiply = function(chart, split_by, order){
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
      mchart.filters.unshift({col: split_by, val: e, choices: split_vals});
      mchart.wrap.insert('span', 'svg').attr('class', 'wc-chart-title').text(e);
      mchart.init(data);
    });
  }
};
