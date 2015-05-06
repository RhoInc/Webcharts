var chart = function(element, filepath, config, controls){
	this.element = element;
	this.filepath = filepath;
	this.div = element ? element : "body";
	this.filters = [];
	this.config = config || {};
	this.controls = controls;
  this.wrap = d3.select(this.div).append("div")//.attr("class", "wc-chart wc-"+this.chart_type.toLowerCase());

  config.date_format = config.date_format || "%x";

	var context = this;

  this.events = {onLayout: function(){}, onDatatransform: function(){}, onDraw: function(){}, onResize: function(){}};
  this.on = function(event, callback){
    var possible_events = ["layout", "datatransform", "draw", "resize"];
    if(possible_events.indexOf(event) < 0)
      return;
    callback = callback || function(){};
    this.events["on"+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
  };//on events

	return this;
};//BASIC CHART