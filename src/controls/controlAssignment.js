/**The base controls object.
	*@alias module:webCharts.controls
	*@param {string} element - CSS selector identifying the element in which to create the chart.
	*@param {string} data - path to the file containing data for the chart. Expected to be a text file of comma-separated values.
	*@param {Object} config - the configuration object specifying all options for how the chart is to appear and behave.
*/
webCharts.controls = function(element = 'body', data = [], config = {}, defaults = {resizable: true, max_width: 800}){
    let controls = Object.create(controlsProto);

    controls.div = element;
		controls.data = data;
    controls.config = Object.create(config);
    controls.config.inputs = controls.config.inputs || [];
    controls.targets = [];

    if(config.location === 'top')
	   		controls.wrap = d3.select(element).insert('div', ':first-child').attr('class', 'wc-controls top');
		else
	  		controls.wrap = d3.select(element).append('div').attr('class', 'wc-controls '+controls.config.location);

    return controls;
};
