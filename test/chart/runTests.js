//define chart object
import testCreateChart from './createChart';
import { linear_linear as createChartSettings } from '../samples/irisSettings';
testCreateChart(createChartSettings);

//initialize chart by passing a data array to the init method
import testInit from './init';
import { linear_linear as initSettings } from '../samples/irisSettings';
import initData from '../samples/irisData';
testInit(initSettings, initData);

//render chart in DOM
import testRendering from './rendering';
import renderSettings from '../samples/element-settings';
import renderData from '../samples/data';
testRendering(renderSettings, renderData);

//check for required variables in data array
import testCheckRequired from './checkRequired';
import { linear_linear as checkRequiredSettings } from '../samples/irisSettings';
import checkRequiredData from '../samples/irisData';
testCheckRequired(checkRequiredSettings, checkRequiredData);

//generate layout of chart
import testLayout from './layout';
import { linear_linear as layoutSettings } from '../samples/irisSettings';
import layoutData from '../samples/irisData';
testLayout(layoutSettings, layoutData);

//define color scale of chart
import testSetColorScale from './setColorScale';
import { linear_linear as setColorScaleSettings } from '../samples/irisSettings';
import setColorScaleData from '../samples/irisData';
testSetColorScale(setColorScaleSettings, setColorScaleData);

//transform raw data for each mark defined in chart config
import testTransformData from './transformData';
import { linear_linear as transformDataSettings } from '../samples/irisSettings';
import transformDataData from '../samples/irisData';
testTransformData(transformDataSettings, transformDataData);

//define singular domain for chart
import testSetDomain from './setDomain';
import { linear_linear, linear_ordinal, ordinal_linear } from '../samples/irisSettings';
import setDomainData from '../samples/irisData';
testSetDomain({linear_linear, linear_ordinal, ordinal_linear}, setDomainData);

//remove falsey values from data
import testCleanData from './cleanData';
import { linear_linear as cleanDataSettings } from '../samples/irisSettings';
import cleanDataData from '../samples/irisData';
testCleanData(cleanDataSettings, cleanDataData);
