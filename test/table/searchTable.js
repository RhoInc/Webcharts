import jsdom from 'jsdom';
import createTable from '../../src/createTable';
import expect from 'expect';
import d3 from 'd3';

export default function testSearchTable(settings, data) {
    describe('search table', () => {
        const { JSDOM } = jsdom;
        let dom, container, chart, svg, svgChildren, table;

        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
            table = createTable(container, settings).init(data, true);
            table.preSearchRowCount = table.table.selectAll('tr').size();
        });

        it('a search input should exist', () => {
            expect(
                d3
                    .select(container)
                    .select('input.search-box')
                    .size()
            ).toEqual(1);
        });

        it('triggering a search results in subset', () => {
            table.searchable.searchTerm = '88'; //valid search term for iris data
            table.draw();
            var afterSearchRowCount = table.table.selectAll('tr').size();
            expect(afterSearchRowCount).toBeLessThan(table.preSearchRowCount);
        });

        it('clearing search clears subset', () => {
            table.searchable.searchTerm = ''; //valid search term for iris data
            table.draw();
            var afterClearRowCount = table.table.selectAll('tr').size();
            expect(afterClearRowCount).toEqual(table.preSearchRowCount);
        });
    });
}
