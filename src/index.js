import version from './version';
import objects from './objects';
import { createChart } from './chart';
import { createControls } from './controls';
import { createTable } from './table';
import multiply from './multiply';
import dataOps from './dataOps/index';

export default {
  version,
  dataOps,
  objects,
  createChart,
  createControls,
  createTable,
  multiply
};
