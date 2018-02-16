import naturalSorter from '../dataOps/naturalSorter';
import { set, ascending, scale } from 'd3';

export default function setColorScale() {
    let config = this.config;
    let data = config.legend.behavior === 'flex' ? this.filtered_data : this.raw_data;
    let colordom =
        config.color_dom.slice() ||
        set(data.map(m => m[config.color_by])).values().filter(f => f && f !== 'undefined');

    if (config.legend.order) {
        colordom = colordom.sort((a, b) =>
            ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b))
        );
    } else {
        colordom = colordom.sort(naturalSorter);
    }

    this.colorScale = scale.ordinal().domain(colordom).range(config.colors);
}
