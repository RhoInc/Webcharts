import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';
import d3 from 'd3';

export default function testCheckRequired(settings, data) {
    describe('upon chart initialization data field arguments are checked against actual fields in data', () => {
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

        function verifyRequired(settings) {
            const required = [];

            if (settings.x.column)
                required.push({
                    argument: 'x.column',
                    dataField: settings.x.column
                });
            if (settings.y.column)
                required.push({
                    argument: 'y.column',
                    dataField: settings.y.column
                });
            if (settings.marks)
                settings.marks.forEach((mark, i) => {
                    if (mark.per && mark.per.length)
                        mark.per.forEach((per, j) => {
                            required.push({
                                argument: `marks[${i}].per[${j}]`,
                                dataField: per
                            });
                        });
                    if (mark.split)
                        required.push({
                            argument: `marks[${i}].split`,
                            dataField: mark.split
                        });
                    if (mark.values) {
                        for (const field in mark.values)
                            required.push({
                                argument: `marks[${i}].values['${field}']`,
                                dataField: field
                            });
                    }
                });
            if (settings.color_by)
                required.push({
                    argument: 'color_by',
                    dataField: settings.color_by
                });

            return required;
        }

        it('checkRequired() returns a boolean corresponding to whether or not the data contain all required data fields', () => {
            const expected = verifyRequired(settings)
                .map(item => item.dataField)
                .some(dataField => Object.keys(data[0]).indexOf(dataField) === -1),
                actual = chart.checkRequired(data).missingDataField;
            expect(expected).toEqual(actual);
        });

        it('checkRequired() returns a list of settings arguments associated with required data fields', () => {
            const expectedArguments = verifyRequired(settings).map(item => item.argument).sort(),
                actualArguments = chart
                    .checkRequired(data)
                    .dataFieldArguments.map(argument => argument.replace('this.config.', ''))
                    .sort();
            expect(expectedArguments).toEqual(actualArguments);
        });

        it('checkRequired() returns a list of required data fields', () => {
            const expectedDataFields = d3
                .set(verifyRequired(settings).map(item => item.dataField))
                .values(),
                actualDataFields = d3.set(chart.checkRequired(data).requiredDataFields).values();
            expect(expectedDataFields).toEqual(actualDataFields);
        });
    });
}
