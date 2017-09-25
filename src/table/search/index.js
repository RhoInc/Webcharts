import layout from './layout';
import filterRows from './filterRows/index';

export default function search() {
    return {
        layout: layout,
        filterRows: filterRows
    };
}
