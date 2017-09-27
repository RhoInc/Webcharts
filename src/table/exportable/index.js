import layout from './layout';
import exports from './exports/index';

export default function exportable() {
    return {
        layout: layout,
        exports: exports
    };
}
