summarize: function(vals, operation){
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
}