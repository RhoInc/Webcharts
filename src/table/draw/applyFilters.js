import clone from '../../util/clone';

export default function applyFilters() {
    //If there are filters, return a filtered data array of the raw data.
    //Otherwise return the raw data.
    this.data.filtered = this.filters
        ? clone(this.data.raw).filter(d => {
              let match = true;

              this.filters.forEach(filter => {
                  if (match === true && filter.val !== 'All')
                      match = filter.val instanceof Array
                          ? filter.val.indexOf(d[filter.col]) > -1
                          : filter.val === d[filter.col];
              });

              return match;
          })
        : clone(this.data.raw);
}
