/** The controls object represents a set of inputs that are rendered with standard HTML <code>\<input\></code> and <code>\<select\></code> elements. These inputs manipulate any charts associated with this control object by either assigning new values to the charts' {@link webCharts~chart.config config} properties (to change the charts' appearance or behavior) or changing the objects in the charts' {@link webCharts~chart.filters filters} array (to subset the data that is visualized in the chart).
*@type {object}
*@var controls
*/
let controlsProto = {
	changeOption: changeOption,
	checkRequired: controlCheckRequired,
	controlUpdate: controlUpdate,
	init: controlInit,
	layout: controlLayout,
	makeControlItem: makeControlItem,
	makeBtnGroupControl: makeBtnGroupControl,
	makeCheckboxControl: makeCheckboxControl,
	makeDropdownControl: makeDropdownControl,
	makeListControl: makeListControl,
	makeNumberControl: makeNumberControl,
	makeRadioControl: makeRadioControl,
	makeSubsetterControl: makeSubsetterControl,
	makeTextControl: makeTextControl
};
