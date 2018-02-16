import chart from './chart/index';
import { select } from 'd3';

export var chartCount = 0;

export default function createChart(element = 'body', config = {}, controls = null) {
    let thisChart = Object.create(chart);

    thisChart.div = element;

    thisChart.config = Object.create(config);

    thisChart.controls = controls;

    thisChart.raw_data = [];

    thisChart.filters = [];

    thisChart.marks = [];

    thisChart.wrap = select(thisChart.div).append('div').datum(thisChart);

    thisChart.events = {
        onInit() {},
        onLayout() {},
        onPreprocess() {},
        onDatatransform() {},
        onDraw() {},
        onResize() {},
        onDestroy() {}
    };

    thisChart.on = function(event, callback) {
        let possible_events = [
            'init',
            'layout',
            'preprocess',
            'datatransform',
            'draw',
            'resize',
            'destroy'
        ];
        if (possible_events.indexOf(event) < 0) {
            return;
        }
        if (callback) {
            thisChart.events['on' + event.charAt(0).toUpperCase() + event.slice(1)] = callback;
        }
    };

    //increment thisChart count to get unique thisChart id
    chartCount++;

    thisChart.id = chartCount;

    return thisChart;
}
