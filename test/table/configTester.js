import testSettingList from '../samples/chart-config/testSettingList';
import { join } from 'path';
import { readFileSync } from 'fs';
import { merge, csv } from 'd3';
import testCreateTable from '../table/createTable';
import testRendering from '../table/rendering';

// Run ./createTable.js and ./rendering.js for each settings object ../samples/chart-config/testSettingsList.json
function runTests(settingsList) {
    it('runs tests once for each settings object', done => {
        settingsList.forEach((settings, i) => {
            const dataFile = `./test/samples/data/${settings.filename}`;
            const text = readFileSync(dataFile, 'utf8');
            const data = csv.parse(text);

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

let settingsList = []; // capture each settings object in an array
let numLoaded = 0; // capture number of settings objects
const testSettingList_tables = testSettingList.filter(d => d.type == 'tables');

testSettingList_tables.forEach(function(d) {
    const jsonPath = join(__dirname, '..', 'samples', 'chart-config', d.filename);
    const jsonRaw = readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(jsonRaw);
    settingsList = merge([settingsList, jsonData]);
    numLoaded = numLoaded + 1;

    // Run tests once all settings objects have been loaded.
    if (numLoaded === testSettingList_tables.length) runTests(settingsList);
});
