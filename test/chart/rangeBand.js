import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';
import d3 from 'd3';

export default function testRangeBand(settings, data) {
    describe('range band definitions for ordinal axes', () => {
        const { JSDOM } = jsdom;
        let dom, container, chart;

        //DOM setup
        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
        });

        //Chart initialization
        beforeEach(() => {
            chart = createChart(container, settings).init(data, true);
        });

        if (settings.x.type === 'ordinal') {
            describe('x-axis range band', () => {
                if (settings
            });
        }
    });
}
