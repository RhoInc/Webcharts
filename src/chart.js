"use strict";

var chartProto = {

		checkRequired: checkRequired,
		consolidateData: consolidateData,
		draw: draw,
		drawArea: drawArea,
		drawBars: drawBars,
		drawGridlines: drawGridlines,
		drawLines: drawLines,
		drawPoints: drawPoints,
		drawRects: drawRects,
		drawSimpleLines: drawSimpleLines,
		init: init,
		layout: layout,
		makeLegend: makeLegend,
		onDataError: onDataError,
		resize: resize,
		setColorScale: setColorScale,
		setDefaults: setDefaults,
		setMargins: setMargins,
		textSize: textSize,
		transformData: transformData,
		updateDataMarks: updateDataMarks,
		updateRefLines: updateRefLines,
		updateRefRegions: updateRefRegions,
		xScaleAxis: xScaleAxis,
		yScaleAxis: yScaleAxis

};
'use strict';

webCharts.chartCount = 0;

/**The base chart object.
	*@alias module:webCharts.chart
	*@param {string} element - CSS selector identifying the element in which to create the chart.
	*@param {string} filepath - path to the file containing data for the chart. Expected to be a text file of comma-separated values.
	*@param {Object} config - the configuration object specifying all options for how the chart is to appear and behave.
	*@param {Object} config.x - object with properties to define the x-axis.
	*@param {Object} config.x.column - column from the supplied dataset to supply values for x-axis.
 	*@param {Object} config.y - object with properties to define the y-axis.
	*@param {controls} controls - {@link module-webCharts.Controls.html Controls} instance that will be linked to this chart instance.
*/
webCharts.chart = function (element, filepath, config, controls) {
	if (element === undefined) element = 'body';
	if (config === undefined) config = {};

	var chart = Object.create(chartProto);
	/** @member {string} */
	chart.div = element;
	/** @member {string} */
	chart.filepath = filepath;
	/** @member {Object} */
	chart.config = Object.create(config);
	/** @member {Controls} */
	chart.controls = controls;
	/** @member {Array} */
	chart.filters = [];
	/** @member {Array} */
	chart.required_cols = [];
	/** @member {Array} */
	chart.marks = [];
	/** @member {d3.selection} */
	chart.wrap = d3.select(chart.div).append('div');

	/** @member {Object} */
	chart.events = {
		onLayout: function onLayout() {},
		onDatatransform: function onDatatransform() {},
		onDraw: function onDraw() {},
		onResize: function onResize() {}
	};
	/**run the supplied callback function at the specified time in the Chart lifecycle
 	*@method
 	*@param {string} event - point in Chart lifecycle at which to fire the associated callback
 	*@param {function} callback - function to run
 */
	chart.on = function (event, callback) {
		var possible_events = ['layout', 'datatransform', 'draw', 'resize'];
		if (possible_events.indexOf(event) < 0) return;
		if (callback) chart.events['on' + event.charAt(0).toUpperCase() + event.slice(1)] = callback;
	};

	webCharts.chartCount++;
	chart.id = webCharts.chartCount;

	return chart;
};
'use strict';

function checkRequired() {
    var _this = this;

    var colnames = d3.keys(this.raw_data[0]);
    this.required_cols.forEach(function (e, i) {
        if (colnames.indexOf(e) < 0) {
            d3.select(_this.div).select('.loader').remove();
            _this.wrap.append('div').attr('class', 'alert alert-error alert-danger').html('The value "' + e + '" for the <code>' + _this.required_vars[i] + '</code> setting does not match any column in the provided dataset.');
            throw new Error('Error in settings object: The value "' + e + '" for the ' + _this.required_vars[i] + ' setting does not match any column in the provided dataset.');
        }
    });
}
'use strict';

function consolidateData(raw) {
  var _this = this;

  // var this = this;
  var config = this.config;
  var all_data = [];
  var all_x = [];
  var all_y = [];
  // this.marks = [];

  this.setDefaults();

  config.marks.forEach(function (e, i) {
    if (e.type !== 'bar') {
      e.arrange = null;
      e.split = null;
    }
    var mark_info = e.per ? _this.transformData(raw, e) : { data: [], x_dom: [], y_dom: [] };

    all_data.push(mark_info.data);
    all_x.push(mark_info.x_dom);
    all_y.push(mark_info.y_dom);
    _this.marks[i] = { type: e.type, per: e.per, data: mark_info.data, split: e.split, arrange: e.arrange, order: e.order, tooltip: e.tooltip, attributes: e.attributes };
  });

  if (config.x.type === 'ordinal') {
    if (config.x.sort && config.x.sort === 'alphabetical-descending') this.x_dom = d3.set(d3.merge(all_x)).values().sort(webCharts.dataOps.naturalSorter).reverse();else if (config.y.type === 'time' && config.x.sort === 'earliest') {
      var dateFormat = d3.time.format(config.date_format);
      this.x_dom = d3.nest().key(function (d) {
        return d[config.x.column];
      }).rollup(function (d) {
        return d.map(function (m) {
          return m[config.y.column];
        }).filter(function (f) {
          return f instanceof Date;
        });
      }).entries(this.raw_data).sort(function (a, b) {
        return d3.min(b.values) - d3.min(a.values);
      }).map(function (m) {
        return m.key;
      });
    } else if (config.x.order) {
      this.x_dom = d3.set(d3.merge(all_x)).values().sort(function (a, b) {
        return d3.ascending(config.x.order.indexOf(a), config.x.order.indexOf(b));
      });
    } else if (!config.x.sort || config.x.sort === 'alphabetical-descending') this.x_dom = d3.set(d3.merge(all_x)).values().sort(webCharts.dataOps.naturalSorter);else this.x_dom = d3.set(d3.merge(all_x)).values();
  } else this.x_dom = d3.extent(d3.merge(all_x));
  if (config.y.type === 'ordinal') {
    if (config.y.sort && config.y.sort === 'alphabetical-ascending') this.y_dom = d3.set(d3.merge(all_y)).values().sort(webCharts.dataOps.naturalSorter);else if (config.x.type === 'time' && config.y.sort === 'earliest') {
      var dateFormat = d3.time.format(config.date_format);
      this.y_dom = d3.nest().key(function (d) {
        return d[config.y.column];
      }).rollup(function (d) {
        return d.map(function (m) {
          return m[config.x.column];
        }).filter(function (f) {
          return f instanceof Date;
        });
      }).entries(this.raw_data).sort(function (a, b) {
        return d3.min(b.values) - d3.min(a.values);
      }).map(function (m) {
        return m.key;
      });
    } else if (config.y.order) {
      this.y_dom = d3.set(d3.merge(all_y)).values().sort(function (a, b) {
        return d3.ascending(config.y.order.indexOf(a), config.y.order.indexOf(b));
      });
    } else if (!config.y.sort || config.y.sort === 'alphabetical-descending') {
      this.y_dom = d3.set(d3.merge(all_y)).values().sort(webCharts.dataOps.naturalSorter).reverse();
    } else this.y_dom = d3.set(d3.merge(all_y)).values();
  } else if (config.y.summary === 'percent') this.y_dom = [0, 1];else this.y_dom = d3.extent(d3.merge(all_y));
}
"use strict";

