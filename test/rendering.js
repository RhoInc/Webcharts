import expect from 'expect';
import jsdom from 'jsdom';
import d3 from 'd3';
import createChart from '../src/createChart';
import data from './samples/data';
import settings from './samples/element-settings';

describe('Chart rendering', () => {
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
    div.children[0].remove();
    chart = null;
  });

  describe('div is not visible', () => {
    it('SVG not created when .init() is called', () => {
      chart.init([]);
      expect(chart.svg).toNotExist();
    });
  });

  describe('div is visible', () => {
    beforeEach(() => {
      div.offsetWidth = 1000;
    });
    
    it('SVG created when .init() is called', () => {
      chart.init([]);
      expect(chart.svg).toExist();
    });

    it('SVG width is equal to max_width', () => {
      chart.init([]);
      const chartWidth = +d3.select(chart.svg.node().parentNode).attr('width');
      expect(chartWidth).toEqual(settings.max_width);
    });

    it('render group to wrap points is created if marks.type = circle', () => {
      chart.init(data);
      const configMarks = settings.marks.filter(f => f.type === 'circle').length;
      expect(!chart.svg.selectAll('.point-supergroup').empty()).toBe(Boolean(configMarks));
    });

    it('render group to wrap lines is created if marks.type = line', () => {
      chart.init(data);
      const configMarks = settings.marks.filter(f => f.type === 'line').length;
      expect(!chart.svg.selectAll('.line-supergroup').empty()).toBe(Boolean(configMarks));
    });

    it('render group to wrap bars is created if marks.type = bar', () => {
      chart.init(data);
      const configMarks = settings.marks.filter(f => f.type === 'bar').length;
      expect(!chart.svg.selectAll('.bar-supergroup').empty()).toBe(Boolean(configMarks));
    });

    it('render group to wrap text elements is created if marks.type = text', () => {
      chart.init(data);
      const configMarks = settings.marks.filter(f => f.type === 'text').length;
      expect(!chart.svg.selectAll('.text-supergroup').empty()).toBe(Boolean(configMarks));
    });

  });

});