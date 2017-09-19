export default function updatePagination() {


    //Reset pagination.
    this.pagination.links.classed('active', false);

    //Set to active the selected page link.
    const activePage = this.pagination.links
        .filter(link => +link.rel === +this.config.activePage)
        .classed('active', true);

    //Define and draw selected page.
    this.config.startIndex = this.config.activePage * this.config.nRowsPerPage;
    this.config.endIndex = this.config.startIndex + this.config.nRowsPerPage;

    this.draw();
}
