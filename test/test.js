import expect from 'expect';
import jsdom from 'jsdom';
import { createChart } from '../src/chart';
import settings from './samples/element-settings';
import defaultSettings from './samples/default-settings';

describe('Chart lifecycle', () => {
    const { JSDOM } = jsdom;
  let dom;
  let chart;
  let chart2;
  let div;

  before(() => {
    dom = new JSDOM(`<!DOCTYPE html><html><body><div></div></body></html>`);
    //jsdom.env({
    //  html: '<!DOCTYPE html><html><body><div></div></body></html>',
    //  features:{ QuerySelector: true },
    //  done: function(error, jsdomWindow) {
    //    window = jsdomWindow;
    //  }
    //});
  });


  beforeEach(() => {
    div = dom.window.document.querySelector('div');
    div.style.width = 10;
    // create chart for each test
      console.log(createChart);
      console.log(div);
      console.log(settings);
    chart = createChart(div, settings);
    chart2 = createChart(div);
    expect.spyOn(chart.events, 'onInit');
    expect.spyOn(chart.events, 'onLayout');
    expect.spyOn(chart.events, 'onPreprocess');
    expect.spyOn(chart.events, 'onDatatransform');
    expect.spyOn(chart.events, 'onDraw');
    expect.spyOn(chart.events, 'onResize'); 

    chart.init([]);
    chart2.init([]);
  });

  afterEach(() => {
    // kill charts after each test
    div.children[0].remove();
    chart = null;
    chart2 = null;
  });

  describe('defaults are set', () => {
    it('multiple charts in same location should have different ids', () => {
      expect(chart.id).toNotBe(chart2.id);
    });

    it('a default config is established when no config is specified', () => {
      // loose match between objects
      expect(chart2.config).toMatch(defaultSettings);
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
