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

        afterEach(() => {
            delete chart.config.range_band;
            delete chart.config.x.range_band;
            delete chart.config.y.range_band;
        });

        describe('x-axis range band', () => {
            it('sets bar width to config.range_band if config.x.range_band is undefined', () => {
                chart.config.range_band = 25;
                chart.draw();
                expect(chart.config.range_band).toEqual(chart.x.rangeBand());
            });

            it('sets bar width to config.x.range_band otherwise', () => {
                chart.config.x.range_band = 20;
                chart.draw();
                expect(chart.config.x.range_band).toEqual(chart.x.rangeBand());
            });
        });

        describe('y-axis range band', () => {
            it('sets bar width to config.range_band if config.y.range_band is undefined', () => {
                chart.config.range_band = 25;
                chart.draw();
                expect(chart.config.range_band).toEqual(chart.y.rangeBand());
            });

            it('sets bar width to config.y.range_band otherwise', () => {
                chart.config.y.range_band = 30;
                chart.draw();
                expect(chart.config.y.range_band).toEqual(chart.y.rangeBand());
            });
        });

        describe('x- and y-axis range band', () => {
            it('sets bar width to config.range_band if both config.x.range_band and config.y.range_band are undefined', () => {
                chart.config.range_band = 25;
                chart.draw();
                expect(
                    chart.config.range_band === chart.x.rangeBand() &&
                    chart.config.range_band === chart.y.rangeBand()
                ).toEqual(true);
            });

            it('sets bar width independently for each axis otherwise', () => {
                chart.config.x.range_band = 20;
                chart.config.y.range_band = 30;
                chart.draw();
                expect(
                    chart.config.x.range_band === chart.x.rangeBand() &&
                    chart.config.y.range_band === chart.y.rangeBand()
                ).toEqual(true);
            });
        });
    });
}
