export default function updatePagination() {
    //Reset pagination.
    this.pagination.links.classed('active', false);

    //Set to active the selected page link.
    const activeLink = this.pagination.links
        .filter(link => +link.rel === +this.pagination.settings.activePage)
        .classed('active', true);

    //Define and draw selected page.
    this.pagination.startIndex = this.pagination.settings.activePage * this.pagination.settings.nRowsPerPage;
    this.pagination.endIndex = this.pagination.settings.startItem + this.pagination.settings.nRowsPerPage;
    this.draw(
        this.raw_data.filter((d, i) => this.pagination.settings.startItem <= i && i < this.pagination.settings.endItem)
    );
}
