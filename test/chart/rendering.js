import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';
import d3 from 'd3';
import settings from '../samples/element-settings';
import data from '../samples/data';

describe('chart rendering', () => {
    const { JSDOM } = jsdom;
    let dom,
        container,
        chart;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html>');
        container = dom.window.document.createElement('div');
    });

    beforeEach(() => {
        chart = createChart(container, settings);
    });

    afterEach(() => {
        container.children[0].remove();
        chart = null;
    });

    describe('container is not visible', () => {
        it('SVG not created when .init() is called', () => {
            chart.init([]);
            expect(chart.svg).toNotExist();
        });
    });

    describe('container is visible', () => {
        it('SVG created when .init() is called', () => {
            chart.init([], true);
            expect(chart.svg).toExist();
        });

        it('SVG width is equal to max_width', () => {
            chart.init([], true);
            const chartWidth = +d3.select(chart.svg.node().parentNode).attr('width');
            expect(chartWidth).toEqual(settings.max_width);
        });

        it('render group to wrap points is created if marks.type = circle', () => {
            chart.init(data, true);
            const configMarks = settings.marks.filter(f => f.type === 'circle').length;
            expect(!chart.svg.selectAll('.point-supergroup').empty()).toBe(Boolean(configMarks));
        });

        it('render group to wrap lines is created if marks.type = line', () => {
            chart.init(data, true);
            const configMarks = settings.marks.filter(f => f.type === 'line').length;
            expect(!chart.svg.selectAll('.line-supergroup').empty()).toBe(Boolean(configMarks));
        });

        it('render group to wrap bars is created if marks.type = bar', () => {
            chart.init(data, true);
            const configMarks = settings.marks.filter(f => f.type === 'bar').length;
            expect(!chart.svg.selectAll('.bar-supergroup').empty()).toBe(Boolean(configMarks));
        });

        it('render group to wrap text elements is created if marks.type = text', () => {
            chart.init(data, true);
            const configMarks = settings.marks.filter(f => f.type === 'text').length;
            expect(!chart.svg.selectAll('.text-supergroup').empty()).toBe(Boolean(configMarks));
        });
    });
});
