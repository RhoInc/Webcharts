export default function updateTableHeaders() {
    this.thead_cells = this.thead
        .select('tr')
        .selectAll('th')
        .data(this.config.headers, d => d);
    this.thead_cells.exit().remove();
    this.thead_cells.enter().append('th');
    this.thead_cells
        .sort((a, b) => this.config.headers.indexOf(a) - this.config.headers.indexOf(b))
        .attr('class', d => this.config.cols[this.config.headers.indexOf(d)]) // associate column header with column name
        .text(d => d);
}