function draw(processed_data, raw_data) {
  var context = this;
  var raw = raw_data ? raw_data : this.raw_data ? this.raw_data : [];
  var config = this.config;
  var aspect2 = 1 / config.aspect;
  var data = this.consolidateData(raw);
  // config.padding = config.padding ? config.padding : config.tight ? .01 : .3;
  // config.outer_pad = config.outer_pad ? config.outer_pad : config.tight ? .01 : .1;
  // config.y_behavior = config.y_behavior || "flex";
  // config.x_behavior = config.x_behavior || "flex";
  this.wrap.datum(data);

  var div_width = parseInt(this.wrap.style("width"));

  this.setColorScale();

  // config.resizable = config.resizable === false ? false : true;
  var max_width = config.max_width ? config.max_width : div_width;
  this.raw_width = config.x.type === "ordinal" && +config.range_band ? (+config.range_band + config.range_band * config.padding) * this.x_dom.length : config.resizable ? max_width : config.width ? config.width : div_width;
  this.raw_height = config.y.type === "ordinal" && +config.range_band ? (+config.range_band + config.range_band * config.padding) * this.y_dom.length : config.resizable ? max_width * aspect2 : config.height ? config.height : div_width * aspect2;

  var pseudo_width = this.svg.select(".overlay").attr("width") ? this.svg.select(".overlay").attr("width") : this.raw_width;
  var pseudo_height = this.svg.select(".overlay").attr("height") ? this.svg.select(".overlay").attr("height") : this.raw_height;

  var x_axis_label = this.svg.select(".x.axis").select(".axis-title").text(function () {
    return typeof config.x.label === "string" ? config.x.label : typeof config.x.label === "function" ? config.x.label(context) : null;
  });
  var y_axis_label = this.svg.select(".y.axis").select(".axis-title").text(function () {
    return typeof config.y.label === "string" ? config.y.label : typeof config.y.label === "function" ? config.y.label(context) : null;
  });

  this.xScaleAxis(config.x.type, pseudo_width, this.x_dom);
  this.yScaleAxis(config.y.type, pseudo_height, this.y_dom);

  if (config.resizable) d3.select(window).on("resize." + context.element + context.id, function () {
    context.resize();
  });else d3.select(window).on("resize." + context.element + context.id, null);

  this.events.onDraw(this);
  this.resize();
}
'use strict';

function drawArea(area_drawer, area_data, datum_accessor, class_match, bind_accessor) {
  if (class_match === undefined) class_match = 'chart-area';

  var _this = this;

  var attr_accessor = arguments.length <= 5 || arguments[5] === undefined ? function (d) {
    return d;
  } : arguments[5];

  var area_grps = this.svg.selectAll('.' + class_match).data(area_data, bind_accessor);
  area_grps.exit().remove();
  area_grps.enter().append('g').attr('class', function (d) {
    return class_match + ' ' + d.key;
  }).append('path');
  area_grps.select('path').datum(datum_accessor).attr('fill', function (d) {
    var d_attr = attr_accessor(d);
    return d_attr ? _this.colorScale(d_attr[_this.config.color_by]) : null;
  }).attr('fill-opacity', this.config.fill_opacity || this.config.fill_opacity === 0 ? this.config.fill_opacity : 0.3).transition().attr('d', area_drawer);

  return area_grps;
}
'use strict';

function drawBars(marks) {
  var _this = this;

  var rawData = this.raw_data;
  var config = this.config;

  var bar_supergroups = this.svg.selectAll('.bar-supergroup').data(marks, function (d) {
    return d.per.join('-');
  });
  bar_supergroups.enter().append('g').attr('class', 'bar-supergroup');
  bar_supergroups.exit().remove();

  var bar_groups = bar_supergroups.selectAll('.bar-group').data(function (d) {
    return d.data;
  }, function (d) {
    return d.key;
  });
  var old_bar_groups = bar_groups.exit();

  var nu_bar_groups = undefined;
  var bars = undefined;

  if (config.x.type === 'ordinal') {
    old_bar_groups.selectAll('.bar').transition().attr('y', this.y(0)).attr('height', 0);
    old_bar_groups.transition().remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', function (d) {
      return 'bar-group ' + d.key;
    });
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(function (d) {
      return d.values instanceof Array ? d.values : [d];
    }, function (d) {
      return d.key;
    });
    bars.exit().transition().attr('y', this.y(0)).attr('height', 0).remove();
    bars.enter().append('rect').attr('class', function (d) {
      return 'wc-data-mark bar ' + d.key;
    }).style('clip-path', 'url(#' + this.id + ')').attr('y', this.y(0)).attr('height', 0).append('title');

    bars.attr('stroke', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    }).attr('fill', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    }).attr('fill-opacity', config.fill_opacity || 0.8);

    bars.each(function (d) {
      var mark = d3.select(this.parentNode.parentNode).datum();
      d.tooltip = mark.tooltip;
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(rawData.map(function (m) {
        return m[mark.split];
      })).values();
      d3.select(this).attr(mark.attributes);
    });

    bars.select('title').text(function (d) {
      var tt = d.tooltip || '';
      var xformat = config.x.summary === 'percent' ? d3.format('0%') : d3.format(config.x.format);
      var yformat = config.y.summary === 'percent' ? d3.format('0%') : d3.format(config.y.format);
      return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
        return d.values.raw[0][orig];
      });
    });

    bars.transition().attr('x', function (d) {
      var position = undefined;
      if (!d.arrange || d.arrange === 'stacked') return _this.x(d.values.x);else if (d.arrange === 'nested') {
        position = d.subcats.indexOf(d.key);
        var offset = position ? _this.x.rangeBand() / (d.subcats.length * position * 0.5) / 2 : _this.x.rangeBand() / 2;
        return _this.x(d.values.x) + _this.x.rangeBand() / 2 - offset;
      } else {
        position = d.subcats.indexOf(d.key);
        return _this.x(d.values.x) + _this.x.rangeBand() / d.subcats.length * position;
      }
    }).attr('y', function (d) {
      if (d.arrange !== 'stacked') return _this.y(d.values.y);else return _this.y(d.values.start);
    }).attr('width', function (d) {
      if (d.arrange === 'stacked') return _this.x.rangeBand();else if (d.arrange === 'nested') {
        var position = d.subcats.indexOf(d.key);
        return position ? _this.x.rangeBand() / (d.subcats.length * position * 0.5) : _this.x.rangeBand();
      } else return _this.x.rangeBand() / d.subcats.length;
    }).attr('height', function (d) {
      return _this.y(0) - _this.y(d.values.y);
    });
  } else if (config.y.type === 'ordinal') {
    old_bar_groups.selectAll('.bar').transition().attr('x', this.x(0)).attr('width', 0);
    old_bar_groups.transition().remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', function (d) {
      return 'bar-group ' + d.key;
    });
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(function (d) {
      return d.values instanceof Array ? d.values : [d];
    }, function (d) {
      return d.key;
    });
    bars.exit().transition().attr('x', this.x(0)).attr('width', 0).remove();
    bars.enter().append('rect').attr('class', function (d) {
      return 'wc-data-mark bar ' + d.key;
    }).style('clip-path', 'url(#' + this.id + ')').attr('x', this.x(0)).attr('width', 0);

    bars.attr('stroke', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    }).attr('fill', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    }).attr('fill-opacity', config.fill_opacity || 0.8);

    bars.each(function (d) {
      var mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(rawData.map(function (m) {
        return m[mark.split];
      })).values();
    });

    bars.transition().attr('x', function (d) {
      if (d.arrange === 'stacked') return _this.x(d.values.start);else return _this.x(0);
    }).attr('y', function (d) {
      if (d.arrange !== 'grouped') return _this.y(d.values.y);else {
        var position = d.subcats.indexOf(d.key);
        return _this.y(d.values.y) + _this.y.rangeBand() / d.subcats.length * position;
      }
    }).attr('width', function (d) {
      return _this.x(d.values.x);
    }).attr('height', function (d) {
      if (config.y.type === 'quantile') return 20;else if (d.arrange === 'stacked') return _this.y.rangeBand();else if (d.arrange === 'nested') {
        var position = d.subcats.indexOf(d.key);
        return position ? _this.y.rangeBand() / (sibs.length * position * 0.75) : _this.y.rangeBand();
      } else return _this.y.rangeBand() / d.subcats.length;
    });
  } else if (config.x.type === 'linear' && config.x.bin) {
    old_bar_groups.selectAll('.bar').transition().attr('y', this.y(0)).attr('height', 0);
    old_bar_groups.transition().remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', function (d) {
      return 'bar-group ' + d.key;
    });
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(function (d) {
      return d.values instanceof Array ? d.values : [d];
    }, function (d) {
      return d.key;
    });
    bars.exit().transition().attr('y', this.y(0)).attr('height', 0).remove();
    bars.enter().append('rect').attr('class', function (d) {
      return 'wc-data-mark bar ' + d.key;
    }).style('clip-path', 'url(#' + this.id + ')').attr('y', this.y(0)).attr('height', 0);

    bars.attr('stroke', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    }).attr('fill', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    }).attr('fill-opacity', config.fill_opacity || 0.8);

    bars.each(function (d) {
      var mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(rawData.map(function (m) {
        return m[mark.split];
      })).values();
      d3.select(this).attr(mark.attributes);
      var parent = d3.select(this.parentNode).datum();
      var rangeSet = parent.key.split(',').map(function (m) {
        return +m;
      });
      d.rangeLow = d3.min(rangeSet);
      d.rangeHigh = d3.max(rangeSet);
    });

    bars.transition().attr('x', function (d) {
      return _this.x(d.rangeLow);
    }).attr('y', function (d) {
      if (d.arrange !== 'stacked') return _this.y(d.values.y);else return _this.y(d.values.start);
    }).attr('width', function (d) {
      return _this.x(d.rangeHigh) - _this.x(d.rangeLow);
    }).attr('height', function (d) {
      return _this.y(0) - _this.y(d.values.y);
    });
  } else if (config.y.type === 'linear' && config.y.bin) {
    old_bar_groups.selectAll('.bar').transition().attr('x', this.x(0)).attr('width', 0);
    old_bar_groups.transition().remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', function (d) {
      return 'bar-group ' + d.key;
    });
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(function (d) {
      return d.values instanceof Array ? d.values : [d];
    }, function (d) {
      return d.key;
    });
    bars.exit().transition().attr('x', this.x(0)).attr('width', 0).remove();
    bars.enter().append('rect').attr('class', function (d) {
      return 'wc-data-mark bar ' + d.key;
    }).style('clip-path', 'url(#' + this.id + ')').attr('x', this.x(0)).attr('width', 0);

    bars.attr('stroke', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    }).attr('fill', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    }).attr('fill-opacity', config.fill_opacity || 0.8);

    bars.each(function (d) {
      var mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(rawData.map(function (m) {
        return m[mark.split];
      })).values();
      var parent = d3.select(this.parentNode).datum();
      var rangeSet = parent.key.split(',').map(function (m) {
        return +m;
      });
      d.rangeLow = d3.min(rangeSet);
      d.rangeHigh = d3.max(rangeSet);
    });

    bars.transition().attr('x', function (d) {
      if (d.arrange === 'stacked') return _this.x(d.values.start);else {
        return _this.x(0);
      }
    }).attr('y', function (d) {
      return _this.y(d.rangeHigh);
    }).attr('width', function (d) {
      return _this.x(d.values.x);
    }).attr('height', function (d) {
      return _this.y(d.rangeLow) - _this.y(d.rangeHigh);
    });
  } else {
    old_bar_groups.selectAll('.bar').transition().attr('y', this.y(0)).attr('height', 0);
    old_bar_groups.transition().remove();
    bar_supergroups.remove();
  }
}

