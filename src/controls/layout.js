Controls.prototype.layout = function(){
    this.div.selectAll("*").remove();
    this.div.append("div").attr("class", "main-settings");
    this.div.append("div").attr("class", "advanced-settings");
   	this.controlUpdate();
   	if(this.callback)
   		this.callback(this);
};