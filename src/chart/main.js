/**The base Chart object.
	*@alias module:webCharts.Chart
	*@constructor
	*@param {string} element - CSS selector identifying the element in which to create the chart.
	*@param {string} filepath - path to the file containing data for the chart. Expected to be a text file of comma-separated values.
	*@param {Object} config - the configuration object specifying all options for how the chart is to appear and behave.
	*@param {Object} config.x - object with properties to define the x-axis.
	*@param {Object} config.x.column - column from the supplied dataset to supply values for x-axis.
 	*@param {Object} config.y - object with properties to define the y-axis.
	*@param {Controls} controls - {@link module-webCharts.Controls.html Controls} instance that will be linked to this chart instance.
*/
function Chart(element, filepath, config, controls){
	/** @member {string} */
	this.element = element;
	/** @member {string} */
	this.filepath = filepath;
	/** @member {string} */
	this.div = element ? element : "body";
	/** @member {Array} */
	this.filters = [];
	/** @member {Object} */
	this.config = config || {};
	/** @member {Controls} */
	this.controls = controls;
	/** @member {d3.selection} */
	this.wrap = d3.select(this.div).append("div");

	config.date_format = config.date_format || "%x";

	/** @member {Object} */
	this.events = {
		onLayout: function(){},
		onDatatransform: function(){},
		onDraw: function(){},
		onResize: function(){}
	};
	/**run the supplied callback function at the specified time in the Chart lifecycle
		*@method
		*@param {string} event - point in Chart lifecycle at which to fire the associated callback
		*@param {function} callback - function to run
	*/
	this.on = function(event, callback){
		var possible_events = ["layout", "datatransform", "draw", "resize"];
		if(possible_events.indexOf(event) < 0)
			return;
		callback = callback || function(){};
		this.events["on"+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
	};

	return this;
}
