webCharts.dataOps.lengthenRaw = function(data, columns){
    var my_data = [];
    data.forEach(function(e){
      columns.forEach(function(g){
        var obj = {};
        obj.wc_category = g;
        obj.wc_value = e[g];
        for(x in e){
          obj[x] = e[x];
        }
        my_data.push(obj);
      });
    });
    return my_data;
  };
