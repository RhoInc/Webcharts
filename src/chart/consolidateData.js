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
    // if( context.config.x.sort && context.config.x.sort === 'alphabetical-ascending' )
    //   context.x_dom = d3.set(d3.merge(all_x)).values().sort(naturalSorter);
    if( context.config.x.sort && context.config.x.sort === 'alphabetical-descending' )
      context.x_dom = d3.set(d3.merge(all_x)).values().sort(webCharts.dataOps.naturalSorter).reverse();
    else
      context.x_dom = d3.set(d3.merge(all_x)).values().sort(webCharts.dataOps.naturalSorter);
  }
  else
    context.x_dom = d3.extent(d3.merge(all_x));
  if(context.config.y.type === 'ordinal'){
    // if( context.config.x.sort && context.config.x.sort === 'alphabetical-ascending' )
    //   context.x_dom = d3.set(d3.merge(all_x)).values().sort(naturalSorter);
    if( context.config.y.sort && context.config.y.sort === 'alphabetical-ascending' )
      context.y_dom = d3.set(d3.merge(all_y)).values().sort(webCharts.dataOps.naturalSorter);
    else
      context.y_dom = d3.set(d3.merge(all_y)).values().sort(webCharts.dataOps.naturalSorter).reverse();
  }
  else
    context.y_dom = d3.extent(d3.merge(all_y));
  
}