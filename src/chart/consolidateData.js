export function consolidateData(raw){
  let config = this.config;
  let all_data = [];
  let all_x = [];
  let all_y = [];

  this.setDefaults();

  config.marks.forEach((e,i) => {
    if(e.type !== 'bar'){
      e.arrange = null;
      e.split = null;
    }
    let mark_info = e.per ? this.transformData(raw, e) : {data: [], x_dom: [], y_dom: []};

    all_data.push(mark_info.data);
    all_x.push(mark_info.x_dom);
    all_y.push(mark_info.y_dom);
    this.marks[i] = {type: e.type, per: e.per, data: mark_info.data, split: e.split, arrange: e.arrange, order: e.order, summarizeX: e.summarizeX, summarizeY: e.summarizeY, tooltip: e.tooltip, attributes: e.attributes};
  });

  if(config.x.type === 'ordinal'){
    if( config.x.sort && config.x.sort === 'alphabetical-descending' )
      this.x_dom = d3.set(d3.merge(all_x)).values().sort(webCharts.dataOps.naturalSorter).reverse();
    else if(config.y.type === 'time' && config.x.sort === 'earliest' ){
      var dateFormat = d3.time.format(config.date_format);
      this.x_dom = d3.nest()
        .key(d => d[config.x.column] )
        .rollup(d =>{
          return d.map(m => m[config.y.column] ).filter(f => f instanceof Date);
        })
        .entries(this.raw_data)
        .sort((a,b) => d3.min(b.values) - d3.min(a.values) )
        .map(m => m.key);
    }
    else if( config.x.order ){
      this.x_dom = d3.set(d3.merge(all_x)).values()
        .sort((a,b) => d3.ascending(config.x.order.indexOf(a), config.x.order.indexOf(b)) );
    }
    else if( !config.x.sort || config.x.sort === 'alphabetical-descending' )
      this.x_dom = d3.set(d3.merge(all_x)).values().sort(webCharts.dataOps.naturalSorter);
    else
      this.x_dom = d3.set(d3.merge(all_x)).values();
  }
  else if(config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1)
    this.x_dom = [0,1];
  else
    this.x_dom = d3.extent(d3.merge(all_x));

  if(config.y.type === 'ordinal'){
    if( config.y.sort && config.y.sort === 'alphabetical-ascending' )
      this.y_dom = d3.set(d3.merge(all_y)).values().sort(webCharts.dataOps.naturalSorter);
    else if( config.x.type === 'time' && config.y.sort === 'earliest' ){
      var dateFormat = d3.time.format(config.date_format);
      this.y_dom = d3.nest()
        .key(d => d[config.y.column] )
        .rollup(d => {
          return d.map(m => m[config.x.column] ).filter(f => f instanceof Date );
        })
        .entries(this.raw_data)
        .sort((a,b) => d3.min(b.values) - d3.min(a.values) )
        .map(m => m.key);
    }
    else if( config.y.order ){
      this.y_dom = d3.set(d3.merge(all_y)).values()
        .sort((a,b) => d3.ascending(config.y.order.indexOf(a), config.y.order.indexOf(b)) );
    }
    else if( !config.y.sort || config.y.sort === 'alphabetical-descending' ){
      this.y_dom = d3.set(d3.merge(all_y)).values().sort(webCharts.dataOps.naturalSorter).reverse();
    }
    else
      this.y_dom = d3.set(d3.merge(all_y)).values();
  }
  else if(config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1)
    this.y_dom = [0,1];
  else
    this.y_dom = d3.extent(d3.merge(all_y));

}
