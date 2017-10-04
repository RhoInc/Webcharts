import { select } from 'd3';

export default function onClick(th, header) {
    const context = this,
        selection = select(th),
        col = this.config.cols[this.config.headers.indexOf(header)];

    //Check if column is already a part of current sort order.
    let sortItem = this.sortable.order.filter(item => item.col === col)[0];

    //If it isn't, add it to sort order.
    if (!sortItem) {
        sortItem = {
            col: col,
            direction: 'ascending',
            wrap: this.sortable.wrap
                .append('div')
                .datum({ key: col })
                .classed('wc-button sort-box', true)
                .text(header)

        };
        sortItem.wrap.append('span').classed('sort-direction', true).html('&darr;');
        sortItem.wrap.append('span').classed('remove-sort', true).html('&#10060;');
        this.sortable.order.push(sortItem);
    } else {
        //Otherwise reverse its sort direction.
        sortItem.direction = sortItem.direction === 'ascending' ? 'descending' : 'ascending';
        sortItem.wrap
            .select('span.sort-direction')
            .html(sortItem.direction === 'ascending' ? '&darr;' : '&uarr;');
    }

    //Hide sort instructions.
    this.sortable.wrap.select('.instruction').classed('hidden', true);

    //Add sort container deletion functionality.
    this.sortable.order.forEach((item, i) => {
        item.wrap.on('click', function(d) {
            //Remove column's sort container.
            select(this).remove();

            //Remove column from sort.
            context.sortable.order.splice(context.sortable.order.map(d => d.col).indexOf(d.key), 1);

            //Display sorting instruction.
            context.sortable.wrap
                .select('.instruction')
                .classed('hidden', context.sortable.order.length);

            //Redraw chart.
            context.draw();
        });
    });

    //Redraw chart.
    this.draw();
}
