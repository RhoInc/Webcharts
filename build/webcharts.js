(function (root, factory) {  if(typeof define === "function" && define.amd) {    define(["d3"], factory);  } else if(typeof module === "object" && module.exports) {    module.exports = factory(require("d3"));  } else {    root.webCharts = factory(root.d3);  }}(this, function(d3){
/**A charting library built on top of {@link https://github.com/mbostock/d3 D3.js} that offers a simple way to instantiate basic interactive chart with JavaScript. Bar charts, line charts, scatter plots, and timelines can be customized with a handful of settings and extended through callback functions. Controls can be specified for filtering chart data or manipulating the settings to change how the chart behaves.
*@module webCharts
*@version 0.2
*/
webCharts = {version: "0.2"};

webCharts.colors = {
  qualitative: ['rgb(102,194,165)','rgb(252,141,98)','rgb(141,160,203)','rgb(231,138,195)','rgb(166,216,84)','rgb(255,217,47)','rgb(229,196,148)','rgb(179,179,179)'],
  nb: ["#2A415A", "#50BD6F","#EE6148", "#4BBCF3", "#D79109","#A03249", "#81980F", "#F888CA", "#349782", "#CB0E73"]
};
webCharts.dataOps = {};

webCharts.dataOps.isCont = function(data, varname){
  var arr = d3.set(data.map(function(m){return m[varname]})).values();
  var test = true;
  arr.forEach(function(e){
    if(!+e && e !== "." && +e !== 0)
      test = false;
  });
  if(!test || arr.length < 4)
    return false;
  else
    return true;
};

webCharts.dataOps.lengthenRaw = function(data, columns){
    var my_data = [];
    data.forEach(function(e){
      columns.forEach(function(g){
        var obj = {};
        obj.wc_category = g;
        obj.wc_value = e[g];
        for(x in e){
          obj[x] = e[x];
        }
        my_data.push(obj);
      });
    });
    return my_data;
  };

webCharts.dataOps.linearRegression = function(x,y){
  //http://stackoverflow.com/questions/20507536/d3-js-linear-regression
  var lr = {};
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (var i = 0; i < n; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += (x[i]*y[i]);
    sum_xx += (x[i]*x[i]);
    sum_yy += (y[i]*y[i]);
  }

  lr.slope = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  lr.intercept = (sum_y - lr.slope * sum_x)/n;
  lr.r2 = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

  return lr;
};

webCharts.dataOps.naturalSorter = function(a, b){
  //http://www.davekoelle.com/files/alphanum.js
  function chunkify(t) {
    var tz = [];
    var x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      var m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  var aa = chunkify(a.toLowerCase());
  var bb = chunkify(b.toLowerCase());

  for (x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      var c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      } else return (aa[x] > bb[x]) ? 1 : -1;
    }
  }
  return aa.length - bb.length;
};

webCharts.dataOps.standardError = function(vals){
  if(!vals)
    return null;
  var n = +vals.length;
  if (n < 1) return NaN;
  if (n === 1) return 0;

  var mean = d3.sum(vals)/n,
      i = -1,
      s = 0;

  while (++i < n) {
    var v = vals[i] - mean;
    s += v * v;
  }

  return Math.sqrt(s / (n - 1)) / Math.sqrt(n);
};

webCharts.dataOps.summarize = function(vals, operation){
  var nvals = vals.filter(function(f){return +f || +f === 0; }).map(function(m){return +m; });
  if(operation === 'cumulative')
    return null;
  var stat = operation || 'mean';
  var mathed = stat === 'count' ? vals.length :
  	stat === 'percent' ? vals.length :
  	d3[stat](nvals);

  return mathed;
};

/**The base Chart object.
	*@alias module:webCharts.Chart
	*@constructor
	*@param {string} element - CSS selector identifying the element in which to create the chart.
	*@param {string} filepath - path to the file containing data for the chart. Expected to be a text file of comma-separated values.
	*@param {Object} config - the configuration object specifying all options for how the chart is to appear and behave.
	*@param {Object} config.x - object with properties to define the x-axis.
	*@param {Object} config.x.column - column from the supplied dataset to supply values for x-axis.
 	*@param {Object} config.y - object with properties to define the y-axis.
	*@param {Controls} controls - {@link module-webCharts.Controls.html Controls} instance that will be linked to this chart instance.
*/
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Chart = function Chart(element, filepath, config, controls) {
	if (element === undefined) element = 'body';
	if (config === undefined) config = {};

	_classCallCheck(this, Chart);

	/** @member {string} */
	this.div = element;
	/** @member {string} */
	this.filepath = filepath;
	/** @member {Object} */
	this.config = config;
	/** @member {Controls} */
	this.controls = controls;
	/** @member {Array} */
	this.filters = [];
	/** @member {Array} */
	this.required_cols = [];
	/** @member {Array} */
	this.marks = [];
	/** @member {d3.selection} */
	this.wrap = d3.select(this.div).append('div');

	/** @member {Object} */
	this.events = {
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
	this.on = function (event, callback) {
		var possible_events = ['layout', 'datatransform', 'draw', 'resize'];
		if (possible_events.indexOf(event) < 0) return;
		if (callback) this.events['on' + event.charAt(0).toUpperCase() + event.slice(1)] = callback;
	};

	this.checkRequired = checkRequired;
	this.consolidateData = consolidateData;
	this.draw = draw;
	this.drawArea = drawArea;
	this.drawBars = drawBars;
	this.drawGridlines = drawGridlines;
	this.drawLines = drawLines;
	this.drawPoints = drawPoints;
	this.drawRects = drawRects;
	this.drawSimpleLines = drawSimpleLines;
	this.init = init;
	this.layout = layout;
	this.setDefaults = setDefaults;
	this.updateDataMarks = updateDataMarks;
};
"use strict";

webCharts.Chart = Chart;
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

  var div_width = parseInt(this.wrap.style('width'));

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

  var id = config.id || Math.random();
  if (config.resizable) d3.select(window).on('resize.' + context.chart_type + "." + context.element + id, function () {
    context.resize();
  });else d3.select(window).on('resize.' + context.chart_type + "." + context.element + id, null);

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

    bars = bar_groups.selectAll("rect").data(function (d) {
      return d.values instanceof Array ? d.values : [d];
    }, function (d) {
      return d.key;
    });
    bars.exit().transition().attr('y', this.y(0)).attr('height', 0).remove();
    bars.enter().append('rect').attr('class', function (d) {
      return 'wc-data-mark bar ' + d.key;
    }).style('clip-path', 'url(#' + this.clippath_id + ')').attr('y', this.y(0)).attr('height', 0).append('title');

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
    }).style('clip-path', 'url(#' + this.clippath_id + ')').attr('x', this.x(0)).attr('width', 0);

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
    }).style('clip-path', 'url(#' + this.clippath_id + ')').attr('y', this.y(0)).attr('height', 0);

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
    }).style('clip-path', 'url(#' + this.clippath_id + ')').attr('x', this.x(0)).attr('width', 0);

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
"use strict";

