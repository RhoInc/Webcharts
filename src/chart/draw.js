Chart.prototype.draw = function(processed_data, raw_data){
  var context = this;
  var raw = raw_data ? raw_data : context.raw_data ? context.raw_data : [];
  var config = context.config;
  var aspect2 = 1/config.aspect;
  var data = context.chart_type === "timeline" ? context.transformData(raw) : context.consolidateData(raw);
  config.padding = config.padding ? config.padding : config.tight ? .01 : .3;
  config.outer_pad = config.outer_pad ? config.outer_pad : config.tight ? .01 : .1;
  // config.y_behavior = config.y_behavior || "flex";
  // config.x_behavior = config.x_behavior || "flex";
  context.wrap.datum(data)

  var div_width = parseInt(context.wrap.style('width'));

  context.setColorScale();

  config.resizable = config.resizable === false ? false : true;
  var max_width = config.max_width ? config.max_width : div_width;
  context.raw_width = config.x.type === "ordinal" && +config.range_band ? (+config.range_band+(config.range_band*config.padding))*context.x_dom.length :
    config.resizable ? max_width :
    config.width ? config.width :
    div_width;
  context.raw_height = config.y.type === "ordinal" && +config.range_band ? (+config.range_band+(config.range_band*config.padding))*context.y_dom.length :
    config.resizable ? max_width*aspect2 :
    config.height ? config.height :
    div_width*aspect2;

  var pseudo_width = context.svg.select(".overlay").attr("width") ? context.svg.select(".overlay").attr("width") : context.raw_width;
  var pseudo_height = context.svg.select(".overlay").attr("height") ? context.svg.select(".overlay").attr("height") : context.raw_height;

  var x_axis_label = context.svg.select(".x.axis").select(".axis-title").text(function(){
    return typeof config.x.label === "string" ? config.x.label : typeof config.x.label === "function" ? config.x.label(context) : null;
  });
  var y_axis_label = context.svg.select(".y.axis").select(".axis-title").text(function(){
    return typeof config.y.label === "string" ? config.y.label : typeof config.y.label === "function" ? config.y.label(context) : null;
  });

  context.xScaleAxis(config.x.type, pseudo_width, context.x_dom);
  context.yScaleAxis(config.y.type, pseudo_height, context.y_dom);

  var id = config.id || Math.random();
  if(config.resizable)
    d3.select(window).on('resize.'+context.chart_type+"."+context.element+id, function(){context.resize()});
  else
    d3.select(window).on('resize.'+context.chart_type+"."+context.element+id, null);

  context.events.onDraw(this);
  context.resize();
}
