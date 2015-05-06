webCharts.dataOps = {summarize: function(vals, operation){
  var nvals = vals.filter(function(f){return +f || +f === 0}).map(function(m){return +m});
  var mathed;
  if(operation === "cumulative")
    return null;
  var stat = operation || "mean";
  if(!stat || stat !== "count")
    mathed = d3[stat](nvals);
  else
    mathed = vals.length;

  return mathed;
},linearRegression: function(x,y){
  //http://stackoverflow.com/questions/20507536/d3-js-linear-regression
  var lr = {};
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (var i = 0; i < n; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += (x[i]*y[i]);
    sum_xx += (x[i]*x[i]);
    sum_yy += (y[i]*y[i]);
  } 

  lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
  lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

  return lr;
},standardError: function(vals){
  if(!vals)
    return null;
  var n = +vals.length;
  if (n < 1) return NaN;
  if (n === 1) return 0;

  var mean = d3.sum(vals)/n,
      i = -1,
      s = 0;

  while (++i < n) {
    var v = vals[i] - mean;
    s += v * v;
  };

  return Math.sqrt(s / (n - 1)) / Math.sqrt(n);
},isCont: function(data, varname){
    var arr = d3.set(data.map(function(m){return m[varname]})).values();
    var test = true;
    arr.forEach(function(e){
      if(!+e && e !== "." && +e !== 0)
        test = false;
    });
    if(!test || arr.length < 4)
      return false;
    else
      return true;
  },lengthenRaw: function(data, columns){
    var my_data = [];
    data.forEach(function(e){
      columns.forEach(function(g){
        var obj = {};
        obj.wc_category = g;
        obj.wc_value = e[g];
        for(x in e){
          obj[x] = e[x]
        }
        my_data.push(obj)
      })
    });
    return my_data;
  }}