;
'use strict';

function drawGridlines() {
  this.wrap.classed('gridlines', this.config.gridlines);
  if (this.config.gridlines) {
    this.svg.select('.y.axis').selectAll('.tick line').attr('x1', 0);
    this.svg.select('.x.axis').selectAll('.tick line').attr('y1', 0);
    if (this.config.gridlines === 'y' || this.config.gridlines === 'xy') this.svg.select('.y.axis').selectAll('.tick line').attr('x1', this.plot_width);
    if (this.config.gridlines === 'x' || this.config.gridlines === 'xy') this.svg.select('.x.axis').selectAll('.tick line').attr('y1', -this.plot_height);
  } else {
    this.svg.select('.y.axis').selectAll('.tick line').attr('x1', 0);
    this.svg.select('.x.axis').selectAll('.tick line').attr('y1', 0);
  }
}

;
'use strict';

function drawLines(marks) {
  var _this = this;

  var config = this.config;
  var line = d3.svg.line().interpolate(config.interpolate).x(function (d) {
    return config.x.type === 'linear' ? _this.x(+d.values.x) : config.x.type === 'time' ? _this.x(new Date(d.values.x)) : _this.x(d.values.x) + _this.x.rangeBand() / 2;
  }).y(function (d) {
    return config.y.type === 'linear' ? _this.y(+d.values.y) : config.y.type === 'time' ? _this.y(new Date(d.values.y)) : _this.y(d.values.y) + _this.y.rangeBand() / 2;
  });

  var line_supergroups = this.svg.selectAll('.line-supergroup').data(marks, function (d) {
    return d.per.join('-');
  });
  line_supergroups.enter().append('g').attr('class', 'line-supergroup');
  line_supergroups.exit().remove();

  var line_grps = line_supergroups.selectAll('.line').data(function (d) {
    return d.data;
  }, function (d) {
    return d.key;
  });
  line_grps.exit().remove();
  var nu_line_grps = line_grps.enter().append('g').attr('class', function (d) {
    return d.key + ' line';
  });
  nu_line_grps.append('path');
  nu_line_grps.append('title');
  line_grps.select('path').attr('class', 'wc-data-mark').datum(function (d) {
    return d.values;
  }).attr('stroke', function (d) {
    return _this.colorScale(d[0].values.raw[0][config.color_by]);
  }).attr('stroke-width', config.stroke_width ? config.stroke_width : config.flex_stroke_width).attr('stroke-linecap', 'round').attr('fill', 'none').transition().attr('d', line);

  line_grps.each(function (d) {
    var mark = d3.select(this.parentNode).datum();
    d.tooltip = mark.tooltip;
    d3.select(this).select('path').attr(mark.attributes);
  });

  line_grps.select('title').text(function (d) {
    var tt = d.tooltip || '';
    var xformat = config.x.summary === 'percent' ? d3.format('0%') : d3.format(config.x.format);
    var yformat = config.y.summary === 'percent' ? d3.format('0%') : d3.format(config.y.format);
    return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
      return d.values[0].values.raw[0][orig];
    });
  });

  return line_grps;
}
'use strict';

function drawPoints(marks) {
  var _this = this;

  var config = this.config;

  var point_supergroups = this.svg.selectAll('.point-supergroup').data(marks, function (d) {
    return d.per.join('-');
  });
  point_supergroups.enter().append('g').attr('class', 'point-supergroup');
  point_supergroups.exit().remove();

  var points = point_supergroups.selectAll('.point').data(function (d) {
    return d.data;
  }, function (d) {
    return d.key;
  });
  var oldPoints = points.exit();
  oldPoints.selectAll('circle').transition().attr('r', 0);
  oldPoints.transition().remove();

  var nupoints = points.enter().append('g').attr('class', function (d) {
    return d.key + ' point';
  });
  nupoints.append('circle').attr('class', 'wc-data-mark').attr('r', 0);
  nupoints.append('title');
  points.select('circle').attr('fill-opacity', config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : 0.6).attr('fill', function (d) {
    return _this.colorScale(d.values.raw[0][config.color_by]);
  }).attr('stroke', function (d) {
    return _this.colorScale(d.values.raw[0][config.color_by]);
  }).transition().attr('r', config.point_size ? config.point_size : config.flex_point_size).attr('cx', function (d) {
    var x_pos = _this.x(d.values.x) || 0;
    return _this.x.type === 'ordinal' ? x_pos + _this.x.rangeBand() / 2 : x_pos;
  }).attr('cy', function (d) {
    var y_pos = _this.y(d.values.y) || 0;
    return config.y.type === 'ordinal' ? y_pos + _this.y.rangeBand() / 2 : y_pos;
  });

  points.each(function (d) {
    var mark = d3.select(this.parentNode).datum();
    d.tooltip = mark.tooltip;
    d3.select(this).select('circle').attr(mark.attributes);
  });

  points.select('title').text(function (d) {
    var tt = d.tooltip || '';
    var xformat = config.x.summary === 'percent' ? d3.format('0%') : d3.format(config.x.format);
    var yformat = config.y.summary === 'percent' ? d3.format('0%') : d3.format(config.y.format);
    return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
      return d.values.raw[0][orig];
    });
  });

  return points;
}
'use strict';

