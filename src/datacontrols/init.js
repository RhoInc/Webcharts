Controls.prototype.init = function(raw){
  	this.data = raw;
    if(!this.config.builder)
  	 this.checkRequired(this.data);
  	this.layout();
    this.ready = true;
};