import expect from 'expect';
import jsdom from 'jsdom';
import version from '../src/version';
import pkg from '../package.json';
import createChart from '../src/createChart';
import createControls from '../src/createControls';
import createTable from '../src/createTable';
import chart from '../src/chart/index';
import controls from '../src/controls/index';
import table from '../src/table/index';

describe('Top-level API', () => {
  let window;

  before(() => {
    jsdom.env({
      html: '<!DOCTYPE html><html><body><div></div></body></html>',
      features:{ QuerySelector: true },
      done: function(error, jsdomWindow) {
        window = jsdomWindow;
      }
    });
  });

  it('version in source should match package.json', () => {
    expect(version).toEqual(pkg.version);
  });

  it('createChart should return a chart object', () => {
    // need querySelector for basic d3 selection
    const div = window.document.querySelector('div');
    const createdChart = createChart(div);

    expect(Object.getPrototypeOf(createdChart)).toBe(chart);
  });

  it('multiple charts in same location should have different ids', () => {
    // need querySelector for basic d3 selection
    const div = window.document.querySelector('div');
    const createdChart1 = createChart(div);
    const createdChart2 = createChart(div);

    expect(createdChart1.id).toNotBe(createdChart2.id);
  });

  it('createControls should return a controls object', () => {
    // need querySelector for basic d3 selection
    const div = window.document.querySelector('div');
    const createdControls = createControls(div);

    expect(Object.getPrototypeOf(createdControls)).toBe(controls);
  });

  it('createTable should return a table object', () => {
    // need querySelector for basic d3 selection
    const div = window.document.querySelector('div');
    const createdTable = createTable(div);

    expect(Object.getPrototypeOf(createdTable)).toBe(table);
  });
});