Controls.prototype.controlUpdate = function(){
   	var control_div = this.div.select(".main-settings");
   	var advanced_div = this.div.select(".main-settings");
   	var context = this;

   	if(this.config.controls && this.config.controls.length && this.config.controls[0])
      	this.config.controls.forEach(function(e){context.makeControlItem(e,control_div,advanced_div) });
  };