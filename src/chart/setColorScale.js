/** Sets up the color scale for the chart, which is an ordinal d3.scale with a domain based on unique values determined by config.color_by and a range determined by config.colors
*@memberof webCharts.objects.chart
*@method setColorScale
*/
export function setColorScale(){
  let config = this.config;
  let data = config.legend.behavior === 'flex' ? this.filtered_data : this.raw_data;
  let colordom = config.color_dom || d3.set(data.map(m => m[config.color_by] )).values()
    .filter(f => f && f !== 'undefined');

  if(config.legend.order){
    colordom = colordom.sort((a,b) => d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)) );
  }
  else{
  	colordom = colordom.sort(webCharts.dataOps.naturalSorter);
  }

  this.colorScale = d3.scale.ordinal()
    .domain(colordom)
    .range(config.colors);
}
