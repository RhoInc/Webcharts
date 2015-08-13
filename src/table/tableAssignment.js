/**
*A factory to create {@link Table table} objects
*@returns {table}
*@method
*@memberof webCharts
*@param {string} element=body - CSS selector identifying the element in which to create the table
*@param {string} filepath - path to the file containing data for the table. Expected to be a text file of comma-separated values
*@param {object} config - simple configuration object specifying all options for how the table is to appear and behave
*@param {controls} controls - {@link Controls controls} instance that will be linked to this chart instance
*/
webCharts.table = function(element = 'body', filepath='', config = {}, controls=null){
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
