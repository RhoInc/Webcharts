Controls.prototype.reset = function(new_file){
	this.div.selectAll("*").remove();
	
	this.layout();
    this.ready = true;
	// context.target.wrap.selectAll("*").remove();
	// context.target.config = context.defaults;
	// context.target.filepath = new_file;
	// context.target.init();
};