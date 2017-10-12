import applyFilters from './draw/applyFilters';
import applySearchTerm from './draw/applySearchTerm';
import '../util/array-equals';
import clone from '../util/clone';
import { select } from 'd3';

export default function draw(passed_data) {
    const context = this,
        config = this.config,
        table = this.table;

    //Apply filters if data is not passed to table.draw().
    if (!passed_data) {
        applyFilters.call(this);
    } else {
        //Otherwise update data object.
        this.data.raw = passed_data;
        this.data.filtered = passed_data;
        this.config.activePage = 0;
        this.config.startIndex = this.config.activePage * this.config.nRowsPerPage; // first row shown
        this.config.endIndex = this.config.startIndex + this.config.nRowsPerPage; // last row shown
    }

    //Compare current filter settings to previous filter settings, if any.
    if (this.filters) {
        this.currentFilters = this.filters.map(filter => filter.val);

        //Reset pagination if filters have changed.
        if (!this.currentFilters.equals(this.previousFilters)) {
            this.config.activePage = 0;
            this.config.startIndex = this.config.activePage * this.config.nRowsPerPage; // first row shown
            this.config.endIndex = this.config.startIndex + this.config.nRowsPerPage; // last row shown
        }

        this.previousFilters = this.currentFilters;
    }

    let data;

    //Filter data on search term if it exists and set data to searched data.
    if (this.searchable.searchTerm) {
        applySearchTerm.call(this);
        data = this.data.searched;
    } else {
        //Otherwise delete previously searched data and set data to filtered data.
        delete this.data.searched;
        data = this.data.filtered;
    }

    this.searchable.wrap
        .select('.nNrecords')
        .text(
            data.length === this.data.raw.length
                ? `${this.data.raw.length} records displayed`
                : `${data.length}/${this.data.raw.length} records displayed`
        );

    //update table header
    this.thead_cells = this.thead.select('tr').selectAll('th').data(this.config.headers, d => d);
    this.thead_cells.exit().remove();
    this.thead_cells.enter().append('th');

    this.thead_cells
        .sort((a, b) => this.config.headers.indexOf(a) - this.config.headers.indexOf(b))
        .attr('class', d => this.config.cols[this.config.headers.indexOf(d)]) // associate column header with column name
        .text(d => d);

    //Clear table body rows.
    this.tbody.selectAll('tr').remove();

    //Print a note that no data was selected for empty tables.
    if (data.length === 0) {
        this.tbody
            .append('tr')
            .classed('no-data', true)
            .append('td')
            .attr('colspan', this.config.cols.length)
            .text('No data selected.');

        //Add export.
        if (this.config.exportable)
            this.config.exports.forEach(fmt => {
                this.exportable.exports[fmt].call(this, data);
            });

        //Add pagination.
        if (this.config.pagination) this.pagination.addPagination.call(this, data);
    } else {
        //Sort data.
        if (this.config.sortable) {
            this.thead.selectAll('th').on('click', function(header) {
                context.sortable.onClick.call(context, this, header);
            });

            if (this.sortable.order.length) this.sortable.sortData.call(this, data);
        }

        //Bind table filtered/searched data to table container.
        this.wrap.datum(clone(data));

        //Add export.
        if (this.config.exportable)
            this.config.exports.forEach(fmt => {
                this.exportable.exports[fmt].call(this, data);
            });

        //Add pagination.
        if (this.config.pagination) {
            this.pagination.addPagination.call(this, data);

            //Apply pagination.
            data = data.filter((d, i) => this.config.startIndex <= i && i < this.config.endIndex);
        }

        //Define table body rows.
        const rows = this.tbody.selectAll('tr').data(data).enter().append('tr');

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
                if (config.as_html) {
                    cell.html(d.text);
                } else {
                    cell.text(d.text);
                }
            });
    }

    //Alter table layout if table is narrower than table top or bottom.
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
                float: 'left',
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
                    return d3.select(this).classed('searchable-container') ||
                        d3.select(this).classed('pagination-container')
                        ? 'right'
                        : 'left';
                },
                clear: null
            });
    }

    this.events.onDraw.call(this);
}
