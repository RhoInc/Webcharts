import { select } from 'd3';

export default function dynamicLayout() {
    const table = this;

    if (
        table.widths.table < Math.max(table.widths.top, table.widths.bottom) &&
        this.config.layout === 'horizontal'
    ) {
        this.config.layout = 'vertical';
        this.wrap
            .style('display', 'inline-block')
            .selectAll('.table-top,.table-bottom')
            .style('display', 'inline-block')
            .selectAll('.interactivity')
            .style({
                display: 'block',
                clear: 'both'
            });
    } else if (
        table.widths.table >= Math.max(table.widths.top, table.widths.bottom) &&
        this.config.layout === 'vertical'
    ) {
        this.config.layout = 'horizontal';
        this.wrap
            .style('display', 'table')
            .selectAll('.table-top,.table-bottom')
            .style('display', 'block')
            .selectAll('.interactivity')
            .style({
                display: 'inline-block',
                float: function() {
                    return select(this).classed('searchable-container') ||
                        select(this).classed('pagination-container')
                        ? 'right'
                        : null;
                },
                clear: null
            });
    }
}
