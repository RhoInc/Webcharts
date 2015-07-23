export function draw(processed_data, raw_data){
  var context = this;
  let raw = raw_data ? raw_data : this.raw_data ? this.raw_data : [];
  let config = this.config;
  let aspect2 = 1/config.aspect;
  let data = this.consolidateData(raw);
  // config.padding = config.padding ? config.padding : config.tight ? .01 : .3;
  // config.outer_pad = config.outer_pad ? config.outer_pad : config.tight ? .01 : .1;
  // config.y_behavior = config.y_behavior || "flex";
  // config.x_behavior = config.x_behavior || "flex";
  this.wrap.datum(data);

  let div_width = parseInt(this.wrap.style('width'));

  this.setColorScale();

  // config.resizable = config.resizable === false ? false : true;
  let max_width = config.max_width ? config.max_width : div_width;
  this.raw_width = config.x.type === "ordinal" && +config.range_band ? (+config.range_band+(config.range_band*config.padding))*this.x_dom.length :
    config.resizable ? max_width :
    config.width ? config.width :
    div_width;
  this.raw_height = config.y.type === "ordinal" && +config.range_band ? (+config.range_band+(config.range_band*config.padding))*this.y_dom.length :
    config.resizable ? max_width*aspect2 :
    config.height ? config.height :
    div_width*aspect2;

  let pseudo_width = this.svg.select(".overlay").attr("width") ? this.svg.select(".overlay").attr("width") : this.raw_width;
  let pseudo_height = this.svg.select(".overlay").attr("height") ? this.svg.select(".overlay").attr("height") : this.raw_height;

  let x_axis_label = this.svg.select(".x.axis").select(".axis-title").text(function(){
    return typeof config.x.label === "string" ? config.x.label : typeof config.x.label === "function" ? config.x.label(context) : null;
  });
  let y_axis_label = this.svg.select(".y.axis").select(".axis-title").text(function(){
    return typeof config.y.label === "string" ? config.y.label : typeof config.y.label === "function" ? config.y.label(context) : null;
  });

  this.xScaleAxis(config.x.type, pseudo_width, this.x_dom);
  this.yScaleAxis(config.y.type, pseudo_height, this.y_dom);

  let id = config.id || Math.random();
  if(config.resizable)
    d3.select(window).on('resize.'+context.chart_type+"."+context.element+id, function(){context.resize()});
  else
    d3.select(window).on('resize.'+context.chart_type+"."+context.element+id, null);

  this.events.onDraw(this);
  this.resize();
}
