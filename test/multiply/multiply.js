import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import multiply from '../../src/multiply';
import expect from 'expect';
import irisData from '../samples/irisData'
import irisSettings from '../samples/irisSettings'
import chartProto from '../../src/chart/index';

describe('chart multiply', () => {
    const { JSDOM } = jsdom;
    let dom,
        container,
        chart;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html>');
        container = dom.window.document.createElement('div');
        chart = createChart(container, irisSettings);
        multiply(chart, irisData, "Species", null, true);
    });

    describe('user calls chart multiply() method', () => {
        it('master chart links to 3 multiples', () => {
            expect(chart.multiples.length).toEqual(3);
        });

        it('multiple object should be a chart', () => {
            expect(chart.multiples[0]).toIncludeKeys(["raw_data","x","y"])
        })

        it('multiple object should link back to master chart', () => {
            expect(chart.multiples[0].parent).toEqual(chart)
        });
    });
});
