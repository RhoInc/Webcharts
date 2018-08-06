import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';
import d3 from 'd3';

export default function testSetDomain(settings, data) {
    describe('chart domains', () => {
        const { JSDOM } = jsdom;
        let dom, container, charts;

        //DOM setup
        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
        });

        beforeEach(() => {
            charts = {
                linear_linear: createChart(container, settings.linear_linear).init(data, true),
                ordinal_linear: createChart(container, settings.ordinal_linear).init(data, true),
                linear_ordinal: createChart(container, settings.linear_ordinal).init(data, true)
            };
        });

        afterEach(() => {
            for (const chart in chart) {
                delete charts[chart].config.x.domain;
                delete charts[chart].x_dom;
                delete charts[chart].config.y.domain;
                delete charts[chart].y_dom;
            }
        });

        //linear x linear
        describe('setDomain() is called for a chart with two linear axes', () => {
            ['x','y'].forEach(axis => {
                it('returns a non-zero-length array for the specified axis', () => {
                    console.log(`    - testing ${charts.linear_linear[axis].type} ${axis} axis:`);
                    expect(charts.linear_linear[axis + '_dom'].length).toBeGreaterThan(0);
                });

                it('does not return a zero-range domain for the specified axis', () => {
                    const test_data = [];
                    data.forEach(d => {
                        const datum = {};
                        for (const prop in d)
                            datum[prop] = d[prop];
                        datum[charts.linear_linear[axis].column] = 0;
                        test_data.push(datum);
                    });
                    charts.linear_linear.consolidateData(test_data);
                    expect(charts.linear_linear[axis + '_dom'][1] - charts.linear_linear[axis + '_dom'][0]).toBeGreaterThan(0);
                });

                it('gives precedence to the domain defined in the config', () => {
                    const domain = [-100,100];
                    charts.linear_linear.config[axis].domain = domain.slice();
                    charts.linear_linear.consolidateData(data);
                    expect(charts.linear_linear[axis + '_dom'].join(',')).toEqual(domain.join(','));
                });
            });
        });

        //ordinal x linear
        describe('setDomain() is called for a chart with an ordinal x-axis and a linear y-axis', () => {
            it('returns a unique set of the ordinal axis variable as its domain', () => {
                const ordinalDomain = d3
                    .set(data.map(d => d[charts.ordinal_linear.config.x.column]))
                    .values()
                    .sort()
                    .join(', ');
                expect(charts.ordinal_linear.x_dom.sort().join(', ')).toEqual(ordinalDomain);
            });

            it('sets the lower limit of the linear domain to 0', () => {
                expect(charts.ordinal_linear.y_dom[0]).toEqual(0);
            });

            it('sets the upper limit of the linear domain to the maximum value of the linear axis variable', () => {
                const upperLimit = d3.max(data.map(d => d[charts.ordinal_linear.config.y.column]));
                expect(charts.ordinal_linear.y_dom[1]).toEqual(upperLimit);
            });
        });

        //linear x ordinal
        describe('setDomain() is called for a chart with an linear x-axis and a ordinal y-axis', () => {
            it('sets the lower limit of the linear domain to 0', () => {
                expect(charts.linear_ordinal.x_dom[0]).toEqual(0);
            });

            it('sets the upper limit of the linear domain to the maximum value of the linear axis variable', () => {
                const upperLimit = d3.max(data.map(d => d[charts.linear_ordinal.config.x.column]));
                expect(charts.linear_ordinal.x_dom[1]).toEqual(upperLimit);
            });

            it('returns a unique set of the ordinal axis variable as its domain', () => {
                const ordinalDomain = d3
                    .set(data.map(d => d[charts.linear_ordinal.config.y.column]))
                    .values()
                    .sort()
                    .join(', ');
                expect(charts.linear_ordinal.y_dom.sort().join(', ')).toEqual(ordinalDomain);
            });
        });
    });
}
