export default function updateDataObject() {
    this.data.raw = this.data.passed;
    this.data.filtered = this.data.passed;
    this.config.activePage = 0;
    this.config.startIndex = this.config.activePage * this.config.nRowsPerPage; // first row shown
    this.config.endIndex = this.config.startIndex + this.config.nRowsPerPage; // last row shown
}
