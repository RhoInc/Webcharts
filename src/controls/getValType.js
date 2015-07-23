Controls.prototype.getValType = function(variable){
   	var var_vals = d3.set(context.data.map(function(m){return m[variable]})).values();
      var vals_numbers = var_vals.filter(function(f){return +f || f=="NA" || f==0 });
      if(var_vals.length === vals_numbers.length && var_vals.length > 4)
      	return {type: "num", values: var_vals, varname: variable};
      else
      	return {type: "cat", values: var_vals, varname: variable};
  };