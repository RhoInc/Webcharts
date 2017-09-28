import applyFilters from './draw/applyFilters';
import applySeachTerm from './draw/applySearchTerm';
import '../util/array-equals';
import clone from '../util/clone';

export default function draw(passed_data) {
    const
        context = this,
        config = this.config,
        table = this.table;

  //Apply filters if data is not passed to table.draw().
    if (!passed_data) {
        applyFilters.call(this);
    }
  //Otherwise update data object.
    else {
        this.data.raw = passed_data;
        this.data.filtered = passed_data;
        this.controls.init(passed_data);
    }

  //Compare current filter settings to previous filter settings, if any.
    if (this.filters) {
        this.currentFilters = this.filters.map(filter => filter.val);

      //Reset pagination if filters have changed.
        if (!this.currentFilters.equals(this.previousFilters)) {
            this.config.activePage = 0;
            this.config.startIndex = this.config.activePage * this.config.nRowsPerPage; // first row shown
            this.config.endIndex = this.config.startIndex + this.config.nRowsPerPage; // last row shown
            this.searchable.wrap.select('input').property('value', ''); // reset search box
        }

        this.previousFilters = this.currentFilters;
    }

    let data;

  //Filter data on search term if it exists and set data to searched data.
    if (this.searchable.searchTerm) {
        applySearchTerm.call(this);
        data = this.data.searched;
    }
  //Otherwise delete previously searched data and set data to filtered data.
    else {
        delete this.data.searched;
        data = this.data.filtered;
    }

  //Sort data.
    if (this.sortable.order.length)
        this.sortable.sortData.call(this, data);

  //Bind table filtered/searched data to table container.
    this.wrap.datum(clone(data));

  //Apply pagination.
    if (this.data.paginated)
        data = data.filter(
            (d,i) => this.config.startIndex <= i && i < this.config.endIndex
        );

    //Define column headers.
    const
        headers = this.thead.append('tr').selectAll('th').data(this.config.headers);
        headers.exit().remove();
        headers.enter().append('th');
        headers
            .attr('class', d => this.config.cols[this.config.headers.indexOf(d)]) // associate column header with column name
            .text(d => d);

    if (this.config.sortable)
        headers.on('click', function(header) {
            context.sortable.onClick.call(context, this, header);
        });

    //Print a note that no data was selected for empty tables.
    table.selectAll('tbody tr.NoDataRow').remove();

    if (data.length === 0)
        this.tbody.append('tr').attr('class', 'NoDataRow').text('No data selected.');
    else {
        //Define table body rows.
        const
            rows = this.tbody.selectAll('tr').data(data);
            rows.exit().remove();
            rows.enter().append('tr');

        //Define table body cells.
        const
            cells = rows
                .selectAll('td')
                .data(d => Object.keys(d).filter(key => this.config.cols.indexOf(key).map(key => d[key])));
            cells.exit().remove();
            cells.enter().append('td');
            cells
                .attr('class', d => d.col)
                .each(function(d) {
                    const
                        cell = d3.select(this);

                  //Apply text in data as html or as plain text.
                    if (config.as_html) {
                        cell.html(d);
                    } else {
                        cell.text(d);
                    }
                });

        //Add export.
        if (this.config.exportable)
            this.config.exports.forEach(fmt => {
                this.exportable.exports[fmt].call(this, data);
            });

        //Add pagination.
        if (this.config.pagination) this.pagination.addPagination.call(this);
    }

    this.events.onDraw.call(this);
}
