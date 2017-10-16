import { keys } from 'd3';
import setDefault from '../util/setDefault';

export default function setDefaults(firstItem) {
    //Set data-driven defaults.
    if (this.config.cols instanceof Array && this.config.headers instanceof Array) {
        if (this.config.cols.length === 0) delete this.config.cols;
        if (
            this.config.headers.length === 0 ||
            this.config.headers.length !== this.config.cols.length
        )
            delete this.config.headers;
    }

    this.config.cols = this.config.cols || keys(firstItem);
    this.config.headers = this.config.headers || this.config.cols;
    this.config.layout = 'horizontal'; // placeholder setting to align table components vertically or horizontally

    //Set all other defaults.
    setDefault.call(this, 'searchable');
    setDefault.call(this, 'exportable');
    setDefault.call(this, 'exports', ['csv']);
    setDefault.call(this, 'sortable');
    setDefault.call(this, 'pagination');
    setDefault.call(this, 'nRowsPerPage', 10);
    setDefault.call(this, 'nPageLinksDisplayed', 5);
    setDefault.call(this, 'applyCSS');
}
