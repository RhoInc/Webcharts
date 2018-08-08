import checkRequired from './checkRequired';
import consolidateData from './consolidateData';
import destroy from './destroy';
import draw from './draw';
import drawArea from './drawArea';
import drawBars from './drawBars';
import drawGridlines from './drawGridlines';
import drawLines from './drawLines';
import drawPoints from './drawPoints';
import drawText from './drawText';
import init from './init';
import layout from './layout';
import makeLegend from './makeLegend';
import resize from './resize';
import setColorScale from './setColorScale';
import setDefaults from './setDefaults';
import setMargins from './setMargins';
import textSize from './textSize';
import transformData from './transformData';
import updateDataMarks from './updateDataMarks';
import xScaleAxis from './xScaleAxis';
import yScaleAxis from './yScaleAxis';

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
