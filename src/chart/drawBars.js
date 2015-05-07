chart.prototype.drawBars = function(mark){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  var x = context.x;
  var y = context.y;
  var mark_data = mark.type === 'bar' ? mark.data : [];
  
  if(config.x.type === "ordinal"){
    // if(mark.arrange === "stacked")
    //   mark.data.forEach(calcStartTotal)
    var bar_groups = context.svg.selectAll(".bar-group").data(mark_data, function(d){return d.key});
    var old_bar_groups = bar_groups.exit();

    old_bar_groups.selectAll(".bar")
      .transition()
      .attr("y", context.y(0))
      .attr("height", 0)
    old_bar_groups.transition().remove();

    var nu_bar_groups = bar_groups.enter().append("g").attr("class", function(d){return "bar-group "+d.key})
    nu_bar_groups.append("title");
    if(!mark.split){
      var bars = nu_bar_groups.append("rect").attr("class", function(d){return "wc-data-mark bar "+d.key})
        .attr("stroke",  function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
        .attr("fill", function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
        .attr("fill-opacity", config.fill_opacity || .8)
        .style("clip-path", "url(#"+context.clippath_id+")")
        .attr("y", context.y(0))
        .attr("height", 0);
      bars.transition()
        .attr("x", function(d){return context.x(d.values.x)})
        .attr("y", function(d){return context.y(d.values.y)})
        .attr("width", context.x.rangeBand())
        .attr("height", function(d){return context.y(0) - context.y(d.values.y)  });
    }//no arrangement
    else{
      var subcats = d3.set(context.raw_data.map(function(m){return m[mark.split]})).values();
      var bars = bar_groups.selectAll("rect").data(function(d){return d.values }, function(d){return d.key});
      bars.exit()
        .transition()
        .attr("y", context.y(0))
        .attr("height", 0)
        .remove();
      bars.enter().append("rect")
        .attr("class", function(d){return "wc-data-mark bar "+d.key})
        .style("clip-path", "url(#"+context.clippath_id+")")
        .attr("y", context.y(0))
        .attr("height", 0);

      bars
        .attr("stroke",  function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
        .attr("fill", function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
        .attr("fill-opacity", config.fill_opacity || .8);

      if(!mark.arrange){
        bars.transition()
          .attr("x", function(d){return context.x(d.values.x)})
          .attr("y", function(d){return context.y(d.values.y)})
          .attr("width", context.x.rangeBand())
          .attr("height", function(d){return context.y(0) - context.y(d.values.y)  });
      }
      else if(mark.arrange === "stacked"){
       bars.transition()
          .attr("x", function(d){return context.x(d.values.x)})
          .attr("y", function(d){return context.y(d.values.start)})
          .attr("width", context.x.rangeBand())
          .attr("height", function(d){return context.y(0) - context.y(d.values.y)  })
      }//stacked
      else if(mark.arrange === "grouped"){
        bars.transition()
          .attr("x", function(d,i){
            var position = subcats.indexOf(d.key);
            return context.x(d.values.x)+context.x.rangeBand()/subcats.length*position;
          })
          .attr("y", function(d){return context.y(d.values.y)})
          .attr("width", function(d,i){
            return context.x.rangeBand()/subcats.length;
          })
          .attr("height", function(d){return context.y(0) - context.y(d.values.y)  });
      }//grouped
    }//split
  }
  else if(config.y.type === "ordinal"){
    // if(mark.arrange === "stacked")
    //   mark.data.forEach(calcStartTotal)
    var bar_groups = context.svg.selectAll(".bar-group").data(mark.data, function(d){return d.key});
    var old_bar_groups = bar_groups.exit();

    old_bar_groups.selectAll(".bar")
      .transition()
      .attr("x", context.x(0))
      .attr("width", 0)
    old_bar_groups.transition().remove();

    var nu_bar_groups = bar_groups.enter().append("g").attr("class", function(d){return "bar-group "+d.key})
    nu_bar_groups.append("title");

    if(!mark.split){
      var bars = nu_bar_groups.append("rect").attr("class", function(d){return "wc-data-mark bar "+d.key})
        .attr("stroke",  function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
        .attr("fill", function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
        .attr("fill-opacity", config.fill_opacity || .8)
        .style("clip-path", "url(#"+context.clippath_id+")")
        .attr("x", context.x(0))
        .attr("width", 0);
      bars.transition()
        //.attr("x", function(d){return context.x(d.values.x)})
        .attr("y", function(d){return context.y(d.values.y)})
        .attr("height", context.y.rangeBand())
        .attr("width", function(d){return context.x(d.values.x)  });
    }//no split
    else{
      var subcats = d3.set(context.raw_data.map(function(m){return m[mark.split]})).values();
      var bars = bar_groups.selectAll("rect").data(function(d){return d.values}, function(d){return d.key});
      bars.exit()
        .transition()
        .attr("x", context.x(0))
        .attr("width", 0)
        .remove();
      bars.enter().append("rect")
        .attr("class", function(d){return "wc-data-mark bar "+d.key})
        .style("clip-path", "url(#"+context.clippath_id+")")
        .attr("x", context.x(0))
        .attr("width", 0);

      bars
        .attr("stroke",  function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
        .attr("fill", function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
        .attr("fill-opacity", config.fill_opacity || .8)

      if(!mark.arrange){
        bars.transition()
          .attr("y", function(d){return context.y(d.values.y)})
          .attr("x", function(d){return context.x(0)})
          .attr("height", context.y.rangeBand())
          .attr("width", function(d){return context.x(d.values.x)  });
      }//no arrangement
      else if(mark.arrange === "stacked"){
       bars.transition()
          .attr("x", function(d){return context.x(d.values.start)})
          .attr("y", function(d){return context.y(d.values.y)})
          .attr("height", context.y.rangeBand())
          .attr("width", function(d){return context.x(d.values.x)  })
      }//stacked
      else if(mark.arrange === "grouped"){
       bars.transition()
          .attr("y", function(d,i){
            var position = subcats.indexOf(d.key);
            return context.y(d.values.y)+context.y.rangeBand()/subcats.length*position;
          })
          .attr("x", function(d){return context.x(0)})
          .attr("height", function(d,i){
            return context.y.rangeBand()/subcats.length;
          })
          .attr("width", function(d){return context.x(d.values.x)  });
      }//grouped

    }//split

    bars.sort(function(a,b){
      return mark.order ? d3.ascending(mark.order.indexOf(a.key), mark.order.indexOf(b.key)) : a-b
    });
  }
}