function init(data) {
  var context = this;
  var controls = context.controls;
  var config = context.config;
  if (d3.select(this.div).select(".loader").empty()) {
    d3.select(this.div).insert("div", ":first-child").attr("class", "loader").selectAll(".blockG").data(d3.range(8)).enter().append("div").attr("class", function (d) {
      return "blockG rotate" + (d + 1);
    });
  }
  context.wrap.attr("class", "wc-chart");
  if (this.chart_type) context.wrap.classed("wc-" + this.chart_type.toLowerCase(), true);

  context.setDefaults();

  var startup = function startup(data) {
    if (controls) {
      controls.targets.push(context);
      if (!controls.ready) controls.init(data);else controls.layout();
    }
    var meta_map = config.meta_map ? config.meta_map : data && data.length ? d3.keys(data[0]).map(function (m) {
      return { col: m, label: m };
    }) : [];

    context.metaMap = d3.scale.ordinal().domain(meta_map.map(function (m) {
      return m.col;
    })).range(meta_map.map(function (m) {
      return m.label;
    }));

    context.raw_data = data;
    var visible = window.$ ? $(context.div).is(':visible') : true;
    if (!visible) {
      var onVisible = setInterval(function () {
        var visible_now = $(context.div).is(':visible');
        if (visible_now) {
          context.layout();
          context.wrap.datum(context);
          var init_data = context.transformData(data);
          context.draw(init_data);
          clearInterval(onVisible);
        }
      }, 500);
    } else {
      context.layout();
      context.wrap.datum(context);
      context.draw();
    };
  }; //startup

  if (context.filepath && !data) {
    d3.csv(context.filepath, function (error, csv) {
      context.raw_data = csv;
      context.onDataError(error);
      context.checkRequired(csv);
      startup(csv);
    });
  } else startup(data);

  return this;
}

;
"use strict";

function layout() {
  this.svg = this.wrap.append("svg").attr({ "class": "wc-svg",
    "xmlns": "http://www.w3.org/2000/svg",
    "version": "1.1",
    "xlink": "http://www.w3.org/1999/xlink"
  }).append("g");
  // var svg = context.svg;
  var defs = this.svg.append("defs");
  defs.append("pattern").attr({
    "id": "diagonal-stripes",
    "x": 0, "y": 0, "width": 3, "height": 8, 'patternUnits': "userSpaceOnUse", 'patternTransform': "rotate(30)"
  }).append("rect").attr({ "x": "0", "y": "0", "width": "2", "height": "8", "style": "stroke:none; fill:black" });

  // defs.append("style").attr("type", "text/css").html(
  //   "@import url(http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,300,600,700);"+
  //   "*{font-family: 'Open Sans' Helvetica Arial sans-serif; font-size: inherit;}"+
  //   ".axis path.domain{fill: none; stroke: #ccc; shape-rendering: crispEdges; } .axis .tick line{stroke: #eee; shape-rendering: crispEdges; } .axis .tick text{font-size: .9em; }"
  // );

  var eid = typeof this.div === 'string' ? this.div.replace(/\./g, '') : d3.select(this.div).attr('class').replace(/\s/g, '');
  var setting_string = typeof btoa !== 'undefined' ? btoa(JSON.stringify(this.config)) : String(Math.random() * 100);
  var rand = Math.floor(Math.random() * setting_string.length);
  var setting_id = setting_string.slice(rand, rand + 5);
  this.clippath_id = 'plot-clip-' + eid + '-' + setting_id;

  defs.append('clipPath').attr('id', this.clippath_id).append('rect').attr('class', 'plotting-area');

  //y axis
  this.svg.append('g').attr('class', 'y axis').append('text').attr('class', 'axis-title').attr('transform', 'rotate(-90)').attr('dy', '.75em').attr('text-anchor', 'middle');
  //x axis
  this.svg.append('g').attr('class', 'x axis').append('text').attr('class', 'axis-title').attr('dy', '-.35em').attr('text-anchor', 'middle');
  //overlay
  this.svg.append('rect').attr('class', 'overlay').attr('opacity', 0);
  //add legend
  this.wrap.append('ul').attr('class', 'legend').append('span').attr('class', 'legend-title');

  d3.select(this.div).select('.loader').remove();

  this.events.onLayout(this);
}
'use strict';

