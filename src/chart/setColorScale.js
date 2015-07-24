export function setColorScale(){
  let config = this.config;
  let colordom = config.color_dom || d3.set(this.raw_data.map(m => m[config.color_by] )).values()
    .filter(f => f && f !== 'undefined');

  if(config.legend.order)
    colordom = colordom.sort((a,b) => d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)) );
  else
  	colordom = colordom.sort(webCharts.dataOps.naturalSorter);

  this.colorScale = d3.scale.ordinal()
    .domain(colordom)
    .range(config.colors ? config.colors : ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f']);
}
