/**
*performs a mathematic operation on a set of values
*@returns {number}
*@memberof webCharts.dataOps
*@method summarize
*@param {array} vals the values to be evaluated
*@param {string} operation=mean the type of evaluation to perform
*/
export function summarize(vals, operation){
  let nvals = vals.filter(f => +f || +f === 0)
    .map(m => +m);

  if(operation === 'cumulative')
    return null;

  let stat = operation || 'mean';
  let mathed = stat === 'count' ? vals.length :
  	stat === 'percent' ? vals.length :
  	d3[stat](nvals);

  return mathed;

}
