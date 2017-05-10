import { createChart } from './chart';

export default function(chart, data, split_by, order) {
    let config = chart.config;
    let wrap = chart.wrap.classed('wc-layout wc-small-multiples', true).classed('wc-chart', false);
    let master_legend = wrap.append('ul').attr('class', 'legend');

    function goAhead(data) {
        let split_vals = d3.set(data.map(m => m[split_by])).values().filter(f => f);
        if (order) {
            split_vals = split_vals.sort((a, b) =>
                d3.ascending(order.indexOf(a), order.indexOf(b))
            );
        }

        split_vals.forEach(e => {
            var mchart = createChart(chart.wrap.node(), config, chart.controls);
            mchart.events = chart.events;
            mchart.legend = master_legend;
            mchart.filters.unshift({ col: split_by, val: e, choices: split_vals });
            mchart.wrap.insert('span', 'svg').attr('class', 'wc-chart-title').text(e);
            mchart.init(data);
        });
    }

    goAhead(data);
}
