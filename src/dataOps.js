webCharts.dataOps = {};

webCharts.dataOps.isCont = function(data, varname){
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
};

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

webCharts.dataOps.linearRegression = function(x,y){
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

  lr.slope = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  lr.intercept = (sum_y - lr.slope * sum_x)/n;
  lr.r2 = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

  return lr;
};

webCharts.dataOps.naturalSorter = function(a, b){
  //http://www.davekoelle.com/files/alphanum.js
  function chunkify(t) {
    var tz = [];
    var x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      var m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  var aa = chunkify(a.toLowerCase());
  var bb = chunkify(b.toLowerCase());

  for (x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      var c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      } else return (aa[x] > bb[x]) ? 1 : -1;
    }
  }
  return aa.length - bb.length;
};

webCharts.dataOps.standardError = function(vals){
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
  }

  return Math.sqrt(s / (n - 1)) / Math.sqrt(n);
};

webCharts.dataOps.summarize = function(vals, operation){
  var nvals = vals.filter(function(f){return +f || +f === 0; }).map(function(m){return +m; });
  if(operation === 'cumulative')
    return null;
  var stat = operation || 'mean';
  var mathed = stat === 'count' ? vals.length :
  	stat === 'percent' ? vals.length :
  	d3[stat](nvals);

  return mathed;
};
