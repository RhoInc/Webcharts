Chart.prototype.checkRequired = function(){
    let colnames = d3.keys(this.raw_data[0]);
    this.required_cols.forEach((e, i) => {
        if(colnames.indexOf(e) < 0){
            d3.select(this.div).select('.loader').remove();
            this.wrap.append('div').attr('class', 'alert alert-error alert-danger').html('The value "'+e+'" for the <code>'+this.required_vars[i]+'</code> setting does not match any column in the provided dataset.');
            throw new Error('Error in settings object: The value "'+e+'" for the '+this.required_vars[i]+' setting does not match any column in the provided dataset.');
        }
      });
};
