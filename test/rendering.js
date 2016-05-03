import expect from 'expect';
import jsdom from 'jsdom';
import d3 from 'd3';
// webcharts functions
import createChart from '../src/createChart';
import data from './samples/data';

var settings = {
  x: {column: "Melt", type: "linear", label: "Melting Point (K)"},
  y: {column: "Boil", type: "linear", label: "Boiling Point (K)"},
  marks: [
    {type: "line", per: ['Element'], summarizeY: "mean"}
  ],
  max_width: 500,
  gridlines: 'y'
};

describe('Rendering', () => {
  let window;
  let div;
  let chart;

  before(() => {
    jsdom.env({
      html: '<!DOCTYPE html><html><body><div></div></body></html>',
      features:{ QuerySelector: true },
      done: function(error, jsdomWindow) {
        window = jsdomWindow;
      }
    });
  });

  beforeEach(() => {
    div = window.document.querySelector('div');
    // create chart for each test
    chart = createChart(div, settings);
  });

  afterEach(() => {
    // kill chart after each test
    d3.select(div).selectAll('*').remove();
    chart = null;
  });

  describe('div is invisible', () => {
    it('SVG not created when .init() is called', () => {
      chart.init([]);
      expect(chart.svg).toNotExist();
    });
  });

  describe('div is visible', () => {
    const divWidth = 1000;
    
    it('SVG created when .init() is called', () => {
      div.offsetWidth = divWidth;
      chart.init([]);
      expect(chart.svg).toExist();
    });

    it('SVG width is equal to max_width', () => {
      div.offsetWidth = divWidth;
      chart.init([]);
      const chartWidth = +d3.select(chart.svg.node().parentNode).attr('width');
      expect(chartWidth).toEqual(settings.max_width);
    });

    it('number of marks matches number of rows in data', () => {
      div.offsetWidth = divWidth;
      chart.init(data);
      const markCount = chart.svg.selectAll('.wc-data-mark').size();
      expect(markCount).toEqual(data.length);
    });

  });

});