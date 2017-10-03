import testSettingList from '../samples/chart-config/testSettingList';

import { readFile, readFileSync } from 'fs';
import d3 from 'd3';
import { merge } from 'd3';
import jsdom from 'jsdom';
import webcharts from '../../build/webcharts';
import expect from 'expect';

import testCreateTable from '../table/createTable';
import testRendering from '../table/rendering';

var settingsList = [];
var numLoaded = 0;

var testSettingList_tables = testSettingList.filter(function(d) {
    return d.type == 'tables';
});

testSettingList_tables.forEach(function(d) {
    var path = require('path');
    var jsonPath = path.join(__dirname, '..', 'samples', 'chart-config', d.filename);

    var jsonRaw = readFileSync(jsonPath, 'utf8');
    var jsonData = JSON.parse(jsonRaw);
    settingsList = merge([settingsList, jsonData]);
    numLoaded = numLoaded + 1;
    if (numLoaded == testSettingList_tables.length) runTests(settingsList);
    //if (numLoaded == 1) runTests(settingsList);
});

function runTests(settingsList) {
    it('run tests once for each settings object', done => {
        settingsList.forEach((settings, i) => {
            const dataFile = `./test/samples/data/${settings.filename}`,
                raw = readFileSync(dataFile, 'utf8'),
                data = d3.csv.parse(raw);
            describe(`Table Test ${i + 1} of ${settingsList.length}: ${settings.label}. `, () => {
                describe('Create Table. ', () => {
                    testCreateTable(settings.settings);
                });
                describe('Render Table. ', () => {
                    testRendering(settings.settings, data);
                });
            });
        });
        done();
    });
}
