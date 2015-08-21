(function (root, factory) {  if(typeof define === "function" && define.amd) {    define(["d3"], factory);  } else if(typeof module === "object" && module.exports) {    module.exports = factory(require("d3"));  } else {    root.webCharts = factory(root.d3);  }}(this, function(d3){
var webCharts = { version: '0.2' };

webCharts.multiply = function (chart, data, split_by, order) {
  var config = chart.config;
  var wrap = chart.wrap.classed('wc-layout wc-small-multiples', true).classed('wc-chart', false);
  var master_legend = wrap.append('ul').attr('class', 'legend');

  function goAhead(data) {
    var split_vals = d3.set(data.map(function (m) {
      return m[split_by];
    })).values().filter(function (f) {
      return f;
    });
    if (order) {
      split_vals = split_vals.sort(function (a, b) {
        return d3.ascending(order.indexOf(a), order.indexOf(b));
      });
    }

    split_vals.forEach(function (e) {
      var mchart = webCharts.createChart(chart.wrap.node(), config, chart.controls);
      mchart.events = chart.events;
      mchart.legend = master_legend;
      mchart.filters.unshift({ col: split_by, val: e, choices: split_vals });
      mchart.wrap.insert('span', 'svg').attr('class', 'wc-chart-title').text(e);
      mchart.init(data);
    });
  }

  goAhead(data);
};

webCharts.dataOps = {
  getValType: getValType,
  lengthenRaw: lengthenRaw,
  naturalSorter: naturalSorter,
  summarize: summarize
};

function getValType(data, variable) {
  var var_vals = d3.set(data.map(function (m) {
    return m[variable];
  })).values();
  var vals_numbers = var_vals.filter(function (f) {
    return +f || f === 0;
  });

  if (var_vals.length === vals_numbers.length && var_vals.length > 4) {
    return 'continuous';
  } else {
    return 'categorical';
  }
}

function lengthenRaw(data, columns) {
  var my_data = [];

  data.forEach(function (e) {

    columns.forEach(function (g) {
      var obj = Object.create(e);
      obj.wc_category = g;
      obj.wc_value = e[g];
      my_data.push(obj);
    });
  });

  return my_data;
}

function naturalSorter(a, b) {
  //http://www.davekoelle.com/files/alphanum.js
  function chunkify(t) {
    var tz = [];
    var x = 0,
        y = -1,
        n = 0,
        i = undefined,
        j = undefined;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      var m = i == 46 || i >= 48 && i <= 57;
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

  for (var x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      var c = Number(aa[x]),
          d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      } else {
        return aa[x] > bb[x] ? 1 : -1;
      }
    }
  }

  return aa.length - bb.length;
}

function summarize(vals, operation) {
  var nvals = vals.filter(function (f) {
    return +f || +f === 0;
  }).map(function (m) {
    return +m;
  });

  if (operation === 'cumulative') {
    return null;
  }

  var stat = operation || 'mean';
  var mathed = stat === 'count' ? vals.length : stat === 'percent' ? vals.length : d3[stat](nvals);

  return mathed;
}

var chartProto = {
  raw_data: [],
  config: {}
};

Object.defineProperties(chartProto, {
  'checkRequired': { value: checkRequired },
  'consolidateData': { value: consolidateData },
  'draw': { value: draw },
  'drawArea': { value: drawArea },
  'drawBars': { value: drawBars },
  'drawGridlines': { value: drawGridlines },
  'drawLines': { value: drawLines },
  'drawPoints': { value: drawPoints },
  'init': { value: init },
  'layout': { value: layout },
  'makeLegend': { value: makeLegend },
  'resize': { value: resize },
  'setColorScale': { value: setColorScale },
  'setDefaults': { value: setDefaults },
  'setMargins': { value: setMargins },
  'textSize': { value: textSize },
  'transformData': { value: transformData },
  'updateDataMarks': { value: updateDataMarks },
  'xScaleAxis': { value: xScaleAxis },
  'yScaleAxis': { value: yScaleAxis }
});

/** Checks raw dataset against the configuration object for the chart and throws errors if the configuration references values that are not present. Called once upon initialization of chart.
*@memberof chart
*@method checkRequired
*/

function checkRequired() {
  var _this = this;

  var colnames = d3.keys(this.raw_data[0]);
  var requiredVars = [];
  var requiredCols = [];
  if (this.config.x.column) {
    requiredVars.push('this.config.x.column');
    requiredCols.push(this.config.x.column);
  }
  if (this.config.y.column) {
    requiredVars.push('this.config.y.column');
    requiredCols.push(this.config.y.column);
  }
  if (this.config.color_by) {
    requiredVars.push('this.config.color_by');
    requiredCols.push(this.config.color_by);
  }
  this.config.marks.forEach(function (e, i) {
    if (e.per && e.per.length) {
      e.per.forEach(function (p, j) {
        requiredVars.push('this.config.marks[' + i + '].per[' + j + ']');
        requiredCols.push(p);
      });
    }
    if (e.split) {
      requiredVars.push('this.config.marks[' + i + '].split');
      requiredCols.push(e.split);
    }
  });

  requiredCols.forEach(function (e, i) {
    if (colnames.indexOf(e) < 0) {
      d3.select(_this.div).select('.loader').remove();
      _this.wrap.append('div').style('color', 'red').html('The value "' + e + '" for the <code>' + requiredVars[i] + '</code> setting does not match any column in the provided dataset.');
      throw new Error('Error in settings object: The value "' + e + '" for the ' + requiredVars[i] + ' setting does not match any column in the provided dataset.');
    }
  });
}

function consolidateData(raw) {
  var _this2 = this;

  var config = this.config;
  var all_data = [];
  var all_x = [];
  var all_y = [];

  this.setDefaults();

  config.marks.forEach(function (e, i) {
    if (e.type !== 'bar') {
      e.arrange = null;
      e.split = null;
    }
    var mark_info = e.per ? _this2.transformData(raw, e) : { data: [], x_dom: [], y_dom: [] };

    all_data.push(mark_info.data);
    all_x.push(mark_info.x_dom);
    all_y.push(mark_info.y_dom);
    _this2.marks[i] = { type: e.type, per: e.per, data: mark_info.data, split: e.split, arrange: e.arrange, order: e.order, summarizeX: e.summarizeX, summarizeY: e.summarizeY, tooltip: e.tooltip, attributes: e.attributes };
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
  } else if (config.marks.map(function (m) {
    return m.summarizeX === 'percent';
  }).indexOf(true) > -1) this.x_dom = [0, 1];else this.x_dom = d3.extent(d3.merge(all_x));

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
  } else if (config.marks.map(function (m) {
    return m.summarizeY === 'percent';
  }).indexOf(true) > -1) this.y_dom = [0, 1];else this.y_dom = d3.extent(d3.merge(all_y));
}

function draw(raw_data, processed_data) {
  var context = this;
  var raw = raw_data ? raw_data : this.raw_data ? this.raw_data : [];
  var config = this.config;
  var aspect2 = 1 / config.aspect;
  var data = processed_data || this.consolidateData(raw);

  this.wrap.datum(data);

  var div_width = parseInt(this.wrap.style('width'));

  this.setColorScale();

  var max_width = config.max_width ? config.max_width : div_width;
  this.raw_width = config.x.type === "ordinal" && +config.range_band ? (+config.range_band + config.range_band * config.padding) * this.x_dom.length : config.resizable ? max_width : config.width ? config.width : div_width;
  this.raw_height = config.y.type === "ordinal" && +config.range_band ? (+config.range_band + config.range_band * config.padding) * this.y_dom.length : config.resizable ? max_width * aspect2 : config.height ? config.height : div_width * aspect2;

  var pseudo_width = this.svg.select(".overlay").attr("width") ? this.svg.select(".overlay").attr("width") : this.raw_width;
  var pseudo_height = this.svg.select(".overlay").attr("height") ? this.svg.select(".overlay").attr("height") : this.raw_height;

  this.svg.select(".x.axis").select(".axis-title").text(function () {
    return typeof config.x.label === "string" ? config.x.label : typeof config.x.label === "function" ? config.x.label(context) : null;
  });
  this.svg.select(".y.axis").select(".axis-title").text(function () {
    return typeof config.y.label === "string" ? config.y.label : typeof config.y.label === "function" ? config.y.label(context) : null;
  });

  this.xScaleAxis(pseudo_width);
  this.yScaleAxis(pseudo_height);

  if (config.resizable) {
    d3.select(window).on('resize.' + context.element + context.id, function () {
      context.resize();
    });
  } else {
    d3.select(window).on('resize.' + context.element + context.id, null);
  }

  this.events.onDraw.call(this);
  this.resize();
}

function drawArea(area_drawer, area_data, datum_accessor, class_match, bind_accessor) {
  if (class_match === undefined) class_match = 'chart-area';

  var _this3 = this;

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
    return d_attr ? _this3.colorScale(d_attr[_this3.config.color_by]) : null;
  }).attr('fill-opacity', this.config.fill_opacity || this.config.fill_opacity === 0 ? this.config.fill_opacity : 0.3).transition().attr('d', area_drawer);

  return area_grps;
}

