import naturalSorter from '../../../dataOps/naturalSorter';
import { set, merge, ascending, nest, min, extent } from 'd3';

export default function setDomain(axis) {
    const thisAxis = this.config[axis];
    const thatAxis = this.config[axis === 'x' ? 'y' : 'x'];
    let dom;

    if (thisAxis.type === 'ordinal') {
        //ordinal domains
        if (thisAxis.domain) {
            //user-defined domain
            dom = thisAxis.domain;
        } else if (thisAxis.order) {
            //data-driven domain with user-defined domain order
            dom = set(merge(this.marks.map(mark => mark[axis + '_dom'])))
                .values()
                .sort((a, b) => ascending(thisAxis.order.indexOf(a), thisAxis.order.indexOf(b)));
        } else if (thisAxis.sort && thisAxis.sort === 'alphabetical-ascending') {
            //data-driven domain with user-defined domain sort algorithm that sorts the axis
            //alphanumerically, first to last
            dom = set(merge(this.marks.map(mark => mark[axis + '_dom'])))
                .values()
                .sort(naturalSorter);
        } else if (['time', 'linear'].indexOf(thatAxis.type) > -1 && thisAxis.sort === 'earliest') {
            //data-driven domain plotted against a time or linear axis that sorts the axis values
            //by earliest event/datum; generally used with timeline charts
            dom = nest()
                .key(d => d[thisAxis.column])
                .rollup(d => {
                    return d.map(m => m[thatAxis.column]).filter(f => f instanceof Date);
                })
                .entries(this.filtered_data)
                .sort((a, b) => min(b.values) - min(a.values))
                .map(m => m.key);
        } else if (!thisAxis.sort || thisAxis.sort === 'alphabetical-descending') {
            //data-driven domain with default/user-defined domain sort algorithm that sorts the
            //axis alphanumerically, last to first
            dom = set(merge(this.marks.map(mark => mark[axis + '_dom'])))
                .values()
                .sort(naturalSorter)
                .reverse();
        } else {
            //data-driven domain with an invalid user-defined sort algorithm that captures a unique
            //set of values as they appear in the data
            dom = set(merge(this.marks.map(mark => mark[axis + '_dom']))).values();
        }
    } else if (
        this.config.marks
            .map(m => m['summarize' + axis.toUpperCase()] === 'percent')
            .indexOf(true) > -1
    ) {
        //rate domains run from 0 to 1
        dom = [0, 1];
    } else {
        //continuous domains run from the minimum to the maximum raw (or is it summarized...?) value
        //TODO: they should really run from the minimum to the maximum summarized value, e.g. a
        //TODO: means over time chart should plot over the range of the means, not the range of the
        //TODO: raw data
        dom = extent(merge(this.marks.map(mark => mark[axis + '_dom'])));
    }

    //Give the domain a range when the range of the variable is 0.
    if (thisAxis.type === 'linear' && dom[0] === dom[1])
        dom = dom[0] !== 0 ? [dom[0] - dom[0] * 0.01, dom[1] + dom[1] * 0.01] : [-1, 1];

    this[axis + '_dom'] = dom;

    return dom;
}
