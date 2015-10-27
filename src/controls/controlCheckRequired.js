export function controlCheckRequired(dataset){
    if(!dataset[0]){
      return;
    }
   	let colnames = d3.keys(dataset[0]);
    if(!this.config.inputs){
      return;
    }
   	this.config.inputs.forEach((e,i) => {
    	if(e.type === 'subsetter' && colnames.indexOf(e.value_col) === -1){
      		throw new Error( 'Error in settings object: the value "'+e.value_col+'" does not match any column in the provided dataset.');
    	}
  	});
}
