Chart.prototype.resize = function(){
  var context = this;
  var config = this.config;
  config.aspect = config.aspect || 1.33;
  var aspect2 = 1/config.aspect;
  var div_width = parseInt(context.wrap.style('width'));
  var max_width = config.max_width ? config.max_width : div_width;
  var preWidth = !config.resizable ? config.width : !max_width || div_width < max_width ? div_width : context.raw_width;

  context.textSize(preWidth);

  context.margin = context.setMargins();

  var svg_width = config.x.type === "ordinal" && +config.range_band ? context.raw_width + context.margin.left + context.margin.right :
    !config.resizable ? context.raw_width :
    !config.max_width || div_width < config.max_width ? div_width :
    context.raw_width;
  context.plot_width = svg_width - context.margin.left - context.margin.right;
  var svg_height = config.y.type === "ordinal" && +config.range_band ? context.raw_height + context.margin.top + context.margin.bottom :
    !config.resizable && config.height ? config.height :
    !config.resizable ? svg_width*aspect2 :
    context.plot_width*aspect2;
  context.plot_height = svg_height - context.margin.top - context.margin.bottom;

  d3.select(context.svg.node().parentNode)
    .attr("width", svg_width)
    .attr("height", svg_height)
  .select("g")
    .attr("transform", "translate(" + context.margin.left + "," + context.margin.top + ")");

  context.svg.select(".overlay")
    .attr("width", context.plot_width)
    .attr("height", context.plot_height)
    .classed("zoomable", config.zoomable);

  context.svg.select(".plotting-area")
    .attr("width", context.plot_width)
    .attr("height", context.plot_height+1)
    .attr("transform", "translate(0, -1)");

  context.xScaleAxis(config.x.type, context.plot_width, context.x_dom);
  context.yScaleAxis(config.y.type, context.plot_height, context.y_dom);

  var g_x_axis = context.svg.select(".x.axis");
  var g_y_axis = context.svg.select(".y.axis");
  var x_axis_label = g_x_axis.select(".axis-title");
  var y_axis_label = g_y_axis.select(".axis-title");

  if(config.x_location !== "top")
    g_x_axis.attr("transform", "translate(0," + (context.plot_height) + ")");
  g_x_axis.transition().call(context.xAxis);
  g_y_axis.transition().call(context.yAxis);
  x_axis_label.attr("transform", "translate("+context.plot_width/2+","+(context.margin.bottom-2)+")");
  y_axis_label
    .attr("x", -1*context.plot_height / 2)
    .attr("y", -1*context.margin.left);

  //relabel axis ticks if metaMap says so
  context.svg.select(".x.axis.ordinal").selectAll(".tick text").text(function(d){
    return context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d;
  });
  context.svg.select(".y.axis.ordinal").selectAll(".tick text").text(function(d){
    return context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d;
  });

  context.drawGridlines();
  //update legend - margins need to be set first
  context.makeLegend();

  //update reference regions and reference lines
  context.updateRefRegions();
  context.updateRefLines();

  //draw linear regression line
  if(config.regression_line){
    var reg_data = context.current_data.slice(0).filter(f => {
      return (+f.values.x || +f.values.x === 0) && (+f.values.y || +f.values.y === 0);
    });
    var all_x = reg_data.map(function(m){return m.values.x; });
    var all_y = reg_data.map(function(m){return m.values.y; });
    var lr = webCharts.dataOps.linearRegression(all_x, all_y);
    var max = context.x.domain()[1];
    var reg_line_data = [{xs: [0, max], ys: [lr.intercept, (max * lr.slope) + lr.intercept ] }];
    var reg_line = context.drawSimpleLines(reg_line_data, null, "regression-line")
      .style("clip-path", "url(#"+context.clippath_id+")").style("shape-rendering", "auto");
    reg_line.select("title").text("slope: "+d3.format(".2f")(lr.slope)+"\n"+"intercept: "+d3.format(".2f")(lr.intercept)+"\n"+"r2: "+d3.format(".2f")(lr.r2));
  }
  else{
    context.drawSimpleLines([], null, "regression-line");
  }

  //update the chart's specific marks
  //context.chart_type === "timeline" ? context.updateDataMarks() :
  context.updateDataMarks();

  //call .on("resize") function, if any
  context.events.onResize(this);
};
