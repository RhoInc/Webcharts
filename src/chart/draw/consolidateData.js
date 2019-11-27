import naturalSorter from '../../dataOps/naturalSorter';
import { set, merge, ascending, nest, min, extent } from 'd3';
import setDomain from './consolidateData/setDomain';

export default function consolidateData(raw) {
    this.setDefaults();

    //Apply filters from associated controls objects to raw data.
    this.filtered_data = raw;
    if (this.filters.length) {
        this.filters.forEach(filter => {
            this.filtered_data = this.filtered_data.filter(d => {
                return filter.all === true && filter.index === 0
                    ? d
                    : filter.val instanceof Array
                    ? filter.val.indexOf(d[filter.col]) > -1
                    : d[filter.col] === filter.val;
            });
        });
    }

    //Summarize data for each mark.
    this.config.marks.forEach((mark, i) => {
        if (mark.type !== 'bar') {
            mark.arrange = null;
            mark.split = null;
        }

        const mark_info = mark.per
            ? this.transformData(raw, mark)
            : {
                  data: [],
                  x_dom: [],
                  y_dom: []
              };

        this.marks[i] = Object.assign({}, mark, mark_info);
    });

    //Set domains given extents of summarized mark data.
    setDomain.call(this, 'x');
    setDomain.call(this, 'y');
}
