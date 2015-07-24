export function onDataError(error){
  if(!error)
    return;

  d3.select(this.div).select('.loader').remove();
  this.wrap.append('div').attr('class', 'alert alert-error alert-danger').text('Dataset could not be loaded.');
  throw new Error('Dataset could not be loaded. Check provided path ('+this.filepath+').');
}
