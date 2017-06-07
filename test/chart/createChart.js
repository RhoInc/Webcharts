import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';
import settings from '../samples/irisSettings';

describe('chart object creation', () => {
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

    describe('user calls createChart()', () => {
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
});
