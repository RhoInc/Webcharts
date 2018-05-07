//define chart object
import testCreateChart from './createChart';
import createChartSettings from '../samples/irisSettings';
testCreateChart(createChartSettings);

//initialize chart by passing a data array to the init method
import testInit from './init';
import initSettings from '../samples/irisSettings';
import initData from '../samples/irisData';
testInit(initSettings, initData);

//render chart in DOM
import testRendering from './rendering';
import renderSettings from '../samples/element-settings';
import renderData from '../samples/data';
testRendering(renderSettings, renderData);

//check for required variables in data array
import testCheckRequired from './checkRequired';
import checkRequiredSettings from '../samples/irisSettings';
import checkRequiredData from '../samples/irisData';
testCheckRequired(checkRequiredSettings, checkRequiredData);

//generate layout of chart
import testLayout from './layout';
import layoutSettings from '../samples/irisSettings';
import layoutData from '../samples/irisData';
testLayout(layoutSettings, layoutData);

//define color scale of chart
import testSetColorScale from './setColorScale';
import setColorScaleSettings from '../samples/irisSettings';
import setColorScaleData from '../samples/irisData';
testSetColorScale(setColorScaleSettings, setColorScaleData);
