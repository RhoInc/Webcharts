import { ascending, set } from 'd3';
import createChart from './createChart';

export default function (chart, data, splitBy, order) {
  const config = chart.config;
  const wrap = chart.wrap.classed('wc-layout wc-small-multiples', true).classed('wc-chart', false);
  const masterLegend = wrap.append('ul').attr('class', 'legend');

  function goAhead(input) {
    let splitVals = set(input.map(m => m[splitBy])).values().filter(f => f);
    if (order) {
      splitVals = splitVals.sort((a, b) => ascending(order.indexOf(a), order.indexOf(b)));
    }

    splitVals.forEach(e => {
      const mchart = createChart(chart.wrap.node(), config, chart.controls);
      mchart.events = chart.events;
      mchart.legend = masterLegend;
      mchart.filters.unshift({ col: splitBy, val: e, choices: splitVals });
      mchart.wrap.insert('span', 'svg').attr('class', 'wc-chart-title').text(e);
      mchart.init(input);
    });
  }

  goAhead(data);
}
