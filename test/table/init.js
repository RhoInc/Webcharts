import jsdom from 'jsdom';
import createTable from '../../src/createTable';
import expect from 'expect';

export default function testInit(settings, data) {
    describe('table initialization and lifecycle', () => {
        const { JSDOM } = jsdom;
        let dom, container, table;

        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
        });

        beforeEach(() => {
            table = createTable(container, settings);

            expect.spyOn(table.events, 'onInit');
            expect.spyOn(table.events, 'onLayout');
            expect.spyOn(table.events, 'onPreprocess');
            expect.spyOn(table.events, 'onDraw');

            table.init(data, true);
        });

        afterEach(() => {
            container.children[0].remove();
            table = null;
        });

        describe('user calls table init() method', () => {
            it('webCharts attaches raw data', () => {
                expect(table.data.raw).toEqual(data);
            });
        });

        describe('should run all .on([lifecycle]) functions when initialized with marks specified in the config', () => {
            it('should call onInit', () => {
                expect(table.events.onInit).toHaveBeenCalled();
            });
            it('should call onLayout', () => {
                expect(table.events.onLayout).toHaveBeenCalled();
            });
            it('should call onPreprocess', () => {
                expect(table.events.onPreprocess).toHaveBeenCalled();
            });
            it('should call onDraw', () => {
                expect(table.events.onDraw).toHaveBeenCalled();
            });
        });

        describe('should run repeated .on([lifecycle]) functions when .draw() is called independently', () => {
            beforeEach(() => {
                table.draw();
            });
            it('onPreprocess has been called twice', () => {
                expect(table.events.onPreprocess).toHaveBeenCalled();
                expect(table.events.onPreprocess.calls.length).toEqual(2);
            });
            it('onDraw has been called twice', () => {
                expect(table.events.onDraw).toHaveBeenCalled();
                expect(table.events.onDraw.calls.length).toEqual(2);
            });
        });
    });
}
