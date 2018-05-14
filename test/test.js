//remove falsey values from data
import testCleanData from './chart/cleanData';
import { linear_linear as cleanDataSettings } from './samples/irisSettings';
import cleanDataData from './samples/irisData';
testCleanData(cleanDataSettings, cleanDataData);
