import naturalSorter from '../../dataOps/naturalSorter';
import { set, ascending, scale } from 'd3';

export default function setColorScale() {
    const config = this.config;
    const data = config.legend.behavior === 'flex' ? this.filtered_data : this.raw_data;
    const colordom =
        Array.isArray(config.color_dom) && config.color_dom.length
            ? config.color_dom.slice()
            : set(data.map(m => m[config.color_by]))
                  .values()
                  .filter(f => f !== 'undefined');

    if (config.legend.order)
        colordom.sort((a, b) =>
            ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b))
        );
    else colordom.sort(naturalSorter);

    this.colorScale = scale
        .ordinal()
        .domain(colordom)
        .range(config.colors);
}
