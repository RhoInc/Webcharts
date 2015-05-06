chart.prototype.textSize = function(width,height){
  var context = this
  var font_size = "14px";
  var point_size = 4;
  var stroke_width = 2;

  if(this.config.no_text_size){
    font_size = context.config.font_size;
    point_size = context.config.point_size || 4;
    stroke_width = context.config.stroke_width || 2;
  }
  else if(width >= 600){
    font_size = "14px";
    point_size = 4;
    stroke_width = 2;
  }
  else if(width > 450 && width < 600){
    font_size = "12px";
    point_size = 3;
    stroke_width = 2;
  }
  else if(width > 300 && width < 450){
    font_size = "10px";
    point_size = 2;
    stroke_width = 2;
  }
  else if(width <= 300){
    font_size = "10px";
    point_size = 2;
    stroke_width = 1;
  }

  // context.svg.select("defs style").html(
  //   "@import url(http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,300,600,700);"+
  //   "*{font-family: 'Open Sans' Helvetica Arial sans-serif; font-size: "+font_size+";}"+
  //   ".axis path.domain{fill: none; stroke: #ccc; shape-rendering: crispEdges; } .axis .tick line{stroke: #eee; shape-rendering: crispEdges; } .axis .tick text{font-size: .9em; }"
  // );

  context.wrap.style("font-size",font_size);
  context.config.flex_point_size = point_size;
  context.config.flex_stroke_width = stroke_width;
}