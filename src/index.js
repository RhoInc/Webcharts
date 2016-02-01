import {d3 as d3_lib} from 'd3';

import version from './version';
import objects from './objects';
import {createChart} from './chart';
import {createControls} from './controls';
import {createTable} from './table';
import multiply from './multiply';
import dataOps from './dataOps/index';

//force to reference d3 as a variable in the bundle
const d3 = d3_lib;

export default {
	version: version,
	dataOps: dataOps,
	objects: objects,
	createChart: createChart,
	createControls: createControls,
	createTable: createTable,
	multiply: multiply
};