Chart.prototype.makeLegend = function (scale, label, custom_data) {
  var context = this;
  var config = this.config;

  config.legend.mark = config.legend.mark ? config.legend.mark : config.marks.length && config.marks[0].type === 'bar' ? 'square' : config.marks.length ? config.marks[0].type : 'square';

  var legend_label = label ? label : typeof config.legend.label === 'string' ? config.legend.label : config.meta_map ? context.metaMap(context.config.color_by) : "";

  // label = !legend_label && !config.meta_map ? "" : label || label === "" ? label :
  //   context.metaMap.domain().indexOf(context.config.color_by) < 0 ? "" :
  //   context.metaMap(context.config.color_by);

  var legend = context.legend || context.wrap.select(".legend"); //.style("padding-left", context.margin.left+"px");
  scale = scale || context.colorScale;

  var legend_data = custom_data || scale.domain().slice(0).filter(function (f) {
    return f !== undefined && f !== null;
  }).map(function (m) {
    return { label: m, mark: config.legend.mark };
  });

  legend.select(".legend-title").text(legend_label).style("display", legend_label ? "inline" : "none");

  var leg_parts = legend.selectAll(".legend-item").data(legend_data, function (d) {
    return d.label + d.mark;
  });

  leg_parts.exit().remove();

  var new_parts = leg_parts.enter().append("li").attr("class", "legend-item");
  new_parts.append("span").attr("class", "legend-mark-text").style("color", function (d) {
    return scale(d.label);
  });
  new_parts.append("svg").attr("class", "legend-color-block");

  if (config.legend.order) leg_parts.sort(function (a, b) {
    return d3.ascending(config.legend.order.indexOf(a.label), config.legend.order.indexOf(b.label));
  });

  leg_parts.selectAll(".legend-color-block").select(".legend-mark").remove();
  leg_parts.selectAll(".legend-color-block").each(function (e) {
    var svg = d3.select(this);
    if (e.mark === "circle") svg.append("circle").attr({ "cx": ".5em", "cy": ".45em", "r": ".45em", "class": "legend-mark" });else if (e.mark === "line") svg.append("line").attr({ "x1": 0, "y1": ".5em", "x2": "1em", "y2": ".5em", "stroke-width": 2, "shape-rendering": "crispEdges", "class": "legend-mark" });else if (e.mark === "square") svg.append("rect").attr({ "height": "1em", "width": "1em", "class": "legend-mark" });
  });
  leg_parts.selectAll(".legend-color-block").select(".legend-mark").attr("fill", function (d) {
    return d.color || scale(d.label);
  }).attr("stroke", function (d) {
    return d.color || scale(d.label);
  }).each(function (e) {
    d3.select(this).attr(e.attributes);
  });

  new_parts.append("span").attr("class", "legend-label").text(function (d) {
    return context.metaMap.domain().indexOf(d.label) > -1 ? context.metaMap(d.label) : d.label;
  });

  leg_parts.on("mouseover", function (d) {
    if (!config.legend.highlight_on_hover) return;
    var fill = d3.select(this).select(".legend-mark").attr("fill");
    context.svg.selectAll(".wc-data-mark").attr("opacity", 0.1).filter(function (f) {
      return d3.select(this).attr("fill") === fill || d3.select(this).attr("stroke") === fill;
    }).attr("opacity", 1);
  }).on("mouseout", function (d) {
    if (!config.legend.highlight_on_hover) return;
    context.svg.selectAll(".wc-data-mark").attr("opacity", 1);
  });

  if (scale.domain().length > 1) legend.style("display", "block");else legend.style("display", "none");

  context.legend = legend;
};
"use strict";

Chart.prototype.multiply = function (raw, split_by, constrain_domains, order) {
  var context = this;
  var config = this.config;
  var wrap = context.wrap.classed("wc-layout wc-small-multiples", true).classed("wc-chart", false);
  var master_legend = wrap.append("ul").attr("class", "legend");
  var charts = [];
  if (raw) {
    context.raw_data = raw;
    goAhead(raw);
  } else {
    d3.csv(context.filepath, function (error, csv) {
      context.raw_data = csv;
      context.onDataError(error);
      context.checkRequired(csv);
      goAhead(csv);
    });
  };

  function goAhead(data) {
    var split_vals = d3.set(data.map(function (m) {
      return m[split_by];
    })).values().filter(function (f) {
      return f;
    });
    if (order) split_vals = split_vals.sort(function (a, b) {
      return d3.ascending(order.indexOf(a), order.indexOf(b));
    });

    var master_chart = new webCharts.Chart(context.wrap.node(), null, config, context.controls);
    master_chart.wrap.style("display", "none");

    split_vals.forEach(function (e) {
      var split_data = data.filter(function (f) {
        return f[split_by] === e;
      });
      var mchart = new webCharts.Chart(context.wrap.node(), null, config, context.controls);
      mchart.events = context.events;
      mchart.legend = master_legend;
      mchart.multiplied = { col: split_by, value: e };
      if (constrain_domains) mchart.on("datatransform", matchDomains);
      mchart.wrap.insert("span", "svg").attr("class", "wc-chart-title").text(e);
      charts.push({ subchart: mchart, subdata: split_data });
    });

    charts.forEach(function (e) {
      e.subchart.init(e.subdata);
    });

    function matchDomains(chart) {
      var allx = [];
      var ally = [];
      charts.forEach(function (e) {
        master_chart.transformData(e.subdata);
        allx.push(master_chart.x_dom);
        ally.push(master_chart.y_dom);
      });

      chart.config.color_dom = d3.set(data.map(function (m) {
        return m[config.color_by];
      })).values().filter(function (f) {
        return f && f !== "undefined";
      });
      // var allx = d3.merge(charts.map(function(m){return m.x_dom}));
      chart.x_dom = config.x_dom ? config.x_dom : config.x.type !== "ordinal" ? d3.extent(d3.merge(allx)) : d3.set(d3.merge(allx)).values();
      chart.y_dom = config.y_com ? config.y_dom : config.y.type !== "ordinal" ? d3.extent(d3.merge(ally)) : d3.set(d3.merge(ally)).values();
      // var ally = d3.merge(charts.map(function(m){return m.y_dom}));
      // chart.y_dom = config.y.type !== "ordinal" ? d3.extent(ally) : d3.set(ally).values();
    };
  }; //goAhead

  return this;
};
"use strict";

