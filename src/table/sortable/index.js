import layout from './layout';
import onClick from './onClick';
import sortData from './sortData';

export default function sortable() {
    return {
        layout: layout,
        onClick: onClick,
        sortData: sortData,
        order: []
    };
}
