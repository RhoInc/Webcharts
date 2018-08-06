import { select } from 'd3';

export default function drawTableBody() {
    const table = this;

    //Define table body rows.
    const rows = this.tbody.selectAll('tr').data(this.data.processing).enter().append('tr');

    //Define table body cells.
    const cells = rows.selectAll('td').data(d =>
        this.config.cols.map(key => {
            return { col: key, text: d[key] };
        })
    );
    cells.exit().remove();
    cells.enter().append('td');
    cells
        .sort((a, b) => this.config.cols.indexOf(a.col) - this.config.cols.indexOf(b.col))
        .attr('class', d => d.col)
        .each(function(d) {
            const cell = select(this);

            //Apply text in data as html or as plain text.
            if (table.config.as_html) {
                cell.html(d.text);
            } else {
                cell.text(d.text);
            }
        });
}