function drawBars(marks) {
  var _this4 = this;

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
    (function () {
      old_bar_groups.selectAll('.bar').transition().attr('y', _this4.y(0)).attr('height', 0);
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
      bars.exit().transition().attr('y', _this4.y(0)).attr('height', 0).remove();
      bars.enter().append('rect').attr('class', function (d) {
        return 'wc-data-mark bar ' + d.key;
      }).style('clip-path', 'url(#' + _this4.id + ')').attr('y', _this4.y(0)).attr('height', 0).append('title');

      bars.attr('stroke', function (d) {
        return _this4.colorScale(d.values.raw[0][config.color_by]);
      }).attr('fill', function (d) {
        return _this4.colorScale(d.values.raw[0][config.color_by]);
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

      var xformat = config.marks.map(function (m) {
        return m.summarizeX === 'percent';
      }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.x.format);
      var yformat = config.marks.map(function (m) {
        return m.summarizeY === 'percent';
      }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.y.format);
      bars.select('title').text(function (d) {
        var tt = d.tooltip || '';
        return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
          return d.values.raw[0][orig];
        });
      });

      bars.transition().attr('x', function (d) {
        var position = undefined;
        if (!d.arrange || d.arrange === 'stacked') return _this4.x(d.values.x);else if (d.arrange === 'nested') {
          position = d.subcats.indexOf(d.key);
          var offset = position ? _this4.x.rangeBand() / (d.subcats.length * position * 0.5) / 2 : _this4.x.rangeBand() / 2;
          return _this4.x(d.values.x) + _this4.x.rangeBand() / 2 - offset;
        } else {
          position = d.subcats.indexOf(d.key);
          return _this4.x(d.values.x) + _this4.x.rangeBand() / d.subcats.length * position;
        }
      }).attr('y', function (d) {
        if (d.arrange !== 'stacked') return _this4.y(d.values.y);else return _this4.y(d.values.start);
      }).attr('width', function (d) {
        if (d.arrange === 'stacked') return _this4.x.rangeBand();else if (d.arrange === 'nested') {
          var position = d.subcats.indexOf(d.key);
          return position ? _this4.x.rangeBand() / (d.subcats.length * position * 0.5) : _this4.x.rangeBand();
        } else return _this4.x.rangeBand() / d.subcats.length;
      }).attr('height', function (d) {
        return _this4.y(0) - _this4.y(d.values.y);
      });
    })();
  } else if (config.y.type === 'ordinal') {
    (function () {
      old_bar_groups.selectAll('.bar').transition().attr('x', _this4.x(0)).attr('width', 0);
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
      bars.exit().transition().attr('x', _this4.x(0)).attr('width', 0).remove();
      bars.enter().append('rect').attr('class', function (d) {
        return 'wc-data-mark bar ' + d.key;
      }).style('clip-path', 'url(#' + _this4.id + ')').attr('x', _this4.x(0)).attr('width', 0).append('title');

      bars.attr('stroke', function (d) {
        return _this4.colorScale(d.values.raw[0][config.color_by]);
      }).attr('fill', function (d) {
        return _this4.colorScale(d.values.raw[0][config.color_by]);
      }).attr('fill-opacity', config.fill_opacity || 0.8);

      bars.each(function (d) {
        var mark = d3.select(this.parentNode.parentNode).datum();
        d.arrange = mark.split ? mark.arrange : null;
        d.subcats = d3.set(rawData.map(function (m) {
          return m[mark.split];
        })).values();
        d.tooltip = mark.tooltip;
      });

      var xformat = config.marks.map(function (m) {
        return m.summarizeX === 'percent';
      }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.x.format);
      var yformat = config.marks.map(function (m) {
        return m.summarizeY === 'percent';
      }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.y.format);
      bars.select('title').text(function (d) {
        var tt = d.tooltip || '';
        return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
          return d.values.raw[0][orig];
        });
      });

      bars.transition().attr('x', function (d) {
        if (d.arrange === 'stacked') return _this4.x(d.values.start);else return _this4.x(0);
      }).attr('y', function (d) {
        if (d.arrange !== 'grouped') return _this4.y(d.values.y);else {
          var position = d.subcats.indexOf(d.key);
          return _this4.y(d.values.y) + _this4.y.rangeBand() / d.subcats.length * position;
        }
      }).attr('width', function (d) {
        return _this4.x(d.values.x);
      }).attr('height', function (d) {
        if (config.y.type === 'quantile') return 20;else if (d.arrange === 'stacked') return _this4.y.rangeBand();else if (d.arrange === 'nested') {
          var position = d.subcats.indexOf(d.key);
          return position ? _this4.y.rangeBand() / (sibs.length * position * 0.75) : _this4.y.rangeBand();
        } else return _this4.y.rangeBand() / d.subcats.length;
      });
    })();
  } else if (config.x.type === 'linear' && config.x.bin) {
    (function () {
      old_bar_groups.selectAll('.bar').transition().attr('y', _this4.y(0)).attr('height', 0);
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
      bars.exit().transition().attr('y', _this4.y(0)).attr('height', 0).remove();
      bars.enter().append('rect').attr('class', function (d) {
        return 'wc-data-mark bar ' + d.key;
      }).style('clip-path', 'url(#' + _this4.id + ')').attr('y', _this4.y(0)).attr('height', 0).append('title');

      bars.attr('stroke', function (d) {
        return _this4.colorScale(d.values.raw[0][config.color_by]);
      }).attr('fill', function (d) {
        return _this4.colorScale(d.values.raw[0][config.color_by]);
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
        d.tooltip = mark.tooltip;
      });

      var xformat = config.marks.map(function (m) {
        return m.summarizeX === 'percent';
      }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.x.format);
      var yformat = config.marks.map(function (m) {
        return m.summarizeY === 'percent';
      }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.y.format);
      bars.select('title').text(function (d) {
        var tt = d.tooltip || '';
        return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
          return d.values.raw[0][orig];
        });
      });

      bars.transition().attr('x', function (d) {
        return _this4.x(d.rangeLow);
      }).attr('y', function (d) {
        if (d.arrange !== 'stacked') return _this4.y(d.values.y);else return _this4.y(d.values.start);
      }).attr('width', function (d) {
        return _this4.x(d.rangeHigh) - _this4.x(d.rangeLow);
      }).attr('height', function (d) {
        return _this4.y(0) - _this4.y(d.values.y);
      });
    })();
  } else if (config.y.type === 'linear' && config.y.bin) {
    (function () {
      old_bar_groups.selectAll('.bar').transition().attr('x', _this4.x(0)).attr('width', 0);
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
      bars.exit().transition().attr('x', _this4.x(0)).attr('width', 0).remove();
      bars.enter().append('rect').attr('class', function (d) {
        return 'wc-data-mark bar ' + d.key;
      }).style('clip-path', 'url(#' + _this4.id + ')').attr('x', _this4.x(0)).attr('width', 0).append('title');

      bars.attr('stroke', function (d) {
        return _this4.colorScale(d.values.raw[0][config.color_by]);
      }).attr('fill', function (d) {
        return _this4.colorScale(d.values.raw[0][config.color_by]);
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
        d.tooltip = mark.tooltip;
      });

      var xformat = config.marks.map(function (m) {
        return m.summarizeX === 'percent';
      }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.x.format);
      var yformat = config.marks.map(function (m) {
        return m.summarizeY === 'percent';
      }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.y.format);
      bars.select('title').text(function (d) {
        var tt = d.tooltip || '';
        return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
          return d.values.raw[0][orig];
        });
      });

      bars.transition().attr('x', function (d) {
        if (d.arrange === 'stacked') return _this4.x(d.values.start);else {
          return _this4.x(0);
        }
      }).attr('y', function (d) {
        return _this4.y(d.rangeHigh);
      }).attr('width', function (d) {
        return _this4.x(d.values.x);
      }).attr('height', function (d) {
        return _this4.y(d.rangeLow) - _this4.y(d.rangeHigh);
      });
    })();
  } else {
    old_bar_groups.selectAll('.bar').transition().attr('y', this.y(0)).attr('height', 0);
    old_bar_groups.transition().remove();
    bar_supergroups.remove();
  }
}

