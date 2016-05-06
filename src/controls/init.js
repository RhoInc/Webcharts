export default function init(data) {
  this.data = data;
  this.wrap.attr('class', 'WebchartsWrap');
  this.checkRequired(this.data);
  this.layout();
}
