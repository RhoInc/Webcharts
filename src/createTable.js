import { select } from 'd3';
import table from './table/index';

export default function createTable(element = 'body', config = {}, controls = null) {
  const thisTable = Object.create(table);

  function onEvent(event, callback) {
    const possibleEvents = ['init', 'layout', 'datatransform', 'draw', 'resize'];
    if (possibleEvents.indexOf(event) < 0) {
      return;
    }
    if (callback) {
      thisTable.events[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = callback;
    }
  }

  thisTable.div = element;

  thisTable.config = Object.create(config);

  thisTable.controls = controls;

  thisTable.filters = [];

  thisTable.required_cols = [];

  thisTable.marks = [];

  thisTable.wrap = select(thisTable.div).append('div');

  thisTable.events = {
    onInit() {},
    onLayout() {},
    onDatatransform() {},
    onDraw() {},
    onResize() {}
  };

  thisTable.on = onEvent;

  return thisTable;
}
