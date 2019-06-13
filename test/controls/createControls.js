import jsdom from 'jsdom';
import createControls from '../../src/createControls';
import expect from 'expect';

describe('controls object creation', () => {
    const { JSDOM } = jsdom;
    let dom, container, controls;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html>');
        container = dom.window.document.createElement('div');
    });

    beforeEach(() => {
        controls = createControls(container);
    });

    afterEach(() => {
        container.children[0].remove();
        controls = null;
    });

    describe('user calls createControls()', () => {
        it('webCharts returns controls object with a given set of properties', () => {
            const properties = ['div', 'config', 'targets', 'wrap'];
            expect(Object.keys(controls).sort()).toEqual(properties.sort());
        });

        it('controls div property is equal to first argument to createControls()', () => {
            expect(controls.div).toEqual(container);
        });

        it('controls wrap property is d3 selection of first argument to createControls()', () => {
            expect(controls.wrap.node()).toEqual(container.querySelector('div'));
        });

        it('controls config property matches second argument to createControls()', () => {
            let settings = {},
                property;
            for (property in settings)
                expect(controls.config[property]).toEqual(settings[property]);
        });

        it('chart object is bound to div.wc-controls', () => {
            var datum = controls.wrap.datum();
            let property;
            expect(controls).toEqual(datum);
        });
    });
});
