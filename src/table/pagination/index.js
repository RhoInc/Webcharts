import layout from './layout';
import addPagination from './addPagination/index';

export default function pagination() {
    this.config.nRows = this.data.raw.length; // total number of rows, i.e. the length of the data file
    this.config.nPages = Math.ceil(this.config.nRows / this.config.nRowsPerPage); // total number of pages given number of rows
    this.config.activePage = 0; // current page, 0-indexed
    this.config.startIndex = this.config.activePage * this.config.nRowsPerPage; // first row shown
    this.config.endIndex = this.config.startIndex + this.config.nRowsPerPage; // last row shown
    this.config.paginationHidden = this.config.nPages == 1;

    return {
        layout: layout,
        addPagination: addPagination
    };
}
