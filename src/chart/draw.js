export default function (raw_data, processed_data){
  var context = this;
  let raw = raw_data ? raw_data : this.raw_data ? this.raw_data : [];
  let config = this.config;
  let aspect2 = 1/config.aspect;
  let data = processed_data || this.consolidateData(raw);

  this.wrap.datum(data);

  let div_width = parseInt(this.wrap.style('width'));

  this.setColorScale();

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

  this.svg.select(".x.axis").select(".axis-title").text(d => {
    return typeof config.x.label === "string" ? config.x.label : typeof config.x.label === "function" ? config.x.label.call(this) : null;
  });
  this.svg.select(".y.axis").select(".axis-title").text(d => {
    return typeof config.y.label === "string" ? config.y.label : typeof config.y.label === "function" ? config.y.label.call(this) : null;
  });

  this.xScaleAxis(pseudo_width);
  this.yScaleAxis(pseudo_height);

  if(config.resizable){
    d3.select(window).on('resize.'+context.element+context.id, function(){context.resize(); });
  }
  else{
    d3.select(window).on('resize.'+context.element+context.id, null);
  }

  this.events.onDraw.call(this);
  this.resize();
}
