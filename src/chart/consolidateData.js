chart.prototype.consolidateData = function(raw){
  var context = this;
  var all_data = [];
  var all_x = [];
  var all_y = [];
  context.marks = [];
  this.config.marks.forEach(function(e){
    var mark_info = e.per ? context.transformData(raw, e) : {data: [], x_dom: [], y_dom: []};
    all_data.push(mark_info.data);
    all_x.push(mark_info.x_dom);
    all_y.push(mark_info.y_dom);
    context.marks.push({type: e.type, per: e.per, data: mark_info.data, split: e.split, arrange: e.arrange, order: e.order, attributes: e.attributes})
  });

  var sortOrderX;
  var sortOrderY;
  if( context.config.x.sort && context.config.x.sort === 'alphabetical-ascending' )
    sortOrderX = d3.ascending
  if( context.config.x.sort && context.config.x.sort === 'alphabetical-descending' )
    sortOrderX = d3.descending
  if( context.config.y.sort && context.config.y.sort === 'alphabetical-ascending' )
    sortOrderY = d3.ascending
  if( context.config.y.sort && context.config.y.sort === 'alphabetical-descending' )
    sortOrderY = d3.descending

  context.x_dom = context.config.x.type === "ordinal" ? d3.set(d3.merge(all_x)).values().sort(sortOrderX) : d3.extent(d3.merge(all_x));
  context.y_dom = context.config.y.type === "ordinal" ? d3.set(d3.merge(all_y)).values().sort(sortOrderY) : d3.extent(d3.merge(all_y));
}