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
