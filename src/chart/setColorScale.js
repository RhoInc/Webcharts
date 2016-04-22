import { ascending, scale, set } from 'd3';
import naturalSorter from '../util/naturalSorter';

export default function setColorScale() {
  const config = this.config;
  const data = config.legend.behavior === 'flex' ? this.filtered_data : this.raw_data;
  let colordom = config.color_dom || set(data.map(m => m[config.color_by])).values()
    .filter(f => f && f !== 'undefined');

  if (config.legend.order) {
    colordom = colordom.sort((a, b) => ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)));
  }
  else {
    colordom = colordom.sort(naturalSorter);
  }

  this.colorScale = scale.ordinal()
    .domain(colordom)
    .range(config.colors);
}
