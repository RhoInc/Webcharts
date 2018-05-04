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
                return filter.val === 'All'
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

        this.marks[i] = {
            id: mark.id,
            type: mark.type,
            per: mark.per,
            data: mark_info.data,
            x_dom: mark_info.x_dom,
            y_dom: mark_info.y_dom,
            split: mark.split,
            text: mark.text,
            arrange: mark.arrange,
            order: mark.order,
            summarizeX: mark.summarizeX,
            summarizeY: mark.summarizeY,
            tooltip: mark.tooltip,
            radius: mark.radius,
            attributes: mark.attributes,
            values: mark.values
        };
    });

    //Set domains given extents of summarized mark data.
    setDomain.call(this, 'x');
    setDomain.call(this, 'y');
}
