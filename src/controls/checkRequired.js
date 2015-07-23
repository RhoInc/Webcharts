Controls.prototype.checkRequired = function(dataset){
   	var context = this;
   	var colnames = d3.keys(dataset[0]);
   	var controls = context.config.controls;
    console.log('line 5??')
    if(!controls)
      return;
   	controls.forEach(function(e,i){
    	if(controls.type === "subsetter" && colnames.indexOf(e.value_col) === -1){
      		//d3.select(context.target.div).select(".loader").remove();
      		controls = controls.splice(controls[i],1);
      		throw new Error( "Error in settings object: the value '"+e.value_col+"' does not match any column in the provided dataset." );
    	}
  	});
};