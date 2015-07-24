export function resize(){
  var context = this;
  let config = this.config;
  // config.aspect = config.aspect || 1.33;
  let aspect2 = 1/config.aspect;
  let div_width = parseInt(this.wrap.style('width'));
  let max_width = config.max_width ? config.max_width : div_width;
  let preWidth = !config.resizable ? config.width : !max_width || div_width < max_width ? div_width : this.raw_width;

  this.textSize(preWidth);

  this.margin = context.setMargins();

  let svg_width = config.x.type === 'ordinal' && +config.range_band ? context.raw_width + context.margin.left + context.margin.right :
    !config.resizable ? context.raw_width :
    !config.max_width || div_width < config.max_width ? div_width :
    this.raw_width;
  this.plot_width = svg_width - this.margin.left - this.margin.right;
  var svg_height = config.y.type === 'ordinal' && +config.range_band ? this.raw_height + this.margin.top + this.margin.bottom :
    !config.resizable && config.height ? config.height :
    !config.resizable ? svg_width * aspect2 :
    this.plot_width * aspect2;
  this.plot_height = svg_height - this.margin.top - this.margin.bottom;

  d3.select(this.svg.node().parentNode)
    .attr('width', svg_width)
    .attr('height', svg_height)
  .select('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  this.svg.select('.overlay')
    .attr('width', this.plot_width)
    .attr('height', this.plot_height)
    .classed('zoomable', config.zoomable);

  this.svg.select('.plotting-area')
    .attr('width', this.plot_width)
    .attr('height', this.plot_height+1)
    .attr('transform', 'translate(0, -1)');

  this.xScaleAxis(config.x.type, this.plot_width, this.x_dom);
  this.yScaleAxis(config.y.type, this.plot_height, this.y_dom);

  let g_x_axis = this.svg.select('.x.axis');
  let g_y_axis = this.svg.select('.y.axis');
  let x_axis_label = g_x_axis.select('.axis-title');
  let y_axis_label = g_y_axis.select('.axis-title');

  if(config.x_location !== 'top')
    g_x_axis.attr('transform', 'translate(0,' + (this.plot_height) + ')');
  g_x_axis.transition().call(this.xAxis);
  g_y_axis.transition().call(this.yAxis);
  x_axis_label.attr('transform', 'translate('+this.plot_width/2+','+(this.margin.bottom-2)+')');
  y_axis_label
    .attr('x', -1*this.plot_height / 2)
    .attr('y', -1*this.margin.left);

  //relabel axis ticks if metaMap says so
  this.svg.select('.x.axis.ordinal').selectAll('.tick text').text(d =>  context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d );
  this.svg.select('.y.axis.ordinal').selectAll('.tick text').text( d=> context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d );

  this.drawGridlines();
  //update legend - margins need to be set first
  this.makeLegend();

  //update reference regions and reference lines
  this.updateRefRegions();
  this.updateRefLines();

  //draw linear regression line
  if(config.regression_line){
    let reg_data = this.current_data.slice(0).filter(f => (+f.values.x || +f.values.x === 0) && (+f.values.y || +f.values.y === 0) );
    let all_x = reg_data.map(m => m.values.x);
    let all_y = reg_data.map(m => m.values.y);
    let lr = webCharts.dataOps.linearRegression(all_x, all_y);
    let max = this.x.domain()[1];
    let reg_line_data = [{xs: [0, max], ys: [lr.intercept, (max * lr.slope) + lr.intercept ] }];
    let reg_line = this.drawSimpleLines(reg_line_data, null, 'regression-line')
      .style('clip-path', 'url(#'+this.clippath_id+')').style('shape-rendering', 'auto');
    reg_line.select('title').text('slope: '+d3.format('.2f')(lr.slope)+'\n'+'intercept: '+d3.format('.2f')(lr.intercept)+'\n'+'r2: '+d3.format('.2f')(lr.r2));
  }
  else{
    this.drawSimpleLines([], null, 'regression-line');
  }

  //update the chart's specific marks
  this.updateDataMarks();

  //call .on("resize") function, if any
  this.events.onResize(this);
};
