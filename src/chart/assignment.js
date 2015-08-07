webCharts.chartCount = 0;

/**
*A factory to create chart objects
*@returns {webCharts.objects.chart}
*@method
*@memberof webCharts
*@param {string} element=body - CSS selector identifying the element in which to create the chart.
*@param {string} filepath - Path to the file containing data for the chart. Expected to be a text file of comma-separated values.
*@param {object} config - Configuration object specifying all options for how the chart is to appear and behave.
*@param {controls} controls - {@link module-webCharts.Controls.html Controls} instance that will be linked to this chart instance.
*/
webCharts.chart = function(element = 'body', filepath = null, config = {}, controls = null){

    let chart = Object.create(chartProto);
	/** CSS selector identifying the DOM element housing the rendered chart
	*@memberof webCharts.objects.chart
	*@member {string} div
	*/
	chart.div = element;
	/** The path to a data file (.csv) that provides the raw data to the chart
	*@memberof webCharts.objects.chart
	*@member {string} filepath
	*/
	chart.filepath = filepath;
	/** An object specifying chart settings
	*@memberof webCharts.objects.chart
	*@member {object} config
	*/
	chart.config = Object.create(config);
	/** A webCharts.controls~controls object associated with this chart
	*@memberof webCharts.objects.chart
	*@member {controls} webCharts~controls
	*/
	chart.controls = controls;
	/** Raw (unfiltered, untransformed) dataset stored by the chart. This dataset is either parsed from the file retreived from the provided {@link webCharts~chart.filepath filepath} or provided directly as an argument to {@link webCharts~chart.init chart.init}.
	*@memberof webCharts.objects.chart
	*@member {array} raw_data
	*/
	chart.raw_data = [];
	/** A list of objects describing the state of any data filters currently associated with the chart. This property is manipulated by controls with type='subsetter'.
	*@memberof webCharts.objects.chart
	@member {array} filters
	*/
	chart.filters = [];
	/** A list of objects describing each set of marks rendered by the chart. Maps to the 'marks' property of the configuration object, but with the mark-specfic transformed data attached
	*@memberof webCharts.objects.chart
	*@member {array} marks
	*/
	chart.marks = [];
	/** A d3 selection of a \<div\> appended within the DOM element specified by {@link webCharts~chart.div div}
	*@memberof webCharts.objects.chart
	*@member {d3.selection} wrap
  	*/
	chart.wrap = d3.select(chart.div).append('div');

    /** @member {object} */
	chart.events = {
		onLayout(){},
		onDatatransform(){},
		onDraw(){},
		onResize(){}
	};
	/**run the supplied callback function at the specified time in the Chart lifecycle
	*@memberof webCharts.objects.chart
	*@method on
	*@param {string} event - point in Chart lifecycle at which to fire the associated callback
	*@param {function} callback - function to run
	*/
	chart.on = function(event, callback){
		let possible_events = ['layout', 'datatransform', 'draw', 'resize'];
		if(possible_events.indexOf(event) < 0){
			return;
		}
		if(callback){
			chart.events['on'+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
		}
	};

    webCharts.chartCount++;
	/** A unique identifier for this chart instance
	*@memberof webCharts.objects.chart
	*@member {number} id
	*/
    chart.id = webCharts.chartCount;

    return chart;
};
