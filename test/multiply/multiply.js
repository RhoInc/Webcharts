import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import multiply from '../../src/multiply';
import expect from 'expect';
import irisData from '../samples/irisData';
import { linear_linear as irisSettings } from '../samples/irisSettings';
import clone from '../../src/util/clone';
import { selectAll } from 'd3';

describe('chart.multiply()', () => {
    const { JSDOM } = jsdom;
    let dom, container, chart;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html>');
        container = dom.window.document.createElement('div');
        chart = createChart(container, irisSettings);
        multiply(chart, irisData, 'Species', null, true);
    });

    describe('user calls chart multiply() method', () => {
        it('master chart links to 3 multiples', () => {
            expect(chart.multiples.length).toEqual(3);
        });

        it('multiple object should be a chart', () => {
            expect(chart.multiples[0]).toIncludeKeys(['raw_data', 'x', 'y']);
        });

        it('multiple object should link back to master chart', () => {
            expect(chart.multiples[0].parent).toEqual(chart);
        });

        it('a single legend should exist inside the parent node of the multiples', () => {
            expect(chart.wrap.selectAll('.legend').size()).toEqual(1);
        });

        it('appears after multiples by default', () => {
            const nodes = chart.wrap.node().querySelectorAll('div,ul');
            expect(nodes[nodes.length - 1]).toEqual(chart.master_legend.node());
        });

        it('appears before multiples if legend location is set to top', () => {
            const topLegendSettings = clone(irisSettings);
            topLegendSettings.legend.location = 'top';
            chart = createChart(container, topLegendSettings);
            multiply(chart, irisData, 'Species', null, true);

            const nodes = chart.wrap.node().querySelectorAll('div,ul');
            expect(nodes[0]).toEqual(chart.master_legend.node());
        });
    });
});
