/**
*The chart object represents a chart with conventional x- and y-axes that is rendered with SVG. Customizable configuration options determine the appearance and behavior of the chart, and these options can be manipulated indirectly through a set of {@link controls.md controls}. The chart has several lifecycle methods used to instantiate the object, render necessary elements, and adjust the rendered elements as needed. The chart can therefore be updated dynamically by changing some {@link config config} options (or operating directly on the chart object's properties) or by feeding it new data and then calling its {@link chart.draw draw} method to trigger an animated re-render.
*@type {object}
*@var chart
*/
let chartProto = {
	/** 
	*raw (unfiltered, untransformed) dataset stored by the chart
	*@member {Array}
	*/
	raw_data: [],
	config: {}
};

Object.defineProperties(chartProto, {
	//'adjustTicks': {value: adjustTicks},
	'checkRequired': {value: checkRequired},
	'consolidateData': {value: consolidateData},
	'draw': {value: draw},
	'drawArea': {value: drawArea},
	'drawBars': {value: drawBars},
	'drawGridlines': {value: drawGridlines},
	'drawLines': {value: drawLines},
	'drawPoints': {value: drawPoints},
	//highlightMarks': {value: highlightMarks},
	'init': {value: init},
	'layout': {value: layout},
	'makeLegend': {value: makeLegend},
	'onDataError': {value: onDataError},
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


