let chartProto = {
	raw_data: [],
	config: {}
};

Object.defineProperties(chartProto, {
	'checkRequired': {value: checkRequired},
	'consolidateData': {value: consolidateData},
	'draw': {value: draw},
	'drawArea': {value: drawArea},
	'drawBars': {value: drawBars},
	'drawGridlines': {value: drawGridlines},
	'drawLines': {value: drawLines},
	'drawPoints': {value: drawPoints},
	'init': {value: init},
	'layout': {value: layout},
	'makeLegend': {value: makeLegend},
	'resize': {value: resize},
	'setColorScale': {value: setColorScale},
	'setDefaults': {value: setDefaults},
	'setMargins': {value: setMargins},
	'textSize': {value: textSize},
	'transformData': {value: transformData},
	'updateDataMarks': {value: updateDataMarks},
	'xScaleAxis': {value: xScaleAxis},
	'yScaleAxis': {value: yScaleAxis}
});


