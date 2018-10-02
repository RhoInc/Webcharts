export default function getTopAndBottomWidths() {
    const table = this;

    table.widths = {
        top:
            this.wrap.select('.table-top .searchable-container').node().offsetWidth +
                this.wrap.select('.table-top .sortable-container').node().offsetWidth,
        bottom:
            this.wrap.select('.table-bottom .pagination-container').node().offsetWidth +
                this.wrap.select('.table-bottom .exportable-container').node().offsetWidth
    };
}
