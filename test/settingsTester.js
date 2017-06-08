import testSettingList from './samples/chart-config/testSettingList';

import { readFile, readFileSync } from 'fs';
import d3 from 'd3';
import {merge} from 'd3'
import jsdom from 'jsdom';
import webcharts from '../build/webcharts';
import expect from 'expect';

import testCreateChart from './chart/createChart';
import testInit from './chart/init';
import testLayout from './chart/layout';

var settingsList = [];
var numLoaded = 0;
testSettingList.forEach(function(d){
//  fs.readFile(__dirname + '/../../foo.bar');
  var path = '/samples/chart-config/'+d.filename
  var jsonRaw = readFileSync(__dirname + path, 'utf8')
  var jsonData = JSON.parse(jsonRaw);
  settingsList = merge([settingsList,jsonData])
  numLoaded = numLoaded + 1
  if(numLoaded == testSettingList.length) runTests(settingsList)
})

function runTests(settingsList){
  console.log("testing "+settingsList.length)
  it('run tests once for each settings object', done => {
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
}
