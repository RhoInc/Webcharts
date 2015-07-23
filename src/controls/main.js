/**The base Controls object.
	*@alias module:webCharts.Controls
	*@constructor
	*@param {string} element - CSS selector identifying the element in which to create the chart.
	*@param {string} data - path to the file containing data for the chart. Expected to be a text file of comma-separated values.
	*@param {Object} config - the configuration object specifying all options for how the chart is to appear and behave.
*/
var Controls = function(element, data, config, defaults, callback){
	if(config.location === "top")
   		this.div = d3.select(element).insert("div", ":first-child").attr("class", "wc-controls top");
	else
  		this.div = d3.select(element).append("div").attr("class", "wc-controls "+config.location);
  this.element = element;
	this.data = data || [];
	this.config = config;
  this.config.controls = this.config.controls || [];
	this.defaults = defaults ? defaults : {resizable: true, max_width: 800};
	this.callback = callback;
  this.targets = [];

	this.div.selectAll(".changer").each(function(e,i){
    if(e.links){
    	var value = d3.select(this).attr("type") === "checkbox" ? !d3.select(this).property("checked") : d3.select(this).property("value");
    	toggleDisabled(value, e.links);
    }
  });

  return this;
};
