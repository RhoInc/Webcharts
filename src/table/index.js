import chart from '../chart/index';
import draw from './draw';
import init from './init';
import layout from './layout';
import setDefaults from './setDefaults';
import transformData from './transformData';

export default Object.create(chart, {
    draw: { value: draw },
    init: { value: init },
    layout: { value: layout },
    setDefaults: { value: setDefaults },
    transformData: { value: transformData }
});
