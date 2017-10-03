import testCreateChart from './createChart';

import createChartSettings from '../samples/irisSettings';
testCreateChart(createChartSettings);

import testInit from './init';

import initSettings from '../samples/irisSettings';
import initData from '../samples/irisData';
testInit(initSettings, initData);

import testRendering from './rendering';

import renderSettings from '../samples/element-settings';
import renderData from '../samples/data';
testRendering(renderSettings, renderData);

import testCheckRequired from './checkRequired';

import checkRequiredSettings from '../samples/irisSettings';
import checkRequiredData from '../samples/irisData';
testCheckRequired(checkRequiredSettings, checkRequiredData);

import testLayout from './layout';

import layoutSettings from '../samples/irisSettings';
import layoutData from '../samples/irisData';
testLayout(layoutSettings, layoutData);

import testSetColorScale from './setColorScale';

import setColorScaleSettings from '../samples/irisSettings';
import setColorScaleData from '../samples/irisData';
testSetColorScale(setColorScaleSettings, setColorScaleData);
