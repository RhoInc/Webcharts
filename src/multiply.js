import createChart from './createChart';
import { set, ascending } from 'd3';

export default function multiply(chart, data, split_by, order, test=false) {
    let config = chart.config;
    let wrap = chart.wrap.classed('wc-layout wc-small-multiples', true).classed('wc-chart', false);
    let master_legend = wrap.append('ul').attr('class', 'legend');
    chart.multiples = []

    function goAhead(data) {
        let split_vals = set(data.map(m => m[split_by])).values().filter(f => f);
        if (order) {
            split_vals = split_vals.sort((a, b) => ascending(order.indexOf(a), order.indexOf(b)));
        }
        split_vals.forEach(e => {
            var mchart = createChart(chart.wrap.node(), config, chart.controls);
            mchart.events = chart.events;
            mchart.legend = master_legend;
            mchart.filters.unshift({ col: split_by, val: e, choices: split_vals });
            mchart.wrap.insert('span', 'svg').attr('class', 'wc-chart-title').text(e);
            mchart.init(data, test);
            mchart.parent = chart;
            chart.multiples.push(mchart);
        });
    }
    goAhead(data);
}