function drawRects(rect_data) {
  var _this = this;

  var container = arguments.length <= 1 || arguments[1] === undefined ? this.svg : arguments[1];
  var class_match = arguments.length <= 2 || arguments[2] === undefined ? 'reference-region' : arguments[2];

  container = container || this.svg;
  var config = this.config;
  var rects = container.selectAll('.' + class_match).data(rect_data);
  rects.exit().remove();
  rects.enter().append('rect').attr('class', class_match).append('title');
  rects.attr({ 'stroke': 'none', 'shape-rendering': 'crispEdges' }).transition().attr('x', function (d) {
    return config.x.type === 'ordinal' ? d.xs[0] : _this.x(d.xs[0]);
  }).attr('y', function (d) {
    return config.y.type === 'ordinal' ? d.ys[0] : _this.y(d.ys[1]);
  }).attr('width', function (d) {
    return config.x.type === 'ordinal' ? d.xs[1] - d.xs[0] : _this.x(d.xs[1]) - _this.x(d.xs[0]);
  }).attr('height', function (d) {
    return config.y.type === 'ordinal' ? Math.abs(d.ys[0] - d.ys[1]) : _this.y(d.ys[0]) - _this.y(d.ys[1]);
  });

  rects.each(function (e) {
    e.attributes = e.attributes || {};
    e.attributes['fill'] = e.attributes['fill'] || '#eee';
    d3.select(this).attr(e.attributes);
  });
  return rects;
}
'use strict';

function drawSimpleLines(line_data, container, class_match, bind_accessor) {
  if (container === undefined) container = this.svg;

  var _this = this;

  if (class_match === undefined) class_match = 'reference-line';

  container = container || this.svg;
  var config = this.config;
  var lines = container.selectAll('.' + class_match).data(line_data, bind_accessor);
  lines.exit().remove();
  lines.enter().append('line').attr('class', class_match).append('title');
  lines.attr('shape-rendering', 'crispEdges').transition().attr('x1', function (d) {
    var unscale = d.xs ? d.xs[2] : false;
    var x1 = !d.xs ? 0 : _this.x(d.xs[0]);
    return unscale ? d.xs[0] : config.x.type === 'ordinal' ? x1 + _this.x.rangeBand() / 2 : x1;
  }).attr('x2', function (d) {
    var unscale = d.xs ? d.xs[2] : false;
    var x2 = !d.xs ? 0 : _this.x(d.xs[1]);
    return unscale ? d.xs[1] : config.x.type === 'ordinal' ? x2 + _this.x.rangeBand() / 2 : x2;
  }).attr('y1', function (d) {
    var unscale = d.ys ? d.ys[2] : false;
    var y1 = !d.ys ? 0 : _this.y(d.ys[0]);
    return unscale ? d.ys[0] : config.y.type === 'ordinal' ? y1 + _this.y.rangeBand() / 2 : y1;
  }).attr('y2', function (d) {
    var unscale = d.ys ? d.ys[2] : false;
    var y2 = !d.ys ? 0 : _this.y(d.ys[1]);
    return unscale ? d.ys[1] : config.y.type === 'ordinal' ? y2 + _this.y.rangeBand() / 2 : y2;
  });
  lines.each(function (e) {
    e.attributes = e.attributes || {};
    e.attributes['stroke-opacity'] = e.attributes['stroke-opacity'] || config.stroke_opacity || 1;
    e.attributes['stroke-width'] = e.attributes['stroke-width'] || config.stroke_width || 1;
    e.attributes['stroke'] = e.attributes['stroke'] || 'black';
    d3.select(this).attr(e.attributes);
    d3.select(this).select('title').datum(e);
  });
  return lines;
}
/**initialize Chart
*@param {Array} [data=parsed data from file] - an array of objects representing the raw data to be passed to the chart
*/
'use strict';

function init(data) {
  var _this = this;

  var config = this.config;

  if (d3.select(this.div).select('.loader').empty()) {
    d3.select(this.div).insert('div', ':first-child').attr('class', 'loader').selectAll('.blockG').data(d3.range(8)).enter().append('div').attr('class', function (d) {
      return 'blockG rotate' + (d + 1);
    });
  }
  this.wrap.attr('class', 'wc-chart');

  this.setDefaults();

  var startup = function startup(data) {
    if (_this.controls) {
      _this.controls.targets.push(_this);
      if (!_this.controls.ready) _this.controls.init(data);else _this.controls.layout();
    }

    var meta_map = config.meta_map ? config.meta_map : data && data.length ? d3.keys(data[0]).map(function (m) {
      return { col: m, label: m };
    }) : [];

    _this.metaMap = d3.scale.ordinal().domain(meta_map.map(function (m) {
      return m.col;
    })).range(meta_map.map(function (m) {
      return m.label;
    }));

    _this.raw_data = data;

    //redo this without jquery
    var visible = window.$ ? $(_this.div).is(':visible') : true;
    if (!visible) {
      var onVisible = setInterval(function (i) {
        var visible_now = $(_this.div).is(':visible');
        if (visible_now) {
          _this.layout();
          _this.wrap.datum(_this);
          var init_data = _this.transformData(data);
          _this.draw(init_data);
          clearInterval(onVisible);
        }
      }, 500);
    } else {
      _this.layout();
      _this.wrap.datum(_this);
      _this.draw();
    };
  };

  if (this.filepath && !data) {
    d3.csv(this.filepath, function (error, csv) {
      _this.raw_data = csv;
      _this.onDataError(error);
      _this.checkRequired(csv);
      startup(csv);
    });
  } else startup(data);

  return this;
}
"use strict";

function layout() {
  this.svg = this.wrap.append("svg").attr({ "class": "wc-svg",
    "xmlns": "http://www.w3.org/2000/svg",
    "version": "1.1",
    "xlink": "http://www.w3.org/1999/xlink"
  }).append("g");

  var defs = this.svg.append("defs");
  defs.append("pattern").attr({
    "id": "diagonal-stripes",
    "x": 0, "y": 0, "width": 3, "height": 8, "patternUnits": "userSpaceOnUse", "patternTransform": "rotate(30)"
  }).append("rect").attr({ "x": "0", "y": "0", "width": "2", "height": "8", "style": "stroke:none; fill:black" });

  defs.append("clipPath").attr("id", this.id).append("rect").attr("class", "plotting-area");

  //y axis
  this.svg.append("g").attr("class", "y axis").append("text").attr("class", "axis-title").attr("transform", "rotate(-90)").attr("dy", ".75em").attr("text-anchor", "middle");
  //x axis
  this.svg.append("g").attr("class", "x axis").append("text").attr("class", "axis-title").attr("dy", "-.35em").attr("text-anchor", "middle");
  //overlay
  this.svg.append("rect").attr("class", "overlay").attr("opacity", 0);
  //add legend
  this.wrap.append("ul").attr("class", "legend").append("span").attr("class", "legend-title");

  d3.select(this.div).select(".loader").remove();

  this.events.onLayout(this);
}
'use strict';

