export default function (data, variable){
	let var_vals = d3.set(data.map(m => m[variable])).values();
	let vals_numbers = var_vals.filter(f => +f || +f === 0 );

	if(var_vals.length === vals_numbers.length && var_vals.length > 4){
		return 'continuous';
	}
	else{
		return 'categorical';
	}
}
