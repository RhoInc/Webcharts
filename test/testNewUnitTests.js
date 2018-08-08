//test table initialization
import testBindTableToDOM from './table/bindTableToDOM';
const settings = {
    exportable: false
};
import data from './samples/irisData';
testBindTableToDOM(
    settings,
    data
);
