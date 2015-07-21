chart.prototype.setDefaults = function(){
	this.raw_data = this.raw_data || [];

	this.config.x = this.config.x || {};
	this.config.y = this.config.y || {};

	//backwards compatibility with x/y settings
	if(this.config.x_type)
		this.config.x.type = this.config.x_type;
	if(this.config.x_vals && this.config.x_vals.col)
		this.config.x.type = this.config.x_vals.col;
	if(this.config.x_vals && this.config.x_vals.stat)
		this.config.x.summary = this.config.x_vals.stat;
	if(this.config.x_behavior)
		this.config.x.behavior = this.config.x_behavior;
	if(this.config.x_label)
		this.config.x.label = this.config.x_label;
	if(this.config.y_type)
		this.config.y.type = this.config.y_type;
	if(this.config.y_vals && this.config.y_vals.col)
		this.config.y.type = this.config.y_vals.col;
	if(this.config.y_vals && this.config.y_vals.stat)
		this.config.y.summary = this.config.y_vals.stat;
	if(this.config.y_behavior)
		this.config.y.behavior = this.config.y_behavior;
	if(this.config.y_label)
		this.config.y.label = this.config.y_label;

	this.config.x.label = this.config.x.label !== undefined ? this.config.x.label : this.config.x.column;
	this.config.y.label = this.config.y.label !== undefined ? this.config.y.label : this.config.y.column;

	this.config.x.sort = this.config.x.sort || 'alphabetical-ascending';
	this.config.y.sort = this.config.y.sort || 'alphabetical-descending';

	this.config.x.type = this.config.x.type || 'linear';
	this.config.y.type = this.config.y.type || 'linear';

	this.config.margin = this.config.margin || {};
	this.config.legend = this.config.legend || {};
	this.config.legend.label = this.config.legend.label !== undefined ? this.config.legend.label : this.config.color_by;
	this.config.marks = this.config.marks && this.config.marks.length ? this.config.marks : [{}];

	this.config.reference_regions = this.config.reference_regions || [];

	this.config.date_format = this.config.date_format || '%x';
};
