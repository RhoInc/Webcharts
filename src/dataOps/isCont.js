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
