import data from '../samples/irisData';

import testDestroyTable from './destroyTable';
testDestroyTable(
    { exportable: false },
    data);

import testSearchTable from './searchTable';
testSearchTable(
    { sortable: false, searchable: true, exportable: false, pagination: false },
    data);

import testSortTable from './sortTable';
testSortTable(
    { sortable: true, searchable: false, exportable: false, pagination: false },
    data);
