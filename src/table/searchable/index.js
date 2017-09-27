import layout from './layout';
import filterRows from './filterRows/index';

export default function searchable() {
    return {
        layout: layout,
        filterRows: filterRows
    };
}
