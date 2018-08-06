export default function dynamicLayout() {
    const widths = {
        table: this.table.select('thead').node().offsetWidth,
        top:
            this.wrap.select('.table-top .searchable-container').node().offsetWidth +
                this.wrap.select('.table-top .sortable-container').node().offsetWidth,
        bottom:
            this.wrap.select('.table-bottom .pagination-container').node().offsetWidth +
                this.wrap.select('.table-bottom .exportable-container').node().offsetWidth
    };

    if (widths.table < Math.max(widths.top, widths.bottom) && this.config.layout === 'horizontal') {
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
        widths.table >= Math.max(widths.top, widths.bottom) &&
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
