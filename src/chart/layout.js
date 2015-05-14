chart.prototype.layout = function(){
  var context = this;
  var config = context.config;
  var wrap = context.wrap;
  var element = context.element;

  context.svg = wrap.append("svg")
    .attr({"class": "wc-svg",
        "xmlns": "http://www.w3.org/2000/svg",
        "version": "1.1",
        "xlink": "http://www.w3.org/1999/xlink"
     })
    .append("g");
  var svg = context.svg;  
  var defs = svg.append("defs");
  defs.append("pattern").attr({
    "id": "diagonal-stripes",
    "x": 0, "y": 0, "width": 3, "height": 8, 'patternUnits': "userSpaceOnUse", 'patternTransform': "rotate(30)"
  })
  .append("rect").attr({"x": "0", "y": "0", "width": "2", "height": "8", "style": "stroke:none; fill:black"});

  // defs.append("style").attr("type", "text/css").html(
  //   "@import url(http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,300,600,700);"+
  //   "*{font-family: 'Open Sans' Helvetica Arial sans-serif; font-size: inherit;}"+
  //   ".axis path.domain{fill: none; stroke: #ccc; shape-rendering: crispEdges; } .axis .tick line{stroke: #eee; shape-rendering: crispEdges; } .axis .tick text{font-size: .9em; }"
  // );

  var eid = typeof element === "string" ? element.replace(/\./g, "") : d3.select(element).attr("class").replace(/\s/g, "") ;
  var setting_string = typeof btoa !== 'undefined' ? btoa(JSON.stringify(config)) : String(Math.random()*100);
  var rand = Math.floor( Math.random()*setting_string.length );
  var setting_id = setting_string.slice( rand, rand+5);
  context.clippath_id = "plot-clip-"+eid+"-"+setting_id;
  defs.append("clipPath").attr("id", context.clippath_id).append("rect").attr("class", "plotting-area");

  svg.append("g").attr("class", "y axis")
    .append("text").attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("dy", ".75em")
      .attr("text-anchor", "middle");
  svg.append("g").attr("class", "x axis")
    .append("text").attr("class", "axis-title")
      .attr("dy", "-.35em")
      .attr("text-anchor", "middle");

  var overlay = svg.append("rect")
    .attr("class", "overlay")
    .attr("opacity", 0);

  var legend = wrap.append("ul").attr("class", "legend");
  legend.append("span").attr("class", "legend-title");

  if(context.extraLayout)
      context.extraLayout();

  d3.select(context.div).select(".loader").remove();

  context.events.onLayout(this);
}