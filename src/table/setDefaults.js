import { keys } from 'd3';
import setDefault from '../util/setDefault';

export default function setDefaults(firstItem) {
    // cols
    if (
        !Array.isArray(this.config.cols) ||
        (Array.isArray(this.config.cols) && this.config.cols.length === 0)
    )
        this.config.cols = keys(firstItem);

    // headers
    if (
        !Array.isArray(this.config.headers) ||
        (Array.isArray(this.config.headers) && this.config.headers.length === 0) ||
        (Array.isArray(this.config.headers) &&
            this.config.headers.length !== this.config.cols.length)
    )
        this.config.headers = this.config.cols.slice();

    // types
    if (typeof this.config.types !== 'object') this.config.types = {};

    this.config.cols.forEach(col => {
        if (!['string', 'number'].includes(this.config.types[col]))
            this.config.types[col] = 'string';
    });

    // Set all other defaults.
    setDefault.call(this, 'searchable');
    setDefault.call(this, 'sortable');
    setDefault.call(this, 'pagination');
    setDefault.call(this, 'exportable');
    setDefault.call(this, 'exports', ['csv']);
    setDefault.call(this, 'nRowsPerPage', 10);
    setDefault.call(this, 'nPageLinksDisplayed', 5);
    setDefault.call(this, 'applyCSS');
    setDefault.call(this, 'dynamicPositioning');
    setDefault.call(this, 'layout', 'horizontal');
}
