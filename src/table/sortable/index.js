import layout from './layout';
import addSort from './addSort';
import sortData from './sortData';

export default function sortable() {
    return {
        layout: layout,
        addSort: addSort,
        sortData: sortData,
        order: []
    };
}
