import data from '../samples/irisData';

import testInit from './init';
testInit({ exportable: false }, data);

import testSearchTable from './searchTable';
testSearchTable({ sortable: false, searchable: true, exportable: false, pagination: false }, data);

import testSortTable from './sortTable';
testSortTable({ sortable: true, searchable: false, exportable: false, pagination: false }, data);

import testDestroyTable from './destroyTable';
testDestroyTable({ exportable: false }, data);
