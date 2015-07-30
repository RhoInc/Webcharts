/**The base table object.
	*@alias module:webCharts.table
	*@param {string} element - CSS selector identifying the element in which to create the chart.
	*@param {string} filepath - path to the file containing data for the chart. Expected to be a text file of comma-separated values.
	*@param {Object} config - the configuration object specifying all options for how the chart is to appear and behave.
	*@param {Object} config.x - object with properties to define the x-axis.
	*@param {Object} config.x.column - column from the supplied dataset to supply values for x-axis.
 	*@param {Object} config.y - object with properties to define the y-axis.
	*@param {Controls} controls - {@link module-webCharts.Controls.html Controls} instance that will be linked to this chart instance.
*/
webCharts.table = function(element = 'body', filepath, config = {}, controls){
    let table = Object.create(tableProto);
    /** @member {string} */
		table.div = element;
		/** @member {string} */
		table.filepath = filepath;
		/** @member {Object} */
		table.config = Object.create(config);
		/** @member {Controls} */
		table.controls = controls;
		/** @member {Array} */
		table.filters = [];
		/** @member {Array} */
		table.required_cols = [];
		/** @member {Array} */
		table.marks = [];
		/** @member {d3.selection} */
		table.wrap = d3.select(table.div).append('div');

    /** @member {Object} */
		table.events = {
			onLayout(){},
			onDatatransform(){},
			onDraw(){},
			onResize(){}
		};
		/**run the supplied callback function at the specified time in the Chart lifecycle
			*@method
			*@param {string} event - point in Chart lifecycle at which to fire the associated callback
			*@param {function} callback - function to run
		*/
		table.on = function(event, callback){
			let possible_events = ['layout', 'datatransform', 'draw', 'resize'];
			if(possible_events.indexOf(event) < 0)
				return;
			if(callback)
				table.events['on'+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
		};

    return table;
};
