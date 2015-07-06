chart.prototype.setColorScale = function(){
  var config = this.config;
  colordom = config.color_dom || d3.set(this.raw_data.map(function(m){return m[config.color_by]})).values()
    .filter(function(f){return f && f !== "undefined"});

  if(config.chunk_order)
    colordom = colordom.sort(function(a,b){return d3.ascending(config.chunk_order.indexOf(a), config.chunk_order.indexOf(b)); })
  else
  	colordom = colordom.sort(webCharts.dataOps.naturalSorter);

  this.colorScale = d3.scale.ordinal()
    .domain(colordom)
    .range(config.colors ? config.colors : webCharts.colors.nb);
}