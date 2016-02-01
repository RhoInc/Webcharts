import d3 from 'd3';

import version from './version';
import objects from './objects';
import {createChart} from './chart';
import {createControls} from './controls';
import {createTable} from './table';
import multiply from './multiply';
import dataOps from './dataOps/index';

export default {
	version: version,
	dataOps: dataOps,
	objects: objects,
	createChart: createChart,
	createControls: createControls,
	createTable: createTable,
	multiply: multiply
};