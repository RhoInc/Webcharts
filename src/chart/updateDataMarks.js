export function updateDataMarks(){
  this.drawPoints( this.marks.filter(f => f.type === 'circle') );
  this.drawLines( this.marks.filter(f => f.type === 'line') );
  this.drawBars( this.marks.filter(f => f.type === 'bar') );
}
