import table from './table/index';
import { select } from 'd3';

export default function createTable(element = 'body', config = {}, controls = null) {
    let thisTable = Object.create(table);

    thisTable.div = element;

    thisTable.config = Object.create(config);

    thisTable.controls = controls;

    thisTable.filters = [];

    thisTable.required_cols = [];

    thisTable.wrap = select(thisTable.div).append('div');

    thisTable.events = {
        onInit() {},
        onLayout() {},
        onDatatransform() {},
        onDraw() {}
    };

    thisTable.on = function(event, callback) {
        let possible_events = ['init', 'layout', 'datatransform', 'draw'];
        if (possible_events.indexOf(event) < 0) {
            return;
        }
        if (callback) {
            thisTable.events['on' + event.charAt(0).toUpperCase() + event.slice(1)] = callback;
        }
    };

    return thisTable;
}
