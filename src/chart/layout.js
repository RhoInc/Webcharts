export function layout(){
  this.svg = this.wrap.append("svg")
    .attr({"class": "wc-svg",
        "xmlns": "http://www.w3.org/2000/svg",
        "version": "1.1",
        "xlink": "http://www.w3.org/1999/xlink"
     })
    .append("g");
  // var svg = context.svg;
  var defs = this.svg.append("defs");
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

  let eid = typeof this.div === 'string' ? this.div.replace(/\./g, '') : d3.select(this.div).attr('class').replace(/\s/g, '') ;
  let setting_string = typeof btoa !== 'undefined' ? btoa(JSON.stringify(this.config)) : String(Math.random()*100);
  let rand = Math.floor( Math.random()*setting_string.length );
  let setting_id = setting_string.slice( rand, rand+5);
  this.clippath_id = 'plot-clip-'+eid+'-'+setting_id;

  defs.append('clipPath').attr('id', this.clippath_id).append('rect').attr('class', 'plotting-area');

  //y axis
  this.svg.append('g').attr('class', 'y axis')
    .append('text').attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('dy', '.75em')
      .attr('text-anchor', 'middle');
  //x axis
  this.svg.append('g').attr('class', 'x axis')
    .append('text').attr('class', 'axis-title')
      .attr('dy', '-.35em')
      .attr('text-anchor', 'middle');
  //overlay
  this.svg.append('rect')
    .attr('class', 'overlay')
    .attr('opacity', 0);
  //add legend
  this.wrap.append('ul').attr('class', 'legend')
    .append('span').attr('class', 'legend-title');

  d3.select(this.div).select('.loader').remove();

  this.events.onLayout(this);
}
