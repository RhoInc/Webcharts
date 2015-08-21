export function transformData(raw, mark){
  let config = this.config;
  let x_behavior = config.x.behavior || 'raw';
  let y_behavior = config.y.behavior || 'raw';
  let sublevel = mark.type === 'line' ? config.x.column :
    mark.type === 'bar' && mark.split ? mark.split :
    null;
  let dateConvert = d3.time.format(config.date_format);
  let totalOrder;

  raw = mark.per && mark.per.length ? raw.filter(f => f[mark.per[0]] ) : raw;

  //run initial filter if specified
  if(config.initial_filter)
    raw = raw.filter(f => config.initial_filter.vals.indexOf(f[config.initial_filter.col]) !== -1 );

  //make sure data has x and y values
  if(config.x.column)
    raw = raw.filter(f => f[config.x.column] );
  if(config.y.column)
    raw = raw.filter(f => f[config.y.column] );

  if(config.x.type === 'time'){
    raw = raw.filter(f => f[config.x.column] instanceof Date ? f[config.x.column] : dateConvert.parse(f[config.x.column]) );
    raw.forEach(e => e[config.x.column] = e[config.x.column] instanceof Date ? e[config.x.column] : dateConvert.parse(e[config.x.column]) );
  };
  if(config.y.type === 'time'){
    raw = raw.filter(f => f[config.y.column] instanceof Date ? f[config.y.column] : dateConvert.parse(f[config.y.column]) );
    raw.forEach(e => e[config.y.column] = e[config.y.column] instanceof Date ? e[config.y.column] : dateConvert.parse(e[config.y.column]) );
  };

  if( (config.x.type === 'linear' || config.x.type === 'log') && config.x.column){
    raw = raw.filter(f => {
      return (mark.summarizeX !== 'count' && mark.summarizeX !== 'percent') ? (+f[config.x.column] || +f[config.x.column] === 0) : f;
    });
  };
  if( (config.y.type === 'linear' || config.y.type === 'log') && config.y.column){
    raw = raw.filter(f => {
      return (mark.summarizeY !== 'count' && mark.summarizeY !== 'percent')  ? (+f[config.y.column] || +f[config.y.column] === 0) : f;
    });
  };

  let raw_nest;
  if(mark.type === 'bar')
    raw_nest = mark.arrange !== 'stacked' ? makeNest(raw, sublevel) : makeNest(raw)
  else if(mark.summarizeX === 'count' || mark.summarizeY === 'count')
    raw_nest = makeNest(raw);

  let raw_dom_x = mark.summarizeX === 'cumulative' ? [0, raw.length] :
    config.x.type === 'ordinal' ? d3.set( raw.map(m => m[config.x.column]) ).values().filter(f => f) :
    mark.split && mark.arrange !== 'stacked' ? d3.extent( d3.merge( raw_nest.nested.map(m => m.values.map(p => p.values.raw.length) ) ) ) :
    mark.summarizeX === 'count' ? d3.extent( raw_nest.nested.map(m => m.values.raw.length) ) :
    d3.extent( raw.map(m => +m[config.x.column]).filter(f => +f) );

  let raw_dom_y = mark.summarizeY === 'cumulative' ? [0, raw.length] :
    config.y.type === 'ordinal' ? d3.set( raw.map(m => m[config.y.column]) ).values().filter(f => f) :
    mark.split && mark.arrange !== 'stacked' ? d3.extent( d3.merge( raw_nest.nested.map(m => m.values.map(p => p.values.raw.length) ) ) ) :
    mark.summarizeY === 'count' ? d3.extent( raw_nest.nested.map(m => m.values.raw.length) ) :
    d3.extent( raw.map(m => +m[config.y.column]).filter(f => +f || +f === 0) );

  let filtered = raw;

  function makeNest(entries, sublevel){
    let dom_xs = [];
    let dom_ys = [];
    let this_nest = d3.nest();

    if((config.x.type === 'linear' && config.x.bin) || (config.y.type === 'linear' && config.y.bin)){
      let xy = (config.x.type === 'linear' && config.x.bin) ? 'x' : 'y';
      let quant = d3.scale.quantile()
        .domain(d3.extent(entries.map(m => +m[config[xy].column]) ) )
        .range(d3.range(+config[xy].bin));

      entries.forEach(e => e['wc_bin'] = quant(e[config[xy].column]) );

      this_nest.key(d => quant.invertExtent(d['wc_bin']) );
    }
    else
      this_nest.key(d => mark.per.map(m => d[m]).join(' ') );

    if(sublevel){
      this_nest.key(function(d){return d[sublevel]})
      this_nest.sortKeys((a,b) => {
        return config.x.type === 'time' ? d3.ascending(new Date(a), new Date(b)) :
          config.x_dom ? d3.ascending(config.x_dom.indexOf(a), config.x_dom.indexOf(b)) :
          sublevel === config.color_by && config.legend.order ? d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)) :
          config.x.type === 'ordinal' || config.y.type === 'ordinal' ? webCharts.dataOps.naturalSorter(a,b) :
          d3.ascending(+a, +b);
      })
    }
    this_nest.rollup(r => {
      let obj = {raw: r};
      let y_vals = r.map(m => m[config.y.column]).sort(d3.ascending);
      let x_vals = r.map(m => m[config.x.column]).sort(d3.ascending);
      obj.x = config.x.type === 'ordinal' ? r[0][config.x.column] : webCharts.dataOps.summarize(x_vals, mark.summarizeX);
      obj.y = config.y.type === 'ordinal' ? r[0][config.y.column] : webCharts.dataOps.summarize(y_vals, mark.summarizeY);

      obj.x_q25 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(x_vals, 0.25) : obj.x;
      obj.x_q75 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(x_vals, 0.75) : obj.x;
      obj.y_q25 = config.error_bars ? d3.quantile(y_vals, 0.25) : obj.y;
      obj.y_q75 = config.error_bars ? d3.quantile(y_vals, 0.75) : obj.y;
      dom_xs.push([obj.x_q25, obj.x_q75, obj.x ]);
      dom_ys.push([obj.y_q25, obj.y_q75, obj.y ]);

      if(mark.summarizeY === 'cumulative'){
        let interm = entries.filter(f => {
            return config.x.type === 'time' ? new Date(f[config.x.column]) <= new Date(r[0][config.x.column]) :
              +f[config.x.column] <= +r[0][config.x.column];
          });
        if(mark.per.length)
          interm = interm.filter(f => f[mark.per[0]] === r[0][mark.per[0]] );

        let cumul = config.x.type === 'time' ? interm.length :
          d3.sum( interm.map(m => +m[config.y.column] || +m[config.y.column] === 0 ? +m[config.y.column] : 1) );
        dom_ys.push([cumul]);
        obj.y = cumul;
      };
      if(mark.summarizeX === 'cumulative'){
        let interm = entries.filter(f => {
            return config.y.type === 'time' ? new Date(f[config.y.column]) <= new Date(r[0][config.y.column]) :
              +f[config.y.column] <= +r[0][config.y.column];
          });
        if(mark.per.length)
          interm = interm.filter(f => f[mark.per[0]] === r[0][mark.per[0]] );
        dom_xs.push([interm.length]);
        obj.x = interm.length;
      };

      return obj;
    });

    let test = this_nest.entries(entries);

    let dom_x = d3.extent( d3.merge(dom_xs) );
    let dom_y = d3.extent( d3.merge(dom_ys) );

    if(sublevel && mark.type === 'bar' && mark.arrange === 'stacked'){
      test.forEach(calcStartTotal);
      if(config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin))
        dom_y = d3.extent( test.map(m => m.total) );
      if(config.y.type === 'ordinal' || (config.y.type === 'linear' && config.y.bin))
        dom_x = d3.extent( test.map(m => m.total) );
    }
    // else if(sublevel && mark.summarizeY === 'percent'){
    //   test.forEach(calcPercents);
    // }

    if(config.x.sort === 'total-ascending' || config.y.sort === 'total-ascending')
      totalOrder = test.sort((a,b) => d3.ascending(a.total, b.total) ).map(m => m.key);
    else if(config.x.sort === 'total-descending' || config.y.sort === 'total-descending')
      totalOrder = test.sort((a,b) => d3.ascending(a.total, b.total) ).map(m => m.key).reverse();

    return {nested: test, dom_x: dom_x, dom_y: dom_y};
  };

  // function calcPercents(e){
  //   let max = d3.sum(e.values.map(function(m){return +m.values.y}));
  //   e.values.forEach(function(v){
  //     v.values.y = v.values.y/max
  //   });
  // };

  function calcStartTotal(e){
    let axis = config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin) ? 'y' : 'x';
    e.total = d3.sum(e.values.map(m => +m.values[axis]));
    let counter = 0;
    e.values.forEach((v,i) => {
      if(config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin)){
        v.values.y = mark.summarizeY === 'percent' ? v.values.y/e.total : v.values.y || 0;
        counter += +v.values.y;
        v.values.start = e.values[i-1] ? counter : v.values.y;
      }
      else{
        v.values.x = mark.summarizeX === 'percent' ? v.values.x/e.total : v.values.x || 0;
        v.values.start = counter;
        counter += +v.values.x;
      }
    });
  }

  let filt1_xs = [];
  let filt1_ys = [];
  if(this.filters.length){
    this.filters.forEach(e => {
      filtered = filtered.filter(d => {
        return e.val === 'All' ? d : e.val instanceof Array ? e.val.indexOf(d[e.col]) > -1 : d[e.col] === e.val;
      })
    });
    //get domain for all non-All values of first filter
    if(config.x.behavior === 'firstfilter' || config.y.behavior === 'firstfilter'){
      this.filters[0].choices.filter(f => f !== 'All').forEach(e => {
        let perfilter = raw.filter(f => f[this.filters[0].col] === e);
        let filt_nested = makeNest(perfilter, sublevel);
        filt1_xs.push(filt_nested.dom_x);
        filt1_ys.push(filt_nested.dom_y);
      });
    }
  }

  let filt1_dom_x = d3.extent( d3.merge(filt1_xs) );
  let filt1_dom_y = d3.extent( d3.merge(filt1_ys) );

  this.filtered_data = filtered;

  let current_nested = makeNest(filtered, sublevel);

  let flex_dom_x = current_nested.dom_x;
  let flex_dom_y = current_nested.dom_y;

  if(mark.type === 'bar'){
    if(config.y.type === 'ordinal' && mark.summarizeX === 'count')
      config.x.domain = config.x.domain ? [0, config.x.domain[1]] : [0, null]
    else if(config.x.type === 'ordinal' && mark.summarizeY === 'count')
      config.y.domain = config.y.domain ? [0, config.y.domain[1]] : [0, null];
  }

  //several criteria must be met in order to use the 'firstfilter' domain
  let nonall = Boolean( this.filters.length && this.filters[0].val !== 'All' &&
    this.filters.slice(1).filter(f => f.val === 'All').length === this.filters.length-1 );

  let pre_x_dom = !this.filters.length ? flex_dom_x : x_behavior === 'raw' ? raw_dom_x : nonall && x_behavior === 'firstfilter' ? filt1_dom_x : flex_dom_x;
  let pre_y_dom = !this.filters.length ? flex_dom_y : y_behavior === 'raw' ? raw_dom_y : nonall && y_behavior === 'firstfilter' ? filt1_dom_y : flex_dom_y;

  let x_dom = config.x_dom ? config.x_dom :
    config.x.type === 'ordinal' && config.x.behavior === 'flex' ? d3.set(filtered.map(m => m[config.x.column])).values() :
    config.x.type === 'ordinal' ? d3.set(raw.map(m => m[config.x.column])).values() :
    config.x_from0 ? [0, d3.max(pre_x_dom)] :
    pre_x_dom;

  let y_dom =  config.y_dom ? config.y_dom :
    config.y.type === "ordinal" && config.y.behavior === 'flex' ? d3.set(filtered.map(m => m[config.y.column] )).values() :
    config.y.type === "ordinal" ? d3.set(raw.map(m => m[config.y.column] )).values() :
    config.y_from0 ? [0, d3.max(pre_y_dom)] :
    pre_y_dom;

  if(config.x.domain && (config.x.domain[0] || config.x.domain[0] === 0) )
    x_dom[0] = config.x.domain[0];
  if(config.x.domain && (config.x.domain[1] || config.x.domain[1] === 0) )
    x_dom[1] = config.x.domain[1];
  if(config.y.domain && (config.y.domain[0] || config.y.domain[0] === 0) )
    y_dom[0] = config.y.domain[0];
  if(config.y.domain && (config.y.domain[1] || config.y.domain[1] === 0) )
    y_dom[1] = config.y.domain[1];

  if(config.x.type === 'ordinal')
    config.x.order = totalOrder;
  if(config.y.type === 'ordinal')
    config.y.order = totalOrder;

  this.current_data = current_nested.nested;

  this.events.onDatatransform.call(this);

  return {data: current_nested.nested, x_dom: x_dom, y_dom: y_dom};
}
