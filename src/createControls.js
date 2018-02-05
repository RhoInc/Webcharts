import controls from './controls/index';
import { select } from 'd3';

export default function createControls(element = 'body', config = {}) {
    let thisControls = Object.create(controls);

    thisControls.div = element;

    thisControls.config = Object.create(config);
    thisControls.config.inputs = thisControls.config.inputs || [];

    thisControls.targets = [];

    if (config.location === 'bottom') {
        thisControls.wrap = select(element).append('div').attr('class', 'wc-controls');
    } else {
        thisControls.wrap = select(element)
            .insert('div', ':first-child')
            .attr('class', 'wc-controls');
    }

    thisControls.wrap.datum(thisControls)
    
    return thisControls;
}
