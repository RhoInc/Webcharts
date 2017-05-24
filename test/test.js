import jsdom from 'jsdom';
import createChart from '../src/createChart';
import expect from 'expect';
import iris from './iris';
import settings from './settings';
import clone from './clone';

describe('testing', () => {
    const { JSDOM } = jsdom;
    let dom,
        container,
        chart;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
        container = dom.window.document.createElement('div');
    });

    beforeEach(() => {
        chart = createChart(container, settings);
    });

    afterEach(() => {
        container.children[0].remove();
        chart = null;
    });

    describe('user calls createChart()', () => {
        it('webCharts returns chart object', () => {
            expect(typeof chart).toEqual('object');
        });

        it('webCharts returns chart object with a given set of properties', () => {
            const properties = ['div', 'config', 'controls', 'raw_data', 'filters', 'marks', 'wrap', 'events', 'on', 'id'];
            expect(Object.keys(chart).sort()).toEqual(properties.sort());
        });

        it('chart div property is equal to first argument to createChart()', () => {
            expect(chart.div).toEqual(container);
        });

        it('chart wrap property is d3 selection of first argument to createChart()', () => {
            expect(chart.wrap.node()).toEqual(container.querySelector('div'));
        });

        it('chart config property matches second argument to createChart()', () => {
            let property;
            for (property in settings)
                expect(chart.config[property]).toEqual(settings[property]);
        });
    });

    describe('user calls chart init() method', () => {
        it('webCharts attaches raw data', () => {
            chart.init(iris, true);
            expect(chart.raw_data).toEqual(iris);
        });
    });
});
