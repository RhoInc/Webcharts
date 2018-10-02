export default function getTableWidth() {
    const table = this;
    // Only need to figure out the width of the table once
    if (!table.widths.table) table.widths.table = this.table.select('thead').node().offsetWidth;
}
