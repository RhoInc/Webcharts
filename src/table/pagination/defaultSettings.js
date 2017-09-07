export default defaultSettings = {
    nRows: null, // total number of rows, i.e. the length of the data file
    nRowsPerPage: 25, // number of rows displayed per page
    nPages: null, // total number of pages given number of rows
    activeLink: 0, // current page, 0-indexed
    startItem: this.pagination.activeLink * this.pagination.nRowsPerPage, // first row shown
    endItem: this.pagination.startItem + this.pagination.nRowsPerPage // last row shown
};
