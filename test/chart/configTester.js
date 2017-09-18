import testSettingList from '../samples/chart-config/testSettingList';

import { readFile, readFileSync } from 'fs';
import d3 from 'd3';
import { merge } from 'd3';
import jsdom from 'jsdom';
import webcharts from '../../build/webcharts';
import expect from 'expect';

import testCreateChart from '../chart/createChart';
import testRendering from '../chart/rendering';

var settingsList = [];
var numLoaded = 0;
testSettingList
.filter(function(f){return f.type=="charts"})
.forEach(function(d) {
  var path = require('path');
  var jsonPath = path.join(
    __dirname,
    '..',
    'samples',
    'chart-config',
    d.filename
  );
  var jsonRaw = readFileSync(jsonPath, 'utf8');
  var jsonData = JSON.parse(jsonRaw);
  settingsList = merge([settingsList, jsonData]);
  numLoaded = numLoaded + 1;
  if (numLoaded == testSettingList.length) runTests(settingsList);
  //if (numLoaded == 1) runTests(settingsList);
});

function runTests(settingsList) {
  it('run tests once for each settings object', done => {
    settingsList.forEach((settings, i) => {
      const dataFile = `./test/samples/data/${settings.filename}`,
        raw = readFileSync(dataFile, 'utf8'),
        data = d3.csv.parse(raw);
      describe(`Test ${i + 1} of ${settingsList.length}: ${settings.label}. `, () => {
        describe('Create Chart. ', () => {
          testCreateChart(settings.settings, false);
        });
        describe('Render Chart. ', () => {
          testRendering(settings.settings, data, false);
        });
      });
    });
    done();
  });
}
