import naturalSorter from '../../../dataOps/naturalSorter';
import { set, merge, ascending, nest, min, extent } from 'd3';

export default function setDomain(axis) {
    const otherAxis = axis === 'x' ? 'y' : 'x';

    if (this.config[axis].type === 'ordinal') {
        //ordinal domains
        if (this.config[axis].domain) {
            //user-defined domain
            this[axis + '_dom'] = this.config[axis].domain;
        } else if (this.config[axis].order) {
            //data-driven domain with user-defined domain order
            this[axis + '_dom'] = set(merge(this.marks.map(mark => mark[axis + '_dom'])))
                .values()
                .sort((a, b) =>
                    ascending(
                        this.config[axis].order.indexOf(a),
                        this.config[axis].order.indexOf(b)
                    )
                );
        } else if (this.config[axis].sort && this.config[axis].sort === 'alphabetical-ascending') {
            //data-driven domain with user-defined domain sort algorithm that sorts the axis
            //alphanumerically, first to last
            this[axis + '_dom'] = set(merge(this.marks.map(mark => mark[axis + '_dom'])))
                .values()
                .sort(naturalSorter);
        } else if (
            ['time', 'linear'].indexOf(this.config[otherAxis].type) > -1 &&
            this.config[axis].sort === 'earliest'
        ) {
            //data-driven domain plotted against a time or linear axis that sorts the axis values
            //by earliest event/datum; generally used with timeline charts
            this[axis + '_dom'] = nest()
                .key(d => d[this.config[axis].column])
                .rollup(d => {
                    return d
                        .map(m => m[this.config[otherAxis].column])
                        .filter(f => f instanceof Date);
                })
                .entries(this.filtered_data)
                .sort((a, b) => min(b.values) - min(a.values))
                .map(m => m.key);
        } else if (
            !this.config[axis].sort ||
            this.config[axis].sort === 'alphabetical-descending'
        ) {
            //data-driven domain with default/user-defined domain sort algorithm that sorts the
            //axis alphanumerically, last to first
            this[axis + '_dom'] = set(merge(this.marks.map(mark => mark[axis + '_dom'])))
                .values()
                .sort(naturalSorter)
                .reverse();
        } else {
            //data-driven domain with an invalid user-defined sort algorithm that captures a unique
            //set of values as they appear in the data
            this[axis + '_dom'] = set(merge(this.marks.map(mark => mark[axis + '_dom']))).values();
        }
    } else if (
        this.config.marks
            .map(m => m['summarize' + axis.toUpperCase()] === 'percent')
            .indexOf(true) > -1
    ) {
        //rate domains run from 0 to 1
        this[axis + '_dom'] = [0, 1];
    } else {
        //continuous domains run from the minimum to the maximum raw (or is it summarized...?) value
        //TODO: they should really run from the minimum to the maximum summarized value, e.g. a
        //TODO: means over time chart should plot over the range of the means, not the range of the
        //TODO: raw data
        this[axis + '_dom'] = extent(merge(this.marks.map(mark => mark[axis + '_dom'])));
    }

    //Give the domain a range when the range of the variable is 0.
    if (this.config[axis].type === 'linear' && this[axis + '_dom'][0] === this[axis + '_dom'][1])
        this[axis + '_dom'] = this[axis + '_dom'][0] !== 0
            ? [
                  this[axis + '_dom'][0] - this[axis + '_dom'][0] * 0.01,
                  this[axis + '_dom'][1] + this[axis + '_dom'][1] * 0.01
              ]
            : [-1, 1];

    return this[axis + '_dom'];
}
