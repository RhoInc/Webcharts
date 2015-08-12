/** Throws an error and prints a message if the {@link webCharts~chart.filepath filepath} cannot be resolved to a valid file
*@memberof chart
*@method onDataError
*/
export function onDataError(error){
  if(!error){
    return;
  }
  d3.select(this.div).select('.loader').remove();
  this.wrap.append('div').style('color', 'red').text('Dataset could not be loaded.');
  throw new Error('Dataset could not be loaded. Check provided path ('+this.filepath+').');
}
