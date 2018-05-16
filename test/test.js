//remove falsey values from data
import testRangeBand from './chart/rangeBand';
import {
    linear_ordinal as linear_ordinal_rb,
    ordinal_linear as ordinal_linear_rb,
    ordinal_ordinal as ordinal_ordinal_rb
} from from './samples/irisSettings';
import rangeBandData from './samples/irisData';
testRangeBand(
    {
        linear_ordinal_rb,
        ordinal_linear_rb,
        ordinal_ordinal_rb
    },
    rangeBandData
);
