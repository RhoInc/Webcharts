import { select } from 'd3';

export default function clearLoader() {
    select(this.div).select('.loader').remove();
}
