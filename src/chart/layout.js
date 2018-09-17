import addSVG from './layout/addSVG';
import addDefs from './layout/addDefs';
import addXAxis from './layout/addXAxis';
import addYAxis from './layout/addYAxis';
import addOverlay from './layout/addOverlay';
import addLegend from './layout/addLegend';
import clearLoader from './layout/clearLoader';

export default function layout() {
    addSVG.call(this);
    addDefs.call(this);
    addXAxis.call(this);
    addYAxis.call(this);
    addOverlay.call(this);
    addLegend.call(this);
    clearLoader.call(this);
    this.events.onLayout.call(this);
}