Chart.prototype.onDataError = function (error) {
    if (error) {
        d3.select(this.div).select(".loader").remove();
        this.wrap.append("div").attr("class", "alert alert-error alert-danger").text("Dataset could not be loaded.");
        throw new Error("Dataset could not be loaded. Check provided path (" + this.filepath + ").");
    };
};
"use strict";

Chart.prototype.resize = function () {
  var context = this;
  var config = this.config;
  // config.aspect = config.aspect || 1.33;
  var aspect2 = 1 / config.aspect;
  var div_width = parseInt(context.wrap.style('width'));
  var max_width = config.max_width ? config.max_width : div_width;
  var preWidth = !config.resizable ? config.width : !max_width || div_width < max_width ? div_width : context.raw_width;

  context.textSize(preWidth);

  context.margin = context.setMargins();

  var svg_width = config.x.type === "ordinal" && +config.range_band ? context.raw_width + context.margin.left + context.margin.right : !config.resizable ? context.raw_width : !config.max_width || div_width < config.max_width ? div_width : context.raw_width;
  context.plot_width = svg_width - context.margin.left - context.margin.right;
  var svg_height = config.y.type === "ordinal" && +config.range_band ? context.raw_height + context.margin.top + context.margin.bottom : !config.resizable && config.height ? config.height : !config.resizable ? svg_width * aspect2 : context.plot_width * aspect2;
  context.plot_height = svg_height - context.margin.top - context.margin.bottom;

  d3.select(context.svg.node().parentNode).attr("width", svg_width).attr("height", svg_height).select("g").attr("transform", "translate(" + context.margin.left + "," + context.margin.top + ")");

  context.svg.select(".overlay").attr("width", context.plot_width).attr("height", context.plot_height).classed("zoomable", config.zoomable);

  context.svg.select(".plotting-area").attr("width", context.plot_width).attr("height", context.plot_height + 1).attr("transform", "translate(0, -1)");

  context.xScaleAxis(config.x.type, context.plot_width, context.x_dom);
  context.yScaleAxis(config.y.type, context.plot_height, context.y_dom);

  var g_x_axis = context.svg.select(".x.axis");
  var g_y_axis = context.svg.select(".y.axis");
  var x_axis_label = g_x_axis.select(".axis-title");
  var y_axis_label = g_y_axis.select(".axis-title");

  if (config.x_location !== "top") g_x_axis.attr("transform", "translate(0," + context.plot_height + ")");
  g_x_axis.transition().call(context.xAxis);
  g_y_axis.transition().call(context.yAxis);
  x_axis_label.attr("transform", "translate(" + context.plot_width / 2 + "," + (context.margin.bottom - 2) + ")");
  y_axis_label.attr("x", -1 * context.plot_height / 2).attr("y", -1 * context.margin.left);

  //relabel axis ticks if metaMap says so
  context.svg.select(".x.axis.ordinal").selectAll(".tick text").text(function (d) {
    return context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d;
  });
  context.svg.select(".y.axis.ordinal").selectAll(".tick text").text(function (d) {
    return context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d;
  });

  context.drawGridlines();
  //update legend - margins need to be set first
  context.makeLegend();

  //update reference regions and reference lines
  context.updateRefRegions();
  context.updateRefLines();

  //draw linear regression line
  if (config.regression_line) {
    var reg_data = context.current_data.slice(0).filter(function (f) {
      return (+f.values.x || +f.values.x === 0) && (+f.values.y || +f.values.y === 0);
    });
    var all_x = reg_data.map(function (m) {
      return m.values.x;
    });
    var all_y = reg_data.map(function (m) {
      return m.values.y;
    });
    var lr = webCharts.dataOps.linearRegression(all_x, all_y);
    var max = context.x.domain()[1];
    var reg_line_data = [{ xs: [0, max], ys: [lr.intercept, max * lr.slope + lr.intercept] }];
    var reg_line = context.drawSimpleLines(reg_line_data, null, "regression-line").style("clip-path", "url(#" + context.clippath_id + ")").style("shape-rendering", "auto");
    reg_line.select("title").text("slope: " + d3.format(".2f")(lr.slope) + "\n" + "intercept: " + d3.format(".2f")(lr.intercept) + "\n" + "r2: " + d3.format(".2f")(lr.r2));
  } else {
    context.drawSimpleLines([], null, "regression-line");
  }

  //update the chart's specific marks
  //context.chart_type === "timeline" ? context.updateDataMarks() :
  context.updateDataMarks();

  //call .on("resize") function, if any
  context.events.onResize(this);
};
"use strict";

Chart.prototype.setColorScale = function () {
  var config = this.config;
  colordom = config.color_dom || d3.set(this.raw_data.map(function (m) {
    return m[config.color_by];
  })).values().filter(function (f) {
    return f && f !== "undefined";
  });

  if (config.legend.order) colordom = colordom.sort(function (a, b) {
    return d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b));
  });else colordom = colordom.sort(webCharts.dataOps.naturalSorter);

  this.colorScale = d3.scale.ordinal().domain(colordom).range(config.colors ? config.colors : webCharts.colors.nb);
};
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

	this.config.padding = this.config.padding !== 'undefined' ? this.config.padding : 0.3;
	this.config.outer_pad = this.config.outer_pad !== 'undefined' ? this.config.outer_pad : 0.1;

	this.config.resizable = this.config.resizable !== 'undefined' ? this.config.resizable : true;

	this.config.aspect = this.config.aspect || 1.33;
}
"use strict";

