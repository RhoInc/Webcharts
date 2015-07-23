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
