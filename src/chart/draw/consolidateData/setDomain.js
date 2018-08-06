import naturalSorter from '../../../dataOps/naturalSorter';
import { set, merge, ascending, nest, extent } from 'd3';

export default function setDomain(axis) {
    const otherAxis = axis === 'x' ? 'y' : 'x';

    if (this.config[axis].type === 'ordinal') {
        if (this.config[axis].domain) {
            this[axis + '_dom'] = this.config[axis].domain;
        } else if (this.config[axis].order) {
            this[axis + '_dom'] = set(merge(this.marks.map(mark => mark[axis + '_dom'])))
                .values()
                .sort((a, b) =>
                    ascending(
                        this.config[axis].order.indexOf(a),
                        this.config[axis].order.indexOf(b)
                    )
                );
        } else if (this.config[axis].sort && this.config[axis].sort === 'alphabetical-ascending') {
            this[axis + '_dom'] = set(merge(this.marks.map(mark => mark[axis + '_dom'])))
                .values()
                .sort(naturalSorter);
        } else if (
            this.config[otherAxis].type === 'time' &&
            this.config[axis].sort === 'earliest'
        ) {
            this[axis + '_dom'] = nest()
                .key(d => d[this.config[axis].column])
                .rollup(d => {
                    return d
                        .map(m => m[this.config[otherAxis].column])
                        .filter(f => f instanceof Date);
                })
                .entries(this.raw_data)
                .sort((a, b) => min(b.values) - min(a.values))
                .map(m => m.key);
        } else if (
            !this.config[axis].sort ||
            this.config[axis].sort === 'alphabetical-descending'
        ) {
            this[axis + '_dom'] = set(merge(this.marks.map(mark => mark[axis + '_dom'])))
                .values()
                .sort(naturalSorter);
        } else {
            this[axis + '_dom'] = set(merge(this.marks.map(mark => mark[axis + '_dom']))).values();
        }
    } else if (this.config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1) {
        this[axis + '_dom'] = [0, 1];
    } else {
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
