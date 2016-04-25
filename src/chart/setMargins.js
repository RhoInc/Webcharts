export default function setMargins() {
  const yTicks = this.yAxis.tickFormat() ? this.y.domain().map(m => this.yAxis.tickFormat()(m)) : this.y.domain();
  const findCaps = new RegExp(/[A-Z]/g);
  let maxYTextLength = Math.max.apply(
    null,
    yTicks.map(m => {
      const capCount = String(m).match(findCaps) ? String(m).match(findCaps).length : 0;
      // capital letters count for 1.5 the width of normal letters
      return String(m).length - capCount + (capCount * 1.5);
    })
  );
  if (this.config.y.format && this.config.y.format.indexOf('%') > -1) {
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
