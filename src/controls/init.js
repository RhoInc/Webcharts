export default function init(data) {
  this.data = data;
  this.checkRequired(this.data);
  this.layout();
}