function makeLegend(scale, label, custom_data) {
  if (scale === undefined) scale = this.colorScale;

  var _this = this;

  var context = this;
  var config = this.config;

  config.legend.mark = config.legend.mark ? config.legend.mark : config.marks.length && config.marks[0].type === 'bar' ? 'square' : config.marks.length ? config.marks[0].type : 'square';

  var legend_label = label ? label : typeof config.legend.label === 'string' ? config.legend.label : config.meta_map ? this.metaMap(config.color_by) : '';

  var legend = this.legend || this.wrap.select('.legend');

  var legend_data = custom_data || scale.domain().slice(0).filter(function (f) {
    return f !== undefined && f !== null;
  }).map(function (m) {
    return { label: m, mark: config.legend.mark };
  });

  legend.select('.legend-title').text(legend_label).style('display', legend_label ? 'inline' : 'none');

  var leg_parts = legend.selectAll('.legend-item').data(legend_data, function (d) {
    return d.label + d.mark;
  });

  leg_parts.exit().remove();

  var new_parts = leg_parts.enter().append('li').attr('class', 'legend-item');
  new_parts.append('span').attr('class', 'legend-mark-text').style('color', function (d) {
    return scale(d.label);
  });
  new_parts.append('svg').attr('class', 'legend-color-block');

  if (config.legend.order) leg_parts.sort(function (a, b) {
    return d3.ascending(config.legend.order.indexOf(a.label), config.legend.order.indexOf(b.label));
  });

  leg_parts.selectAll('.legend-color-block').select('.legend-mark').remove();
  leg_parts.selectAll('.legend-color-block').each(function (e) {
    var svg = d3.select(this);
    if (e.mark === 'circle') svg.append('circle').attr({ 'cx': '.5em', 'cy': '.45em', 'r': '.45em', 'class': 'legend-mark' });else if (e.mark === 'line') svg.append('line').attr({ 'x1': 0, 'y1': '.5em', 'x2': '1em', 'y2': '.5em', 'stroke-width': 2, 'shape-rendering': 'crispEdges', 'class': 'legend-mark' });else if (e.mark === 'square') svg.append('rect').attr({ 'height': '1em', 'width': '1em', 'class': 'legend-mark' });
  });
  leg_parts.selectAll('.legend-color-block').select('.legend-mark').attr('fill', function (d) {
    return d.color || scale(d.label);
  }).attr('stroke', function (d) {
    return d.color || scale(d.label);
  }).each(function (e) {
    d3.select(this).attr(e.attributes);
  });

  new_parts.append('span').attr('class', 'legend-label').text(function (d) {
    return _this.metaMap.domain().indexOf(d.label) > -1 ? _this.metaMap(d.label) : d.label;
  });

  leg_parts.on('mouseover', function (d) {
    if (!config.legend.highlight_on_hover) return;
    var fill = d3.select(this).select('.legend-mark').attr('fill');
    context.svg.selectAll('.wc-data-mark').attr('opacity', 0.1).filter(function (f) {
      return d3.select(this).attr('fill') === fill || d3.select(this).attr('stroke') === fill;
    }).attr('opacity', 1);
  }).on('mouseout', function (d) {
    if (!config.legend.highlight_on_hover) return;
    _this.svg.selectAll('.wc-data-mark').attr('opacity', 1);
  });

  if (scale.domain().length > 1) legend.style('display', 'block');else legend.style('display', 'none');

  this.legend = legend;
}
'use strict';

function onDataError(error) {
  if (!error) return;

  d3.select(this.div).select('.loader').remove();
  this.wrap.append('div').attr('class', 'alert alert-error alert-danger').text('Dataset could not be loaded.');
  throw new Error('Dataset could not be loaded. Check provided path (' + this.filepath + ').');
}
'use strict';

function resize() {
  var context = this;
  var config = this.config;
  // config.aspect = config.aspect || 1.33;
  var aspect2 = 1 / config.aspect;
  var div_width = parseInt(this.wrap.style('width'));
  var max_width = config.max_width ? config.max_width : div_width;
  var preWidth = !config.resizable ? config.width : !max_width || div_width < max_width ? div_width : this.raw_width;

  this.textSize(preWidth);

  this.margin = context.setMargins();

  var svg_width = config.x.type === 'ordinal' && +config.range_band ? context.raw_width + context.margin.left + context.margin.right : !config.resizable ? context.raw_width : !config.max_width || div_width < config.max_width ? div_width : this.raw_width;
  this.plot_width = svg_width - this.margin.left - this.margin.right;
  var svg_height = config.y.type === 'ordinal' && +config.range_band ? this.raw_height + this.margin.top + this.margin.bottom : !config.resizable && config.height ? config.height : !config.resizable ? svg_width * aspect2 : this.plot_width * aspect2;
  this.plot_height = svg_height - this.margin.top - this.margin.bottom;

  d3.select(this.svg.node().parentNode).attr('width', svg_width).attr('height', svg_height).select('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  this.svg.select('.overlay').attr('width', this.plot_width).attr('height', this.plot_height).classed('zoomable', config.zoomable);

  this.svg.select('.plotting-area').attr('width', this.plot_width).attr('height', this.plot_height + 1).attr('transform', 'translate(0, -1)');

  this.xScaleAxis(config.x.type, this.plot_width, this.x_dom);
  this.yScaleAxis(config.y.type, this.plot_height, this.y_dom);

  var g_x_axis = this.svg.select('.x.axis');
  var g_y_axis = this.svg.select('.y.axis');
  var x_axis_label = g_x_axis.select('.axis-title');
  var y_axis_label = g_y_axis.select('.axis-title');

  if (config.x_location !== 'top') g_x_axis.attr('transform', 'translate(0,' + this.plot_height + ')');
  g_x_axis.transition().call(this.xAxis);
  g_y_axis.transition().call(this.yAxis);
  x_axis_label.attr('transform', 'translate(' + this.plot_width / 2 + ',' + (this.margin.bottom - 2) + ')');
  y_axis_label.attr('x', -1 * this.plot_height / 2).attr('y', -1 * this.margin.left);

  //relabel axis ticks if metaMap says so
  this.svg.select('.x.axis.ordinal').selectAll('.tick text').text(function (d) {
    return context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d;
  });
  this.svg.select('.y.axis.ordinal').selectAll('.tick text').text(function (d) {
    return context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d;
  });

  this.drawGridlines();
  //update legend - margins need to be set first
  this.makeLegend();

  //update reference regions and reference lines
  this.updateRefRegions();
  this.updateRefLines();

  //draw linear regression line
  if (config.regression_line) {
    var reg_data = this.current_data.slice(0).filter(function (f) {
      return (+f.values.x || +f.values.x === 0) && (+f.values.y || +f.values.y === 0);
    });
    var all_x = reg_data.map(function (m) {
      return m.values.x;
    });
    var all_y = reg_data.map(function (m) {
      return m.values.y;
    });
    var lr = webCharts.dataOps.linearRegression(all_x, all_y);
    var max = this.x.domain()[1];
    var reg_line_data = [{ xs: [0, max], ys: [lr.intercept, max * lr.slope + lr.intercept] }];
    var reg_line = this.drawSimpleLines(reg_line_data, null, 'regression-line').style('clip-path', 'url(#' + this.id + ')').style('shape-rendering', 'auto');
    reg_line.select('title').text('slope: ' + d3.format('.2f')(lr.slope) + '\n' + 'intercept: ' + d3.format('.2f')(lr.intercept) + '\n' + 'r2: ' + d3.format('.2f')(lr.r2));
  } else {
    this.drawSimpleLines([], null, 'regression-line');
  }

  //update the chart's specific marks
  this.updateDataMarks();

  //call .on("resize") function, if any
  this.events.onResize(this);
}

;
'use strict';

function setColorScale() {
  var config = this.config;
  var data = config.legend.behavior === 'flex' ? this.filtered_data : this.raw_data;
  var colordom = config.color_dom || d3.set(data.map(function (m) {
    return m[config.color_by];
  })).values().filter(function (f) {
    return f && f !== 'undefined';
  });

  if (config.legend.order) colordom = colordom.sort(function (a, b) {
    return d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b));
  });else colordom = colordom.sort(webCharts.dataOps.naturalSorter);

  this.colorScale = d3.scale.ordinal().domain(colordom).range(config.colors);
}
'use strict';

