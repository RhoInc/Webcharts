import setDefault from '../util/setDefault';

export default function setDefaults() {
    setDefault.call(this, 'searchable');
    setDefault.call(this, 'exportable');
    setDefault.call(this, 'exports', ['csv']);
    setDefault.call(this, 'sortable');
    setDefault.call(this, 'pagination');
    setDefault.call(this, 'nRowsPerPage', 10);
    setDefault.call(this, 'nPageLinksDisplayed', 5);
    setDefault.call(this, 'applyCSS');
}
