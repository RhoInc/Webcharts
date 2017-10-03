import testDestroyTable from './destroyTable';
import destroyData from '../samples/irisData';
testDestroyTable({ exportable: false }, destroyData);

import testSearchTable from './searchTable';
testSearchTable();

import testSortTable from './sortTable';
testSortTable();