function setDefaults() {
	this.raw_data = this.raw_data || [];

	this.config.x = this.config.x || {};
	this.config.y = this.config.y || {};

	//backwards compatibility with x/y settings -- is this needed?
	if (this.config.x_type) this.config.x.type = this.config.x_type;
	if (this.config.x_vals && this.config.x_vals.col) this.config.x.type = this.config.x_vals.col;
	if (this.config.x_vals && this.config.x_vals.stat) this.config.x.summary = this.config.x_vals.stat;
	if (this.config.x_behavior) this.config.x.behavior = this.config.x_behavior;
	if (this.config.x_label) this.config.x.label = this.config.x_label;
	if (this.config.y_type) this.config.y.type = this.config.y_type;
	if (this.config.y_vals && this.config.y_vals.col) this.config.y.type = this.config.y_vals.col;
	if (this.config.y_vals && this.config.y_vals.stat) this.config.y.summary = this.config.y_vals.stat;
	if (this.config.y_behavior) this.config.y.behavior = this.config.y_behavior;
	if (this.config.y_label) this.config.y.label = this.config.y_label;

	this.config.x.label = this.config.x.label !== undefined ? this.config.x.label : this.config.x.column;
	this.config.y.label = this.config.y.label !== undefined ? this.config.y.label : this.config.y.column;

	this.config.x.sort = this.config.x.sort || 'alphabetical-ascending';
	this.config.y.sort = this.config.y.sort || 'alphabetical-descending';

	this.config.x.type = this.config.x.type || 'linear';
	this.config.y.type = this.config.y.type || 'linear';

	this.config.margin = this.config.margin || {};
	this.config.legend = this.config.legend || {};
	this.config.legend.label = this.config.legend.label !== undefined ? this.config.legend.label : this.config.color_by;
	this.config.marks = this.config.marks && this.config.marks.length ? this.config.marks : [{}];

	this.config.reference_regions = this.config.reference_regions || [];

	this.config.date_format = this.config.date_format || '%x';

	this.config.padding = this.config.padding !== undefined ? this.config.padding : 0.3;
	this.config.outer_pad = this.config.outer_pad !== undefined ? this.config.outer_pad : 0.1;

	this.config.resizable = this.config.resizable !== undefined ? this.config.resizable : true;

	this.config.aspect = this.config.aspect || 1.33;

	this.config.colors = this.config.colors || ['rgb(102,194,165)', 'rgb(252,141,98)', 'rgb(141,160,203)', 'rgb(231,138,195)', 'rgb(166,216,84)', 'rgb(255,217,47)', 'rgb(229,196,148)', 'rgb(179,179,179)'];

	this.config.no_text_size = this.config.no_text_size === undefined ? false : this.config.no_text_size;
}
'use strict';

function setMargins() {
  var _this = this;

  var x_ticks = this.xAxis.tickFormat() ? this.x.domain().map(function (m) {
    return _this.xAxis.tickFormat()(m);
  }) : this.x.domain();
  var y_ticks = this.yAxis.tickFormat() ? this.y.domain().map(function (m) {
    return _this.yAxis.tickFormat()(m);
  }) : this.y.domain();

  var max_y_text_length = d3.max(y_ticks.map(function (m) {
    return String(m).length;
  }));
  if (this.config.y_format && this.config.y_format.indexOf('%') > -1) max_y_text_length += 1;
  max_y_text_length = Math.max(2, max_y_text_length);
  var x_label_on = this.config.x.label ? 1.5 : 0;
  var y_label_on = this.config.y.label ? 1.5 : 0.25;
  var font_size = parseInt(this.wrap.style('font-size'));
  var x_second = this.config.x2_interval ? 1 : 0;
  var y_margin = max_y_text_length * font_size * .5 + font_size * y_label_on * 1.5 || 8;
  var x_margin = font_size + font_size / 1.5 + font_size * x_label_on + font_size * x_second || 8;

  y_margin += 6;
  x_margin += 3;

  return {
    top: this.config.margin && this.config.margin.top ? this.config.margin.top : 8,
    right: this.config.margin && this.config.margin.right ? this.config.margin.right : 16,
    bottom: this.config.margin && this.config.margin.bottom ? this.config.margin.bottom : x_margin,
    left: this.config.margin && this.config.margin.left ? this.config.margin.left : y_margin
  };
}
'use strict';

function textSize(width, height) {
  var font_size = '14px';
  var point_size = 4;
  var stroke_width = 2;

  if (this.config.no_text_size) {
    font_size = this.config.font_size;
    point_size = this.config.point_size || 4;
    stroke_width = this.config.stroke_width || 2;
  } else if (width >= 600) {
    font_size = '14px';
    point_size = 4;
    stroke_width = 2;
  } else if (width > 450 && width < 600) {
    font_size = '12px';
    point_size = 3;
    stroke_width = 2;
  } else if (width > 300 && width < 450) {
    font_size = '10px';
    point_size = 2;
    stroke_width = 2;
  } else if (width <= 300) {
    font_size = '10px';
    point_size = 2;
    stroke_width = 1;
  }

  this.wrap.style('font-size', font_size);
  this.config.flex_point_size = point_size;
  this.config.flex_stroke_width = stroke_width;
}
'use strict';

