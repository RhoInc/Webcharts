chart.prototype.consolidateData = function(raw){
  var context = this;
  var all_data = [];
  var all_x = [];
  var all_y = [];
  context.marks = [];
  
  this.setDefaults();

  this.config.marks.forEach(function(e){
    if(e.type !== 'bar'){
      e.arrange = null;
      e.split = null;
    }
    var mark_info = e.per ? context.transformData(raw, e) : {data: [], x_dom: [], y_dom: []};
    all_data.push(mark_info.data);
    all_x.push(mark_info.x_dom);
    all_y.push(mark_info.y_dom);
    context.marks.push({type: e.type, per: e.per, data: mark_info.data, split: e.split, arrange: e.arrange, order: e.order, attributes: e.attributes})
  });

  if(context.config.x.type === 'ordinal'){
    if( context.config.x.sort && context.config.x.sort === 'alphabetical-descending' )
      context.x_dom = d3.set(d3.merge(all_x)).values().sort(webCharts.dataOps.naturalSorter).reverse();
    else if(context.config.y.type === 'time' && context.config.x.sort === 'earliest' ){
      var dateFormat = d3.time.format(context.config.date_format);
      context.x_dom = d3.nest()
        .key(function(d){return d[context.config.x.column]})
        .rollup(function(d){
          return d.map(function(m){return m[context.config.y.column] }).filter(function(f){return f instanceof Date});
        })
        .entries(context.raw_data)
        .sort(function(a,b){
          return d3.min(b.values) - d3.min(a.values)
        })
        .map(function(m){return m.key});
    }
    else if( context.config.x.order ){
      context.x_dom = d3.set(d3.merge(all_x)).values()
        .sort(function(a,b){return d3.ascending(context.config.x.order.indexOf(a), context.config.x.order.indexOf(b)) });
    }
    else if( !context.config.x.sort || context.config.x.sort === 'alphabetical-descending' )
      context.x_dom = d3.set(d3.merge(all_x)).values().sort(webCharts.dataOps.naturalSorter);
    else
      context.x_dom = d3.set(d3.merge(all_x)).values();
  }
  else
    context.x_dom = d3.extent(d3.merge(all_x));
  if(context.config.y.type === 'ordinal'){
    if( context.config.y.sort && context.config.y.sort === 'alphabetical-ascending' )
      context.y_dom = d3.set(d3.merge(all_y)).values().sort(webCharts.dataOps.naturalSorter);
    else if( context.config.x.type === 'time' && context.config.y.sort === 'earliest' ){
      var dateFormat = d3.time.format(context.config.date_format);
      context.y_dom = d3.nest()
        .key(function(d){return d[context.config.y.column]})
        .rollup(function(d){
          return d.map(function(m){return m[context.config.x.column] }).filter(function(f){return f instanceof Date});
        })
        .entries(context.raw_data)
        .sort(function(a,b){
          return d3.min(b.values) - d3.min(a.values)
        })
        .map(function(m){return m.key});
    }
    else if( context.config.y.order ){
      context.y_dom = d3.set(d3.merge(all_y)).values()
        .sort(function(a,b){return d3.ascending(context.config.y.order.indexOf(a), context.config.y.order.indexOf(b)) });
    }
    else if( !context.config.y.sort || context.config.y.sort === 'alphabetical-descending' ){
      context.y_dom = d3.set(d3.merge(all_y)).values().sort(webCharts.dataOps.naturalSorter).reverse();
    }
    else
      context.y_dom = d3.set(d3.merge(all_y)).values();
  }
  else if(context.config.y.summary === 'percent')
    context.y_dom = [0,1];
  else
    context.y_dom = d3.extent(d3.merge(all_y));

}