(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3')) :
  typeof define === 'function' && define.amd ? define(['d3'], factory) :
  (global.webcharts = factory(global.d3));
}(this, function (d3) { 'use strict';

  var version = '2.0.0-rc.1';

  function checkRequired(data) {
    var _this = this;

    var colnames = Object.keys(data[0]);
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
        var errorMessage = 'The value "' + e + '" for the ' + requiredVars[i] + ' setting does not match any column in the provided dataset.';
        _this.wrap.append('div').style('color', 'red').html(errorMessage);
        throw new Error('Error in configuration object: ' + errorMessage);
      }
    });
  }

  function naturalSorter(a, b) {
    // adapted from http://www.davekoelle.com/files/alphanum.js
    function chunkify(t) {
      var tz = [];
      var x = 0,
          y = -1,
          n = 0,
          i = void 0,
          j = void 0;

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

  function consolidateData(raw) {
    var _this = this;

    var config = this.config;
    var allData = [];
    var allX = [];
    var allY = [];

    this.setDefaults();

    config.marks.forEach(function (e, i) {
      if (e.type !== 'bar') {
        e.arrange = null;
        e.split = null;
      }
      var markInfo = e.per ? _this.transformData(raw, e) : { data: [], x_dom: [], y_dom: [] };

      allData.push(markInfo.data);
      allX.push(markInfo.x_dom);
      allY.push(markInfo.y_dom);
      _this.marks[i] = Object.create(e);
      _this.marks[i].data = markInfo.data;
    });

    if (config.x.type === 'ordinal') {
      if (config.x.domain) {
        this.x_dom = config.x.domain;
      } else if (config.x.order) {
        this.x_dom = d3.set(d3.merge(allX)).values().sort(function (a, b) {
          return d3.ascending(config.x.order.indexOf(a), config.x.order.indexOf(b));
        });
      } else if (config.x.sort && config.x.sort === 'alphabetical-ascending') {
        this.x_dom = d3.set(d3.merge(allX)).values().sort(naturalSorter);
      } else if (config.y.type === 'time' && config.x.sort === 'earliest') {
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
      } else if (!config.x.sort || config.x.sort === 'alphabetical-descending') {
        this.x_dom = d3.set(d3.merge(allX)).values().sort(naturalSorter);
      } else {
        this.x_dom = d3.set(d3.merge(allX)).values();
      }
    } else if (config.marks.map(function (m) {
      return m.summarizeX === 'percent';
    }).indexOf(true) > -1) {
      this.x_dom = [0, 1];
    } else {
      this.x_dom = d3.extent(d3.merge(allX));
    }

    if (config.y.type === 'ordinal') {
      if (config.y.domain) {
        this.y_dom = config.y.domain;
      } else if (config.y.order) {
        this.y_dom = d3.set(d3.merge(allY)).values().sort(function (a, b) {
          return d3.ascending(config.y.order.indexOf(a), config.y.order.indexOf(b));
        });
      } else if (config.y.sort && config.y.sort === 'alphabetical-ascending') {
        this.y_dom = d3.set(d3.merge(allY)).values().sort(naturalSorter);
      } else if (config.x.type === 'time' && config.y.sort === 'earliest') {
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
      } else if (!config.y.sort || config.y.sort === 'alphabetical-descending') {
        this.y_dom = d3.set(d3.merge(allY)).values().sort(naturalSorter).reverse();
      } else {
        this.y_dom = d3.set(d3.merge(allY)).values();
      }
    } else if (config.marks.map(function (m) {
      return m.summarizeY === 'percent';
    }).indexOf(true) > -1) {
      this.y_dom = [0, 1];
    } else {
      this.y_dom = d3.extent(d3.merge(allY));
    }
  }

  function draw() {
    var _this = this;

    var rawData = arguments.length <= 0 || arguments[0] === undefined ? this.raw_data : arguments[0];
    var processedData = arguments[1];

    var context = this;
    var config = this.config;
    var aspect2 = 1 / config.aspect;
    // if pre-processing callback, run it now
    this.events.onPreprocess.call(this);
    // then do normal processing
    var raw = rawData || [];
    var data = processedData || this.consolidateData(raw);

    this.wrap.datum(data);

    var divWidth = parseInt(this.wrap.style('width'), 10);

    this.setColorScale();

    var maxWidth = config.max_width ? config.max_width : divWidth;
    this.raw_width = config.x.type === 'ordinal' && +config.range_band ? (+config.range_band + config.range_band * config.padding) * this.x_dom.length : config.resizable ? maxWidth : config.width ? config.width : divWidth;
    this.raw_height = config.y.type === 'ordinal' && +config.range_band ? (+config.range_band + config.range_band * config.padding) * this.y_dom.length : config.resizable ? maxWidth * aspect2 : config.height ? config.height : divWidth * aspect2;

    var pseudoWidth = this.svg.select('.overlay').attr('width') ? this.svg.select('.overlay').attr('width') : this.raw_width;
    var pseudoHeight = this.svg.select('.overlay').attr('height') ? this.svg.select('.overlay').attr('height') : this.raw_height;

    this.svg.select('.x.axis').select('.axis-title').text(function () {
      return typeof config.x.label === 'string' ? config.x.label : typeof config.x.label === 'function' ? config.x.label.call(_this) : null;
    });
    this.svg.select('.y.axis').select('.axis-title').text(function () {
      return typeof config.y.label === 'string' ? config.y.label : typeof config.y.label === 'function' ? config.y.label.call(_this) : null;
    });

    this.xScaleAxis(pseudoWidth);
    this.yScaleAxis(pseudoHeight);

    var eventName = 'resize.' + context.element + '-' + context.id;
    if (config.resizable && typeof window !== 'undefined') {
      d3.select(window).on(eventName, function () {
        return _this.resize();
      });
    } else if (typeof window !== 'undefined') {
      d3.select(window).on(eventName, null);
    }

    this.events.onDraw.call(this);
    this.resize();
  }

  function drawArea (area_drawer, area_data, datum_accessor) {
    var class_match = arguments.length <= 3 || arguments[3] === undefined ? 'chart-area' : arguments[3];

    var _this = this;

    var bind_accessor = arguments[4];
    var attr_accessor = arguments.length <= 5 || arguments[5] === undefined ? function (d) {
      return d;
    } : arguments[5];

    var area_grps = this.svg.selectAll('.' + class_match).data(area_data, bind_accessor);
    area_grps.exit().remove();
    area_grps.enter().append('g').attr('class', function (d) {
      return class_match + ' ' + d.key;
    }).append('path');

    var areaPaths = area_grps.select('path').datum(datum_accessor).attr('fill', function (d) {
      var d_attr = attr_accessor(d);
      return d_attr ? _this.colorScale(d_attr[_this.config.color_by]) : null;
    }).attr('fill-opacity', this.config.fill_opacity || this.config.fill_opacity === 0 ? this.config.fill_opacity : 0.3);

    //don't transition if config says not to
    var areaPathTransitions = this.config.transitions ? areaPaths.transition() : areaPaths;

    areaPathTransitions.attr('d', area_drawer);

    return area_grps;
  }

  function drawBars(marks) {
    var _this = this;

    var rawData = this.raw_data;
    var config = this.config;

    var xformat = config.marks.map(function (m) {
      return m.summarizeX === 'percent';
    }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.x.format);
    var yformat = config.marks.map(function (m) {
      return m.summarizeY === 'percent';
    }).indexOf(true) > -1 ? d3.format('0%') : d3.format(config.y.format);

    var barSuperGroups = this.svg.selectAll('.bar-supergroup').data(marks, function (d, i) {
      return i + '-' + d.per.join('-');
    });
    barSuperGroups.enter().append('g').attr('class', 'bar-supergroup');
    barSuperGroups.exit().remove();

    var barGroups = barSuperGroups.selectAll('.bar-group').data(function (d) {
      return d.data;
    }, function (d) {
      return d.key;
    });
    var oldBarGroups = barGroups.exit();

    var nuBarGroups = void 0;
    var bars = void 0;

    var oldBarsTrans = config.transitions ? oldBarGroups.selectAll('.bar').transition() : oldBarGroups.selectAll('.bar');
    var oldBarGroupsTrans = config.transitions ? oldBarGroups.transition() : oldBarGroups;

    // ordinal x axis
    if (config.x.type === 'ordinal') {
      oldBarsTrans.attr('y', this.y(0)).attr('height', 0);

      oldBarGroupsTrans.remove();

      nuBarGroups = barGroups.enter().append('g').attr('class', function (d) {
        return 'bar-group ' + d.key;
      });
      nuBarGroups.append('title');

      bars = barGroups.selectAll('rect').data(function (d) {
        return d.values instanceof Array ? d.values.sort(function (a, b) {
          return _this.colorScale.domain().indexOf(b.key) - _this.colorScale.domain().indexOf(a.key);
        }) : [d];
      }, function (d) {
        return d.key;
      });

      var exitBars = config.transitions ? bars.exit().transition() : bars.exit();
      exitBars.attr('y', this.y(0)).attr('height', 0).remove();
      bars.enter().append('rect').attr('class', function (d) {
        return 'wc-data-mark bar ' + d.key;
      }).style('clip-path', 'url(#' + this.id + ')').attr('y', this.y(0)).attr('height', 0).append('title');

      bars.attr('shape-rendering', 'crispEdges').attr('stroke', function (d) {
        return _this.colorScale(d.values.raw[0][config.color_by]);
      }).attr('fill', function (d) {
        return _this.colorScale(d.values.raw[0][config.color_by]);
      });

      bars.each(function assignMark(d) {
        var mark = d3.select(this.parentNode.parentNode).datum();
        d.tooltip = mark.tooltip;
        d.arrange = mark.split ? mark.arrange : null;
        d.subcats = config.legend.order ? config.legend.order.slice().reverse() : mark.values && mark.values[mark.split] ? mark.values[mark.split] : d3.set(rawData.map(function (m) {
          return m[mark.split];
        })).values();
        d3.select(this).attr(mark.attributes);
      });

      bars.select('title').text(function (d) {
        var tt = d.tooltip || '';
        return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
          return d.values.raw[0][orig];
        });
      });

      var barsTrans = config.transitions ? bars.transition() : bars;

      barsTrans.attr('x', function (d) {
        var position = void 0;
        var finalXPosition = void 0;
        if (!d.arrange || d.arrange === 'stacked') {
          return _this.x(d.values.x);
        } else if (d.arrange === 'nested') {
          position = d.subcats.indexOf(d.key);
          var offset = position ? _this.x.rangeBand() / (d.subcats.length * 0.75) / position : _this.x.rangeBand();
          finalXPosition = _this.x(d.values.x) + (_this.x.rangeBand() - offset) / 2;
        } else {
          position = d.subcats.indexOf(d.key);
          finalXPosition = _this.x(d.values.x) + _this.x.rangeBand() / d.subcats.length * position;
        }
        return finalXPosition;
      }).attr('y', function (d) {
        var finalYPosition = void 0;
        if (d.arrange !== 'stacked') {
          finalYPosition = _this.y(d.values.y);
        } else {
          finalYPosition = _this.y(d.values.start);
        }
        return finalYPosition;
      }).attr('width', function (d) {
        var finalWidth = void 0;
        if (d.arrange === 'stacked') {
          return _this.x.rangeBand();
        } else if (d.arrange === 'nested') {
          var position = d.subcats.indexOf(d.key);
          finalWidth = position ? _this.x.rangeBand() / (d.subcats.length * 0.75) / position : _this.x.rangeBand();
        } else {
          finalWidth = _this.x.rangeBand() / d.subcats.length;
        }
        return finalWidth;
      }).attr('height', function (d) {
        return _this.y(0) - _this.y(d.values.y);
      });
    }
    // ordinal Y axis
    else if (config.y.type === 'ordinal') {
        oldBarsTrans.attr('x', this.x(0)).attr('width', 0);

        oldBarGroupsTrans.remove();

        nuBarGroups = barGroups.enter().append('g').attr('class', function (d) {
          return 'bar-group ' + d.key;
        });
        nuBarGroups.append('title');

        bars = barGroups.selectAll('rect').data(function (d) {
          return d.values instanceof Array ? d.values.sort(function (a, b) {
            return _this.colorScale.domain().indexOf(b.key) - _this.colorScale.domain().indexOf(a.key);
          }) : [d];
        }, function (d) {
          return d.key;
        });

        var _exitBars = config.transitions ? bars.exit().transition() : bars.exit();
        _exitBars.attr('x', this.x(0)).attr('width', 0).remove();
        bars.enter().append('rect').attr('class', function (d) {
          return 'wc-data-mark bar ' + d.key;
        }).style('clip-path', 'url(#' + this.id + ')').attr('x', this.x(0)).attr('width', 0).append('title');

        bars.attr('shape-rendering', 'crispEdges').attr('stroke', function (d) {
          return _this.colorScale(d.values.raw[0][config.color_by]);
        }).attr('fill', function (d) {
          return _this.colorScale(d.values.raw[0][config.color_by]);
        });

        bars.each(function assignMark(d) {
          var mark = d3.select(this.parentNode.parentNode).datum();
          d.arrange = mark.split && mark.arrange ? mark.arrange : mark.split ? 'grouped' : null;
          d.subcats = config.legend.order ? config.legend.order.slice().reverse() : mark.values && mark.values[mark.split] ? mark.values[mark.split] : d3.set(rawData.map(function (m) {
            return m[mark.split];
          })).values();
          d.tooltip = mark.tooltip;
        });

        bars.select('title').text(function (d) {
          var tt = d.tooltip || '';
          return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
            return d.values.raw[0][orig];
          });
        });

        var _barsTrans = config.transitions ? bars.transition() : bars;

        _barsTrans.attr('x', function (d) {
          var finalXPosition = void 0;
          if (d.arrange === 'stacked' || !d.arrange) {
            finalXPosition = d.values.start !== undefined ? _this.x(d.values.start) : _this.x(0);
          } else {
            finalXPosition = _this.x(0);
          }
          return finalXPosition;
        }).attr('y', function (d) {
          var finalYPosition = void 0;
          var position = void 0;
          if (d.arrange === 'nested') {
            position = d.subcats.indexOf(d.key);
            var offset = position ? _this.y.rangeBand() / (d.subcats.length * 0.75) / position : _this.y.rangeBand();
            finalYPosition = _this.y(d.values.y) + (_this.y.rangeBand() - offset) / 2;
          } else if (d.arrange === 'grouped') {
            position = d.subcats.indexOf(d.key);
            finalYPosition = _this.y(d.values.y) + _this.y.rangeBand() / d.subcats.length * position;
          } else {
            return _this.y(d.values.y);
          }
          return finalYPosition;
        }).attr('width', function (d) {
          return _this.x(d.values.x) - _this.x(0);
        }).attr('height', function (d) {
          var finalHeight = void 0;
          if (config.y.type === 'quantile') {
            finalHeight = 20;
          } else if (d.arrange === 'nested') {
            var position = d.subcats.indexOf(d.key);
            finalHeight = position ? _this.y.rangeBand() / (d.subcats.length * 0.75) / position : _this.y.rangeBand();
          } else if (d.arrange === 'grouped') {
            finalHeight = _this.y.rangeBand() / d.subcats.length;
          } else {
            finalHeight = _this.y.rangeBand();
          }
          return finalHeight;
        });
      }
      // x is linear and a bin is defined
      else if (config.x.type === 'linear' && config.x.bin) {
          oldBarsTrans.attr('y', this.y(0)).attr('height', 0);

          oldBarGroupsTrans.remove();

          nuBarGroups = barGroups.enter().append('g').attr('class', function (d) {
            return 'bar-group ' + d.key;
          });
          nuBarGroups.append('title');

          bars = barGroups.selectAll('rect').data(function (d) {
            return d.values instanceof Array ? d.values : [d];
          }, function (d) {
            return d.key;
          });

          var _exitBars2 = config.transitions ? bars.exit().transition() : bars.exit();

          _exitBars2.attr('y', this.y(0)).attr('height', 0).remove();

          bars.enter().append('rect').attr('class', function (d) {
            return 'wc-data-mark bar ' + d.key;
          }).style('clip-path', 'url(#' + this.id + ')').attr('y', this.y(0)).attr('height', 0).append('title');

          bars.attr('shape-rendering', 'crispEdges').attr('stroke', function (d) {
            return _this.colorScale(d.values.raw[0][config.color_by]);
          }).attr('fill', function (d) {
            return _this.colorScale(d.values.raw[0][config.color_by]);
          });

          bars.each(function assignMark(d) {
            var mark = d3.select(this.parentNode.parentNode).datum();

            d.arrange = mark.split ? mark.arrange : null;

            d.subcats = config.legend.order ? config.legend.order.slice().reverse() : mark.values && mark.values[mark.split] ? mark.values[mark.split] : d3.set(rawData.map(function (m) {
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

          bars.select('title').text(function (d) {
            var tt = d.tooltip || '';
            return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
              return d.values.raw[0][orig];
            });
          });

          var _barsTrans2 = config.transitions ? bars.transition() : bars;

          _barsTrans2.attr('x', function (d) {
            return _this.x(d.rangeLow);
          }).attr('y', function (d) {
            var finalYPosition = void 0;
            if (d.arrange !== 'stacked') {
              finalYPosition = _this.y(d.values.y);
            } else {
              finalYPosition = _this.y(d.values.start);
            }
            return finalYPosition;
          }).attr('width', function (d) {
            return _this.x(d.rangeHigh) - _this.x(d.rangeLow);
          }).attr('height', function (d) {
            return _this.y(0) - _this.y(d.values.y);
          });
        }
        // y is linear and bin is defined
        else if (config.y.type === 'linear' && config.y.bin) {
            oldBarsTrans.attr('x', this.x(0)).attr('width', 0);
            oldBarGroupsTrans.remove();

            nuBarGroups = barGroups.enter().append('g').attr('class', function (d) {
              return 'bar-group ' + d.key;
            });
            nuBarGroups.append('title');

            bars = barGroups.selectAll('rect').data(function (d) {
              return d.values instanceof Array ? d.values : [d];
            }, function (d) {
              return d.key;
            });

            var _exitBars3 = config.transitions ? bars.exit().transition() : bars.exit();
            _exitBars3.attr('x', this.x(0)).attr('width', 0).remove();
            bars.enter().append('rect').attr('class', function (d) {
              return 'wc-data-mark bar ' + d.key;
            }).style('clip-path', 'url(#' + this.id + ')').attr('x', this.x(0)).attr('width', 0).append('title');

            bars.attr('shape-rendering', 'crispEdges').attr('stroke', function (d) {
              return _this.colorScale(d.values.raw[0][config.color_by]);
            }).attr('fill', function (d) {
              return _this.colorScale(d.values.raw[0][config.color_by]);
            });

            bars.each(function assignMark(d) {
              var mark = d3.select(this.parentNode.parentNode).datum();
              d.arrange = mark.split ? mark.arrange : null;
              d.subcats = config.legend.order ? config.legend.order.slice().reverse() : mark.values && mark.values[mark.split] ? mark.values[mark.split] : d3.set(rawData.map(function (m) {
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

            bars.select('title').text(function (d) {
              var tt = d.tooltip || '';
              return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
                return d.values.raw[0][orig];
              });
            });

            var _barsTrans3 = config.transitions ? bars.transition() : bars;
            _barsTrans3.attr('x', function (d) {
              var finalXPosition = void 0;
              if (d.arrange === 'stacked') {
                finalXPosition = _this.x(d.values.start);
              } else {
                finalXPosition = _this.x(0);
              }
              return finalXPosition;
            }).attr('y', function (d) {
              return _this.y(d.rangeHigh);
            }).attr('width', function (d) {
              return _this.x(d.values.x);
            }).attr('height', function (d) {
              return _this.y(d.rangeLow) - _this.y(d.rangeHigh);
            });
          } else {
            oldBarsTrans.attr('y', this.y(0)).attr('height', 0);
            oldBarGroupsTrans.remove();
            barSuperGroups.remove();
          }
  }

  function drawGridlines() {
    this.wrap.classed('gridlines', this.config.gridlines);
    if (this.config.gridlines) {
      this.svg.select('.y.axis').selectAll('.tick line').attr('x1', 0);
      this.svg.select('.x.axis').selectAll('.tick line').attr('y1', 0);
      if (this.config.gridlines === 'y' || this.config.gridlines === 'xy') {
        this.svg.select('.y.axis').selectAll('.tick line').attr('x1', this.plot_width);
      }
      if (this.config.gridlines === 'x' || this.config.gridlines === 'xy') {
        this.svg.select('.x.axis').selectAll('.tick line').attr('y1', -this.plot_height);
      }
    } else {
      this.svg.select('.y.axis').selectAll('.tick line').attr('x1', 0);
      this.svg.select('.x.axis').selectAll('.tick line').attr('y1', 0);
    }
  }

  function drawLines(marks) {
    var _this = this;

    var config = this.config;

    var line = d3.svg.line().interpolate(config.interpolate).x(function (d) {
      return config.x.type === 'linear' ? _this.x(+d.values.x) : config.x.type === 'time' ? _this.x(new Date(d.values.x)) : _this.x(d.values.x) + _this.x.rangeBand() / 2;
    }).y(function (d) {
      return config.y.type === 'linear' ? _this.y(+d.values.y) : config.y.type === 'time' ? _this.y(new Date(d.values.y)) : _this.y(d.values.y) + _this.y.rangeBand() / 2;
    });

    var xformat = config.x.summary === 'percent' ? d3.format('0%') : d3.format(config.x.format);
    var yformat = config.y.summary === 'percent' ? d3.format('0%') : d3.format(config.y.format);

    var lineSuperGroups = this.svg.selectAll('.line-supergroup').data(marks, function (d, i) {
      return i + '-' + d.per.join('-');
    });
    lineSuperGroups.enter().append('g').attr('class', 'line-supergroup');
    lineSuperGroups.exit().remove();

    var lineGroups = lineSuperGroups.selectAll('.line').data(function (d) {
      return d.data;
    }, function (d) {
      return d.key;
    });

    lineGroups.exit().remove();

    var nuLineGroups = lineGroups.enter().append('g').attr('class', function (d) {
      return d.key + ' line';
    });
    nuLineGroups.append('path');
    nuLineGroups.append('title');

    var linePaths = lineGroups.select('path').attr('class', 'wc-data-mark').datum(function (d) {
      return d.values;
    }).attr('stroke', function (d) {
      return _this.colorScale(d[0].values.raw[0][config.color_by]);
    }).attr('stroke-width', config.stroke_width ? config.stroke_width : config.flex_stroke_width).attr('stroke-linecap', 'round').attr('fill', 'none');

    var linePathsTrans = config.transitions ? linePaths.transition() : linePaths;
    linePathsTrans.attr('d', line);

    lineGroups.each(function assignMark(d) {
      var mark = d3.select(this.parentNode).datum();
      d.tooltip = mark.tooltip;
      d3.select(this).select('path').attr(mark.attributes);
    });

    lineGroups.select('title').text(function (d) {
      var tt = d.tooltip || '';
      return tt.replace(/\$x/g, xformat(d.values.x)).replace(/\$y/g, yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
        return d.values[0].values.raw[0][orig];
      });
    });

    return lineGroups;
  }

  function drawPoints(marks) {
    var _this = this;

    var config = this.config;

    var xformat = config.x.summary === 'percent' ? d3.format('0%') : config.x.type === 'time' ? d3.time.format(config.x.format) : d3.format(config.x.format);
    var yformat = config.y.summary === 'percent' ? d3.format('0%') : config.y.type === 'time' ? d3.time.format(config.y.format) : d3.format(config.y.format);

    var pointSuperGroups = this.svg.selectAll('.point-supergroup').data(marks, function (d, i) {
      return i + '-' + d.per.join('-');
    });
    pointSuperGroups.enter().append('g').attr('class', 'point-supergroup');
    pointSuperGroups.exit().remove();

    var points = pointSuperGroups.selectAll('.point').data(function (d) {
      return d.data;
    }, function (d) {
      return d.key;
    });
    var oldPoints = points.exit();

    var oldPointsTrans = config.transitions ? oldPoints.selectAll('circle').transition() : oldPoints.selectAll('circle');
    oldPointsTrans.attr('r', 0);

    var oldPointGroupTrans = config.transitions ? oldPoints.transition() : oldPoints;
    oldPointGroupTrans.remove();

    var nupoints = points.enter().append('g').attr('class', function (d) {
      return d.key + ' point';
    });
    nupoints.append('circle').attr('class', 'wc-data-mark').attr('r', 0);

    nupoints.append('title');

    // static attributes
    points.select('circle').attr('fill-opacity', config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : 0.6).attr('fill', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    }).attr('stroke', function (d) {
      return _this.colorScale(d.values.raw[0][config.color_by]);
    });

    // attach mark info
    points.each(function assignMark(d) {
      var mark = d3.select(this.parentNode).datum();
      d.mark = mark;
      d3.select(this).select('circle').attr(mark.attributes);
    });

    // animated attributes
    var pointsTrans = config.transitions ? points.select('circle').transition() : points.select('circle');

    pointsTrans.attr('r', function (d) {
      return d.mark.radius || config.flex_point_size;
    }).attr('cx', function (d) {
      var xPos = _this.x(d.values.x) || 0;
      return config.x.type === 'ordinal' ? xPos + _this.x.rangeBand() / 2 : xPos;
    }).attr('cy', function (d) {
      var yPos = _this.y(d.values.y) || 0;
      return config.y.type === 'ordinal' ? yPos + _this.y.rangeBand() / 2 : yPos;
    });

    points.select('title').text(function (d) {
      var tt = d.mark.tooltip || '';
      return tt.replace(/\$x/g, config.x.type === 'time' ? xformat(new Date(d.values.x)) : xformat(d.values.x)).replace(/\$y/g, config.y.type === 'time' ? yformat(new Date(d.values.y)) : yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
        return d.values.raw[0][orig];
      });
    });

    return points;
  }

  function drawText(marks) {
    var _this = this;

    var config = this.config;

    var textSupergroups = this.svg.selectAll('.text-supergroup').data(marks, function (d, i) {
      return i + '-' + d.per.join('-');
    });
    textSupergroups.enter().append('g').attr('class', 'text-supergroup');
    textSupergroups.exit().remove();

    var texts = textSupergroups.selectAll('.text').data(function (d) {
      return d.data;
    }, function (d) {
      return d.key;
    });
    var oldTexts = texts.exit();

    // don't need to transition position of outgoing text
    // const oldTextsTrans = config.transitions ? oldTexts.selectAll('text').transition() : oldTexts.selectAll('text');

    var oldTextGroupTrans = config.transitions ? oldTexts.transition() : oldTexts;
    oldTextGroupTrans.remove();

    var nutexts = texts.enter().append('g').attr('class', function (d) {
      return d.key + ' text';
    });
    nutexts.append('text').attr('class', 'wc-data-mark');
    // don't need to set initial location for incoming text

    // attach mark info
    function attachMarks(d) {
      d.mark = d3.select(this.parentNode).datum();
      d3.select(this).select('text').attr(d.mark.attributes);
    }
    texts.each(attachMarks);

    // parse text like tooltips
    texts.select('text').text(function (d) {
      var tt = d.mark.text || '';

      var xformat = config.x.summary === 'percent' ? d3.format('0%') : config.x.type === 'time' ? d3.time.format(config.x.format) : d3.format(config.x.format);

      var yformat = config.y.summary === 'percent' ? d3.format('0%') : config.y.type === 'time' ? d3.time.format(config.y.format) : d3.format(config.y.format);

      return tt.replace(/\$x/g, config.x.type === 'time' ? xformat(new Date(d.values.x)) : xformat(d.values.x)).replace(/\$y/g, config.y.type === 'time' ? yformat(new Date(d.values.y)) : yformat(d.values.y)).replace(/\[(.+?)\]/g, function (str, orig) {
        return d.values.raw[0][orig];
      });
    });

    // animated attributes
    var textsTrans = config.transitions ? texts.select('text').transition() : texts.select('text');

    textsTrans.attr('x', function (d) {
      var xPos = _this.x(d.values.x) || 0;
      return config.x.type === 'ordinal' ? xPos + _this.x.rangeBand() / 2 : xPos;
    }).attr('y', function (d) {
      var yPos = _this.y(d.values.y) || 0;
      return config.y.type === 'ordinal' ? yPos + _this.y.rangeBand() / 2 : yPos;
    });

    return texts;
  }

  function init (data) {
    var _this = this;

    if (d3.select(this.div).select('.loader').empty()) {
      d3.select(this.div).insert('div', ':first-child').attr('class', 'loader').selectAll('.blockG').data(d3.range(8)).enter().append('div').attr('class', function (d) {
        return 'blockG rotate' + (d + 1);
      });
    }

    this.wrap.attr('class', 'wc-chart');

    this.setDefaults();

    this.raw_data = data;

    this.events.onInit.call(this);
    if (this.raw_data.length) {
      this.checkRequired(this.raw_data);
    }

    // connect this chart and its controls, if any
    if (this.controls) {
      this.controls.targets.push(this);
      if (!this.controls.ready) {
        this.controls.init(this.raw_data);
      } else {
        this.controls.layout();
      }
    }

    // make sure container is visible (has height and width) before trying to initialize
    var visible = d3.select(this.div).property('offsetWidth') > 0;
    if (!visible) {
      (function () {
        console.warn('The chart cannot be initialized inside an element with 0 width.\n     The chart will be initialized as soon as the container element is given a width > 0.');
        var onVisible = setInterval(function () {
          var visibleNow = d3.select(_this.div).property('offsetWidth') > 0;
          if (visibleNow) {
            _this.layout();
            _this.wrap.datum(_this);
            _this.draw();
            clearInterval(onVisible);
          }
        }, 500);
      })();
    } else {
      this.layout();
      this.wrap.datum(this);
      this.draw();
    }

    return this;
  }

  function layout() {
    this.svg = this.wrap.append('svg').attr({
      'class': 'wc-svg',
      'xmlns': 'http://www.w3.org/2000/svg',
      'version': '1.1',
      'xlink': 'http://www.w3.org/1999/xlink'
    }).append('g').style('display', 'inline-block');

    var defs = this.svg.append('defs');
    defs.append('pattern').attr({
      'id': 'diagonal-stripes',
      'x': 0, 'y': 0, 'width': 3, 'height': 8, 'patternUnits': 'userSpaceOnUse', 'patternTransform': 'rotate(30)'
    }).append('rect').attr({
      'x': '0',
      'y': '0',
      'width': '2',
      'height': '8',
      'style': 'stroke:none; fill:black'
    });

    defs.append('clipPath').attr('id', this.id).append('rect').attr('class', 'plotting-area');

    // y axis
    this.svg.append('g').attr('class', 'y axis').append('text').attr('class', 'axis-title').attr('transform', 'rotate(-90)').attr('dy', '.75em').attr('text-anchor', 'middle');

    // x axis
    this.svg.append('g').attr('class', 'x axis').append('text').attr('class', 'axis-title').attr('dy', '-.35em').attr('text-anchor', 'middle');

    // overlay
    this.svg.append('rect').attr('class', 'overlay').attr('opacity', 0).attr('fill', 'none').style('pointer-events', 'all');

    // add legend
    var legend = this.wrap.append('ul');
    legend.attr('class', 'legend').style('vertical-align', 'top').append('span').attr('class', 'legend-title');

    d3.select(this.div).select('.loader').remove();

    this.events.onLayout.call(this);
  }

  function makeLegend() {
    var scale = arguments.length <= 0 || arguments[0] === undefined ? this.colorScale : arguments[0];
    var label = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var customData = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var config = this.config;

    config.legend.mark = config.legend.mark ? config.legend.mark : config.marks.length && config.marks[0].type === 'bar' ? 'square' : config.marks.length ? config.marks[0].type : 'square';

    var legendLabel = Boolean(label) ? label : typeof config.legend.label === 'string' ? config.legend.label : '';

    var legendOriginal = this.legend || this.wrap.select('.legend');
    var legend = legendOriginal;

    if (this.config.legend.location === 'top' || this.config.legend.location === 'left') {
      this.wrap.node().insertBefore(legendOriginal.node(), this.svg.node().parentNode);
    } else {
      this.wrap.node().appendChild(legendOriginal.node());
    }
    legend.style('padding', 0);

    var legendData = customData || scale.domain().slice(0).filter(function (f) {
      return f !== undefined && f !== null;
    }).map(function (m) {
      return { label: m, mark: config.legend.mark };
    });

    legend.select('.legend-title').text(legendLabel).style('display', legendLabel ? 'inline' : 'none').style('margin-right', '1em');

    var legParts = legend.selectAll('.legend-item').data(legendData, function (d) {
      return d.label + d.mark;
    });

    legParts.exit().remove();

    var legendPartDisplay = this.config.legend.location === 'bottom' || this.config.legend.location === 'top' ? 'inline-block' : 'block';
    var newParts = legParts.enter().append('li').attr('class', 'legend-item').style({ 'list-style-type': 'none', 'margin-right': '1em' });
    newParts.append('span').attr('class', 'legend-mark-text').style('color', function (d) {
      return scale(d.label);
    });
    newParts.append('svg').attr('class', 'legend-color-block').attr('width', '1.1em').attr('height', '1.1em').style({
      'position': 'relative',
      'top': '0.2em'
    });

    legParts.style('display', legendPartDisplay);

    if (config.legend.order) {
      legParts.sort(function (a, b) {
        return d3.ascending(config.legend.order.indexOf(a.label), config.legend.order.indexOf(b.label));
      });
    }

    legParts.selectAll('.legend-color-block').select('.legend-mark').remove();
    legParts.selectAll('.legend-color-block').each(function addSVG(e) {
      var svg = d3.select(this);
      if (e.mark === 'circle') {
        svg.append('circle').attr({
          'cx': '.5em',
          'cy': '.45em',
          'r': '.45em',
          'class': 'legend-mark'
        });
      } else if (e.mark === 'line') {
        svg.append('line').attr({
          'x1': 0,
          'y1': '.5em',
          'x2': '1em',
          'y2': '.5em',
          'stroke-width': 2,
          'shape-rendering': 'crispEdges',
          'class': 'legend-mark'
        });
      } else if (e.mark === 'square') {
        svg.append('rect').attr({
          'height': '1em',
          'width': '1em',
          'class': 'legend-mark',
          'shape-rendering': 'crispEdges'
        });
      }
    });

    legParts.selectAll('.legend-color-block').select('.legend-mark').attr('fill', function (d) {
      return d.color || scale(d.label);
    }).attr('stroke', function (d) {
      return d.color || scale(d.label);
    }).each(function addAttr(e) {
      d3.select(this).attr(e.attributes);
    });

    newParts.append('span').attr('class', 'legend-label').style('margin-left', '0.25em').text(function (d) {
      return d.label;
    });

    if (scale.domain().length > 0) {
      var legendDisplay = this.config.legend.location === 'bottom' || this.config.legend.location === 'top' ? 'block' : 'inline-block';
      legend.style('display', legendDisplay);
    } else {
      legend.style('display', 'none');
    }

    this.legend = legend;
  }

  function resize() {
    var config = this.config;

    var aspect2 = 1 / config.aspect;
    var divWidth = parseInt(this.wrap.style('width'), 10);
    var maxWidth = config.max_width ? config.max_width : divWidth;
    var preWidth = !config.resizable ? config.width : !maxWidth || divWidth < maxWidth ? divWidth : this.raw_width;

    this.textSize(preWidth);

    this.margin = this.setMargins();

    var svgWidth = config.x.type === 'ordinal' && +config.range_band ? this.raw_width + this.margin.left + this.margin.right : !config.resizable ? this.raw_width : !config.max_width || divWidth < config.max_width ? divWidth : this.raw_width;
    this.plot_width = svgWidth - this.margin.left - this.margin.right;
    var svgHeight = config.y.type === 'ordinal' && +config.range_band ? this.raw_height + this.margin.top + this.margin.bottom : !config.resizable && config.height ? config.height : !config.resizable ? svgWidth * aspect2 : this.plot_width * aspect2;
    this.plot_height = svgHeight - this.margin.top - this.margin.bottom;

    d3.select(this.svg.node().parentNode).attr('width', svgWidth).attr('height', svgHeight).select('g').attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

    this.svg.select('.overlay').attr('width', this.plot_width).attr('height', this.plot_height).classed('zoomable', config.zoomable);

    this.svg.select('.plotting-area').attr('width', this.plot_width).attr('height', this.plot_height + 1).attr('transform', 'translate(0, -1)');

    this.xScaleAxis();
    this.yScaleAxis();

    var gXAxis = this.svg.select('.x.axis');
    var gYAxis = this.svg.select('.y.axis');
    var xAxisLabel = gXAxis.select('.axis-title');
    var yAxisLabel = gYAxis.select('.axis-title');

    if (config.x_location !== 'top') {
      gXAxis.attr('transform', 'translate(0, ' + this.plot_height + ')');
    }
    var gXAxisTrans = config.transitions ? gXAxis.transition() : gXAxis;
    gXAxisTrans.call(this.xAxis);
    var gYAxisTrans = config.transitions ? gYAxis.transition() : gYAxis;
    gYAxisTrans.call(this.yAxis);

    xAxisLabel.attr('transform', 'translate(' + this.plot_width / 2 + ', ' + (this.margin.bottom - 2) + ')');
    yAxisLabel.attr('x', -1 * this.plot_height / 2).attr('y', -1 * this.margin.left);

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
      colordom = colordom.sort(naturalSorter);
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
    this.config.legend.location = this.config.legend.location !== undefined ? this.config.legend.location : 'bottom';
    this.config.marks = this.config.marks && this.config.marks.length ? this.config.marks : [{}];

    this.config.date_format = this.config.date_format || '%x';

    this.config.padding = this.config.padding !== undefined ? this.config.padding : 0.3;
    this.config.outer_pad = this.config.outer_pad !== undefined ? this.config.outer_pad : 0.1;

    this.config.resizable = this.config.resizable !== undefined ? this.config.resizable : true;

    this.config.aspect = this.config.aspect || 1.33;

    this.config.colors = this.config.colors || ['rgb(102,194,165)', 'rgb(252,141,98)', 'rgb(141,160,203)', 'rgb(231,138,195)', 'rgb(166,216,84)', 'rgb(255,217,47)', 'rgb(229,196,148)', 'rgb(179,179,179)'];

    this.config.scale_text = this.config.scale_text === undefined ? true : this.config.scale_text;
    this.config.transitions = this.config.transitions === undefined ? true : this.config.transitions;
  }

  function setMargins() {
    var _this = this;

    var yTicks = this.yAxis.tickFormat() ? this.y.domain().map(function (m) {
      return _this.yAxis.tickFormat()(m);
    }) : this.y.domain();

    var maxYTextLength = Math.max.apply(null, yTicks.map(function (m) {
      return String(m).length;
    }));
    if (this.config.y_format && this.config.y_format.indexOf('%') > -1) {
      maxYTextLength += 1;
    }
    maxYTextLength = Math.max(2, maxYTextLength);
    var xLabelOn = this.config.x.label ? 1.5 : 0;
    var yLabelOn = this.config.y.label ? 1.5 : 0.25;
    var fontSize = parseInt(this.wrap.style('font-size'), 10);
    var yMargin = maxYTextLength * fontSize * 0.5 + fontSize * yLabelOn * 1.5 || fontSize;
    var xMargin = fontSize + fontSize / 1.5 + fontSize * xLabelOn || fontSize;

    yMargin += 6;
    xMargin += 3;

    return {
      top: this.config.margin && this.config.margin.top ? this.config.margin.top : fontSize,
      right: this.config.margin && this.config.margin.right ? this.config.margin.right : fontSize,
      bottom: this.config.margin && this.config.margin.bottom ? this.config.margin.bottom : xMargin,
      left: this.config.margin && this.config.margin.left ? this.config.margin.left : yMargin
    };
  }

  function textSize(width) {
    var fontSize = '14px';
    var pointSize = 4;
    var strokeWidth = 2;

    if (!this.config.scale_text) {
      fontSize = this.config.fontSize;
      pointSize = this.config.pointSize || 4;
      strokeWidth = this.config.strokeWidth || 2;
    } else if (width >= 600) {
      fontSize = '14px';
      pointSize = 4;
      strokeWidth = 2;
    } else if (width > 450 && width < 600) {
      fontSize = '12px';
      pointSize = 3;
      strokeWidth = 2;
    } else if (width > 300 && width < 450) {
      fontSize = '10px';
      pointSize = 2;
      strokeWidth = 2;
    } else if (width <= 300) {
      fontSize = '10px';
      pointSize = 2;
      strokeWidth = 1;
    }

    this.wrap.style('font-size', fontSize);
    this.config.flex_point_size = pointSize;
    this.config.flex_stroke_width = strokeWidth;
  }

  var stats = {
    min: d3.min,
    max: d3.max,
    mean: d3.mean,
    median: d3.median,
    sum: d3.sum
  };

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
    var mathed = stat === 'count' ? vals.length : stat === 'percent' ? vals.length : stats[stat](nvals);

    return mathed;
  }

  function transformData(rawData, mark) {
    var _this = this;

    var config = this.config;
    var xBehavior = config.x.behavior || 'raw';
    var yBehavior = config.y.behavior || 'raw';
    var sublevel = mark.type === 'line' ? config.x.column : mark.type === 'bar' && mark.split ? mark.split : null;
    var dateConvert = d3.time.format(config.date_format);
    var totalOrder = void 0;
    var raw = rawData;

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

    raw = mark.per && mark.per.length ? raw.filter(function (f) {
      return f[mark.per[0]];
    }) : raw;

    // make sure data has x and y values
    if (config.x.column) {
      raw = raw.filter(function (f) {
        return f[config.x.column] !== undefined;
      });
    }
    if (config.y.column) {
      raw = raw.filter(function (f) {
        return f[config.y.column] !== undefined;
      });
    }

    if (config.x.type === 'time') {
      raw = raw.filter(function (f) {
        return f[config.x.column] instanceof Date ? f[config.x.column] : dateConvert.parse(f[config.x.column]);
      });
      raw.forEach(function (e) {
        e[config.x.column] = e[config.x.column] instanceof Date ? e[config.x.column] : dateConvert.parse(e[config.x.column]);
      });
    }
    if (config.y.type === 'time') {
      raw = raw.filter(function (f) {
        return f[config.y.column] instanceof Date ? f[config.y.column] : dateConvert.parse(f[config.y.column]);
      });
      raw.forEach(function (e) {
        e[config.y.column] = e[config.y.column] instanceof Date ? e[config.y.column] : dateConvert.parse(e[config.y.column]);
      });
    }

    if ((config.x.type === 'linear' || config.x.type === 'log') && config.x.column) {
      raw = raw.filter(function (f) {
        return mark.summarizeX !== 'count' && mark.summarizeX !== 'percent' ? +f[config.x.column] || +f[config.x.column] === 0 : f;
      });
    }
    if ((config.y.type === 'linear' || config.y.type === 'log') && config.y.column) {
      raw = raw.filter(function (f) {
        return mark.summarizeY !== 'count' && mark.summarizeY !== 'percent' ? +f[config.y.column] || +f[config.y.column] === 0 : f;
      });
    }

    var rawNest = void 0;

    function makeNest(entries, sublevelKey) {
      var domXs = [];
      var domYs = [];
      var thisNest = d3.nest();

      if (config.x.type === 'linear' && config.x.bin || config.y.type === 'linear' && config.y.bin) {
        (function () {
          var xy = config.x.type === 'linear' && config.x.bin ? 'x' : 'y';
          var quant = d3.scale.quantile().domain(d3.extent(entries.map(function (m) {
            return +m[config[xy].column];
          }))).range(d3.range(+config[xy].bin));

          entries.forEach(function (e) {
            e.wc_bin = quant(e[config[xy].column]);
          });

          thisNest.key(function (d) {
            return quant.invertExtent(d.wc_bin);
          });
        })();
      } else {
        thisNest.key(function (d) {
          return mark.per.map(function (m) {
            return d[m];
          }).join(' ');
        });
      }

      if (sublevelKey) {
        thisNest.key(function (d) {
          return d[sublevelKey];
        });
        thisNest.sortKeys(function (a, b) {
          return config.x.type === 'time' ? d3.ascending(new Date(a), new Date(b)) : config.x_dom ? d3.ascending(config.x_dom.indexOf(a), config.x_dom.indexOf(b)) : sublevelKey === config.color_by && config.legend.order ? d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)) : config.x.type === 'ordinal' || config.y.type === 'ordinal' ? naturalSorter(a, b) : d3.ascending(+a, +b);
        });
      }
      thisNest.rollup(function (r) {
        var obj = { raw: r };
        var yVals = r.map(function (m) {
          return m[config.y.column];
        }).sort(d3.ascending);
        var xVals = r.map(function (m) {
          return m[config.x.column];
        }).sort(d3.ascending);
        obj.x = config.x.type === 'ordinal' ? r[0][config.x.column] : summarize(xVals, mark.summarizeX);
        obj.y = config.y.type === 'ordinal' ? r[0][config.y.column] : summarize(yVals, mark.summarizeY);

        obj.x_q25 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(xVals, 0.25) : obj.x;
        obj.x_q75 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(xVals, 0.75) : obj.x;
        obj.y_q25 = config.error_bars ? d3.quantile(yVals, 0.25) : obj.y;
        obj.y_q75 = config.error_bars ? d3.quantile(yVals, 0.75) : obj.y;
        domXs.push([obj.x_q25, obj.x_q75, obj.x]);
        domYs.push([obj.y_q25, obj.y_q75, obj.y]);

        if (mark.summarizeY === 'cumulative') {
          var interm = entries.filter(function (f) {
            return config.x.type === 'time' ? new Date(f[config.x.column]) <= new Date(r[0][config.x.column]) : +f[config.x.column] <= +r[0][config.x.column];
          });
          if (mark.per.length) {
            interm = interm.filter(function (f) {
              return f[mark.per[0]] === r[0][mark.per[0]];
            });
          }

          var cumul = config.x.type === 'time' ? interm.length : d3.sum(interm.map(function (m) {
            return +m[config.y.column] || +m[config.y.column] === 0 ? +m[config.y.column] : 1;
          }));

          domYs.push([cumul]);
          obj.y = cumul;
        }
        if (mark.summarizeX === 'cumulative') {
          var _interm = entries.filter(function (f) {
            return config.y.type === 'time' ? new Date(f[config.y.column]) <= new Date(r[0][config.y.column]) : +f[config.y.column] <= +r[0][config.y.column];
          });
          if (mark.per.length) {
            _interm = _interm.filter(function (f) {
              return f[mark.per[0]] === r[0][mark.per[0]];
            });
          }
          domXs.push([_interm.length]);
          obj.x = _interm.length;
        }

        return obj;
      });

      var test = thisNest.entries(entries);

      var domX = d3.extent(d3.merge(domXs));
      var domY = d3.extent(d3.merge(domYs));

      if (sublevelKey && mark.type === 'bar' && mark.arrange === 'stacked') {
        test.forEach(calcStartTotal);
        if (config.x.type === 'ordinal' || config.x.type === 'linear' && config.x.bin) {
          domY = d3.extent(test.map(function (m) {
            return m.total;
          }));
        }
        if (config.y.type === 'ordinal' || config.y.type === 'linear' && config.y.bin) {
          domX = d3.extent(test.map(function (m) {
            return m.total;
          }));
        }
      } else if (sublevelKey && mark.type === 'bar' && mark.split) {
        test.forEach(calcStartTotal);
      } else {
        (function () {
          var axis = config.x.type === 'ordinal' || config.x.type === 'linear' && config.x.bin ? 'y' : 'x';
          test.forEach(function (e) {
            e.total = e.values[axis];
          });
        })();
      }

      if (config.x.sort === 'total-ascending' && config.x.type === 'ordinal' || config.y.sort === 'total-descending' && config.y.type === 'ordinal') {
        totalOrder = test.sort(function (a, b) {
          return d3.ascending(a.total, b.total);
        }).map(function (m) {
          return m.key;
        });
      } else if (config.x.sort === 'total-descending' && config.x.type === 'ordinal' || config.y.sort === 'total-ascending' && config.y.type === 'ordinal') {
        totalOrder = test.sort(function (a, b) {
          return d3.descending(+a.total, +b.total);
        }).map(function (m) {
          return m.key;
        });
      }

      return { nested: test, dom_x: domX, dom_y: domY };
    }

    if (mark.type === 'bar') {
      rawNest = mark.arrange !== 'stacked' ? makeNest(raw, sublevel) : makeNest(raw);
    } else if (mark.summarizeX === 'count' || mark.summarizeY === 'count') {
      rawNest = makeNest(raw);
    }

    var rawDomX = mark.summarizeX === 'cumulative' ? [0, raw.length] : config.x.type === 'ordinal' ? d3.set(raw.map(function (m) {
      return m[config.x.column];
    })).values().filter(function (f) {
      return f;
    }) : mark.split && mark.arrange !== 'stacked' ? d3.extent(d3.merge(rawNest.nested.map(function (m) {
      return m.values.map(function (p) {
        return p.values.raw.length;
      });
    }))) : mark.summarizeX === 'count' ? d3.extent(rawNest.nested.map(function (m) {
      return m.values.raw.length;
    })) : d3.extent(raw.map(function (m) {
      return +m[config.x.column];
    }).filter(function (f) {
      return +f || +f === 0;
    }));

    var rawDomY = mark.summarizeY === 'cumulative' ? [0, raw.length] : config.y.type === 'ordinal' ? d3.set(raw.map(function (m) {
      return m[config.y.column];
    })).values().filter(function (f) {
      return f;
    }) : mark.split && mark.arrange !== 'stacked' ? d3.extent(d3.merge(rawNest.nested.map(function (m) {
      return m.values.map(function (p) {
        return p.values.raw.length;
      });
    }))) : mark.summarizeY === 'count' ? d3.extent(rawNest.nested.map(function (m) {
      return m.values.raw.length;
    })) : d3.extent(raw.map(function (m) {
      return +m[config.y.column];
    }).filter(function (f) {
      return +f || +f === 0;
    }));

    var filtered = raw;

    var filt1Xs = [];
    var filt1Ys = [];
    if (this.filters.length) {
      this.filters.forEach(function (e) {
        filtered = filtered.filter(function (d) {
          return e.val === 'All' ? d : e.val instanceof Array ? e.val.indexOf(d[e.col]) > -1 : d[e.col] === e.val;
        });
      });
      // get domain for all non-All values of first filter
      if (config.x.behavior === 'firstfilter' || config.y.behavior === 'firstfilter') {
        this.filters[0].choices.filter(function (f) {
          return f !== 'All';
        }).forEach(function (e) {
          var perfilter = raw.filter(function (f) {
            return f[_this.filters[0].col] === e;
          });
          var filtNested = makeNest(perfilter, sublevel);
          filt1Xs.push(filtNested.domX);
          filt1Ys.push(filtNested.domY);
        });
      }
    }

    // filter on mark-specific instructions
    if (mark.values) {
      var _loop = function _loop(a) {
        if (Object.hasOwnProperty.call(mark.values, a)) {
          filtered = filtered.filter(function (f) {
            return mark.values[a].indexOf(f[a]) > -1;
          });
        }
      };

      for (var a in mark.values) {
        _loop(a);
      }
    }

    var filt1DomX = d3.extent(d3.merge(filt1Xs));
    var filt1DomY = d3.extent(d3.merge(filt1Ys));

    this.filtered_data = filtered;

    var currentNested = makeNest(filtered, sublevel);

    var flexDomX = currentNested.dom_x;
    var flexDomY = currentNested.dom_y;

    if (mark.type === 'bar') {
      if (config.y.type === 'ordinal' && mark.summarizeX === 'count') {
        config.x.domain = config.x.domain ? [0, config.x.domain[1]] : [0, null];
      } else if (config.x.type === 'ordinal' && mark.summarizeY === 'count') {
        config.y.domain = config.y.domain ? [0, config.y.domain[1]] : [0, null];
      }
    }

    // several criteria must be met in order to use the 'firstfilter' domain
    var nonall = Boolean(this.filters.length && this.filters[0].val !== 'All' && this.filters.slice(1).filter(function (f) {
      return f.val === 'All';
    }).length === this.filters.length - 1);

    var preXDom = !this.filters.length ? flexDomX : xBehavior === 'raw' ? rawDomX : nonall && xBehavior === 'firstfilter' ? filt1DomX : flexDomX;
    var preYDom = !this.filters.length ? flexDomY : yBehavior === 'raw' ? rawDomY : nonall && yBehavior === 'firstfilter' ? filt1DomY : flexDomY;

    var xDom = config.x.type === 'ordinal' && config.x.behavior === 'flex' ? d3.set(filtered.map(function (m) {
      return m[config.x.column];
    })).values() : config.x.type === 'ordinal' ? d3.set(raw.map(function (m) {
      return m[config.x.column];
    })).values() : config.x_from0 ? [0, d3.max(preXDom)] : preXDom;

    var yDom = config.y.domain ? config.y.domain : config.y.type === 'ordinal' && config.y.behavior === 'flex' ? d3.set(filtered.map(function (m) {
      return m[config.y.column];
    })).values() : config.y.type === 'ordinal' ? d3.set(raw.map(function (m) {
      return m[config.y.column];
    })).values() : config.y_from0 ? [0, d3.max(preYDom)] : preYDom;

    if (config.x.domain && (config.x.domain[0] || config.x.domain[0] === 0)) {
      xDom[0] = config.x.domain[0];
    }
    if (config.x.domain && (config.x.domain[1] || config.x.domain[1] === 0)) {
      xDom[1] = config.x.domain[1];
    }
    if (config.y.domain && (config.y.domain[0] || config.y.domain[0] === 0)) {
      yDom[0] = config.y.domain[0];
    }
    if (config.y.domain && (config.y.domain[1] || config.y.domain[1] === 0)) {
      yDom[1] = config.y.domain[1];
    }

    if (config.x.type === 'ordinal' && !config.x.order) {
      config.x.order = totalOrder;
    }
    if (config.y.type === 'ordinal' && !config.y.order) {
      config.y.order = totalOrder;
    }

    this.current_data = currentNested.nested;

    this.events.onDatatransform.call(this);

    return { data: currentNested.nested, x_dom: xDom, y_dom: yDom };
  }

  function updateDataMarks() {
    this.drawBars(this.marks.filter(function (f) {
      return f.type === 'bar';
    }));
    this.drawLines(this.marks.filter(function (f) {
      return f.type === 'line';
    }));
    this.drawPoints(this.marks.filter(function (f) {
      return f.type === 'circle';
    }));
    this.drawText(this.marks.filter(function (f) {
      return f.type === 'text';
    }));
  }

  function xScaleAxis() {
    var maxRange = arguments.length <= 0 || arguments[0] === undefined ? this.plot_width : arguments[0];
    var domain = arguments.length <= 1 || arguments[1] === undefined ? this.x_dom : arguments[1];
    var type = arguments.length <= 2 || arguments[2] === undefined ? this.config.x.type : arguments[2];

    var config = this.config;
    var x = void 0;

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
      x.rangeBands([0, +maxRange], config.padding, config.outer_pad);
    } else {
      x.range([0, +maxRange]).clamp(Boolean(config.x.clamp));
    }

    var axisFormat = config.x.format ? config.x.format : config.marks.map(function (m) {
      return m.summarizeX === 'percent';
    }).indexOf(true) > -1 ? '0%' : type === 'time' ? '%x' : '.0f';
    var tickCount = Math.max(2, Math.min(maxRange / 80, 8));
    var xAxis = d3.svg.axis().scale(x).orient(config.x.location).ticks(tickCount).tickFormat(type === 'ordinal' ? null : type === 'time' ? d3.time.format(axisFormat) : d3.format(axisFormat)).tickValues(config.x.ticks ? config.x.ticks : null).innerTickSize(6).outerTickSize(3);

    this.svg.select('g.x.axis').attr('class', 'x axis ' + type);
    this.x = x;
    this.xAxis = xAxis;
  }

  function yScaleAxis() {
    var maxRange = arguments.length <= 0 || arguments[0] === undefined ? this.plot_height : arguments[0];
    var domain = arguments.length <= 1 || arguments[1] === undefined ? this.y_dom : arguments[1];
    var type = arguments.length <= 2 || arguments[2] === undefined ? this.config.y.type : arguments[2];

    var config = this.config;
    var y = void 0;

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
      y.rangeBands([+maxRange, 0], config.padding, config.outer_pad);
    } else {
      y.range([+maxRange, 0]).clamp(Boolean(config.y_clamp));
    }

    var yFormat = config.y.format ? config.y.format : config.marks.map(function (m) {
      return m.summarizeY === 'percent';
    }).indexOf(true) > -1 ? '0%' : '.0f';
    var tickCount = Math.max(2, Math.min(maxRange / 80, 8));
    var yAxis = d3.svg.axis().scale(y).orient('left').ticks(tickCount).tickFormat(type === 'ordinal' ? null : type === 'time' ? d3.time.format(yFormat) : d3.format(yFormat)).tickValues(config.y.ticks ? config.y.ticks : null).innerTickSize(6).outerTickSize(3);

    this.svg.select('g.y.axis').attr('class', 'y axis ' + type);

    this.y = y;
    this.yAxis = yAxis;
  }

  var chartProto = {
    raw_data: [],
    config: {}
  };

  var chart = Object.create(chartProto, {
    'checkRequired': { value: checkRequired },
    'consolidateData': { value: consolidateData },
    'draw': { value: draw },
    'drawArea': { value: drawArea },
    'drawBars': { value: drawBars },
    'drawGridlines': { value: drawGridlines },
    'drawLines': { value: drawLines },
    'drawPoints': { value: drawPoints },
    'drawText': { value: drawText },
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

  var chartCount = 0;

  function createChart() {
    var element = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var controls = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var thisChart = Object.create(chart);

    function onEvent(event, callback) {
      var possibleEvents = ['init', 'layout', 'preprocess', 'datatransform', 'draw', 'resize'];
      if (possibleEvents.indexOf(event) < 0) {
        return;
      }
      if (callback) {
        thisChart.events['on' + (event.charAt(0).toUpperCase() + event.slice(1))] = callback;
      }
    }

    thisChart.div = element;

    thisChart.config = Object.create(config);

    thisChart.controls = controls;

    thisChart.raw_data = [];

    thisChart.filters = [];

    thisChart.marks = [];

    thisChart.wrap = d3.select(thisChart.div).append('div');

    thisChart.events = {
      onInit: function onInit() {},
      onLayout: function onLayout() {},
      onPreprocess: function onPreprocess() {},
      onDatatransform: function onDatatransform() {},
      onDraw: function onDraw() {},
      onResize: function onResize() {}
    };

    thisChart.on = onEvent;

    // increment thisChart count to get unique thisChart id
    chartCount++;

    thisChart.id = chartCount;

    return thisChart;
  }

  function stringAccessor(o, s, v) {
    // adapted from http://jsfiddle.net/alnitak/hEsys/
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

  function changeOption(option, value, callback) {
    this.targets.forEach(function (e) {
      if (option instanceof Array) {
        option.forEach(function (o) {
          return stringAccessor(e.config, o, value);
        });
      } else {
        stringAccessor(e.config, option, value);
      }
      // call callback function if provided
      if (callback) {
        callback();
      }
      e.draw();
    });
  }

  function checkRequired$1(dataset) {
    if (!dataset[0] || !this.config.inputs) {
      return;
    }
    var colnames = Object.keys(dataset[0]);
    this.config.inputs.forEach(function (e) {
      if (e.type === 'subsetter' && colnames.indexOf(e.value_col) === -1) {
        throw new Error('Error in settings object: the value "' + e.value_col + '" does not match any column in the provided dataset.');
      }
    });
  }

  function controlUpdate() {
    var _this = this;

    if (this.config.inputs && this.config.inputs.length && this.config.inputs[0]) {
      this.config.inputs.forEach(function (e) {
        return _this.makeControlItem(e);
      });
    }
  }

  function init$1(data) {
    this.data = data;
    this.checkRequired(this.data);
    this.layout();
  }

  function layout$1() {
    this.wrap.selectAll('*').remove();
    this.ready = true;
    this.controlUpdate();
  }

  function makeControlItem(control) {
    var controlWrap = this.wrap.append('div').attr('class', 'control-group').classed('inline', control.inline).datum(control);
    var controlLabel = controlWrap.append('span').attr('class', 'control-label').text(control.label);
    if (control.required) {
      controlLabel.append('span').attr('class', 'label label-required').text('Required');
    }
    controlWrap.append('span').attr('class', 'span-description').text(control.description);

    if (control.type === 'text') {
      this.makeTextControl(control, controlWrap);
    } else if (control.type === 'number') {
      this.makeNumberControl(control, controlWrap);
    } else if (control.type === 'list') {
      this.makeListControl(control, controlWrap);
    } else if (control.type === 'dropdown') {
      this.makeDropdownControl(control, controlWrap);
    } else if (control.type === 'btngroup') {
      this.makeBtnGroupControl(control, controlWrap);
    } else if (control.type === 'checkbox') {
      this.makeCheckboxControl(control, controlWrap);
    } else if (control.type === 'radio') {
      this.makeRadioControl(control, controlWrap);
    } else if (control.type === 'subsetter') {
      this.makeSubsetterControl(control, controlWrap);
    } else {
      throw new Error('Each control must have a type! Choose from: "text", "number",\n     "list", "dropdown", "btngroup", "checkbox", "radio", "subsetter"');
    }
  }

  function makeBtnGroupControl(control, controlWrap) {
    var _this = this;

    var optionData = control.values ? control.values : d3.keys(this.data[0]);

    var btnWrap = controlWrap.append('div').attr('class', 'btn-group');

    var changers = btnWrap.selectAll('button').data(optionData).enter().append('button').attr('class', 'btn btn-default btn-sm').text(function (d) {
      return d;
    }).classed('btn-primary', function (d) {
      return stringAccessor(_this.targets[0].config, control.option) === d;
    });

    changers.on('click', function (d) {
      changers.each(function toggleClass(e) {
        d3.select(this).classed('btn-primary', e === d);
      });
      _this.changeOption(control.option, d, control.callback);
    });
  }

  function makeCheckboxControl(control, controlWrap) {
    var _this = this;

    var changer = controlWrap.append('input').attr('type', 'checkbox').attr('class', 'changer').datum(control).property('checked', function () {
      return stringAccessor(_this.targets[0].config, control.option);
    });

    changer.on('change', function (d) {
      var value = changer.property('checked');
      _this.changeOption(d.option, value, control.callback);
    });
  }

  function makeDropdownControl (control, controlWrap) {
    var _this = this;

    var mainOption = control.option || control.options[0];
    var changer = controlWrap.append('select').attr('class', 'changer').attr('multiple', control.multiple ? true : null).datum(control);

    var optionValues = control.values && control.values instanceof Array ? control.values : control.values ? d3.set(this.data.map(function (m) {
      return m[_this.targets[0].config[control.values]];
    })).values() : d3.keys(this.data[0]);

    if (!control.require || control.none) {
      optionValues.unshift('None');
    }

    var options = changer.selectAll('option').data(optionValues).enter().append('option').text(function (d) {
      return d;
    }).property('selected', function (d) {
      return stringAccessor(_this.targets[0].config, mainOption) === d;
    });

    changer.on('change', function () {
      var value = changer.property('value') === 'None' ? null : changer.property('value');

      if (control.multiple) {
        value = options.filter(function isSelected() {
          return d3.select(this).property('selected');
        })[0].map(function (m) {
          return d3.select(m).property('value');
        }).filter(function (f) {
          return f !== 'None';
        });
      }

      if (control.options) {
        _this.changeOption(control.options, value, control.callback);
      } else {
        _this.changeOption(control.option, value, control.callback);
      }
    });

    return changer;
  }

  function makeListControl(control, controlWrap) {
    var _this = this;

    var changer = controlWrap.append('input').attr('type', 'text').attr('class', 'changer').datum(control).property('value', function () {
      return stringAccessor(_this.targets[0].config, control.option);
    });

    changer.on('change', function () {
      var value = changer.property('value') ? changer.property('value').split(',').map(function (m) {
        return m.trim();
      }) : null;
      _this.changeOption(control.option, value, control.callback);
    });
  }

  function makeNumberControl(control, controlWrap) {
    var _this = this;

    var changer = controlWrap.append('input').attr('type', 'number').attr('min', control.min !== undefined ? control.min : 0).attr('max', control.max).attr('step', control.step || 1).attr('class', 'changer').datum(control).property('value', function () {
      return stringAccessor(_this.targets[0].config, control.option);
    });

    changer.on('change', function () {
      var value = +changer.property('value');
      _this.changeOption(control.option, value, control.callback);
    });
  }

  function makeRadioControl(control, controlWrap) {
    var _this = this;

    var changers = controlWrap.selectAll('label').data(control.values || d3.keys(this.data[0])).enter().append('label').attr('class', 'radio').text(function (d, i) {
      return control.relabels ? control.relabels[i] : d;
    }).append('input').attr('type', 'radio').attr('class', 'changer').attr('name', control.option.replace('.', '-') + '-' + this.targets[0].id).property('value', function (d) {
      return d;
    }).property('checked', function (d) {
      return stringAccessor(_this.targets[0].config, control.option) === d;
    });

    changers.on('change', function () {
      var value = null;
      changers.each(function isChecked(c) {
        if (d3.select(this).property('checked')) {
          value = d3.select(this).property('value') === 'none' ? null : c;
        }
      });
      _this.changeOption(control.option, value, control.callback);
    });
  }

  function makeSubsetterControl(control, controlWrap) {
    var targets = this.targets;
    var changer = controlWrap.append('select').attr('class', 'changer').attr('multiple', control.multiple ? true : null).datum(control);

    var optionData = control.values ? control.values : d3.set(this.data.map(function (m) {
      return m[control.value_col];
    }).filter(function (f) {
      return f;
    })).values();
    optionData.sort(naturalSorter);

    control.start = control.start ? control.start : control.loose ? optionData[0] : null;

    if (!control.multiple && !control.start) {
      optionData.unshift('All');
    }

    control.loose = !control.loose && control.start ? true : control.loose;

    var options = changer.selectAll('option').data(optionData).enter().append('option').text(function (d) {
      return d;
    }).property('selected', function (d) {
      return d === control.start;
    });

    targets.forEach(function (e) {
      var match = e.filters.slice().map(function (m) {
        return m.col === control.value_col;
      }).indexOf(true);
      if (match > -1) {
        e.filters[match] = { col: control.value_col, val: control.start ? control.start : 'All', choices: optionData, loose: control.loose };
      } else {
        e.filters.push({ col: control.value_col, val: control.start ? control.start : 'All', choices: optionData, loose: control.loose });
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

    changer.on('change', function subsetChange() {
      var _this = this;

      if (control.multiple) {
        (function () {
          var values = options.filter(function filterSelected() {
            return d3.select(this).property('selected');
          })[0].map(function (m) {
            return d3.select(m).property('text');
          });

          var newFilter = { col: control.value_col, val: values, choices: optionData, loose: control.loose };
          targets.forEach(function (e) {
            setSubsetter(e, newFilter);
            // call callback function if provided
            if (control.callback) {
              control.callback();
            }
            e.draw();
          });
        })();
      } else {
        (function () {
          var value = d3.select(_this).select('option:checked').property('text');
          var newFilter = { col: control.value_col, val: value, choices: optionData, loose: control.loose };
          targets.forEach(function (e) {
            setSubsetter(e, newFilter);
            // call callback function if provided
            if (control.callback) {
              control.callback();
            }
            e.draw();
          });
        })();
      }
    });
  }

  function makeTextControl (control, controlWrap) {
    var _this = this;

    var changer = controlWrap.append('input').attr('type', 'text').attr('class', 'changer').datum(control).property('value', function () {
      return stringAccessor(_this.targets[0].config, control.option);
    });

    changer.on('change', function () {
      var value = changer.property('value');
      _this.changeOption(control.option, value, control.callback);
    });
  }

  var controls = {
    changeOption: changeOption,
    checkRequired: checkRequired$1,
    controlUpdate: controlUpdate,
    init: init$1,
    layout: layout$1,
    makeControlItem: makeControlItem,
    makeBtnGroupControl: makeBtnGroupControl,
    makeCheckboxControl: makeCheckboxControl,
    makeDropdownControl: makeDropdownControl,
    makeListControl: makeListControl,
    makeNumberControl: makeNumberControl,
    makeRadioControl: makeRadioControl,
    makeSubsetterControl: makeSubsetterControl,
    makeTextControl: makeTextControl
  };

  function createControls() {
    var element = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var thisControls = Object.create(controls);

    thisControls.div = element;

    thisControls.config = Object.create(config);
    thisControls.config.inputs = thisControls.config.inputs || [];

    thisControls.targets = [];

    if (config.location === 'bottom') {
      thisControls.wrap = d3.select(element).append('div').attr('class', 'wc-controls');
    } else {
      thisControls.wrap = d3.select(element).insert('div', ':first-child').attr('class', 'wc-controls');
    }

    return thisControls;
  }

  function layout$2() {
    d3.select(this.div).select('.loader').remove();
    var table = this.wrap.append('table');
    table.append('thead').append('tr').attr('class', 'headers');
    this.table = table;
    this.events.onLayout.call(this);
  }

  function transformData$1(data) {
    if (!data) {
      return false;
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
        var isArray = e.val instanceof Array;
        filtered = filtered.filter(function (d) {
          var filterVal = void 0;
          if (isArray) {
            filterVal = e.val.indexOf(d[e.col]) !== -1;
          } else {
            filterVal = e.val !== 'All' ? d[e.col] === e.val : d;
          }
          return filterVal;
        });
      });
    }

    var slimmed = d3.nest().key(function (d) {
      var dKey = void 0;
      if (config.row_per) {
        dKey = config.row_per.map(function (m) {
          return d[m];
        }).join(' ');
      } else {
        dKey = d;
      }
      return dKey;
    }).rollup(function (r) {
      var nuarr = r.map(function (m) {
        var arr = [];
        for (var x in m) {
          if (Object.hasOwnProperty.call(m, x)) {
            arr.push({ col: x, text: m[x] });
          }
        }
        arr.sort(function (a, b) {
          return config.cols.indexOf(a.col) - config.cols.indexOf(b.col);
        });
        return { cells: arr, raw: m };
      });
      return nuarr;
    }).entries(filtered);

    this.current_data = slimmed;

    this.events.onDatatransform.call(this);

    return this.current_data;
  }

  function draw$1() {
    var rawData = arguments.length <= 0 || arguments[0] === undefined ? this.raw_data : arguments[0];
    var processedData = arguments[1];

    var config = this.config;
    var table = this.table;
    var data = processedData || this.transformData(rawData);
    this.wrap.datum(data);

    var colList = config.cols.length ? config.cols : data.length ? d3.keys(data[0].values[0].raw) : [];

    if (config.bootstrap) {
      table.classed('table', true);
    } else {
      table.classed('table', false);
    }

    var headerData = !data.length ? [] : config.headers && config.headers.length ? config.headers : colList;
    var headerRow = table.select('thead').select('tr.headers');
    var ths = headerRow.selectAll('th').data(headerData);
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
      var revOrder = config.row_per.slice(0).reverse();
      revOrder.forEach(function (e) {
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
        var rowOrder = config.sort_rows.slice(0);
        rowOrder.unshift('0');

        rows.sort(function (a, b) {
          var i = 0;
          while (i < rowOrder.length && a.raw[rowOrder[i]] === b.raw[rowOrder[i]]) {
            i++;
          }
          if (a.raw[rowOrder[i]] < b.raw[rowOrder[i]]) {
            return -1;
          }
          if (a.raw[rowOrder[i]] > b.raw[rowOrder[i]]) {
            return 1;
          }
          return 0;
        });
      })();
    }

    var tds = rows.selectAll('td').data(function (d) {
      return d.cells.filter(function (f) {
        return colList.indexOf(f.col) > -1;
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

    this.events.onDraw.call(this);
  }

  var table = Object.create(chart, {
    'layout': { value: layout$2 },
    'transformData': { value: transformData$1 },
    'draw': { value: draw$1 }
  });

  function createTable() {
    var element = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var controls = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var thisTable = Object.create(table);

    function onEvent(event, callback) {
      var possibleEvents = ['init', 'layout', 'datatransform', 'draw', 'resize'];
      if (possibleEvents.indexOf(event) < 0) {
        return;
      }
      if (callback) {
        thisTable.events['on' + (event.charAt(0).toUpperCase() + event.slice(1))] = callback;
      }
    }

    thisTable.div = element;

    thisTable.config = Object.create(config);

    thisTable.controls = controls;

    thisTable.filters = [];

    thisTable.required_cols = [];

    thisTable.marks = [];

    thisTable.wrap = d3.select(thisTable.div).append('div');

    thisTable.events = {
      onInit: function onInit() {},
      onLayout: function onLayout() {},
      onDatatransform: function onDatatransform() {},
      onDraw: function onDraw() {},
      onResize: function onResize() {}
    };

    thisTable.on = onEvent;

    return thisTable;
  }

  function multiply (chart, data, splitBy, order) {
    var config = chart.config;
    var wrap = chart.wrap.classed('wc-layout wc-small-multiples', true).classed('wc-chart', false);
    var masterLegend = wrap.append('ul').attr('class', 'legend');

    function goAhead(input) {
      var splitVals = d3.set(input.map(function (m) {
        return m[splitBy];
      })).values().filter(function (f) {
        return f;
      });
      if (order) {
        splitVals = splitVals.sort(function (a, b) {
          return d3.ascending(order.indexOf(a), order.indexOf(b));
        });
      }

      splitVals.forEach(function (e) {
        var mchart = createChart(chart.wrap.node(), config, chart.controls);
        mchart.events = chart.events;
        mchart.legend = masterLegend;
        mchart.filters.unshift({ col: splitBy, val: e, choices: splitVals });
        mchart.wrap.insert('span', 'svg').attr('class', 'wc-chart-title').text(e);
        mchart.init(input);
      });
    }

    goAhead(data);
  }

  var index = {
    version: version,
    createChart: createChart,
    createControls: createControls,
    createTable: createTable,
    multiply: multiply
  };

  return index;

}));