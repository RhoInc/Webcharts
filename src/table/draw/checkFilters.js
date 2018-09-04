import '../../util/array-equals';

export default function checkFilters() {
    if (this.filters) {
        this.currentFilters = this.filters.map(filter => filter.val);

        //Reset pagination if filters have changed.
        if (!this.currentFilters.equals(this.previousFilters)) {
            this.config.activePage = 0;
            this.config.startIndex = this.config.activePage * this.config.nRowsPerPage; // first row shown
            this.config.endIndex = this.config.startIndex + this.config.nRowsPerPage; // last row shown
        }

        this.previousFilters = this.currentFilters;
    }
}
