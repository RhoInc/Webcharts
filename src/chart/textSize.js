export function textSize(width){
  let font_size = '14px';
  let point_size = 4;
  let stroke_width = 2;

  if(!this.config.scale_text){
    font_size = this.config.font_size;
    point_size = this.config.point_size || 4;
    stroke_width = this.config.stroke_width || 2;
  }
  else if(width >= 600){
    font_size = '14px';
    point_size = 4;
    stroke_width = 2;
  }
  else if(width > 450 && width < 600){
    font_size = '12px';
    point_size = 3;
    stroke_width = 2;
  }
  else if(width > 300 && width < 450){
    font_size = '10px';
    point_size = 2;
    stroke_width = 2;
  }
  else if(width <= 300){
    font_size = '10px';
    point_size = 2;
    stroke_width = 1;
  }

  this.wrap.style('font-size',font_size);
  this.config.flex_point_size = point_size;
  this.config.flex_stroke_width = stroke_width;

}
