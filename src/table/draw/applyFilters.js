export default function applyFilters() {
    //If there are filters, return a filtered data array of the raw data.
    //Otherwise return the raw data.
    if (
        this.filters &&
        this.filters.some(
            filter =>
                (typeof filter.val === 'string' && filter.val !== 'All') ||
                (Array.isArray(filter.val) && filter.val.length < filter.choices.length)
        )
    ) {
        this.data.filtered = this.data.raw;
        this.filters
            .filter(
                filter =>
                    (typeof filter.val === 'string' && filter.val !== 'All') ||
                    (Array.isArray(filter.val) && filter.val.length < filter.choices.length)
            )
            .forEach(filter => {
                this.data.filtered = this.data.filtered.filter(
                    d =>
                        Array.isArray(filter.val)
                            ? filter.val.indexOf(d[filter.col]) > -1
                            : filter.val === d[filter.col]
                );
            });
    } else this.data.filtered = this.data.raw;
}
