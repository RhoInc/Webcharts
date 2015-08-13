/**
*A factory to create {@link Controls controls} objects
*@returns {controls}
*@method
*@memberof webCharts
*@param {string} element=body - CSS selector identifying the element in which to create the controls
*@param {array} data - path to the file containing data for the chart. Expected to be a text file of comma-separated values
*@param {object} config - configuration object describing the inputs to be rendered
*/
webCharts.controls = function(element = 'body', data = [], config = {}, defaults = {resizable: true, max_width: 800}){
    let controls = Object.create(controlsProto);
    /** CSS selector identifying the DOM element housing the rendered controls
    *@memberof controls
    *@member {string} div
    */
    controls.div = element;
    /** Raw (unfiltered, untransformed) dataset stored by the controls. This dataset is passed to the controls object from any associated chart object
    *@memberof controls
    *@member {array} data
    */
	controls.data = data;
    /** An object specifying controls settings
    *@memberof controls
    *@member {object} config
    */
    controls.config = Object.create(config);
    controls.config.inputs = controls.config.inputs || [];
    /** A list of chart objects that the controls object can manipulate
    *@memberof controls
    *@member {array} targets
    */
    controls.targets = [];

    /** A d3 selection of a \<div\> appended within the DOM element specified by {@link webCharts~controls.div div}
    *@memberof controls
    *@member {d3.selection} wrap
    */
    if(config.location === 'bottom'){
        controls.wrap = d3.select(element).append('div').attr('class', 'wc-controls');
    }
	else{
	  	controls.wrap = d3.select(element).insert('div', ':first-child').attr('class', 'wc-controls');
    }

    return controls;
};
