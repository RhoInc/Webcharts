import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import transformData from '../../src/chart/draw/consolidateData/transformData';
import expect from 'expect';
import settings from '../samples/irisSettings';
import data from '../samples/irisData';
import d3 from 'd3';

describe('data transformation', () => {
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

    //transformData() validation
    describe('transformData() is called for each item in settings.marks', () => {
        settings.marks.forEach(mark => {
            let transformedData, nestedData;

            beforeEach(() => {
                transformedData = chart.transformData(data, mark); // webcharts dataset
                nestedData = d3
                    .nest() // validation dataset
                    .key(d => mark.per.map(per => d[per]).join(' '))
                    .rollup(d => {
                        return {
                            raw: d,
                            x: d3[mark.summarizeX](d, di => di[settings.x.column]),
                            y: d3[mark.summarizeY](d, di => di[settings.y.column]),
                            x_q25: d3.quantile(d.map(di => di[settings.x.column]), 0.25),
                            x_q75: d3.quantile(d.map(di => di[settings.x.column]), 0.75),
                            y_q25: d3.quantile(d.map(di => di[settings.y.column]), 0.25),
                            y_q75: d3.quantile(d.map(di => di[settings.y.column]), 0.75)
                        };
                    })
                    .entries(data);
            });

            it('returns an object containing a config, a nested data array, an x-domain, and a y-domain', () => {
                console.log(`\n    Testing ${mark.summarizeX}:\n`);
                expect(Object.keys(transformedData)).toEqual(['config','data', 'x_dom', 'y_dom']);
            });

            it('nests raw data by mark.per', () => {
                expect(nestedData.length).toEqual(transformedData.data.length);
                expect(nestedData.map(d => d.key)).toEqual(transformedData.data.map(d => d.key));

                nestedData.forEach(d => {
                    const transformedDatum = transformedData.data.filter(di => di.key === d.key)[0];

                    expect(d.values.raw).toEqual(transformedDatum.values.raw);
                    expect(d.values.x).toEqual(transformedDatum.values.x);
                    expect(d.values.y).toEqual(transformedDatum.values.y);
                    expect(d.values.x_25).toEqual(transformedDatum.values.x_25);
                    expect(d.values.x_75).toEqual(transformedDatum.values.x_75);
                    expect(d.values.y_25).toEqual(transformedDatum.values.y_25);
                    expect(d.values.y_75).toEqual(transformedDatum.values.y_75);
                });
            });

            it('sets x-domain to extent of values in x-column', () => {
                expect(Math.min.apply(null, nestedData.map(d => d.values.x))).toEqual(
                    transformedData.x_dom[0]
                );
                expect(Math.max.apply(null, nestedData.map(d => d.values.x))).toEqual(
                    transformedData.x_dom[1]
                );
            });

            it('sets y-domain to extent of values in y-column', () => {
                expect(Math.min.apply(null, nestedData.map(d => d.values.y))).toEqual(
                    transformedData.y_dom[0]
                );
                expect(Math.max.apply(null, nestedData.map(d => d.values.y))).toEqual(
                    transformedData.y_dom[1]
                );
            });
        });
    });

    describe('chart object has marks property', () => {
        it('marks property has the same length as settings.marks', () => {
            expect(settings.marks.length).toEqual(chart.marks.length);
        });
    });
});
