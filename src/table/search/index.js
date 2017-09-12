import layout from './layout';
import addSearch from './addSearch/index';

export default function search() {
    return {
        layout: layout,
        addSearch: addSearch
    };
}
