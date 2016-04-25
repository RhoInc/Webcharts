import { select } from 'd3';

export default function resize() {
  const config = this.config;

  const aspect2 = 1 / config.aspect;
  const divWidth = parseInt(this.wrap.style('width'), 10);
  const maxWidth = config.maxWidth ? config.maxWidth : divWidth;
  const preWidth = !config.resizable ? config.width : !maxWidth || divWidth < maxWidth ? divWidth : this.raw_width;

  this.textSize(preWidth);

  this.margin = this.setMargins();

  const svgWidth = config.x.type === 'ordinal' && +config.range_band ? this.raw_width + this.margin.left + this.margin.right :
    !config.resizable ? this.raw_width :
    !config.maxWidth || divWidth < config.maxWidth ? divWidth :
    this.raw_width;
  this.plot_width = svgWidth - this.margin.left - this.margin.right;
  const svgHeight = config.y.type === 'ordinal' && +config.range_band ? this.raw_height + this.margin.top + this.margin.bottom :
    !config.resizable && config.height ? config.height :
    !config.resizable ? svgWidth * aspect2 :
    this.plot_width * aspect2;
  this.plot_height = svgHeight - this.margin.top - this.margin.bottom;

  select(this.svg.node().parentNode)
    .attr('width', svgWidth)
    .attr('height', svgHeight)
  .select('g')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

  this.svg.select('.overlay')
    .attr('width', this.plot_width)
    .attr('height', this.plot_height)
    .classed('zoomable', config.zoomable);

  this.svg.select('.plotting-area')
    .attr('width', this.plot_width)
    .attr('height', this.plot_height + 1)
    .attr('transform', 'translate(0, -1)');

  this.xScaleAxis();
  this.yScaleAxis();

  const gXAxis = this.svg.select('.x.axis');
  const gYAxis = this.svg.select('.y.axis');
  const xAxisLabel = gXAxis.select('.axis-title');
  const yAxisLabel = gYAxis.select('.axis-title');

  if (config.x_location !== 'top') {
    gXAxis.attr('transform', `translate(0, ${(this.plot_height)})`);
  }
  const gXAxisTrans = config.transitions ? gXAxis.transition() : gXAxis;
  gXAxisTrans.call(this.xAxis);
  const gYAxisTrans = config.transitions ? gYAxis.transition() : gYAxis;
  gYAxisTrans.call(this.yAxis);

  xAxisLabel
    .attr('transform', `translate(${this.plot_width / 2}, ${this.margin.bottom - 2})`);
  yAxisLabel
    .attr('x', -1 * this.plot_height / 2)
    .attr('y', -1 * this.margin.left);

  this.svg.selectAll('.axis .domain').attr({
    'fill': 'none',
    'stroke': '#ccc',
    'stroke-width': 1,
    'shape-rendering': 'crispEdges'
  });
  this.svg.selectAll('.axis .tick line').attr({
    'stroke': '#eee',
    'stroke-width': 1,
    'shape-rendering': 'crispEdges'
  });

  this.drawGridlines();
  // update legend - margins need to be set first
  this.makeLegend();

  // update the chart's specific marks
  this.updateDataMarks();

  // call .on("resize") function, if any
  this.events.onResize.call(this);
}
