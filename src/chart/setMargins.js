export default function setMargins() {
  const yTicks = this.yAxis.tickFormat() ? this.y.domain().map(m => this.yAxis.tickFormat()(m)) : this.y.domain();

  let maxYTextLength = Math.max.apply(null, yTicks.map(m => String(m).length));
  if (this.config.y_format && this.config.y_format.indexOf('%') > -1) {
    maxYTextLength += 1;
  }
  maxYTextLength = Math.max(2, maxYTextLength);
  const xLabelOn = this.config.x.label ? 1.5 : 0;
  const yLabelOn = this.config.y.label ? 1.5 : 0.25;
  const fontSize = parseInt(this.wrap.style('font-size'), 10);
  let yMargin = maxYTextLength * fontSize * 0.5 + (fontSize * yLabelOn * 1.5) || fontSize;
  let xMargin = fontSize + (fontSize / 1.5) + (fontSize * xLabelOn) || fontSize;

  yMargin += 6;
  xMargin += 3;

  return {
    top: this.config.margin && this.config.margin.top ? this.config.margin.top : fontSize,
    right: this.config.margin && this.config.margin.right ? this.config.margin.right : fontSize,
    bottom: this.config.margin && this.config.margin.bottom ? this.config.margin.bottom : xMargin,
    left: this.config.margin && this.config.margin.left ? this.config.margin.left : yMargin
  };
}
