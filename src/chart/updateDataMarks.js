export default function (){
  this.drawBars( this.marks.filter(f => f.type === 'bar') );
  this.drawLines( this.marks.filter(f => f.type === 'line') );
  this.drawPoints( this.marks.filter(f => f.type === 'circle') );
}
