import { keys, nest } from 'd3';

export default function transformData(data) {
    if (!data) {
        return;
    }
    let config = this.config;
    let colList = config.cols || keys(data[0]);
    if (config.keep) {
        config.keep.forEach(e => {
            if (colList.indexOf(e) === -1) {
                colList.unshift(e);
            }
        });
    }
    this.config.cols = colList;

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
            if (config.row_per) {
                return config.row_per.map(m => d[m]).join(' ');
            } else {
                return d;
            }
        })
        .rollup(r => {
            if (config.dataManipulate) {
                r = config.dataManipulate(r);
            }
            let nuarr = r.map(m => {
                let arr = [];
                for (let x in m) {
                    arr.push({ col: x, text: m[x] });
                }
                arr.sort((a, b) => config.cols.indexOf(a.col) - config.cols.indexOf(b.col));
                return { cells: arr, raw: m };
            });
            return nuarr;
        })
        .entries(filtered);

    this.data.current = slimmed.length ? slimmed : [{ key: null, values: [] }]; // dummy nested data array

    //Reset pagination.
    this.pagination.wrap.selectAll('*').remove();

    this.events.onDatatransform.call(this);

    return this.data.current;
}