Chart.prototype.setMargins = function () {
  var context = this;
  var x_ticks = context.xAxis.tickFormat() ? context.x.domain().map(function (m) {
    return context.xAxis.tickFormat()(m);
  }) : context.x.domain();
  var y_ticks = context.yAxis.tickFormat() ? context.y.domain().map(function (m) {
    return context.yAxis.tickFormat()(m);
  }) : context.y.domain();

  var max_y_text_length = d3.max(y_ticks.map(function (m) {
    return String(m).length;
  }));
  if (this.config.y_format && this.config.y_format.indexOf("%") > -1) max_y_text_length += 1;
  max_y_text_length = Math.max(2, max_y_text_length);
  var x_label_on = this.config.x.label ? 1.5 : 0;
  var y_label_on = this.config.y.label ? 1.5 : 0.25;
  var font_size = parseInt(this.wrap.style("font-size"));
  var x_second = this.config.x2_interval ? 1 : 0;
  var y_margin = max_y_text_length * font_size * .5 + font_size * y_label_on * 1.5 || 8;
  var x_margin = font_size + font_size / 1.5 + font_size * x_label_on + font_size * x_second || 8;

  y_margin += 6;
  x_margin += 3;

  return { top: this.config.margin && this.config.margin.top ? this.config.margin.top : 8,
    right: this.config.margin && this.config.margin.right ? this.config.margin.right : 16,
    bottom: this.config.margin && this.config.margin.bottom ? this.config.margin.bottom : x_margin,
    left: this.config.margin && this.config.margin.left ? this.config.margin.left : y_margin };
};
"use strict";

Chart.prototype.textSize = function (width, height) {
  var context = this;
  var font_size = "14px";
  var point_size = 4;
  var stroke_width = 2;

  if (this.config.no_text_size) {
    font_size = context.config.font_size;
    point_size = context.config.point_size || 4;
    stroke_width = context.config.stroke_width || 2;
  } else if (width >= 600) {
    font_size = "14px";
    point_size = 4;
    stroke_width = 2;
  } else if (width > 450 && width < 600) {
    font_size = "12px";
    point_size = 3;
    stroke_width = 2;
  } else if (width > 300 && width < 450) {
    font_size = "10px";
    point_size = 2;
    stroke_width = 2;
  } else if (width <= 300) {
    font_size = "10px";
    point_size = 2;
    stroke_width = 1;
  }

  // context.svg.select("defs style").html(
  //   "@import url(http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,300,600,700);"+
  //   "*{font-family: 'Open Sans' Helvetica Arial sans-serif; font-size: "+font_size+";}"+
  //   ".axis path.domain{fill: none; stroke: #ccc; shape-rendering: crispEdges; } .axis .tick line{stroke: #eee; shape-rendering: crispEdges; } .axis .tick text{font-size: .9em; }"
  // );

  context.wrap.style("font-size", font_size);
  context.config.flex_point_size = point_size;
  context.config.flex_stroke_width = stroke_width;
};
"use strict";

