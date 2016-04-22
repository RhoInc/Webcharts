export default function textSize(width) {
  let fontSize = '14px';
  let pointSize = 4;
  let strokeWidth = 2;

  if (!this.config.scale_text) {
    fontSize = this.config.fontSize;
    pointSize = this.config.pointSize || 4;
    strokeWidth = this.config.strokeWidth || 2;
  }
  else if (width >= 600) {
    fontSize = '14px';
    pointSize = 4;
    strokeWidth = 2;
  }
  else if (width > 450 && width < 600) {
    fontSize = '12px';
    pointSize = 3;
    strokeWidth = 2;
  }
  else if (width > 300 && width < 450) {
    fontSize = '10px';
    pointSize = 2;
    strokeWidth = 2;
  }
  else if (width <= 300) {
    fontSize = '10px';
    pointSize = 2;
    strokeWidth = 1;
  }

  this.wrap.style('font-size', fontSize);
  this.config.flex_pointSize = pointSize;
  this.config.flex_strokeWidth = strokeWidth;
}
