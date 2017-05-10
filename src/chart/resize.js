export default function() {
    let config = this.config;

    let aspect2 = 1 / config.aspect;
    let div_width = parseInt(this.wrap.style('width'));
    let max_width = config.max_width ? config.max_width : div_width;
    let preWidth = !config.resizable
        ? config.width
        : !max_width || div_width < max_width ? div_width : this.raw_width;

    this.textSize(preWidth);

    this.margin = this.setMargins();

    let svg_width = config.x.type === 'ordinal' && +config.range_band
        ? this.raw_width + this.margin.left + this.margin.right
        : !config.resizable
              ? this.raw_width
              : !config.max_width || div_width < config.max_width ? div_width : this.raw_width;
    this.plot_width = svg_width - this.margin.left - this.margin.right;
    var svg_height = config.y.type === 'ordinal' && +config.range_band
        ? this.raw_height + this.margin.top + this.margin.bottom
        : !config.resizable && config.height
              ? config.height
              : !config.resizable ? svg_width * aspect2 : this.plot_width * aspect2;
    this.plot_height = svg_height - this.margin.top - this.margin.bottom;

    d3
        .select(this.svg.node().parentNode)
        .attr('width', svg_width)
        .attr('height', svg_height)
        .select('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.svg
        .select('.overlay')
        .attr('width', this.plot_width)
        .attr('height', this.plot_height)
        .classed('zoomable', config.zoomable);

    this.svg
        .select('.plotting-area')
        .attr('width', this.plot_width)
        .attr('height', this.plot_height + 1)
        .attr('transform', 'translate(0, -1)');

    this.xScaleAxis();
    this.yScaleAxis();

    let g_x_axis = this.svg.select('.x.axis');
    let g_y_axis = this.svg.select('.y.axis');
    let x_axis_label = g_x_axis.select('.axis-title');
    let y_axis_label = g_y_axis.select('.axis-title');

    if (config.x_location !== 'top') {
        g_x_axis.attr('transform', 'translate(0,' + this.plot_height + ')');
    }
    let gXAxisTrans = config.transitions ? g_x_axis.transition() : g_x_axis;
    gXAxisTrans.call(this.xAxis);
    let gYAxisTrans = config.transitions ? g_y_axis.transition() : g_y_axis;
    gYAxisTrans.call(this.yAxis);

    x_axis_label.attr(
        'transform',
        'translate(' + this.plot_width / 2 + ',' + (this.margin.bottom - 2) + ')'
    );
    y_axis_label.attr('x', -1 * this.plot_height / 2).attr('y', -1 * this.margin.left);

    this.svg.selectAll('.axis .domain').attr({
        fill: 'none',
        stroke: '#ccc',
        'stroke-width': 1,
        'shape-rendering': 'crispEdges'
    });
    this.svg.selectAll('.axis .tick line').attr({
        stroke: '#eee',
        'stroke-width': 1,
        'shape-rendering': 'crispEdges'
    });

    this.drawGridlines();
    //update legend - margins need to be set first
    this.makeLegend();

    //update the chart's specific marks
    this.updateDataMarks();

    //call .on("resize") function, if any
    this.events.onResize.call(this);
}
