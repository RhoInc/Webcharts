import jsdom from 'jsdom';
import createTable from '../../src/createTable';
import expect from 'expect';
import d3 from 'd3';

export default function testSortTable(settings, data) {
    describe('sort table', () => {
        const { JSDOM } = jsdom;
        let dom, container, chart, svg, svgChildren, table;

        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
            table = createTable(container, settings).init(data, true);
            table.first5 = table.table
                .select('tbody')
                .selectAll('tr')
                .filter(function(d, i) {
                    return i < 5;
                })
                .data();
            console.log(JSON.stringify(table.first5, null, 4));
        });

        it('a sort div should exist', () => {
            expect(
                d3
                    .select(container)
                    .select('div.sortable-container')
                    .size()
            ).toEqual(1);
        });

        it('triggering a sort changes row order', () => {
            table.sortable.order = [
                {
                    col: 'Sepal.Length',
                    direction: 'ascending'
                }
            ];
            table.draw();
            var sorted5 = table.table
                .select('tbody')
                .selectAll('tr')
                .filter(function(d, i) {
                    return i < 5;
                })
                .data();
            console.log(JSON.stringify(sorted5, null, 4));
            expect(sorted5).toNotEqual(table.first5);
        });
        it('ascending sort works as expected', () => {
            table.sortable.order = [
                {
                    col: 'Sepal.Length',
                    direction: 'ascending'
                }
            ];
            table.draw();
            var sorted5 = table.table
                .select('tbody')
                .selectAll('tr')
                .filter(function(d, i) {
                    return i < 5;
                })
                .data();
            expect(sorted5[0]['Sepal.Length']).toEqual(
                d3.min(table.data.raw, function(d) {
                    return d['Sepal.Length'];
                })
            );
        });
        it('descending sort works as expected', () => {
            table.sortable.order = [
                {
                    col: 'Sepal.Length',
                    direction: 'descending'
                }
            ];
            table.draw();
            var sorted5 = table.table
                .select('tbody')
                .selectAll('tr')
                .filter(function(d, i) {
                    return i < 5;
                })
                .data();
            expect(sorted5[0]['Sepal.Length']).toEqual(
                d3.max(table.data.raw, function(d) {
                    return d['Sepal.Length'];
                })
            );
        });
    });
}
