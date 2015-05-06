chart.prototype.checkRequired = function(){
    var context = this;
    var config = context.config;
    var colnames = d3.keys(context.raw_data[0]);
    context.required_cols = context.required_cols || [];
    context.required_cols.forEach(function(e, i){
        if(colnames.indexOf(e) < 0){
            d3.select(context.div).select(".loader").remove();
            context.wrap.append("div").attr("class", "alert alert-error alert-danger").html("The value '"+e+"' for the <code>"+context.required_vars[i]+"</code> setting does not match any column in the provided dataset.");
            throw new Error("Error in settings object: The value '"+e+"' for the "+context.required_vars[i]+" setting does not match any column in the provided dataset.");
        };
      });
}