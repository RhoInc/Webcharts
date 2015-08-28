export function summarize(vals, operation){
  let nvals = vals.filter(f => +f || +f === 0)
    .map(m => +m);

  if(operation === 'cumulative'){
    return null;
  }

  let stat = operation || 'mean';
  let mathed = stat === 'count' ? vals.length :
  	stat === 'percent' ? vals.length :
  	d3[stat](nvals);

  return mathed;
}
