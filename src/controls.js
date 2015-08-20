webCharts.controls = function(element = 'body', config = {}){
    let controls = Object.create(webCharts.objects.controls);
    
    controls.div = element;

    controls.config = Object.create(config);
    controls.config.inputs = controls.config.inputs || [];

    controls.targets = [];

    if(config.location === 'bottom'){
        controls.wrap = d3.select(element).append('div').attr('class', 'wc-controls');
    }
	else{
	  	controls.wrap = d3.select(element).insert('div', ':first-child').attr('class', 'wc-controls');
    }

    return controls;
};
