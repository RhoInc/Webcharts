export default function layout() {
  this.wrap.selectAll('*').remove();
  this.ready = true;
  this.controlUpdate();
}
