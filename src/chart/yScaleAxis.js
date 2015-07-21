chart.prototype.yScaleAxis = function(type, max_range, domain){
  //domain = type === "percent" ? [0,1] : domain;
  var config = this.config;
  var y;
  if(type === "log")
    var y = d3.scale.log();
  else if(type === "ordinal")
    var y = d3.scale.ordinal();
  else if(type === "time")
   var y = d3.time.scale();
  else
    var y = d3.scale.linear();

  y.domain(domain);
  if(type === "ordinal")
    y.rangeBands([+max_range, 0], config.padding, config.outer_pad);
  else
    y.range([+max_range, 0]).clamp(Boolean(config.y_clamp));

  var y_format = config.y.format ? config.y.format : config.y.summary === "percent" ? "0%" : ".0f";
  var tick_count = Math.max(2, Math.min(max_range/80,8));
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(tick_count)
    .tickFormat(type === "ordinal" ? null : type === "time" ? d3.time.format(y_format) : d3.format(y_format))
    .tickValues(config.y.ticks ? config.y.ticks : null)
    .innerTickSize(6)
    .outerTickSize(3);

  this.svg.select("g.y.axis").attr("class", "y axis "+type);

  this.y = y;
  this.yAxis = yAxis;
};
