import { keys, nest } from 'd3';

export default function transformData(data) {
  if (!data) {
    return false;
  }
  const config = this.config;
  const colList = config.cols || keys(data[0]);
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
      const isArray = e.val instanceof Array;
      filtered = filtered.filter(d => {
        let filterVal;
        if (isArray) {
          filterVal = e.val.indexOf(d[e.col]) !== -1;
        }
        else {
          filterVal = e.val !== 'All' ? d[e.col] === e.val : d;
        }
        return filterVal;
      });
    });
  }

  const slimmed = nest()
    .key(d => {
      let dKey;
      if (config.row_per) {
        dKey = config.row_per.map(m => d[m]).join(' ');
      }
      else {
        dKey = d;
      }
      return dKey;
    })
    .rollup(r => {
      const nuarr = r.map(m => {
        const arr = [];
        for (const x in m) {
          if (Object.hasOwnProperty.call(m, x)) {
            arr.push({ col: x, text: m[x] });
          }
        }
        arr.sort((a, b) => config.cols.indexOf(a.col) - config.cols.indexOf(b.col));
        return { cells: arr, raw: m };
      });
      return nuarr;
    })
    .entries(filtered);

  this.current_data = slimmed;

  this.events.onDatatransform.call(this);

  return this.current_data;
}
