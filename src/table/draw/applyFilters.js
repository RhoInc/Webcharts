export default function applyFilters() {
    //filter data if there are filters, otherwise return raw data
    this.data.filtered = this.data.raw
        .filter(d => {
            let match = false;

            this.filters
                .forEach(filter =>
                    if (match === false && filter.val !== 'All')
                        match = filter.val instanceof Array
                            ? filter.val.indexOf(d[filter.col]) > -1
                            : filter.val === d[filter.col];
                );

            return match;
        });
}
