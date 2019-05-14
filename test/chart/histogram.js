import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';
import d3 from 'd3';
import data from '../samples/irisData';
import settings from '../samples/histogram';

export default function testHistogram(settings, data) {
    describe('histogram tests', () => {
        const { JSDOM } = jsdom;
        let dom, container, chart;

        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
            chart = createChart(container, settings);
            chart.init(data, true);
        });

        describe('settings specify a histogram by defining [x|y].bin', () => {
            it('groups the data into as many bins as specified by [x|y].bin', () => {
                const nodes = chart.wrap.node().querySelectorAll('.bar-group');
                expect(nodes.length).toEqual(chart.config.x.bin);
            });
            it('when an axis domain is specified, that domain, rather than the extent of the data, is divided into bins', () => {
                chart.config.x.domain = [2, 10];
                chart.draw();
                expect(chart.marks[0].quant.domain()).toEqual(chart.config.x.domain);
            });
            //TODO: Have Webcharts calculate the bin width when [x|y].bin = 0 or 'fd' (Freedman-Diaconis rule).
        });
    });
}