Chart.prototype.transformData = function (raw, mark) {
  var context = this;
  var config = this.config;
  var x_behavior = config.x.behavior || "raw";
  var y_behavior = config.y.behavior || "raw";
  var sublevel = mark.type === "line" ? config.x.column : mark.type === 'bar' && mark.split ? mark.split : null;
  var dateConvert = d3.time.format(config.date_format);
  var totalOrder;
  // context.raw_data = raw;

  if (config.lengthen_columns) raw = webCharts.dataOps.lengthenRaw(raw, config.lengthen_columns);

  raw = mark.per && mark.per.length ? raw.filter(function (f) {
    return f[mark.per[0]];
  }) : raw;

  //run initial filter if specified
  if (config.initial_filter) {
    raw = raw.filter(function (f) {
      return config.initial_filter.vals.indexOf(f[config.initial_filter.col]) !== -1;
    });
  };

  //make sure data has x and y values
  if (config.x.column) raw = raw.filter(function (f) {
    return f[config.x.column];
  });
  if (config.y.column) raw = raw.filter(function (f) {
    return f[config.y.column];
  });

  if (config.x.type === "time") {
    raw = raw.filter(function (f) {
      return f[config.x.column] instanceof Date ? f[config.x.column] : dateConvert.parse(f[config.x.column]);
    });
    raw.forEach(function (e) {
      e[config.x.column] = e[config.x.column] instanceof Date ? e[config.x.column] : dateConvert.parse(e[config.x.column]);
    });
  };
  if (config.y.type === "time") {
    raw = raw.filter(function (f) {
      return f[config.y.column] instanceof Date ? f[config.y.column] : dateConvert.parse(f[config.y.column]);
    });
    raw.forEach(function (e) {
      e[config.y.column] = e[config.y.column] instanceof Date ? e[config.y.column] : dateConvert.parse(e[config.y.column]);
    });
  };

  if ((config.x.type === "linear" || config.x.type === "log") && config.x.column) {
    raw = raw.filter(function (f) {
      return config.x.summary !== 'count' && config.x.summary !== 'percent' ? +f[config.x.column] || +f[config.x.column] === 0 : f;
    });
  };
  if ((config.y.type === "linear" || config.y.type === "log") && config.y.column) {
    raw = raw.filter(function (f) {
      return config.y.summary !== 'count' && config.y.summary !== 'percent' ? +f[config.y.column] || +f[config.y.column] === 0 : f;
    });
  };

  var raw_nest;
  if (mark.type === "bar") {
    raw_nest = mark.arrange !== "stacked" ? makeNest(raw, sublevel) : makeNest(raw);
  } else if (config.x.summary === 'count' || config.y.summary === 'count') {
    raw_nest = makeNest(raw);
  }

  var raw_dom_x = config.x.summary === "cumulative" ? [0, raw.length] : config.x.type === "ordinal" ? d3.set(raw.map(function (m) {
    return m[config.x.column];
  })).values().filter(function (f) {
    return f;
  }) : mark.split && mark.arrange !== "stacked" ? d3.extent(d3.merge(raw_nest.nested.map(function (m) {
    return m.values.map(function (p) {
      return p.values.raw.length;
    });
  }))) : config.x.summary === "count" ? d3.extent(raw_nest.nested.map(function (m) {
    return m.values.raw.length;
  })) : d3.extent(raw.map(function (m) {
    return +m[config.x.column];
  }).filter(function (f) {
    return +f;
  }));

  var raw_dom_y = config.y.summary === "cumulative" ? [0, raw.length] : config.y.type === "ordinal" ? d3.set(raw.map(function (m) {
    return m[config.y.column];
  })).values().filter(function (f) {
    return f;
  }) : mark.split && mark.arrange !== "stacked" ? d3.extent(d3.merge(raw_nest.nested.map(function (m) {
    return m.values.map(function (p) {
      return p.values.raw.length;
    });
  }))) : config.y.summary === "count" ? d3.extent(raw_nest.nested.map(function (m) {
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
      var xy = config.x.type === 'linear' && config.x.bin ? 'x' : 'y';
      var quant = d3.scale.quantile().domain(d3.extent(entries.map(function (m) {
        return +m[config[xy].column];
      }))).range(d3.range(+config[xy].bin));

      entries.forEach(function (e) {
        e['wc_bin'] = quant(e[config[xy].column]);
      });

      this_nest.key(function (d) {
        return quant.invertExtent(d['wc_bin']);
      });
    } else this_nest.key(function (d) {
      return mark.per.map(function (m) {
        return d[m];
      }).join(" ");
    });

    if (sublevel) {
      this_nest.key(function (d) {
        return d[sublevel];
      });
      this_nest.sortKeys(function (a, b) {
        return config.x.type === "time" ? d3.ascending(new Date(a), new Date(b)) : config.x_dom ? d3.ascending(config.x_dom.indexOf(a), config.x_dom.indexOf(b)) : sublevel === config.color_by && config.legend.order ? d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)) : config.x.type === "ordinal" || config.y.type === "ordinal" ? webCharts.dataOps.naturalSorter(a, b) : d3.ascending(+a, +b);
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
      obj.x = config.x.type === "ordinal" ? r[0][config.x.column] : webCharts.dataOps.summarize(x_vals, config.x.summary);
      obj.y = config.y.type === "ordinal" ? r[0][config.y.column] : webCharts.dataOps.summarize(y_vals, config.y.summary);

      obj.x_q25 = config.error_bars && config.y.type === "ordinal" ? d3.quantile(x_vals, 0.25) : obj.x;
      obj.x_q75 = config.error_bars && config.y.type === "ordinal" ? d3.quantile(x_vals, 0.75) : obj.x;
      obj.y_q25 = config.error_bars ? d3.quantile(y_vals, 0.25) : obj.y;
      obj.y_q75 = config.error_bars ? d3.quantile(y_vals, 0.75) : obj.y;
      dom_xs.push([obj.x_q25, obj.x_q75, obj.x]);
      dom_ys.push([obj.y_q25, obj.y_q75, obj.y]);

      if (config.y.summary === "cumulative") {
        var interm = entries.filter(function (f) {
          return config.x.type === "time" ? new Date(f[config.x.column]) <= new Date(r[0][config.x.column]) : +f[config.x.column] <= +r[0][config.x.column];
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
      if (config.x.summary === "cumulative") {
        var interm = entries.filter(function (f) {
          return config.y.type === "time" ? new Date(f[config.y.column]) <= new Date(r[0][config.y.column]) : +f[config.y.column] <= +r[0][config.y.column];
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
    } else if (sublevel && config.y.summary === 'percent') {
      test.forEach(calcPercents);
    }

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

  function calcPercents(e) {
    var max = d3.sum(e.values.map(function (m) {
      return +m.values.y;
    }));
    e.values.forEach(function (v) {
      v.values.y = v.values.y / max;
    });
  };

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
  };

  var filt1_xs = [];
  var filt1_ys = [];
  if (context.filters.length) {
    context.filters.forEach(function (e) {
      filtered = filtered.filter(function (d) {
        return e.val === "All" ? d : e.val instanceof Array ? e.val.indexOf(d[e.col]) > -1 : d[e.col] === e.val;
      });
    });
    //get domain for all non-All values of first filter
    if (config.x.behavior === "firstfilter" || config.y.behavior === "firstfilter") {
      context.filters[0].choices.filter(function (f) {
        return f !== "All";
      }).forEach(function (e) {
        var perfilter = raw.filter(function (f) {
          return f[context.filters[0].col] === e;
        });
        var filt_nested = makeNest(perfilter, sublevel);
        filt1_xs.push(filt_nested.dom_x);
        filt1_ys.push(filt_nested.dom_y);
      });
    };
  };

  var filt1_dom_x = d3.extent(d3.merge(filt1_xs));
  var filt1_dom_y = d3.extent(d3.merge(filt1_ys));

  context.filtered_data = filtered;

  var current_nested = makeNest(filtered, sublevel);

  //extent of current data
  // if(mark.type === 'bar' && mark.arrange === 'stacked'){
  //   var flex_dom_x = makeNest(filtered).dom_x;
  //   var flex_dom_y = makeNest(filtered).dom_y;
  // }
  // else{
  var flex_dom_x = current_nested.dom_x;
  var flex_dom_y = current_nested.dom_y;

  if (mark.type === 'bar') {
    if (config.y.type === 'ordinal' && config.x.summary === 'count') config.x.domain = config.x.domain ? [0, config.x.domain[1]] : [0, null];else if (config.x.type === 'ordinal' && config.y.summary === 'count') config.y.domain = config.y.domain ? [0, config.y.domain[1]] : [0, null];
  }

  //several criteria must be met in order to use the 'firstfilter' domain
  var nonall = Boolean(context.filters.length && context.filters[0].val !== "All" && context.filters.slice(1).filter(function (f) {
    return f.val === "All";
  }).length === context.filters.length - 1);

  var pre_x_dom = !context.filters.length ? flex_dom_x : x_behavior === "raw" ? raw_dom_x : nonall && x_behavior === "firstfilter" ? filt1_dom_x : flex_dom_x;
  var pre_y_dom = !context.filters.length ? flex_dom_y : y_behavior === "raw" ? raw_dom_y : nonall && y_behavior === "firstfilter" ? filt1_dom_y : flex_dom_y;

  var x_dom = config.x_dom ? config.x_dom : config.x.type === "ordinal" && config.x.behavior === 'flex' ? d3.set(filtered.map(function (m) {
    return m[config.x.column];
  })).values() : config.x.type === "ordinal" ? d3.set(raw.map(function (m) {
    return m[config.x.column];
  })).values() : config.x_from0 ? [0, d3.max(pre_x_dom)] : pre_x_dom;

  var y_dom = config.y_dom ? config.y_dom : config.y.type === "ordinal" && config.y.behavior === 'flex' ? d3.set(filtered.map(function (m) {
    return m[config.y.column];
  })).values() : config.y.type === "ordinal" ? d3.set(raw.map(function (m) {
    return m[config.y.column];
  })).values() : config.y_from0 ? [0, d3.max(pre_y_dom)] : pre_y_dom;

  if (config.x.domain && (config.x.domain[0] || config.x.domain[0] === 0)) x_dom[0] = config.x.domain[0];
  if (config.x.domain && (config.x.domain[1] || config.x.domain[1] === 0)) x_dom[1] = config.x.domain[1];
  if (config.y.domain && (config.y.domain[0] || config.y.domain[0] === 0)) y_dom[0] = config.y.domain[0];
  if (config.y.domain && (config.y.domain[1] || config.y.domain[1] === 0)) y_dom[1] = config.y.domain[1];

  if (config.x.type === 'ordinal') config.x.order = totalOrder;
  if (config.y.type === 'ordinal') config.y.order = totalOrder;

  context.current_data = current_nested.nested;
  // context.events.onDatatransform(context);

  return { data: current_nested.nested, x_dom: x_dom, y_dom: y_dom };
};
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
"use strict";

Chart.prototype.updateRefLines = function () {
  //define/draw reference lines, if any
  var config = this.config;
  var context = this;
  var ref_line_data = !config.reference_lines ? [] : config.reference_lines.map(function (m) {
    var xx = m.x;
    var yy = m.y;
    if (config.x.type === "time" && m.x) xx = d3.time.format(config.date_format).parse(m.x);
    if (config.y.type === "time" && m.y) yy = d3.time.format(config.date_format).parse(m.y);
    return { xs: !m.x && +m.x !== 0 ? [0, context.plot_width, true] : [xx, xx], ys: !m.y && +m.y !== 0 ? [0, context.plot_height, true] : [yy, yy], attributes: m.attributes };
  });
  var ref_lines = context.drawSimpleLines(ref_line_data).style("clip-path", "url(#" + context.clippath_id + ")");
};
"use strict";

Chart.prototype.updateRefRegions = function () {
  //define/draw reference regions, if any
  var config = this.config;
  var context = this;
  var ref_region_data = context.config.reference_regions.slice(0).map(function (m) {
    var xx = m.x;
    var yy = m.y;
    if (config.x.type === "time") if (m.x) xx = m.x.map(function (w) {
      return d3.time.format(config.date_format).parse(w);
    });else xx = context.x_dom;
    if (config.y.type === "time") if (m.y) yy = m.y.map(function (w) {
      return d3.time.format(config.date_format).parse(w);
    });else yy = context.y_dom;
    return { xs: !xx ? [1, context.plot_width] : xx, ys: !m.y ? [0, context.plot_height - 1] : yy, attributes: m.attributes };
  });
  context.drawRects(ref_region_data).style("clip-path", "url(#" + context.clippath_id + ")");
};
"use strict";

Chart.prototype.xScaleAxis = function (type, max_range, domain) {
  //domain = type === "percent" ? [0,1] : domain;
  var config = this.config;

  if (type === "log") var x = d3.scale.log();else if (type === "ordinal") var x = d3.scale.ordinal();else if (type === "time") var x = d3.time.scale();else var x = d3.scale.linear();

  x.domain(domain);
  if (type === "ordinal") x.rangeBands([0, +max_range], config.padding, config.outer_pad);else x.range([0, +max_range]).clamp(Boolean(config.x_clamp));

  var format = config.x.format ? config.x.format : type === "percent" ? "0%" : type === "time" ? "%x" : ".0f";
  var tick_count = Math.max(2, Math.min(max_range / 80, 8));
  var xAxis = d3.svg.axis().scale(x).orient(config.x.location).ticks(tick_count).tickFormat(type === "ordinal" ? null : type === "time" ? d3.time.format(format) : d3.format(format)).tickValues(config.x.ticks ? config.x.ticks : null).innerTickSize(6).outerTickSize(3);

  this.svg.select("g.x.axis").attr("class", "x axis " + type);
  this.x = x;
  this.xAxis = xAxis;
};
"use strict";

Chart.prototype.yScaleAxis = function (type, max_range, domain) {
  //domain = type === "percent" ? [0,1] : domain;
  var config = this.config;
  var y;
  if (type === "log") var y = d3.scale.log();else if (type === "ordinal") var y = d3.scale.ordinal();else if (type === "time") var y = d3.time.scale();else var y = d3.scale.linear();

  y.domain(domain);
  if (type === "ordinal") y.rangeBands([+max_range, 0], config.padding, config.outer_pad);else y.range([+max_range, 0]).clamp(Boolean(config.y_clamp));

  var y_format = config.y.format ? config.y.format : config.y.summary === "percent" ? "0%" : ".0f";
  var tick_count = Math.max(2, Math.min(max_range / 80, 8));
  var yAxis = d3.svg.axis().scale(y).orient("left").ticks(tick_count).tickFormat(type === "ordinal" ? null : type === "time" ? d3.time.format(y_format) : d3.format(y_format)).tickValues(config.y.ticks ? config.y.ticks : null).innerTickSize(6).outerTickSize(3);

  this.svg.select("g.y.axis").attr("class", "y axis " + type);

  this.y = y;
  this.yAxis = yAxis;
};
webCharts.webTable = function(element, filepath, config, controls, callback){
  this.chart_type = "webTable";
  this.required_cols = config.cols || [];
  Chart.call(this, element, filepath, config, controls, callback);

  return this;
};//webTable
webCharts.webTable.prototype = Object.create(webCharts.Chart.prototype);
webCharts.webTable.prototype.layout = function(){
  var config = this.config;
  d3.select(this.div).select(".loader").remove();
  var table = this.wrap.append("table");
  table.append("thead").append("tr").attr("class", "headers");
  this.table = table;
  this.events.onLayout(this);
};//layout

webCharts.webTable.prototype.transformData = function(data){
  if(!data)
      return;
  var context = this;
    var config = context.config;
    var colList = config.cols || d3.keys(data[0]);
    if(config.keep){
      config.keep.forEach(function(e){
          if(colList.indexOf(e) === -1)
          colList.unshift(e)
      });
    };
  context.config.cols = colList;

  var filtered = data;

    if(context.filters.length){
      context.filters.forEach(function(e){
        var is_array = e.val instanceof Array;
          filtered = filtered.filter(function(d){
            if(is_array)
                return e.val.indexOf(d[e.col]) !== -1;
            else
                return e.val !== "All" ? d[e.col] === e.val : d
          });
        });
    };

    var slimmed = d3.nest()
      .key(function(d){
          if(config.row_per){
            var test = config.row_per.map(function(m){return d[m]});
            return  test.join(" ");
          }
          else
            return d;
      })
      .rollup(function(r){
          if(config.dataManipulate)
            r = config.dataManipulate(r);
          var nuarr = r.map(function(m){
            var arr = [];
            for(x in m){
              arr.push({col: x, text: m[x]});
            };
          arr.sort(function(a,b){
                return config.cols.indexOf(a.col) - config.cols.indexOf(b.col);
            });
            return {cells: arr, raw: m};
          });
        return nuarr;
      })
      .entries(filtered);

  context.current_data = slimmed;

  context.events.onDatatransform(context);

  return context.current_data;
};//transformData

webCharts.webTable.prototype.draw = function(processed_data, raw_data){
  var context = this;
  var raw = raw_data ? raw_data : context.raw_data;
  var config = context.config;
  var data = processed_data || context.transformData(raw);
  context.wrap.datum(data)
  var table = context.table;

  var col_list = config.cols.length ? config.cols : data.length ? d3.keys(data[0].values[0].raw) : [];

  if(config.bootstrap)
    table.classed("table", true);
  else
    table.classed("table", false);
  //make a header
  var header_data = !data.length ? [] : config.headers && config.headers.length ? config.headers : col_list;
  headerRow = table.select("thead").select("tr.headers");
  var ths = headerRow.selectAll("th").data(header_data);
  ths.exit().remove();
  ths.enter().append("th");
  ths.text(function(d){return d});

  //add table rows (1 per svg row)
  var tbodies = table.selectAll("tbody").data(data, function(d,i){return d.key});
  tbodies.exit().remove();
  tbodies.enter().append("tbody");
  //sort tbodies by row_per
  if(config.row_per){
    var rev_order = config.row_per.slice(0).reverse();
    rev_order.forEach(function(e){
        tbodies.sort(function(a,b){
          return a.values[0].raw[e] -  b.values[0].raw[e];
        });
    });
  };
  var rows = tbodies.selectAll("tr").data(function(d){ return d.values });
  rows.exit().remove();
  rows.enter().append("tr");
  //sort rows by criteria in sort_rows
  if(config.sort_rows){
    var row_order = config.sort_rows.slice(0)//.reverse();
    row_order.unshift("0");

    rows.sort(function(a,b){
        var i = 0;
        while(i < row_order.length && a.raw[row_order[i]] == b.raw[row_order[i]] ){
          i++;
        }
        if(a.raw[row_order[i]] < b.raw[row_order[i]]) return -1;
        if(a.raw[row_order[i]] > b.raw[row_order[i]]) return 1;
        return 0;
    });
  };

  //add columns (once per row)
  var tds = rows.selectAll("td").data(function(d){return d.cells.filter(function(f){
    return col_list.indexOf(f.col) > -1;
  })});
  tds.exit().remove();
  tds.enter().append("td");
  tds.attr("class", function(d){return d.col})
  if(config.as_html)
    tds.html(function(d){return d.text});
  else
    tds.text(function(d){return d.text});

  if(config.row_per){
    rows.filter(function(f,i){
        return i > 0
    }).selectAll("td").filter(function(f){
        return config.row_per.indexOf(f.col) > -1
    }).text("");
  };

  if(config.data_tables){
    if(jQuery() && jQuery().dataTable){
      var dt_config = config.data_tables;
      dt_config.searching = config.searchable ? config.searchable : false;
      $(table.node()).dataTable(dt_config);
      var print_btn = $(".print-btn", wrap.node());
      print_btn.addClass("pull-right");
      $(".dataTables_wrapper").prepend( print_btn )
    }
    else
      throw new Error("dataTables jQuery plugin not available");
  };

  if(context.callback && context.callback[1]){
    //if an array of callbacks, call them all
      if(context.callback instanceof Array)
      context.callback.forEach(function(e,i){ if(i >= 1) e(context); });
  };
  context.events.onDraw(this);
};

 return webCharts; }));