import chart from '../chart/index';
import layout from './layout';
import transformData from './transformData';
import draw from './draw';

export default Object.create(chart, {
  'layout': { value: layout },
  'transformData': { value: transformData },
  'draw': { value: draw }
});
