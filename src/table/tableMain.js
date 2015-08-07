/**
*The chart object represents a chart with conventional x- and y-axes that is rendered with SVG. Customizable configuration options determine the appearance and behavior of the chart, and these options can be manipulated indirectly through a set of {@link webCharts~controls controls}. The chart has several lifecycle methods used to instantiate the object, render necessary elements, and adjust the rendered elements as needed. The chart can therefore be updated dynamically by changing some {@link webCharts~chart.config config} options (or operating directly on the chart object's properties) or by feeding it new data and then calling its {@link webCharts~chart.draw draw} method to trigger an animated re-render.
*@type {object}
*@var table
*/
let tableProto = Object.create(chartProto);
// tableProto.layout = tableLayout;
// tableProto.transformData = tableTransformData;
// // tableProto.draw = tableDraw;
Object.defineProperties(tableProto, {
	'layout': {value: tableLayout},
	'transformData': {value: tableTransformData},
	'draw': {value: tableDraw}
});