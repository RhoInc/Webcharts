import { select } from 'd3';
import sortData from './sortData';

export default function onClick(th, header) {
    const context = this,
        selection = select(th),
        col = this.config.cols[this.config.headers.indexOf(header)];

    //Check if column is already a part of current sort order.
    let sortItem = this.sort.order.filter(item => item.col === col)[0];

    //If it isn't, add it to sort order.
    if (!sortItem) {
        sortItem = {
            col: col,
            direction: 'ascending',
            wrap: this.sort.wrap
                .append('div')
                .datum({ key: col })
                .classed('sort-box', true)
                .text(col)
        };
        sortItem.wrap.append('span').classed('sort-direction', true).html('&darr;');
        sortItem.wrap.append('span').classed('remove-sort', true).html('&#10060;');
        this.sort.order.push(sortItem);
    } else {
        //Otherwise reverse its sort direction.
        sortItem.direction = sortItem.direction === 'ascending' ? 'descending' : 'ascending';
        sortItem.wrap
            .select('span.sort-direction')
            .html(sortItem.direction === 'ascending' ? '&darr;' : '&uarr;');
    }

    //Sort data.
    sortData.call(this);
    this.draw(this.data.sorted);

    //Hide sort instructions.
    this.sort.wrap.select('.instruction').classed('hidden', true);

    //Add sort container deletion functionality.
    this.sort.order.forEach((item, i) => {
        item.wrap.on('click', function(d) {
            //Remove sort container.
            select(this).remove();

            //Remove column from sort.
            context.sort.order.splice(context.sort.order.map(d => d.col).indexOf(d.key), 1);

            //Sort data.
            if (context.sort.order.length) {
                sortData.call(context);
                context.draw(context.data.sorted);
            } else {
                //Display sort instructions.
                context.sort.wrap.select('.instruction').classed('hidden', false);
                context.draw(context.data.raw);
            }
        });
    });
}
