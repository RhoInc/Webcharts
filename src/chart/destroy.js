export default function (){
  //run onDestroy callback
  this.events.onDestroy.call(this);

  //remove resize event listener
  var context = this;
  d3.select(window).on('resize.'+context.element+context.id, null);

  //unmount chart wrapper
  this.wrap.remove()
}