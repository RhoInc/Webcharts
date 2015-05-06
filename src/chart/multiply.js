chart.prototype.multiply = function(raw, split_by, constrain_domains, order){
  var context = this;
  var config = this.config;
  var wrap = context.wrap.classed("wc-layout wc-small-multiples", true).classed("wc-chart", false);
  var master_legend = wrap.append("ul").attr("class", "legend");
  var charts = [];
  if(raw){
    context.raw_data = raw;
    goAhead(raw);
  }
  else{
    d3.csv(context.filepath, function(error, csv){
      context.raw_data = csv;
      context.onDataError(error);
      context.checkRequired(csv);
      goAhead(csv);
    });
  };
  
  function goAhead(data){
    var split_vals = d3.set(data.map(function(m){return m[split_by]})).values().filter(function(f){return f});
    if(order)
      split_vals = split_vals.sort(function(a,b){return d3.ascending(order.indexOf(a), order.indexOf(b))});

    var master_chart = new webCharts[context.chart_type](context.wrap.node(), null, config, context.controls);
    master_chart.wrap.style("display", "none")

    split_vals.forEach(function(e){
      var split_data = data.filter(function(f){return f[split_by] === e});
      var mchart = new webCharts[context.chart_type](context.wrap.node(), null, config, context.controls);
      mchart.events = context.events;
      mchart.legend = master_legend;
      mchart.multiplied = {col: split_by, value: e};
      if(constrain_domains)
        mchart.on("datatransform", matchDomains);
      mchart.wrap.insert("span", "svg").attr("class", "wc-chart-title").text(e);
      charts.push({subchart: mchart, subdata: split_data});
    });

    charts.forEach(function(e){e.subchart.init(e.subdata); });

    function matchDomains(chart){
      var allx = [];
      var ally = [];
      charts.forEach(function(e){
        master_chart.transformData(e.subdata);
        allx.push(master_chart.x_dom);
        ally.push(master_chart.y_dom);
      });
      
      chart.config.color_dom = d3.set(data.map(function(m){return m[config.color_by]})).values().filter(function(f){return f && f !== "undefined"});
      // var allx = d3.merge(charts.map(function(m){return m.x_dom}));
      chart.x_dom = config.x_dom ? config.x_dom : config.x.type !== "ordinal" ? d3.extent(d3.merge(allx)) : d3.set(d3.merge(allx)).values();
      chart.y_dom = config.y_com ? config.y_dom : config.y.type !== "ordinal" ? d3.extent(d3.merge(ally)) : d3.set(d3.merge(ally)).values();
      // var ally = d3.merge(charts.map(function(m){return m.y_dom}));
      // chart.y_dom = config.y.type !== "ordinal" ? d3.extent(ally) : d3.set(ally).values();
    };

  };//goAhead

  return this;
}