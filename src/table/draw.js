import { keys } from 'd3';
import clone from '../util/clone';
import '../util/array-equals';

export default function draw(passed_data, processed_data) {
    const context = this,
        config = this.config,
        table = this.table;

    //Reset pagination if filters have changed.
    if (this.filters) {
        this.currentFilters = this.filters.map(filter => filter.val);

        if (!this.currentFilters.equals(this.previousFilters)) {
            this.config.activePage = 0;
            this.config.startIndex = this.config.activePage * this.config.nRowsPerPage; // first row shown
            this.config.endIndex = this.config.startIndex + this.config.nRowsPerPage; // last row shown
            this.searchable.wrap.select('input').property('value', '');
        }

        this.previousFilters = this.filters.map(filter => filter.val);
    }

    if (this.sortable.order.length) passed_data = this.sortable.sortData.call(this, passed_data);
    this.data.passed = passed_data || this.data.searched || this.data.raw;
    if (this.sortable.order.length)
        this.data.passed = this.sortable.sortData.call(this, this.data.passed);
    this.data.filtered = processed_data || this.transformData(this.data.passed);
    this.data.paginated = clone(this.data.filtered);
    this.data.paginated[0].values = this.data.paginated[0].values.filter(
        (d, i) => this.config.startIndex <= i && i < this.config.endIndex
    );

    const data = config.pagination ? this.data.paginated : this.data.filtered;

    //Bind table data to table container.
    this.wrap.datum(data);

    //for bootstrap table styling
    if (config.bootstrap) {
        table.classed('table', true);
    } else {
        table.classed('table', false);
    }

    //Define header, header row, and header cells.
    const headerRow = table.select('thead').select('tr.headers'),
        headers = headerRow.selectAll('th').data(this.config.headers);

    headers.exit().remove();
    headers.enter().append('th');
    headers.text(d => d);

    //Print a note that no data was selected for empty tables
    table.selectAll('tr.NoDataRow').remove();
    if (this.data.passed.length == 0) {
        table.append('tr').attr('class', 'NoDataRow').text('No data selected.');
    }

    //Define table bodies? Not sure why there would be more than one.
    const tbodies = table.selectAll('tbody').data(data, d => d.key);

    tbodies.exit().remove();
    tbodies.enter().append('tbody');

    if (config.row_per) {
        let rev_order = config.row_per.slice(0).reverse();
        rev_order.forEach(e => {
            tbodies.sort((a, b) => a.values[0].raw[e] - b.values[0].raw[e]);
        });
    }

    //Define table body rows.
    const rows = tbodies.selectAll('tr').data(d => d.values);

    rows.exit().remove();
    rows.enter().append('tr');

    //Sort by an array of columns.
    if (config.sort_rows) {
        let row_order = config.sort_rows.slice(0);
        row_order.unshift('0');

        rows.sort((a, b) => {
            let i = 0;
            while (i < row_order.length && a.raw[row_order[i]] == b.raw[row_order[i]]) {
                i++;
            }
            if (a.raw[row_order[i]] < b.raw[row_order[i]]) {
                return -1;
            }
            if (a.raw[row_order[i]] > b.raw[row_order[i]]) {
                return 1;
            }
            return 0;
        });
    }

    //Define table body cells.
    const tds = rows
        .selectAll('td')
        .data(d => d.cells.filter(f => this.config.cols.indexOf(f.col) > -1));

    tds.exit().remove();
    tds.enter().append('td');

    //Assign column name as class.
    tds.attr('class', d => d.col);

    //Apply text in data as html or as plain text.
    if (config.as_html) {
        tds.html(d => d.text);
    } else {
        tds.text(d => d.text);
    }

    //Delete text from columns with repeated values?
    if (config.row_per) {
        rows
            .filter((f, i) => i > 0)
            .selectAll('td')
            .filter(f => config.row_per.indexOf(f.col) > -1)
            .text('');
    }

    //for DataTables functionality
    if (config.data_tables) {
        if (jQuery() && jQuery().dataTable) {
            let dt_config = config.data_tables;
            dt_config.searching = config.searchable ? config.searchable : false;
            $(table.node()).dataTable(dt_config);
            let print_btn = $('.print-btn', wrap.node());
            print_btn.addClass('pull-right');
            $('.dataTables_wrapper').prepend(print_btn);
        } else {
            throw new Error('dataTables jQuery plugin not available');
        }
    }

    //Add sort.
    if (this.config.sortable) this.sortable.addSort.call(this);

    //Add pagination.
    if (this.config.exportable)
        this.config.exports.forEach(fmt => {
            this.exportable.exports[fmt].call(this);
        });

    //Add pagination.
    if (this.config.pagination) this.pagination.addPagination.call(this);

    this.events.onDraw.call(this);
}
