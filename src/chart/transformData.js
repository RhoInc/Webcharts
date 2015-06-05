chart.prototype.transformData = function(raw, mark){
  var context = this;
  var config = this.config;
  var x_behavior = config.x.behavior || "raw";
  var y_behavior = config.y.behavior || "raw";
  var sublevel = mark.type === "line" ? config.x.column : 
    mark.type === 'bar' && mark.split ? mark.split : 
    null;
  var dateConvert = d3.time.format(config.date_format);
  // context.raw_data = raw;

  if(config.lengthen_columns)
    raw = webCharts.dataOps.lengthenRaw(raw, config.lengthen_columns);

  raw = mark.per && mark.per.length ? raw.filter(function(f){return f[mark.per[0]]}) : raw;

  //run initial filter if specified
  if(config.initial_filter){
    raw = raw.filter(function(f){
      return config.initial_filter.vals.indexOf(f[config.initial_filter.col]) !== -1
    }) 
  };

  //make sure data has x and y values
  if(config.x.column)
    raw = raw.filter(function(f){return f[config.x.column]});
  if(config.y.column)
    raw = raw.filter(function(f){return f[config.y.column]});

  if(config.x.type === "time"){
    raw = raw.filter(function(f){
      return f[config.x.column] instanceof Date ? f[config.x.column] : dateConvert.parse(f[config.x.column]) 
    })
    raw.forEach(function(e){
      e[config.x.column] = e[config.x.column] instanceof Date ? e[config.x.column] :
        dateConvert.parse(e[config.x.column]);
    });
  };
  if(config.y.type === "time"){
    raw = raw.filter(function(f){
      return f[config.y.column] instanceof Date ? f[config.y.column] : dateConvert.parse(f[config.y.column]) 
    })
    raw.forEach(function(e){
      e[config.y.column] = e[config.y.column] instanceof Date ? e[config.y.column] :
        dateConvert.parse(e[config.y.column]);
    });
  };

  if( (config.x.type === "linear" || config.x.type === "log") && config.x.column){
    raw = raw.filter(function(f){
      return config.x.summary !== 'count' ? (+f[config.x.column] || +f[config.x.column] === 0) : f;
    });
  };
  if( (config.y.type === "linear" || config.y.type === "log") && config.y.column){
    raw = raw.filter(function(f){
      return config.y.summary !== 'count' ? (+f[config.y.column] || +f[config.y.column] === 0) : f;
    });
  };

  var raw_nest;
  if(mark.type === "bar"){
    raw_nest = mark.arrange !== "stacked" ? makeNest(raw, sublevel) : makeNest(raw)
  }
  else if(config.x.summary === 'count' || config.y.summary === 'count'){
    raw_nest = makeNest(raw);
  }

  var raw_dom_x = config.x.summary === "cumulative" ? [0, raw.length] : 
    config.x.type === "ordinal" ? d3.set( raw.map(function(m){return m[config.x.column]}) ).values().filter(function(f){return f}) :
    mark.split && mark.arrange !== "stacked" ? d3.extent( d3.merge( raw_nest.nested.map(function(m){return m.values.map(function(p){return p.values.raw.length}) }) ) ) :
    config.x.summary === "count" ? d3.extent( raw_nest.nested.map(function(m){return m.values.raw.length}) ) :
    d3.extent( raw.map(function(m){return +m[config.x.column]}).filter(function(f){return +f}) );

  var raw_dom_y = config.y.summary === "cumulative" ? [0, raw.length] : 
    config.y.type === "ordinal" ? d3.set( raw.map(function(m){return m[config.y.column]}) ).values().filter(function(f){return f}) :
    mark.split && mark.arrange !== "stacked" ? d3.extent( d3.merge( raw_nest.nested.map(function(m){return m.values.map(function(p){return p.values.raw.length}) }) ) ) :
    config.y.summary === "count" ? d3.extent( raw_nest.nested.map(function(m){return m.values.raw.length}) ) :
    d3.extent( raw.map(function(m){return +m[config.y.column]}).filter(function(f){return +f || +f === 0}) );

  var filtered = raw;

  function makeNest(entries, sublevel){
    var dom_xs = [];
    var dom_ys = [];
    var this_nest = d3.nest()

    if(config.x.type === 'quantile' || config.y.type === 'quantile'){
      var xy = config.x.type === 'quantile' ? 'x' : 'y';
      var quant = d3.scale.quantile()
        .domain(d3.extent(entries.map(function(m){return +m[config[xy].column]})))
        .range(d3.range(+config[xy].bin+1));

      entries.forEach(function(e){
        e['wc_bin'] = quant(e[config[xy].column])
      });

      this_nest.key(function(d){return quant.invertExtent(d['wc_bin']) })
    }
    else
      this_nest.key(function(d){return mark.per.map(function(m){return d[m]}).join(" "); })

    if(sublevel){
      this_nest.key(function(d){return d[sublevel]})
      this_nest.sortKeys(function(a,b){
        return config.x.type === "time" ? d3.ascending(new Date(a), new Date(b)) : 
          config.x_dom ? d3.ascending(config.x_dom.indexOf(a), config.x_dom.indexOf(b)) :
          config.x.type === "ordinal" || config.y.type === "ordinal" ? webCharts.dataOps.naturalSorter(a,b) :
          d3.ascending(+a, +b);
      })
    }
    this_nest.rollup(function(r){
      var obj = {raw: r};
      var y_vals = r.map(function(m){return m[config.y.column]}).sort(d3.ascending);
      var x_vals = r.map(function(m){return m[config.x.column]}).sort(d3.ascending);
      obj.x = config.x.type === "ordinal" ? r[0][config.x.column] : webCharts.dataOps.summarize(x_vals, config.x.summary);
      obj.y = config.y.type === "ordinal" ? r[0][config.y.column] : webCharts.dataOps.summarize(y_vals, config.y.summary);

      obj.x_q25 = config.error_bars && config.y.type === "ordinal" ? d3.quantile(x_vals, 0.25) : obj.x;
      obj.x_q75 = config.error_bars && config.y.type === "ordinal" ? d3.quantile(x_vals, 0.75) : obj.x;
      obj.y_q25 = config.error_bars ? d3.quantile(y_vals, 0.25) : obj.y;
      obj.y_q75 = config.error_bars ? d3.quantile(y_vals, 0.75) : obj.y; 
      dom_xs.push([obj.x_q25, obj.x_q75, obj.x ]);
      dom_ys.push([obj.y_q25, obj.y_q75, obj.y ]);

      if(config.y.summary === "cumulative"){
        var interm = entries.filter(function(f){
            return config.x.type === "time" ? new Date(f[config.x.column]) <= new Date(r[0][config.x.column]) : 
              +f[config.x.column] <= +r[0][config.x.column]
          });
        if(mark.per.length)
          interm = interm.filter(function(f){return f[mark.per[0]] === r[0][mark.per[0]] })

        var cumul = config.x.type === 'time' ? interm.length : 
          d3.sum( interm.map(function(m){return +m[config.y.column] || +m[config.y.column] === 0 ? +m[config.y.column] : 1}) );
        dom_ys.push([cumul]);
        obj.y = cumul;
      };
      if(config.x.summary === "cumulative"){
        var interm = entries.filter(function(f){
            return config.y.type === "time" ? new Date(f[config.y.column]) <= new Date(r[0][config.y.column]) : 
              +f[config.y.column] <= +r[0][config.y.column]
          });
        if(mark.per.length)
          interm = interm.filter(function(f){return f[mark.per[0]] === r[0][mark.per[0]] })
        dom_xs.push([interm.length]);
        obj.x = interm.length;
      };

      return obj;
    })
    var test = this_nest.entries(entries);

    var dom_x = d3.extent( d3.merge(dom_xs) );
    var dom_y = d3.extent( d3.merge(dom_ys) );

    if(sublevel && mark.type === 'bar' && mark.arrange === 'stacked'){
      test.forEach(calcStartTotal);
      if(config.x.type === 'ordinal')
        dom_y = d3.extent( test.map(function(m){return m.total}) );
      if(config.y.type === 'ordinal')
        dom_x = d3.extent( test.map(function(m){return m.total}) );
    }

    return {nested: test, dom_x: dom_x, dom_y: dom_y};
  };

  function calcStartTotal(e){    
    var axis = config.x.type === 'ordinal' ? 'y' : 'x'; 
    e.total = d3.sum(e.values.map(function(m){return +m.values[axis]}));
    var counter = 0;
    e.values.forEach(function(v,i){
      if(config.x.type === 'ordinal'){
        v.values.y = v.values.y || 0;
        counter += +v.values.y;
        v.values.start = e.values[i-1] ? counter : v.values.y;
      }
      else{
        v.values.x = v.values.x || 0;
        v.values.start = counter;
        counter += +v.values.x;
      }
    });
  };

  var filt1_xs = [];
  var filt1_ys = [];
  if(context.filters.length){
    context.filters.forEach(function(e){
      filtered = filtered.filter(function(d){
        return e.val !== "All" ? d[e.col] === e.val : d;
      })
    });
    //get domain for all non-All values of first filter
    if(config.x.behavior === "firstfilter" || config.y.behavior === "firstfilter"){
      context.filters[0].choices.filter(function(f){return f !== "All"}).forEach(function(e){
        var perfilter = raw.filter(function(f){return f[context.filters[0].col] === e});
        var filt_nested = makeNest(perfilter, sublevel);
        filt1_xs.push(filt_nested.dom_x);
        filt1_ys.push(filt_nested.dom_y);
      }); 
    };
  };
  // console.log(filt1_ys)
  var filt1_dom_x = d3.extent( d3.merge(filt1_xs) );
  var filt1_dom_y = d3.extent( d3.merge(filt1_ys) );

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

  if(mark.type === 'bar'){
    if(config.y.type === 'ordinal' && config.x.summary === 'count')
      config.x.domain = config.x.domain ? [0, config.x.domain[1]] : [0, null]
    else if(config.x.type === 'ordinal' && config.y.summary === 'count')
      config.y.domain = config.y.domain ? [0, config.y.domain[1]] : [0, null];
  }

  //several criteria must be met in order to use the 'firstfilter' domain
  var nonall = Boolean( context.filters.length && context.filters[0].val !== "All" && 
    context.filters.slice(1).filter(function(f){return f.val === "All"}).length === context.filters.length-1 );

  var pre_x_dom = !context.filters.length ? flex_dom_x : x_behavior === "raw" ? raw_dom_x : nonall && x_behavior === "firstfilter" ? filt1_dom_x : flex_dom_x;
  var pre_y_dom = !context.filters.length ? flex_dom_y : y_behavior === "raw" ? raw_dom_y : nonall && y_behavior === "firstfilter" ? filt1_dom_y : flex_dom_y;

  var x_dom = config.x_dom ? config.x_dom : 
    config.x.type === "ordinal" && config.x.behavior === 'flex' ? d3.set(filtered.map(function(m){return m[config.x.column]})).values() :
    config.x.type === "ordinal" ? d3.set(raw.map(function(m){return m[config.x.column]})).values() : 
    config.x_from0 ? [0, d3.max(pre_x_dom)] : 
    pre_x_dom;

  var y_dom =  config.y_dom ? config.y_dom : 
    config.y.type === "ordinal" && config.y.behavior === 'flex' ? d3.set(filtered.map(function(m){return m[config.y.column]})).values() :
    config.y.type === "ordinal" ? d3.set(raw.map(function(m){return m[config.y.column]})).values() : 
    config.y_from0 ? [0, d3.max(pre_y_dom)] : 
    pre_y_dom;

  if(config.x.domain && (config.x.domain[0] || config.x.domain[0] === 0) )
    x_dom[0] = config.x.domain[0]
  if(config.x.domain && (config.x.domain[1] || config.x.domain[1] === 0) )
    x_dom[1] = config.x.domain[1]
  if(config.y.domain && (config.y.domain[0] || config.y.domain[0] === 0) )
    y_dom[0] = config.y.domain[0]
  if(config.y.domain && (config.y.domain[1] || config.y.domain[1] === 0) )
    y_dom[1] = config.y.domain[1]

  context.current_data = current_nested.nested;
  // context.events.onDatatransform(context); 

  return {data: current_nested.nested, x_dom: x_dom, y_dom: y_dom};
}