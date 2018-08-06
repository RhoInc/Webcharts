import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import setDomain from '../../src/chart/draw/consolidateData/setDomain';
import expect from 'expect';
import settings from '../samples/irisSettings';
import data from '../samples/irisData';
import d3 from 'd3';

describe('chart domains', () => {
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

    //Chart initialization
    afterEach(() => {
        delete chart.config.x.domain;
        delete chart.x_dom;
        delete chart.config.y.domain;
        delete chart.y_dom;
    });

    //transformData() validation
    describe('setDomain() is called for each axis', () => {
        ['x','y'].forEach(axis => {
            it('returns a non-zero-length array for the specified axis', () => {
                console.log(`    - testing ${settings[axis].type} ${axis} axis:`);
                expect(chart[axis + '_dom'].length).toBeGreaterThan(0);
            });

            it('does not return a zero-range domain for the specified axis', () => {
                const test_data = [];
                data.forEach(d => {
                    const datum = {};
                    for (const prop in d)
                        datum[prop] = d[prop];
                    datum[settings[axis].column] = 0;
                    test_data.push(datum);
                });
                chart.consolidateData(test_data);
                expect(chart[axis + '_dom'][1] - chart[axis + '_dom'][0]).toBeGreaterThan(0);
            });

            it('gives precedence to the domain defined in the config', () => {
                const domain = [-100,100];
                chart.config[axis].domain = domain.slice();
                chart.consolidateData(data);
                expect(chart[axis + '_dom'].join(',')).toEqual(domain.join(','));
            });
        });
    });
});
