// Import and run unit test that requires no arguments:
//
//   import './folder/unit-test';
//
// or
//
// Import and run a reusable unit-test function that accepts a settings argument and a data argument:
//
//   import settings from './samples/settings'; // optional
//   import data from './samples/data';
//   import test from './folder/unit-test';
//   test(settings, data);

import data from './samples/irisData';
import testSortTable from './table/sortTable';
testSortTable({ sortable: true, searchable: false, exportable: false, pagination: false }, data);
