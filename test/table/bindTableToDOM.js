import jsdom from 'jsdom';
import createTable from '../../src/createTable';
import expect from 'expect';

export default function bindTableToDOM(settings, data) {
    describe('table object in DOM', () => {
        const { JSDOM } = jsdom;
        let dom, container, table;

        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
        });

        beforeEach(() => {
            table = createTable(container, settings).init(data, true);
        });

        afterEach(() => {
        });

        describe('user calls table init() method', () => {
            it('binds table object to parent of table node', () => {
                expect(table.wrap.datum()).toEqual(table);
            });

            it('binds table data to table node', () => {
                expect(table.table.datum()).toEqual(table.data.current);
            });
        });
    });
}
