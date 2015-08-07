/** Determines what type of data is contained in a given column from a given dataset
*@returns {string} <code>'continuous'</code> or <code>'categorical'</code>
*@memberof webCharts.dataOps
*@method getValType
*@param {array} data a dataset to evaluate
*@param {string} variable a column from the dataset
*/
export function getValType(data, variable){
	let var_vals = d3.set(data.map(m => m[variable])).values();
	let vals_numbers = var_vals.filter(f => +f || f === 0 );

	if(var_vals.length === vals_numbers.length && var_vals.length > 4){
		return 'continuous';
	}
	else{
		return 'categorical';
	}
}
