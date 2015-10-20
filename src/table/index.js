import {chartProto} from '../chart/';
import layout from './layout';
import transformData from './transformData';
import draw from './draw';

export var tableProto = Object.create(chartProto);

Object.defineProperties(tableProto, {
	'layout': {value: layout},
	'transformData': {value: transformData},
	'draw': {value: draw}
});