;

/** Draws gridlines at x and or y tick mark locations, as defined by the 'gridlines' property in the configuration object
*@memberof chart
*@method drawGridlines
*/

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

/** Function that handles drawing lines (<path> elements) as defined by marks with type='line'
*@memberof chart
*@method drawLines
*@param {array} marks the members of {@link webCharts~chart.marks chart.marks} with type='line'
*/

function drawLines(marks) {
  var _this5 = this;

  var config = this.config;
  var line = d3.svg.line().interpolate(config.interpolate).x(function (d) {
    return config.x.type === 'linear' ? _this5.x(+d.values.x) : config.x.type === 'time' ? _this5.x(new Date(d.values.x)) : _this5.x(d.values.x) + _this5.x.rangeBand() / 2;
  }).y(function (d) {
    return config.y.type === 'linear' ? _this5.y(+d.values.y) : config.y.type === 'time' ? _this5.y(new Date(d.values.y)) : _this5.y(d.values.y) + _this5.y.rangeBand() / 2;
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
    return _this5.colorScale(d[0].values.raw[0][config.color_by]);
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

/** Function that handles drawing points (<circle> elements) as defined by marks with type='circle'
*@memberof chart
*@method drawPoints
*@param {array} marks the members of {@link webCharts~chart.marks chart.marks} with type='circle'
*/

function drawPoints(marks) {
  var _this6 = this;

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
    return _this6.colorScale(d.values.raw[0][config.color_by]);
  }).attr('stroke', function (d) {
    return _this6.colorScale(d.values.raw[0][config.color_by]);
  }).transition().attr('r', config.point_size ? config.point_size : config.flex_point_size).attr('cx', function (d) {
    var x_pos = _this6.x(d.values.x) || 0;
    return _this6.x.type === 'ordinal' ? x_pos + _this6.x.rangeBand() / 2 : x_pos;
  }).attr('cy', function (d) {
    var y_pos = _this6.y(d.values.y) || 0;
    return config.y.type === 'ordinal' ? y_pos + _this6.y.rangeBand() / 2 : y_pos;
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

function init(data) {
  var _this7 = this;

  if (d3.select(this.div).select('.loader').empty()) {
    d3.select(this.div).insert('div', ':first-child').attr('class', 'loader').selectAll('.blockG').data(d3.range(8)).enter().append('div').attr('class', function (d) {
      return 'blockG rotate' + (d + 1);
    });
  }
  this.wrap.attr('class', 'wc-chart');

  this.setDefaults();

  var startup = function startup(data) {
    //connect this chart and its controls, if any
    if (_this7.controls) {
      _this7.controls.targets.push(_this7);
      if (!_this7.controls.ready) {
        _this7.controls.init(data);
      } else {
        _this7.controls.layout();
      }
    }

    _this7.raw_data = data;

    //make sure container is visible (has height and width) before trying to initialize
    var visible = d3.select(_this7.div).property('offsetWidth') > 0 && d3.select(_this7.div).property('offsetHeight') > 0;
    if (!visible) {
      var onVisible = setInterval(function (i) {
        var visible_now = d3.select(_this7.div).property('offsetWidth') > 0 && d3.select(_this7.div).property('offsetHeight') > 0;
        if (visible_now) {
          _this7.layout();
          _this7.wrap.datum(_this7);
          _this7.draw();
          clearInterval(onVisible);
        }
      }, 500);
    } else {
      _this7.layout();
      _this7.wrap.datum(_this7);
      _this7.draw();
    }
  };

  startup(data);

  return this;
}

/** Sets up the SVG that serves as the chart "canvas" and its static child elements. Happens once immediately after {@link webCharts~chart.init chart.init}
*@memberof chart
*@method layout
*/

function layout() {
  this.svg = this.wrap.append("svg").attr({ "class": "wc-svg",
    "xmlns": "http://www.w3.org/2000/svg",
    "version": "1.1",
    "xlink": "http://www.w3.org/1999/xlink"
  }).append("g");

  var defs = this.svg.append("defs");
  defs.append("pattern").attr({
    "id": "diagonal-stripes",
    "x": 0, "y": 0, "width": 3, "height": 8, 'patternUnits': "userSpaceOnUse", 'patternTransform': "rotate(30)"
  }).append("rect").attr({ "x": "0", "y": "0", "width": "2", "height": "8", "style": "stroke:none; fill:black" });

  defs.append('clipPath').attr('id', this.id).append('rect').attr('class', 'plotting-area');

  //y axis
  this.svg.append('g').attr('class', 'y axis').append('text').attr('class', 'axis-title').attr('transform', 'rotate(-90)').attr('dy', '.75em').attr('text-anchor', 'middle');
  //x axis
  this.svg.append('g').attr('class', 'x axis').append('text').attr('class', 'axis-title').attr('dy', '-.35em').attr('text-anchor', 'middle');
  //overlay
  this.svg.append('rect').attr('class', 'overlay').attr('opacity', 0).attr('fill', 'none').style('pointer-events', 'all');
  //add legend
  this.wrap.append('ul').attr('class', 'legend').append('span').attr('class', 'legend-title');

  d3.select(this.div).select('.loader').remove();

  this.events.onLayout.call(this);
}

/** Draws legend for the chart
*@memberof chart
*@method makeLegend
*@param {d3.scale} [scale=scale returned by {@link webCharts~chart~setColorScale chart.setColorScale}] color scale to use in the legend
*@param {string} [label] label for the legend
*/

function makeLegend() {
  var scale = arguments.length <= 0 || arguments[0] === undefined ? this.colorScale : arguments[0];
  var label = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  var custom_data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var config = this.config;

  config.legend.mark = config.legend.mark ? config.legend.mark : config.marks.length && config.marks[0].type === 'bar' ? 'square' : config.marks.length ? config.marks[0].type : 'square';

  var legend_label = label ? label : typeof config.legend.label === 'string' ? config.legend.label : '';

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
  new_parts.append('svg').attr('class', 'legend-color-block').attr('width', '1.1em').attr('height', '1.1em');

  if (config.legend.order) {
    leg_parts.sort(function (a, b) {
      return d3.ascending(config.legend.order.indexOf(a.label), config.legend.order.indexOf(b.label));
    });
  }

  leg_parts.selectAll('.legend-color-block').select('.legend-mark').remove();
  leg_parts.selectAll('.legend-color-block').each(function (e) {
    var svg = d3.select(this);
    if (e.mark === 'circle') {
      svg.append('circle').attr({ 'cx': '.5em', 'cy': '.45em', 'r': '.45em', 'class': 'legend-mark' });
    } else if (e.mark === 'line') {
      svg.append('line').attr({ 'x1': 0, 'y1': '.5em', 'x2': '1em', 'y2': '.5em', 'stroke-width': 2, 'shape-rendering': 'crispEdges', 'class': 'legend-mark' });
    } else if (e.mark === 'square') {
      svg.append('rect').attr({ 'height': '1em', 'width': '1em', 'class': 'legend-mark' });
    }
  });
  leg_parts.selectAll('.legend-color-block').select('.legend-mark').attr('fill', function (d) {
    return d.color || scale(d.label);
  }).attr('stroke', function (d) {
    return d.color || scale(d.label);
  }).each(function (e) {
    d3.select(this).attr(e.attributes);
  });

  new_parts.append('span').attr('class', 'legend-label').text(function (d) {
    return d.label;
  });

  if (scale.domain().length > 1) {
    legend.style('display', 'block');
  } else {
    legend.style('display', 'none');
  }

  this.legend = legend;
}

/** Handles final arrangement of all chart components. Determines final chart dimensions and triggers rendering of axes and marks
*@memberof chart
*@method resize
*/

function resize() {
  var config = this.config;

  var aspect2 = 1 / config.aspect;
  var div_width = parseInt(this.wrap.style('width'));
  var max_width = config.max_width ? config.max_width : div_width;
  var preWidth = !config.resizable ? config.width : !max_width || div_width < max_width ? div_width : this.raw_width;

  this.textSize(preWidth);

  this.margin = this.setMargins();

  var svg_width = config.x.type === 'ordinal' && +config.range_band ? this.raw_width + this.margin.left + this.margin.right : !config.resizable ? this.raw_width : !config.max_width || div_width < config.max_width ? div_width : this.raw_width;
  this.plot_width = svg_width - this.margin.left - this.margin.right;
  var svg_height = config.y.type === 'ordinal' && +config.range_band ? this.raw_height + this.margin.top + this.margin.bottom : !config.resizable && config.height ? config.height : !config.resizable ? svg_width * aspect2 : this.plot_width * aspect2;
  this.plot_height = svg_height - this.margin.top - this.margin.bottom;

  d3.select(this.svg.node().parentNode).attr('width', svg_width).attr('height', svg_height).select('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  this.svg.select('.overlay').attr('width', this.plot_width).attr('height', this.plot_height).classed('zoomable', config.zoomable);

  this.svg.select('.plotting-area').attr('width', this.plot_width).attr('height', this.plot_height + 1).attr('transform', 'translate(0, -1)');

  this.xScaleAxis();
  this.yScaleAxis();

  var g_x_axis = this.svg.select('.x.axis');
  var g_y_axis = this.svg.select('.y.axis');
  var x_axis_label = g_x_axis.select('.axis-title');
  var y_axis_label = g_y_axis.select('.axis-title');

  if (config.x_location !== 'top') {
    g_x_axis.attr('transform', 'translate(0,' + this.plot_height + ')');
  }
  g_x_axis.transition().call(this.xAxis);
  g_y_axis.transition().call(this.yAxis);
  x_axis_label.attr('transform', 'translate(' + this.plot_width / 2 + ',' + (this.margin.bottom - 2) + ')');
  y_axis_label.attr('x', -1 * this.plot_height / 2).attr('y', -1 * this.margin.left);

  this.drawGridlines();
  //update legend - margins need to be set first
  this.makeLegend();

  //update the chart's specific marks
  this.updateDataMarks();

  //call .on("resize") function, if any
  this.events.onResize.call(this);
}

/** Sets up the color scale for the chart, which is an ordinal d3.scale with a domain based on unique values determined by config.color_by and a range determined by config.colors
*@memberof chart
*@method setColorScale
*/

function setColorScale() {
  var config = this.config;
  var data = config.legend.behavior === 'flex' ? this.filtered_data : this.raw_data;
  var colordom = config.color_dom || d3.set(data.map(function (m) {
    return m[config.color_by];
  })).values().filter(function (f) {
    return f && f !== 'undefined';
  });

  if (config.legend.order) {
    colordom = colordom.sort(function (a, b) {
      return d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b));
    });
  } else {
    colordom = colordom.sort(webCharts.dataOps.naturalSorter);
  }

  this.colorScale = d3.scale.ordinal().domain(colordom).range(config.colors);
}

function setDefaults() {

  this.config.x = this.config.x || {};
  this.config.y = this.config.y || {};

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

  this.config.date_format = this.config.date_format || '%x';

  this.config.padding = this.config.padding !== undefined ? this.config.padding : 0.3;
  this.config.outer_pad = this.config.outer_pad !== undefined ? this.config.outer_pad : 0.1;

  this.config.resizable = this.config.resizable !== undefined ? this.config.resizable : true;

  this.config.aspect = this.config.aspect || 1.33;

  this.config.colors = this.config.colors || ['rgb(102,194,165)', 'rgb(252,141,98)', 'rgb(141,160,203)', 'rgb(231,138,195)', 'rgb(166,216,84)', 'rgb(255,217,47)', 'rgb(229,196,148)', 'rgb(179,179,179)'];

  this.config.scale_text = this.config.scale_text === undefined ? true : this.config.scale_text;
}

/** Automatically determines margins for the chart based on axis ticks, labels, etc.
*@memberof chart
*@method setMargins
*/

function setMargins() {
  var _this8 = this;

  var x_ticks = this.xAxis.tickFormat() ? this.x.domain().map(function (m) {
    return _this8.xAxis.tickFormat()(m);
  }) : this.x.domain();
  var y_ticks = this.yAxis.tickFormat() ? this.y.domain().map(function (m) {
    return _this8.yAxis.tickFormat()(m);
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

/** Automatically determines text size for the chart based on certain breakpoints
*@memberof chart
*@method textSize
*@param {number} width width of the chart container
*/

function textSize(width) {
  var font_size = '14px';
  var point_size = 4;
  var stroke_width = 2;

  if (!this.config.scale_text) {
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

function transformData(raw, mark) {
  var _this9 = this;

  var config = this.config;
  var x_behavior = config.x.behavior || 'raw';
  var y_behavior = config.y.behavior || 'raw';
  var sublevel = mark.type === 'line' ? config.x.column : mark.type === 'bar' && mark.split ? mark.split : null;
  var dateConvert = d3.time.format(config.date_format);
  var totalOrder = undefined;

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
      return mark.summarizeX !== 'count' && mark.summarizeX !== 'percent' ? +f[config.x.column] || +f[config.x.column] === 0 : f;
    });
  };
  if ((config.y.type === 'linear' || config.y.type === 'log') && config.y.column) {
    raw = raw.filter(function (f) {
      return mark.summarizeY !== 'count' && mark.summarizeY !== 'percent' ? +f[config.y.column] || +f[config.y.column] === 0 : f;
    });
  };

  var raw_nest = undefined;
  if (mark.type === 'bar') raw_nest = mark.arrange !== 'stacked' ? makeNest(raw, sublevel) : makeNest(raw);else if (mark.summarizeX === 'count' || mark.summarizeY === 'count') raw_nest = makeNest(raw);

  var raw_dom_x = mark.summarizeX === 'cumulative' ? [0, raw.length] : config.x.type === 'ordinal' ? d3.set(raw.map(function (m) {
    return m[config.x.column];
  })).values().filter(function (f) {
    return f;
  }) : mark.split && mark.arrange !== 'stacked' ? d3.extent(d3.merge(raw_nest.nested.map(function (m) {
    return m.values.map(function (p) {
      return p.values.raw.length;
    });
  }))) : mark.summarizeX === 'count' ? d3.extent(raw_nest.nested.map(function (m) {
    return m.values.raw.length;
  })) : d3.extent(raw.map(function (m) {
    return +m[config.x.column];
  }).filter(function (f) {
    return +f;
  }));

  var raw_dom_y = mark.summarizeY === 'cumulative' ? [0, raw.length] : config.y.type === 'ordinal' ? d3.set(raw.map(function (m) {
    return m[config.y.column];
  })).values().filter(function (f) {
    return f;
  }) : mark.split && mark.arrange !== 'stacked' ? d3.extent(d3.merge(raw_nest.nested.map(function (m) {
    return m.values.map(function (p) {
      return p.values.raw.length;
    });
  }))) : mark.summarizeY === 'count' ? d3.extent(raw_nest.nested.map(function (m) {
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
      obj.x = config.x.type === 'ordinal' ? r[0][config.x.column] : webCharts.dataOps.summarize(x_vals, mark.summarizeX);
      obj.y = config.y.type === 'ordinal' ? r[0][config.y.column] : webCharts.dataOps.summarize(y_vals, mark.summarizeY);

      obj.x_q25 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(x_vals, 0.25) : obj.x;
      obj.x_q75 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(x_vals, 0.75) : obj.x;
      obj.y_q25 = config.error_bars ? d3.quantile(y_vals, 0.25) : obj.y;
      obj.y_q75 = config.error_bars ? d3.quantile(y_vals, 0.75) : obj.y;
      dom_xs.push([obj.x_q25, obj.x_q75, obj.x]);
      dom_ys.push([obj.y_q25, obj.y_q75, obj.y]);

      if (mark.summarizeY === 'cumulative') {
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
      if (mark.summarizeX === 'cumulative') {
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
    // else if(sublevel && mark.summarizeY === 'percent'){
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
        v.values.y = mark.summarizeY === 'percent' ? v.values.y / e.total : v.values.y || 0;
        counter += +v.values.y;
        v.values.start = e.values[i - 1] ? counter : v.values.y;
      } else {
        v.values.x = mark.summarizeX === 'percent' ? v.values.x / e.total : v.values.x || 0;
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
          return f[_this9.filters[0].col] === e;
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

  var flex_dom_x = current_nested.dom_x;
  var flex_dom_y = current_nested.dom_y;

  if (mark.type === 'bar') {
    if (config.y.type === 'ordinal' && mark.summarizeX === 'count') config.x.domain = config.x.domain ? [0, config.x.domain[1]] : [0, null];else if (config.x.type === 'ordinal' && mark.summarizeY === 'count') config.y.domain = config.y.domain ? [0, config.y.domain[1]] : [0, null];
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

  this.current_data = current_nested.nested;

  this.events.onDatatransform.call(this);

  return { data: current_nested.nested, x_dom: x_dom, y_dom: y_dom };
}

/** Triages rendering functions for the chart's currently-defined marks
*@memberof chart
*@method updateDataMarks
*/

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

function xScaleAxis(max_range, domain, type) {
  if (max_range === undefined) {
    max_range = this.plot_width;
  }
  if (domain === undefined) {
    domain = this.x_dom;
  }
  if (type === undefined) {
    type = this.config.x.type;
  }
  var config = this.config;
  var x = undefined;

  if (type === 'log') {
    x = d3.scale.log();
  } else if (type === 'ordinal') {
    x = d3.scale.ordinal();
  } else if (type === 'time') {
    x = d3.time.scale();
  } else {
    x = d3.scale.linear();
  }

  x.domain(domain);

  if (type === 'ordinal') {
    x.rangeBands([0, +max_range], config.padding, config.outer_pad);
  } else {
    x.range([0, +max_range]).clamp(Boolean(config.x.clamp));
  }

  var format = config.x.format ? config.x.format : config.marks.map(function (m) {
    return m.summarizeX === 'percent';
  }).indexOf(true) > -1 ? '0%' : type === 'time' ? '%x' : '.0f';
  var tick_count = Math.max(2, Math.min(max_range / 80, 8));
  var xAxis = d3.svg.axis().scale(x).orient(config.x.location).ticks(tick_count).tickFormat(type === 'ordinal' ? null : type === 'time' ? d3.time.format(format) : d3.format(format)).tickValues(config.x.ticks ? config.x.ticks : null).innerTickSize(6).outerTickSize(3);

  this.svg.select('g.x.axis').attr('class', 'x axis ' + type);
  this.x = x;
  this.xAxis = xAxis;
}

function yScaleAxis(max_range, domain, type) {
  if (max_range === undefined) {
    max_range = this.plot_height;
  }
  if (domain === undefined) {
    domain = this.y_dom;
  }
  if (type === undefined) {
    type = this.config.y.type;
  }
  var config = this.config;
  var y = undefined;
  if (type === 'log') {
    y = d3.scale.log();
  } else if (type === 'ordinal') {
    y = d3.scale.ordinal();
  } else if (type === 'time') {
    y = d3.time.scale();
  } else {
    y = d3.scale.linear();
  }

  y.domain(domain);

  if (type === 'ordinal') {
    y.rangeBands([+max_range, 0], config.padding, config.outer_pad);
  } else {
    y.range([+max_range, 0]).clamp(Boolean(config.y_clamp));
  }

  var y_format = config.y.format ? config.y.format : config.marks.map(function (m) {
    return m.summarizeY === 'percent';
  }).indexOf(true) > -1 ? '0%' : '.0f';
  var tick_count = Math.max(2, Math.min(max_range / 80, 8));
  var yAxis = d3.svg.axis().scale(y).orient('left').ticks(tick_count).tickFormat(type === 'ordinal' ? null : type === 'time' ? d3.time.format(y_format) : d3.format(y_format)).tickValues(config.y.ticks ? config.y.ticks : null).innerTickSize(6).outerTickSize(3);

  this.svg.select('g.y.axis').attr('class', 'y axis ' + type);

  this.y = y;
  this.yAxis = yAxis;
}

var controlsProto = {
  changeOption: changeOption,
  checkRequired: controlCheckRequired,
  controlUpdate: controlUpdate,
  init: controlInit,
  layout: controlLayout,
  makeControlItem: makeControlItem,
  makeBtnGroupControl: makeBtnGroupControl,
  makeCheckboxControl: makeCheckboxControl,
  makeDropdownControl: makeDropdownControl,
  makeListControl: makeListControl,
  makeNumberControl: makeNumberControl,
  makeRadioControl: makeRadioControl,
  makeSubsetterControl: makeSubsetterControl,
  makeTextControl: makeTextControl,
  stringAccessor: stringAccessor
};

function changeOption(option, value) {
  var _this10 = this;

  this.targets.forEach(function (e) {
    _this10.stringAccessor(e.config, option, value);
    e.draw();
  });
}

function controlCheckRequired(dataset) {
  var _this11 = this;

  var colnames = d3.keys(dataset[0]);
  if (!this.config.inputs) {
    return;
  }
  this.config.inputs.forEach(function (e, i) {
    if (e.type === 'subsetter' && colnames.indexOf(e.value_col) === -1) {
      _this11.config.inputs = _this11.config.inputs.splice(controls[i], 1);
      throw new Error('Error in settings object: the value "' + e.value_col + '" does not match any column in the provided dataset.');
    }
  });
}

function controlInit(data) {
  this.data = data;
  if (!this.config.builder) {
    this.checkRequired(this.data);
  }
  this.layout();
}

function controlLayout() {
  this.wrap.selectAll('*').remove();
  this.ready = true;
  this.controlUpdate();
}

function controlUpdate() {
  var _this12 = this;

  if (this.config.inputs && this.config.inputs.length && this.config.inputs[0]) {
    this.config.inputs.forEach(function (e) {
      return _this12.makeControlItem(e);
    });
  }
}

function makeBtnGroupControl(control, control_wrap) {
  var _this13 = this;

  var option_data = control.values ? control.values : d3.keys(this.data[0]);

  var btn_wrap = control_wrap.append('div').attr('class', 'btn-group');

  var changers = btn_wrap.selectAll('button').data(option_data).enter().append('button').attr('class', 'btn btn-default btn-sm').text(function (d) {
    return d;
  }).classed('btn-primary', function (d) {
    return _this13.stringAccessor(_this13.targets[0].config, control.option) === d;
  });

  changers.on('click', function (d) {
    changers.each(function (e) {
      d3.select(this).classed('btn-primary', e === d);
    });
    _this13.changeOption(control.option, d);
  });
}

function makeCheckboxControl(control, control_wrap) {
  var _this14 = this;

  var changer = control_wrap.append('input').attr('type', 'checkbox').attr('class', 'changer').datum(control).property('checked', function (d) {
    return _this14.stringAccessor(_this14.targets[0].config, control.option);
  });

  changer.on('change', function (d) {
    var value = changer.property('checked');
    _this14.changeOption(d.option, value);
  });
}

function makeControlItem(control) {
  var control_wrap = this.wrap.append('div').attr('class', 'control-group').classed('inline', control.inline).datum(control);
  var ctrl_label = control_wrap.append('span').attr('class', 'control-label').text(control.label);
  if (control.required) {
    ctrl_label.append('span').attr('class', 'label label-required').text('Required');
  }
  control_wrap.append('span').attr('class', 'span-description').text(control.description);

  if (control.type === 'text') {
    this.makeTextControl(control, control_wrap);
  } else if (control.type === 'number') {
    this.makeNumberControl(control, control_wrap);
  } else if (control.type === 'list') {
    this.makeListControl(control, control_wrap);
  } else if (control.type === 'dropdown') {
    this.makeDropdownControl(control, control_wrap);
  } else if (control.type === 'btngroup') {
    this.makeBtnGroupControl(control, control_wrap);
  } else if (control.type === 'checkbox') {
    this.makeCheckboxControl(control, control_wrap);
  } else if (control.type === 'radio') {
    this.makeRadioControl(control, control_wrap);
  } else if (control.type === 'subsetter') {
    this.makeSubsetterControl(control, control_wrap);
  } else {
    throw new Error('Each control must have a type! Choose from: "text", "number", "list", "dropdown", "btngroup", "checkbox", "radio", "subsetter"');
  }
}

function makeDropdownControl(control, control_wrap) {
  var _this15 = this;

  var changer = control_wrap.append('select').attr('class', 'changer').attr('multiple', control.multiple ? true : null).datum(control);

  var opt_values = control.values && control.values instanceof Array ? control.values : control.values ? d3.set(this.data.map(function (m) {
    return m[_this15.targets[0].config[control.values]];
  })).values() : d3.keys(this.data[0]);

  if (!control.require || control.none) {
    opt_values.unshift('None');
  }

  var options = changer.selectAll('option').data(opt_values).enter().append('option').text(function (d) {
    return d;
  }).property('selected', function (d) {
    return _this15.stringAccessor(_this15.targets[0].config, control.option) === d;
  });

  changer.on('change', function (d) {
    var value = changer.property('value') === 'None' ? null : changer.property('value');

    if (control.multiple) {
      value = options.filter(function (f) {
        return d3.select(this).property('selected');
      })[0].map(function (m) {
        return d3.select(m).property('value');
      }).filter(function (f) {
        return f !== 'None';
      });
    }

    _this15.changeOption(control.option, value);
  });

  return changer;
}

function makeListControl(control, control_wrap) {
  var _this16 = this;

  var changer = control_wrap.append('input').attr('type', 'text').attr('class', 'changer').datum(control).property('value', function (d) {
    return _this16.stringAccessor(_this16.targets[0].config, control.option);
  });

  changer.on('change', function (d) {
    var value = changer.property('value') ? changer.property('value').split(',').map(function (m) {
      return m.trim();
    }) : null;
    _this16.changeOption(control.option, value);
  });
}

function makeNumberControl(control, control_wrap) {
  var _this17 = this;

  var changer = control_wrap.append('input').attr('type', 'number').attr('min', control.min !== undefined ? control.min : 0).attr('max', control.max).attr('step', control.step || 1).attr('class', 'changer').datum(control).property('value', function (d) {
    return _this17.stringAccessor(_this17.targets[0].config, control.option);
  });

  changer.on('change', function (d) {
    var value = +changer.property('value');
    _this17.changeOption(control.option, value);
  });
}

function makeRadioControl(control, control_wrap) {
  var _this18 = this;

  var changers = control_wrap.selectAll('label').data(control.values || d3.keys(this.data[0])).enter().append('label').attr('class', 'radio').text(function (d, i) {
    return control.relabels ? control.relabels[i] : d;
  }).append('input').attr('type', 'radio').attr('class', 'changer').attr('name', control.option.replace('.', '-') + '-' + this.targets[0].id).property('value', function (d) {
    return d;
  }).property('checked', function (d) {
    return _this18.stringAccessor(_this18.targets[0].config, control.option) === d;
  });

  changers.on('change', function (d) {
    var value = null;
    changers.each(function (c) {
      if (d3.select(this).property('checked')) {
        value = d3.select(this).property('value') === 'none' ? null : c;
      }
    });
    _this18.changeOption(control.option, value);
  });
}

function makeSubsetterControl(control, control_wrap) {
  var targets = this.targets;
  var changer = control_wrap.append('select').attr('class', 'changer').attr('multiple', control.multiple ? true : null).datum(control);

  var option_data = control.values ? control.values : d3.set(this.data.map(function (m) {
    return m[control.value_col];
  }).filter(function (f) {
    return f;
  })).values();
  option_data.sort(d3.ascending);

  control.start = control.start ? control.start : control.loose ? option_data[0] : null;

  if (!control.multiple && !control.start) {
    option_data.unshift('All');
  }

  control.loose = !control.loose && control.start ? true : control.loose;

  var options = changer.selectAll('option').data(option_data).enter().append('option').text(function (d) {
    return d;
  }).property('selected', function (d) {
    return d === control.start;
  });

  targets.forEach(function (e) {
    var match = e.filters.slice().map(function (m) {
      return m.col === control.value_col;
    }).indexOf(true);
    if (match > -1) {
      e.filters[match] = { col: control.value_col, val: control.start ? control.start : 'All', choices: option_data, loose: control.loose };
    } else {
      e.filters.push({ col: control.value_col, val: control.start ? control.start : 'All', choices: option_data, loose: control.loose });
    }
  });

  function setSubsetter(target, obj) {
    var match = -1;
    target.filters.forEach(function (e, i) {
      if (e.col === obj.col) {
        match = i;
      }
    });
    if (match > -1) {
      target.filters[match] = obj;
    }
  }

  changer.on('change', function (d) {
    var _this19 = this;

    if (control.multiple) {
      (function () {
        var values = options.filter(function (f) {
          return d3.select(this).property('selected');
        })[0].map(function (m) {
          return d3.select(m).property('value');
        });

        var new_filter = { col: control.value_col, val: values, choices: option_data, loose: control.loose };
        targets.forEach(function (e) {
          setSubsetter(e, new_filter);
          e.draw();
        });
      })();
    } else {
      (function () {
        var value = d3.select(_this19).property('value');
        var new_filter = { col: control.value_col, val: value, choices: option_data, loose: control.loose };
        targets.forEach(function (e) {
          setSubsetter(e, new_filter);
          e.draw();
        });
      })();
    }
  });
}

function makeTextControl(control, control_wrap) {
  var _this20 = this;

  var changer = control_wrap.append('input').attr('type', 'text').attr('class', 'changer').datum(control).property('value', function (d) {
    return _this20.stringAccessor(_this20.targets[0].config, control.option);
  });

  changer.on('change', function (d) {
    var value = changer.property('value');
    _this20.changeOption(control.option, value);
  });
}

function stringAccessor(o, s, v) {
  //adapted from http://jsfiddle.net/alnitak/hEsys/
  s = s.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      if (i == n - 1 && v !== undefined) o[k] = v;
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

var tableProto = Object.create(chartProto);

Object.defineProperties(tableProto, {
  'layout': { value: tableLayout },
  'transformData': { value: tableTransformData },
  'draw': { value: tableDraw }
});

function tableDraw(raw_data, processed_data) {
  var raw = raw_data ? raw_data : this.raw_data;
  var config = this.config;
  var data = processed_data || this.transformData(raw);
  this.wrap.datum(data);
  var table = this.table;

  var col_list = config.cols.length ? config.cols : data.length ? d3.keys(data[0].values[0].raw) : [];

  if (config.bootstrap) {
    table.classed('table', true);
  } else {
    table.classed('table', false);
  }

  var header_data = !data.length ? [] : config.headers && config.headers.length ? config.headers : col_list;
  var headerRow = table.select('thead').select('tr.headers');
  var ths = headerRow.selectAll('th').data(header_data);
  ths.exit().remove();
  ths.enter().append('th');
  ths.text(function (d) {
    return d;
  });

  var tbodies = table.selectAll('tbody').data(data, function (d) {
    return d.key;
  });
  tbodies.exit().remove();
  tbodies.enter().append('tbody');

  if (config.row_per) {
    var rev_order = config.row_per.slice(0).reverse();
    rev_order.forEach(function (e) {
      tbodies.sort(function (a, b) {
        return a.values[0].raw[e] - b.values[0].raw[e];
      });
    });
  }
  var rows = tbodies.selectAll('tr').data(function (d) {
    return d.values;
  });
  rows.exit().remove();
  rows.enter().append('tr');

  if (config.sort_rows) {
    (function () {
      var row_order = config.sort_rows.slice(0);
      row_order.unshift('0');

      rows.sort(function (a, b) {
        var i = 0;
        while (i < row_order.length && a.raw[row_order[i]] == b.raw[row_order[i]]) {
          i++;
        }
        if (a.raw[row_order[i]] < b.raw[row_order[i]]) {
          return -1;
        }
        if (a.raw[row_order[i]] > b.raw[row_order[i]]) {
          return 1;
        }
        return 0;
      });
    })();
  }

  var tds = rows.selectAll('td').data(function (d) {
    return d.cells.filter(function (f) {
      return col_list.indexOf(f.col) > -1;
    });
  });
  tds.exit().remove();
  tds.enter().append('td');
  tds.attr('class', function (d) {
    return d.col;
  });
  if (config.as_html) {
    tds.html(function (d) {
      return d.text;
    });
  } else {
    tds.text(function (d) {
      return d.text;
    });
  }

  if (config.row_per) {
    rows.filter(function (f, i) {
      return i > 0;
    }).selectAll('td').filter(function (f) {
      return config.row_per.indexOf(f.col) > -1;
    }).text('');
  }

  if (config.data_tables) {
    if (jQuery() && jQuery().dataTable) {
      var dt_config = config.data_tables;
      dt_config.searching = config.searchable ? config.searchable : false;
      $(table.node()).dataTable(dt_config);
      var print_btn = $('.print-btn', wrap.node());
      print_btn.addClass('pull-right');
      $('.dataTables_wrapper').prepend(print_btn);
    } else {
      throw new Error('dataTables jQuery plugin not available');
    }
  }

  this.events.onDraw(this);
}

function tableLayout() {
  d3.select(this.div).select('.loader').remove();
  var table = this.wrap.append('table');
  table.append('thead').append('tr').attr('class', 'headers');
  this.table = table;
  this.events.onLayout(this);
}

function tableTransformData(data) {
  if (!data) {
    return;
  }
  var config = this.config;
  var colList = config.cols || d3.keys(data[0]);
  if (config.keep) {
    config.keep.forEach(function (e) {
      if (colList.indexOf(e) === -1) {
        colList.unshift(e);
      }
    });
  }
  this.config.cols = colList;

  var filtered = data;

  if (this.filters.length) {
    this.filters.forEach(function (e) {
      var is_array = e.val instanceof Array;
      filtered = filtered.filter(function (d) {
        if (is_array) {
          return e.val.indexOf(d[e.col]) !== -1;
        } else {
          return e.val !== 'All' ? d[e.col] === e.val : d;
        }
      });
    });
  }

  var slimmed = d3.nest().key(function (d) {
    if (config.row_per) {
      return config.row_per.map(function (m) {
        return d[m];
      }).join(' ');
    } else {
      return d;
    }
  }).rollup(function (r) {
    if (config.dataManipulate) {
      r = config.dataManipulate(r);
    }
    var nuarr = r.map(function (m) {
      var arr = [];
      for (var x in m) {
        arr.push({ col: x, text: m[x] });
      }
      arr.sort(function (a, b) {
        return config.cols.indexOf(a.col) - config.cols.indexOf(b.col);
      });
      return { cells: arr, raw: m };
    });
    return nuarr;
  }).entries(filtered);

  this.current_data = slimmed;

  this.events.onDatatransform(this);

  return this.current_data;
}

webCharts.objects = {
  chart: chartProto,
  table: tableProto,
  controls: controlsProto
};

webCharts.chartCount = 0;

webCharts.createChart = function () {
  var element = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var controls = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var chart = Object.create(webCharts.objects.chart);

  chart.div = element;

  chart.config = Object.create(config);

  chart.controls = controls;

  chart.raw_data = [];

  chart.filters = [];

  chart.marks = [];

  chart.wrap = d3.select(chart.div).append('div');

  chart.events = {
    onLayout: function onLayout() {},
    onDatatransform: function onDatatransform() {},
    onDraw: function onDraw() {},
    onResize: function onResize() {}
  };

  chart.on = function (event, callback) {
    var possible_events = ['layout', 'datatransform', 'draw', 'resize'];
    if (possible_events.indexOf(event) < 0) {
      return;
    }
    if (callback) {
      chart.events['on' + event.charAt(0).toUpperCase() + event.slice(1)] = callback;
    }
  };

  //increment chart count to get unique chart id
  webCharts.chartCount++;

  chart.id = webCharts.chartCount;

  return chart;
};

webCharts.createControls = function () {
  var element = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var controls = Object.create(webCharts.objects.controls);

  controls.div = element;

  controls.config = Object.create(config);
  controls.config.inputs = controls.config.inputs || [];

  controls.targets = [];

  if (config.location === 'bottom') {
    controls.wrap = d3.select(element).append('div').attr('class', 'wc-controls');
  } else {
    controls.wrap = d3.select(element).insert('div', ':first-child').attr('class', 'wc-controls');
  }

  return controls;
};

webCharts.createTable = function () {
  var element = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var controls = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var table = Object.create(webCharts.objects.table);

  table.div = element;

  table.config = Object.create(config);

  table.controls = controls;

  table.filters = [];

  table.required_cols = [];

  table.marks = [];

  table.wrap = d3.select(table.div).append('div');

  table.events = {
    onLayout: function onLayout() {},
    onDatatransform: function onDatatransform() {},
    onDraw: function onDraw() {},
    onResize: function onResize() {}
  };

  table.on = function (event, callback) {
    var possible_events = ['layout', 'datatransform', 'draw', 'resize'];
    if (possible_events.indexOf(event) < 0) {
      return;
    }
    if (callback) {
      table.events['on' + event.charAt(0).toUpperCase() + event.slice(1)] = callback;
    }
  };

  return table;
};
 return webCharts;
 }));
//# sourceMappingURL=../maps/webcharts.js.map