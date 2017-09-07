import chart from '../chart/index';
import init from './init';
import layout from './layout';
import transformData from './transformData';
import draw from './draw';

export default Object.create(chart, {
    init: { value: init },
    layout: { value: layout },
    transformData: { value: transformData },
    draw: { value: draw }
});
