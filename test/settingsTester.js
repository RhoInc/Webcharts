import manualTests from './samples/chart-config/manualTests';
import barChartTests from './samples/chart-config/bar_chart_testConfig';
import configTests from './samples/chart-config/config_settings_testConfig';
import scatterPlotTests from './samples/chart-config/scatter_plot_testConfig';
import SummarizeTests from './samples/chart-config/summarize_chart_testConfig';
import testConfig from './samples/chart-config/testConfig';
import timeAxisTests from './samples/chart-config/time_axis_testConfig';

import { readFile, readFileSync } from 'fs';
import d3 from 'd3';
import jsdom from 'jsdom';
import webcharts from '../build/webcharts';
import expect from 'expect';

import testCreateChart from './chart/createChart';
import testInit from './chart/init';
import testLayout from './chart/layout';

it('run tests once for each settings object', done => {
  var settingsList = d3.merge([
    manualTests,
  //  barChartTests,
    configTests,
    scatterPlotTests,
    SummarizeTests,
    testConfig,
    timeAxisTests
  ]);
  settingsList.forEach((settings, i) => {
    const dataFile = `./test/samples/data/${settings.filename}`,
      raw = readFileSync(dataFile, 'utf8'),
      data = d3.csv.parse(raw);

    describe('chart creation, initialization, and lifecycle', () => {
      var { JSDOM } = jsdom;
      var dom, container, chart;

      before(() => {
        console.log(
          `\nTest ${i + 1} of ${settingsList.length}: ${settings.label}`
        );
        dom = new JSDOM('<!DOCTYPE html>');
        container = dom.window.document.createElement('div');
      });

      beforeEach(() => {
        chart = webcharts.createChart(container, settings.settings);

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

      describe('running test/chart/createChart', () => {
        testCreateChart(settings.settings);
      });

      describe('running test/chart/init', () => {
      //  testInit(settings.settings, data);
      });

      describe('running test/chart/layout', () => {
      //  testLayout(settings.settings, data);
      });

      //describe('should run all .on([lifecycle]) functions when initialized', () => {
      //    it('should call onInit', () => {
      //        expect(chart.events.onInit).toHaveBeenCalled();
      //    });
      //    it('should call onLayout', () => {
      //        expect(chart.events.onLayout).toHaveBeenCalled();
      //    });
      //    it('should call onPreprocess', () => {
      //        expect(chart.events.onPreprocess).toHaveBeenCalled();
      //    });
      //    it('should call onDatatransform', () => {
      //        expect(chart.events.onDatatransform).toHaveBeenCalled();
      //    });
      //    it('should call onDraw', () => {
      //        expect(chart.events.onDraw).toHaveBeenCalled();
      //    });
      //    it('should call onResize', () => {
      //        expect(chart.events.onResize).toHaveBeenCalled();
      //    });
      //});
    });
  });

  done();
});
