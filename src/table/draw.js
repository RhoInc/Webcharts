import applyFilters from './draw/applyFilters';
import updateDataObject from './draw/updateDataObject';
import applySearchTerm from './draw/applySearchTerm';
import checkFilters from './draw/checkFilters';
import updateTableHeaders from './draw/updateTableHeaders';
import drawTableBody from './draw/drawTableBody';

export default function draw(passed_data) {
    const table = this;
    const config = this.config;

    this.data.passed = passed_data; // make passed data available on preprocess
    this.events.onPreprocess.call(this);

    if (!passed_data)
        //Apply filters if data is not passed to table.draw().
        applyFilters.call(this);
    else
        //Otherwise update data object.
        updateDataObject.call(this);

    //Compare current filter settings to previous filter settings, if any.
    checkFilters.call(this);

    //Filter data on search term if it exists and set data to searched data.
    applySearchTerm.call(this);

    this.searchable.wrap
        .select('.nNrecords')
        .text(
            this.data.processing.length === this.data.raw.length
                ? `${this.data.raw.length} records displayed`
                : `${this.data.processing.length}/${this.data.raw.length} records displayed`
        );

    //Update table headers.
    updateTableHeaders.call(this);

    //Clear table body rows.
    this.tbody.selectAll('tr').remove();

    //Print a note that no data was selected for empty tables.
    if (this.data.processing.length === 0) {
        this.tbody
            .append('tr')
            .classed('no-data', true)
            .append('td')
            .attr('colspan', this.config.cols.length)
            .text('No data selected.');

        //Bind table filtered/searched data to table container.
        this.data.current = this.data.processing;
        this.table.datum(this.table.current);

        //Add export.
        if (this.config.exportable)
            this.config.exports.forEach(fmt => {
                this.exportable.exports[fmt].call(this, this.data.processing);
            });

        //Add pagination.
        if (this.config.pagination) this.pagination.addPagination.call(this, this.data.processing);
    } else {
        //Sort data.
        if (this.config.sortable) {
            this.thead.selectAll('th').on('click', function(header) {
                table.sortable.onClick.call(table, this, header);
            });

            if (this.sortable.order.length) this.sortable.sortData.call(this, this.data.processing);
        }

        //Bind table filtered/searched data to table container.
        this.data.current = this.data.processing;
        this.table.datum(this.data.current);

        //Add export.
        if (this.config.exportable)
            this.config.exports.forEach(fmt => {
                this.exportable.exports[fmt].call(this, this.data.processing);
            });

        //Add pagination.
        if (this.config.pagination) {
            this.pagination.addPagination.call(this, this.data.processing);

            //Apply pagination.
            this.data.processing = this.data.processing.filter(
                (d, i) => this.config.startIndex <= i && i < this.config.endIndex
            );
        }

        //Define table body rows.
        drawTableBody.call(this);
    }

    this.events.onDraw.call(this);
}
