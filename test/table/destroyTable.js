import jsdom from 'jsdom';
import createTable from '../../src/createTable';
import expect from 'expect';
import d3 from 'd3';


export default function testDestroyTable(settings,data) {
    describe('destroy table', () => {
        const { JSDOM } = jsdom;
        let dom,
            container,
            chart,
            svg,
            svgChildren,
            table;

        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
            table = createTable(container, settings)
                .init(data, true);

            table.destroy()

        });

        it('no table should exist on page', () => {
            //expect(table.table).toNotExist();
            expect(d3.select(container).selectAll('table').size()).toEqual(0);
        });
    });
}
