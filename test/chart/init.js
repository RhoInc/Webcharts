import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';

export default function testInit(settings,data) {
    describe('chart initialization and lifecycle', () => {
        const { JSDOM } = jsdom;
        let dom,
            container,
            chart;

        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
        });

        beforeEach(() => {
            chart = createChart(container, settings);

            expect.spyOn(chart.events, 'onInit');
            expect.spyOn(chart.events, 'onLayout');
            expect.spyOn(chart.events, 'onPreprocess');
            expect.spyOn(chart.events, 'onDatatransform');
            expect.spyOn(chart.events, 'onDraw');
            expect.spyOn(chart.events, 'onResize'); 

            chart.init(data, true);
        });

        afterEach(() => {
            container.children[0].remove();
            chart = null;
        });

        describe('user calls chart init() method', () => {
            it('webCharts attaches raw data', () => {
                expect(chart.raw_data).toEqual(data);
            });
        });

        describe('should run all .on([lifecycle]) functions when initialized with marks specified in the config', () => {
            it('should call onInit', () => {
                expect(chart.events.onInit).toHaveBeenCalled();
            });
            it('should call onLayout', () => {
                expect(chart.events.onLayout).toHaveBeenCalled();
            });
            it('should call onPreprocess', () => {
                expect(chart.events.onPreprocess).toHaveBeenCalled();
            });
            it('should call onDatatransform', () => {
                expect(chart.events.onDatatransform).toHaveBeenCalled();
            });
            it('should call onDraw', () => {
                expect(chart.events.onDraw).toHaveBeenCalled();
            });
            it('should call onResize', () => {
                expect(chart.events.onResize).toHaveBeenCalled();
            });
        });

        describe('should run repeated .on([lifecycle]) functions when .draw() is called independently', () => {
            beforeEach(() => {
                chart.draw();
            });
            it('onPreprocess has been called twice', () => {
                expect(chart.events.onPreprocess).toHaveBeenCalled();
                expect(chart.events.onPreprocess.calls.length).toEqual(2);
            });
            it('onDatatransform has been called twice for each set of marks', () => {
                expect(chart.events.onDatatransform).toHaveBeenCalled();
                expect(chart.events.onDatatransform.calls.length).toEqual(settings.marks.length * 2);
            });
            it('onDraw has been called twice', () => {
                expect(chart.events.onDraw).toHaveBeenCalled();
                expect(chart.events.onDraw.calls.length).toEqual(2);
            });
            it('onResize has been called twice', () => {
                expect(chart.events.onResize).toHaveBeenCalled();
                expect(chart.events.onResize.calls.length).toEqual(2);
            });
        });
    });
}
