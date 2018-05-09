import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import cleanData from '../../src/chart/draw/consolidateData/transformData/cleanData';
import expect from 'expect';
import d3 from 'd3';

export default function testCleanData(settings, data) {
    describe('data cleaning', () => {
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
        describe('cleanData() is called for each item in settings.marks', () => {
            settings.marks.forEach(mark => {
                let copiedData, cleanedData;

                beforeEach(() => {
                    copiedData = [];
                    data.forEach((d,i) => {
                        copiedData[i] = {};
                        for (const variable in d)
                            copiedData[i][variable] = d[variable];

                        if (Math.random() < .05)
                            copiedData[i][settings.x.column] = '';
                        if (Math.random() > .95)
                            copiedData[i][settings.y.column] = '';
                    });

                    cleanedData = cleanData.call(chart, mark, copiedData);
                });

                it('removes falsey values', () => {
                    expect(
                        cleanedData.length
                    ).toEqual(
                        copiedData
                            .filter(d => d[settings.x.column] !== '' && d[settings.y.column] !== '')
                            .length
                    );
                });
            });
        });
    });
}