function transformData(raw, mark) {
  var _this = this;

  var config = this.config;
  var x_behavior = config.x.behavior || 'raw';
  var y_behavior = config.y.behavior || 'raw';
  var sublevel = mark.type === 'line' ? config.x.column : mark.type === 'bar' && mark.split ? mark.split : null;
  var dateConvert = d3.time.format(config.date_format);
  var totalOrder = undefined;

  //this functionality should go in a 'pre-data' callback
  if (config.lengthen_columns) raw = webCharts.dataOps.lengthenRaw(raw, config.lengthen_columns);

  raw = mark.per && mark.per.length ? raw.filter(function (f) {
    return f[mark.per[0]];
  }) : raw;

  //run initial filter if specified
  if (config.initial_filter) raw = raw.filter(function (f) {
    return config.initial_filter.vals.indexOf(f[config.initial_filter.col]) !== -1;
  });

  //make sure data has x and y values
  if (config.x.column) raw = raw.filter(function (f) {
    return f[config.x.column];
  });
  if (config.y.column) raw = raw.filter(function (f) {
    return f[config.y.column];
  });

  if (config.x.type === 'time') {
    raw = raw.filter(function (f) {
      return f[config.x.column] instanceof Date ? f[config.x.column] : dateConvert.parse(f[config.x.column]);
    });
    raw.forEach(function (e) {
      return e[config.x.column] = e[config.x.column] instanceof Date ? e[config.x.column] : dateConvert.parse(e[config.x.column]);
    });
  };
  if (config.y.type === 'time') {
    raw = raw.filter(function (f) {
      return f[config.y.column] instanceof Date ? f[config.y.column] : dateConvert.parse(f[config.y.column]);
    });
    raw.forEach(function (e) {
      return e[config.y.column] = e[config.y.column] instanceof Date ? e[config.y.column] : dateConvert.parse(e[config.y.column]);
    });
  };

  if ((config.x.type === 'linear' || config.x.type === 'log') && config.x.column) {
    raw = raw.filter(function (f) {
      return config.x.summary !== 'count' && config.x.summary !== 'percent' ? +f[config.x.column] || +f[config.x.column] === 0 : f;
    });
  };
  if ((config.y.type === 'linear' || config.y.type === 'log') && config.y.column) {
    raw = raw.filter(function (f) {
      return config.y.summary !== 'count' && config.y.summary !== 'percent' ? +f[config.y.column] || +f[config.y.column] === 0 : f;
    });
  };

  var raw_nest = undefined;
  if (mark.type === 'bar') raw_nest = mark.arrange !== 'stacked' ? makeNest(raw, sublevel) : makeNest(raw);else if (config.x.summary === 'count' || config.y.summary === 'count') raw_nest = makeNest(raw);

  var raw_dom_x = config.x.summary === 'cumulative' ? [0, raw.length] : config.x.type === 'ordinal' ? d3.set(raw.map(function (m) {
    return m[config.x.column];
  })).values().filter(function (f) {
    return f;
  }) : mark.split && mark.arrange !== 'stacked' ? d3.extent(d3.merge(raw_nest.nested.map(function (m) {
    return m.values.map(function (p) {
      return p.values.raw.length;
    });
  }))) : config.x.summary === 'count' ? d3.extent(raw_nest.nested.map(function (m) {
    return m.values.raw.length;
  })) : d3.extent(raw.map(function (m) {
    return +m[config.x.column];
  }).filter(function (f) {
    return +f;
  }));

  var raw_dom_y = config.y.summary === 'cumulative' ? [0, raw.length] : config.y.type === 'ordinal' ? d3.set(raw.map(function (m) {
    return m[config.y.column];
  })).values().filter(function (f) {
    return f;
  }) : mark.split && mark.arrange !== 'stacked' ? d3.extent(d3.merge(raw_nest.nested.map(function (m) {
    return m.values.map(function (p) {
      return p.values.raw.length;
    });
  }))) : config.y.summary === 'count' ? d3.extent(raw_nest.nested.map(function (m) {
    return m.values.raw.length;
  })) : d3.extent(raw.map(function (m) {
    return +m[config.y.column];
  }).filter(function (f) {
    return +f || +f === 0;
  }));

  var filtered = raw;

  function makeNest(entries, sublevel) {
    var dom_xs = [];
    var dom_ys = [];
    var this_nest = d3.nest();

    if (config.x.type === 'linear' && config.x.bin || config.y.type === 'linear' && config.y.bin) {
      (function () {
        var xy = config.x.type === 'linear' && config.x.bin ? 'x' : 'y';
        var quant = d3.scale.quantile().domain(d3.extent(entries.map(function (m) {
          return +m[config[xy].column];
        }))).range(d3.range(+config[xy].bin));

        entries.forEach(function (e) {
          return e['wc_bin'] = quant(e[config[xy].column]);
        });

        this_nest.key(function (d) {
          return quant.invertExtent(d['wc_bin']);
        });
      })();
    } else this_nest.key(function (d) {
      return mark.per.map(function (m) {
        return d[m];
      }).join(' ');
    });

    if (sublevel) {
      this_nest.key(function (d) {
        return d[sublevel];
      });
      this_nest.sortKeys(function (a, b) {
        return config.x.type === 'time' ? d3.ascending(new Date(a), new Date(b)) : config.x_dom ? d3.ascending(config.x_dom.indexOf(a), config.x_dom.indexOf(b)) : sublevel === config.color_by && config.legend.order ? d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)) : config.x.type === 'ordinal' || config.y.type === 'ordinal' ? webCharts.dataOps.naturalSorter(a, b) : d3.ascending(+a, +b);
      });
    }
    this_nest.rollup(function (r) {
      var obj = { raw: r };
      var y_vals = r.map(function (m) {
        return m[config.y.column];
      }).sort(d3.ascending);
      var x_vals = r.map(function (m) {
        return m[config.x.column];
      }).sort(d3.ascending);
      obj.x = config.x.type === 'ordinal' ? r[0][config.x.column] : webCharts.dataOps.summarize(x_vals, config.x.summary);
      obj.y = config.y.type === 'ordinal' ? r[0][config.y.column] : webCharts.dataOps.summarize(y_vals, config.y.summary);

      obj.x_q25 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(x_vals, 0.25) : obj.x;
      obj.x_q75 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(x_vals, 0.75) : obj.x;
      obj.y_q25 = config.error_bars ? d3.quantile(y_vals, 0.25) : obj.y;
      obj.y_q75 = config.error_bars ? d3.quantile(y_vals, 0.75) : obj.y;
      dom_xs.push([obj.x_q25, obj.x_q75, obj.x]);
      dom_ys.push([obj.y_q25, obj.y_q75, obj.y]);

      if (config.y.summary === 'cumulative') {
        var interm = entries.filter(function (f) {
          return config.x.type === 'time' ? new Date(f[config.x.column]) <= new Date(r[0][config.x.column]) : +f[config.x.column] <= +r[0][config.x.column];
        });
        if (mark.per.length) interm = interm.filter(function (f) {
          return f[mark.per[0]] === r[0][mark.per[0]];
        });

        var cumul = config.x.type === 'time' ? interm.length : d3.sum(interm.map(function (m) {
          return +m[config.y.column] || +m[config.y.column] === 0 ? +m[config.y.column] : 1;
        }));
        dom_ys.push([cumul]);
        obj.y = cumul;
      };
      if (config.x.summary === 'cumulative') {
        var interm = entries.filter(function (f) {
          return config.y.type === 'time' ? new Date(f[config.y.column]) <= new Date(r[0][config.y.column]) : +f[config.y.column] <= +r[0][config.y.column];
        });
        if (mark.per.length) interm = interm.filter(function (f) {
          return f[mark.per[0]] === r[0][mark.per[0]];
        });
        dom_xs.push([interm.length]);
        obj.x = interm.length;
      };

      return obj;
    });

    var test = this_nest.entries(entries);

    var dom_x = d3.extent(d3.merge(dom_xs));
    var dom_y = d3.extent(d3.merge(dom_ys));

    if (sublevel && mark.type === 'bar' && mark.arrange === 'stacked') {
      test.forEach(calcStartTotal);
      if (config.x.type === 'ordinal' || config.x.type === 'linear' && config.x.bin) dom_y = d3.extent(test.map(function (m) {
        return m.total;
      }));
      if (config.y.type === 'ordinal' || config.y.type === 'linear' && config.y.bin) dom_x = d3.extent(test.map(function (m) {
        return m.total;
      }));
    }
    // else if(sublevel && config.y.summary === 'percent'){
    //   test.forEach(calcPercents);
    // }

    if (config.x.sort === 'total-ascending' || config.y.sort === 'total-ascending') totalOrder = test.sort(function (a, b) {
      return d3.ascending(a.total, b.total);
    }).map(function (m) {
      return m.key;
    });else if (config.x.sort === 'total-descending' || config.y.sort === 'total-descending') totalOrder = test.sort(function (a, b) {
      return d3.ascending(a.total, b.total);
    }).map(function (m) {
      return m.key;
    }).reverse();

    return { nested: test, dom_x: dom_x, dom_y: dom_y };
  };

  // function calcPercents(e){
  //   let max = d3.sum(e.values.map(function(m){return +m.values.y}));
  //   e.values.forEach(function(v){
  //     v.values.y = v.values.y/max
  //   });
  // };

  function calcStartTotal(e) {
    var axis = config.x.type === 'ordinal' || config.x.type === 'linear' && config.x.bin ? 'y' : 'x';
    e.total = d3.sum(e.values.map(function (m) {
      return +m.values[axis];
    }));
    var counter = 0;
    e.values.forEach(function (v, i) {
      if (config.x.type === 'ordinal' || config.x.type === 'linear' && config.x.bin) {
        v.values.y = config.y.summary === 'percent' ? v.values.y / e.total : v.values.y || 0;
        counter += +v.values.y;
        v.values.start = e.values[i - 1] ? counter : v.values.y;
      } else {
        v.values.x = config.x.summary === 'percent' ? v.values.x / e.total : v.values.x || 0;
        v.values.start = counter;
        counter += +v.values.x;
      }
    });
  }

  var filt1_xs = [];
  var filt1_ys = [];
  if (this.filters.length) {
    this.filters.forEach(function (e) {
      filtered = filtered.filter(function (d) {
        return e.val === 'All' ? d : e.val instanceof Array ? e.val.indexOf(d[e.col]) > -1 : d[e.col] === e.val;
      });
    });
    //get domain for all non-All values of first filter
    if (config.x.behavior === 'firstfilter' || config.y.behavior === 'firstfilter') {
      this.filters[0].choices.filter(function (f) {
        return f !== 'All';
      }).forEach(function (e) {
        var perfilter = raw.filter(function (f) {
          return f[_this.filters[0].col] === e;
        });
        var filt_nested = makeNest(perfilter, sublevel);
        filt1_xs.push(filt_nested.dom_x);
        filt1_ys.push(filt_nested.dom_y);
      });
    }
  }

  var filt1_dom_x = d3.extent(d3.merge(filt1_xs));
  var filt1_dom_y = d3.extent(d3.merge(filt1_ys));

  this.filtered_data = filtered;

  var current_nested = makeNest(filtered, sublevel);

  //extent of current data
  // if(mark.type === 'bar' && mark.arrange === 'stacked'){
  //   let flex_dom_x = makeNest(filtered).dom_x;
  //   let flex_dom_y = makeNest(filtered).dom_y;
  // }
  // else{
  var flex_dom_x = current_nested.dom_x;
  var flex_dom_y = current_nested.dom_y;

  if (mark.type === 'bar') {
    if (config.y.type === 'ordinal' && config.x.summary === 'count') config.x.domain = config.x.domain ? [0, config.x.domain[1]] : [0, null];else if (config.x.type === 'ordinal' && config.y.summary === 'count') config.y.domain = config.y.domain ? [0, config.y.domain[1]] : [0, null];
  }

  //several criteria must be met in order to use the 'firstfilter' domain
  var nonall = Boolean(this.filters.length && this.filters[0].val !== 'All' && this.filters.slice(1).filter(function (f) {
    return f.val === 'All';
  }).length === this.filters.length - 1);

  var pre_x_dom = !this.filters.length ? flex_dom_x : x_behavior === 'raw' ? raw_dom_x : nonall && x_behavior === 'firstfilter' ? filt1_dom_x : flex_dom_x;
  var pre_y_dom = !this.filters.length ? flex_dom_y : y_behavior === 'raw' ? raw_dom_y : nonall && y_behavior === 'firstfilter' ? filt1_dom_y : flex_dom_y;

  var x_dom = config.x_dom ? config.x_dom : config.x.type === 'ordinal' && config.x.behavior === 'flex' ? d3.set(filtered.map(function (m) {
    return m[config.x.column];
  })).values() : config.x.type === 'ordinal' ? d3.set(raw.map(function (m) {
    return m[config.x.column];
  })).values() : config.x_from0 ? [0, d3.max(pre_x_dom)] : pre_x_dom;

  var y_dom = config.y_dom ? config.y_dom : config.y.type === 'ordinal' && config.y.behavior === 'flex' ? d3.set(filtered.map(function (m) {
    return m[config.y.column];
  })).values() : config.y.type === 'ordinal' ? d3.set(raw.map(function (m) {
    return m[config.y.column];
  })).values() : config.y_from0 ? [0, d3.max(pre_y_dom)] : pre_y_dom;

  if (config.x.domain && (config.x.domain[0] || config.x.domain[0] === 0)) x_dom[0] = config.x.domain[0];
  if (config.x.domain && (config.x.domain[1] || config.x.domain[1] === 0)) x_dom[1] = config.x.domain[1];
  if (config.y.domain && (config.y.domain[0] || config.y.domain[0] === 0)) y_dom[0] = config.y.domain[0];
  if (config.y.domain && (config.y.domain[1] || config.y.domain[1] === 0)) y_dom[1] = config.y.domain[1];

  if (config.x.type === 'ordinal') config.x.order = totalOrder;
  if (config.y.type === 'ordinal') config.y.order = totalOrder;

  this.current_data = current_nested.nested;
  // context.events.onDatatransform(context);

  return { data: current_nested.nested, x_dom: x_dom, y_dom: y_dom };
}
'use strict';

