export default function updatePagination() {
    //Reset pagination.
    this.pagination.links.classed('active', false);

    //Set to active the selected page link.
    const activePage = this.pagination.links
        .filter(link => +link.rel === +this.pagination.settings.activePage)
        .classed('active', true);

    //Define and draw selected page.
    this.pagination.settings.startIndex =
        this.pagination.settings.activePage * this.pagination.settings.nRowsPerPage;
    this.pagination.settings.endIndex =
        this.pagination.settings.startIndex + this.pagination.settings.nRowsPerPage;
    this.draw();
}
