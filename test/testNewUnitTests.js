//test table initialization
import testInit from './table/init';
const settings = {
    exportable: false
};
import data from './samples/irisData';
testInit(
    settings,
    data
);