function updateDataMarks() {
  this.drawPoints(this.marks.filter(function (f) {
    return f.type === 'circle';
  }));
  this.drawLines(this.marks.filter(function (f) {
    return f.type === 'line';
  }));
  this.drawBars(this.marks.filter(function (f) {
    return f.type === 'bar';
  }));
}
'use strict';

function updateRefLines() {
  var _this = this;

  //define/draw reference lines, if any
  var config = this.config;
  var ref_line_data = !config.reference_lines ? [] : config.reference_lines.map(function (m) {
    var xx = m.x;
    var yy = m.y;
    if (config.x.type === 'time' && m.x) xx = d3.time.format(config.date_format).parse(m.x);
    if (config.y.type === 'time' && m.y) yy = d3.time.format(config.date_format).parse(m.y);
    return { xs: !m.x && +m.x !== 0 ? [0, _this.plot_width, true] : [xx, xx], ys: !m.y && +m.y !== 0 ? [0, _this.plot_height, true] : [yy, yy], attributes: m.attributes };
  });

  this.drawSimpleLines(ref_line_data).style('clip-path', 'url(#' + this.id + ')');
}
'use strict';

function updateRefRegions() {
  var _this = this;

  //define/draw reference regions, if any
  var config = this.config;
  var ref_region_data = this.config.reference_regions.slice(0).map(function (m) {
    var xx = m.x;
    var yy = m.y;
    if (config.x.type === 'time') if (m.x) xx = m.x.map(function (w) {
      return d3.time.format(config.date_format).parse(w);
    });else xx = _this.x_dom;
    if (config.y.type === 'time') if (m.y) yy = m.y.map(function (w) {
      return d3.time.format(config.date_format).parse(w);
    });else yy = _this.y_dom;
    return { xs: !xx ? [1, _this.plot_width] : xx, ys: !m.y ? [0, _this.plot_height - 1] : yy, attributes: m.attributes };
  });
  this.drawRects(ref_region_data).style('clip-path', 'url(#' + this.id + ')');
}
'use strict';

function xScaleAxis(type, max_range, domain) {
  var config = this.config;
  var x = undefined;

  if (type === 'log') x = d3.scale.log();else if (type === 'ordinal') x = d3.scale.ordinal();else if (type === 'time') x = d3.time.scale();else x = d3.scale.linear();

  x.domain(domain);

  if (type === 'ordinal') x.rangeBands([0, +max_range], config.padding, config.outer_pad);else x.range([0, +max_range]).clamp(Boolean(config.x_clamp));

  var format = config.x.format ? config.x.format : type === 'percent' ? '0%' : type === 'time' ? '%x' : '.0f';
  var tick_count = Math.max(2, Math.min(max_range / 80, 8));
  var xAxis = d3.svg.axis().scale(x).orient(config.x.location).ticks(tick_count).tickFormat(type === 'ordinal' ? null : type === 'time' ? d3.time.format(format) : d3.format(format)).tickValues(config.x.ticks ? config.x.ticks : null).innerTickSize(6).outerTickSize(3);

  this.svg.select('g.x.axis').attr('class', 'x axis ' + type);
  this.x = x;
  this.xAxis = xAxis;
}
'use strict';

function yScaleAxis(type, max_range, domain) {
  //domain = type === 'percent' ? [0,1] : domain;
  var config = this.config;
  var y = undefined;
  if (type === 'log') y = d3.scale.log();else if (type === 'ordinal') y = d3.scale.ordinal();else if (type === 'time') y = d3.time.scale();else y = d3.scale.linear();

  y.domain(domain);

  if (type === 'ordinal') y.rangeBands([+max_range, 0], config.padding, config.outer_pad);else y.range([+max_range, 0]).clamp(Boolean(config.y_clamp));

  var y_format = config.y.format ? config.y.format : config.y.summary === 'percent' ? '0%' : '.0f';
  var tick_count = Math.max(2, Math.min(max_range / 80, 8));
  var yAxis = d3.svg.axis().scale(y).orient('left').ticks(tick_count).tickFormat(type === 'ordinal' ? null : type === 'time' ? d3.time.format(y_format) : d3.format(y_format)).tickValues(config.y.ticks ? config.y.ticks : null).innerTickSize(6).outerTickSize(3);

  this.svg.select('g.y.axis').attr('class', 'y axis ' + type);

  this.y = y;
  this.yAxis = yAxis;
}