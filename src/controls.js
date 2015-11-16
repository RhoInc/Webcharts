import controls from './controls/index';

export function createControls(element = 'body', config = {}){
    let thisControls = Object.create(controls);
    
    thisControls.div = element;

    thisControls.config = Object.create(config);
    thisControls.config.inputs = thisControls.config.inputs || [];

    thisControls.targets = [];

    if(config.location === 'bottom'){
        thisControls.wrap = d3.select(element).append('div').attr('class', 'wc-thisControls');
    }
	else{
	  	thisControls.wrap = d3.select(element).insert('div', ':first-child').attr('class', 'wc-thisControls');
    }

    return thisControls;
}
