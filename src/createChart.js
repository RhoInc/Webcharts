import { select } from 'd3';
import chart from './chart/index';

export let chartCount = 0;

export default function createChart(element = 'body', config = {}, controls = null) {
  const thisChart = Object.create(chart);

  function onEvent(event, callback) {
    const possibleEvents = ['init', 'layout', 'preprocess', 'datatransform', 'draw', 'resize'];
    if (possibleEvents.indexOf(event) < 0) {
      return;
    }
    if (callback) {
      thisChart.events[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = callback;
    }
  }

  thisChart.div = element;

  thisChart.config = Object.create(config);

  thisChart.controls = controls;

  thisChart.raw_data = [];

  thisChart.filters = [];

  thisChart.marks = [];

  thisChart.wrap = select(thisChart.div).append('div');

  thisChart.events = {
    onInit() {},
    onLayout() {},
    onPreprocess() {},
    onDatatransform() {},
    onDraw() {},
    onResize() {}
  };

  thisChart.on = onEvent;

  // increment thisChart count to get unique thisChart id
  chartCount++;

  thisChart.id = chartCount;

  return thisChart;
}
