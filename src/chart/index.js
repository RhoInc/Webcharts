import init from './init';
import checkRequired from './init/checkRequired';

import layout from './layout';

import draw from './draw';
import consolidateData from './draw/consolidateData';
import setDefaults from './draw/consolidateData/setDefaults';
import transformData from './draw/consolidateData/transformData';
import setColorScale from './draw/setColorScale';
import xScaleAxis from './draw/xScaleAxis';
import yScaleAxis from './draw/yScaleAxis';

import resize from './resize';
import textSize from './resize/textSize';
import setMargins from './resize/setMargins';
import drawGridlines from './resize/drawGridlines';
import makeLegend from './resize/makeLegend';
import updateDataMarks from './resize/updateDataMarks';
import drawArea from './resize/updateDataMarks/drawArea';
import drawBars from './resize/updateDataMarks/drawBars';
import drawLines from './resize/updateDataMarks/drawLines';
import drawPoints from './resize/updateDataMarks/drawPoints';
import drawText from './resize/updateDataMarks/drawText';

import destroy from './destroy';

const chartProto = {
    raw_data: [],
    config: {}
};

export default Object.create(chartProto, {
    checkRequired: { value: checkRequired },
    consolidateData: { value: consolidateData },
    draw: { value: draw },
    destroy: { value: destroy },
    drawArea: { value: drawArea },
    drawBars: { value: drawBars },
    drawGridlines: { value: drawGridlines },
    drawLines: { value: drawLines },
    drawPoints: { value: drawPoints },
    drawText: { value: drawText },
    init: { value: init },
    layout: { value: layout },
    makeLegend: { value: makeLegend },
    resize: { value: resize },
    setColorScale: { value: setColorScale },
    setDefaults: { value: setDefaults },
    setMargins: { value: setMargins },
    textSize: { value: textSize },
    transformData: { value: transformData },
    updateDataMarks: { value: updateDataMarks },
    xScaleAxis: { value: xScaleAxis },
    yScaleAxis: { value: yScaleAxis }
});
