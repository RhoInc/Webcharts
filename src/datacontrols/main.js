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