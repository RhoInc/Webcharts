webCharts.webTable = function(element, filepath, config, controls, callback){
  this.chart_type = "webTable";
  this.required_cols = config.cols || [];
  chart.call(this, element, filepath, config, controls, callback);

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
