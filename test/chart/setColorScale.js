import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';
import d3 from 'd3';

export default function testSetColorScale(settings,data) {
    describe('prior to chart rendering a color scale is defined', () => {
        const { JSDOM } = jsdom;
        let dom,
            container,
            chart;

    //DOM setup
        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
        });

    //Chart initialization
        beforeEach(() => {
            chart = createChart(container, settings);
        });

        it('defines an undefined color scale domain without settings.color_by', () => {
            chart.config.color_by = null;
            chart.config.color_dom = null;
            chart.init(data, true);
            expect(chart.colorScale.domain()).toEqual([undefined]);
        });

        it('defines a color scale domain with settings.color_by', () => {
            chart.config.color_by = 'Species';
            chart.config.color_dom = null;
            chart.init(data, true);
            expect(chart.colorScale.domain()).toEqual(d3.set(data.map(d => d.Species)).values());
        });

        it('defines a color scale domain with settings.color_dom', () => {
            chart.config.color_by = null;
            chart.config.color_dom = ['1', '2', '3'];
            chart.init(data, true);
            expect(chart.colorScale.domain()).toEqual(['1', '2', '3']);
        });
    });
}
