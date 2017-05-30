import jsdom from 'jsdom';
import expect from 'expect';
import version from '../../src/version';
import pkg from '../../package.json';

import createChart from '../../src/createChart';
import createControls from '../../src/createControls';
import createTable from '../../src/createTable';

import chart from '../../src/chart/index';
import controls from '../../src/controls/index';
import table from '../../src/table/index';

describe('Top-level API', () => {
    const { JSDOM } = jsdom;
    let dom,
        container;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html>');
    });

    it('version in source should match package.json', () => {
        expect(version).toEqual(pkg.version);
    });

    it('createChart should return a chart object', () => {
        const
            container = dom.window.document.createElement('div'),
            createdChart = createChart(container);

        expect(Object.getPrototypeOf(createdChart)).toBe(chart);
    });

    it('createControls should return a controls object', () => {
        const
            container = dom.window.document.createElement('div'),
            createdControls = createControls(container);

        expect(Object.getPrototypeOf(createdControls)).toBe(controls);
    });

    it('createTable should return a table object', () => {
        const
            container = dom.window.document.createElement('div'),
            createdTable = createTable(container);

        expect(Object.getPrototypeOf(createdTable)).toBe(table);
    });
});
