/** Checks raw dataset against the configuration object for the chart and throws errors if the configuration references values that are not present. Called once upon initialization of chart.
*@memberof webCharts.objects.chart
*@method checkRequired
*/
export function checkRequired(){
    let colnames = d3.keys(this.raw_data[0]);
    let requiredVars = [];
    let requiredCols = [];
    if(this.config.x.column){
    	requiredVars.push('this.config.x.column');
    	requiredCols.push(this.config.x.column);
    }
    if(this.config.y.column){
    	requiredVars.push('this.config.y.column');
    	requiredCols.push(this.config.y.column);
    }
    if(this.config.color_by){
    	requiredVars.push('this.config.color_by');
    	requiredCols.push(this.config.color_by);
    }
    this.config.marks.forEach((e,i) => {
    	if(e.per && e.per.length){
    		e.per.forEach((p,j) => {
    			requiredVars.push('this.config.marks['+i+'].per['+j+']');
	    		requiredCols.push(p);
    		});
	    }
	    if(e.split){
	    	requiredVars.push('this.config.marks['+i+'].split');
	    	requiredCols.push(e.split);
	    }
    });

    requiredCols.forEach((e, i) => {
        if(colnames.indexOf(e) < 0){
            d3.select(this.div).select('.loader').remove();
            this.wrap.append('div')
            	.style('color', 'red')
            	.html('The value "'+e+'" for the <code>'+requiredVars[i]+'</code> setting does not match any column in the provided dataset.');
            throw new Error('Error in settings object: The value "'+e+'" for the '+requiredVars[i]+' setting does not match any column in the provided dataset.');
        }
      });
}
