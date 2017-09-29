import { keys, nest } from 'd3';

export default function transformData(processed_data) {
    //Transform data.
    this.data.processed = this.transformData(this.wrap.datum);

    if (!data) {
        return;
    }

    this.config.cols = this.config.cols || keys(data[0]);
    this.config.headers = this.config.headers || this.config.cols;

    if (this.config.keep) {
        this.config.keep.forEach(e => {
            if (this.config.cols.indexOf(e) === -1) {
                this.config.cols.unshift(e);
            }
        });
    }

    let filtered = data;

    if (this.filters.length) {
        this.filters.forEach(e => {
            let is_array = e.val instanceof Array;
            filtered = filtered.filter(d => {
                if (is_array) {
                    return e.val.indexOf(d[e.col]) !== -1;
                } else {
                    return e.val !== 'All' ? d[e.col] === e.val : d;
                }
            });
        });
    }

    let slimmed = nest()
        .key(d => {
            if (this.config.row_per) {
                return this.config.row_per.map(m => d[m]).join(' ');
            } else {
                return d;
            }
        })
        .rollup(r => {
            if (this.config.dataManipulate) {
                r = this.config.dataManipulate(r);
            }
            let nuarr = r.map(m => {
                let arr = [];
                for (let x in m) {
                    arr.push({ col: x, text: m[x] });
                }
                arr.sort(
                    (a, b) => this.config.cols.indexOf(a.col) - this.config.cols.indexOf(b.col)
                );
                return { cells: arr, raw: m };
            });
            return nuarr;
        })
        .entries(filtered);

    this.data.current = slimmed.length ? slimmed : [{ key: null, values: [] }]; // dummy nested data array

    //Reset pagination.
    this.pagination.wrap.selectAll('*').remove();

    this.events.onDatatransform.call(this);

    /**-------------------------------------------------------------------------------------------\
       Code below associated with the former paradigm of a d3.nest() data array.
    \-------------------------------------------------------------------------------------------**/

    if (config.row_per) {
        let rev_order = config.row_per.slice(0).reverse();
        rev_order.forEach(e => {
            tbodies.sort((a, b) => a.values[0].raw[e] - b.values[0].raw[e]);
        });
    }

    //Delete text from columns with repeated values?
    if (config.row_per) {
        rows
            .filter((f, i) => i > 0)
            .selectAll('td')
            .filter(f => config.row_per.indexOf(f.col) > -1)
            .text('');
    }

    return this.data.current;
}
