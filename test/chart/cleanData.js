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
            const falseyValues = [
                '',
                ' ',
                'asdf',
                NaN,
                null,
                undefined,
                false
            ];
            settings.marks.forEach(mark => {
                let copiedData, cleanedData;

                beforeEach(() => {
                    copiedData = [];
                    data.forEach((d,i) => {
                        copiedData[i] = {};
                        for (const variable in d)
                            copiedData[i][variable] = d[variable];

                        if (Math.random() < .1)
                            copiedData[i][settings.x.column] = falseyValues[i%(falseyValues.length - 1)];
                        if (Math.random() > .9)
                            copiedData[i][settings.y.column] = falseyValues[i%(falseyValues.length - 1)];
                    });

                    cleanedData = cleanData.call(chart, mark, copiedData);
                });

                it('removes falsey values', () => {
                    const cleanedCopiedData = copiedData
                        .filter(d => (
                            falseyValues.indexOf(d[settings.x.column]) < 0 &&
                            !isNaN(d[settings.x.column]) &&
                            falseyValues.indexOf(d[settings.y.column]) < 0 &&
                            !isNaN(d[settings.y.column])
                        ));
                    expect(
                        cleanedData.length
                    ).toEqual(
                        cleanedCopiedData.length
                    );
                });
            });
        });
    });
}
