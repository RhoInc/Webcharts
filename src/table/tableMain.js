let tableProto = Object.create(chartProto);

Object.defineProperties(tableProto, {
	'layout': {value: tableLayout},
	'transformData': {value: tableTransformData},
	'draw': {value: tableDraw}
});