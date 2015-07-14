chart.prototype.drawBars = function(marks){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  var x = context.x;
  var y = context.y;
  // var mark_data = mark.data//mark.type === 'bar' ? mark.data : [];

  var bar_supergroups = context.svg.selectAll(".bar-supergroup").data(marks, function(d){return d.per.join('-')});
  bar_supergroups.enter().append('g').attr('class', 'bar-supergroup');
  bar_supergroups.exit().remove();
  
  var bar_groups = bar_supergroups.selectAll(".bar-group").data(function(d){return d.data}, function(d){return d.key});
  var old_bar_groups = bar_groups.exit();

  if(config.x.type === "ordinal"){
    old_bar_groups.selectAll(".bar")
      .transition()
      .attr("y", context.y(0))
      .attr("height", 0)
    old_bar_groups.transition().remove();

    var nu_bar_groups = bar_groups.enter().append("g").attr("class", function(d){return "bar-group "+d.key})
    nu_bar_groups.append("title");

    var bars = bar_groups.selectAll("rect").data(function(d){return d.values instanceof Array ? d.values : [d] }, function(d){return d.key});
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

    bars.each(function(d){
      var mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(context.raw_data.map(function(m){return m[mark.split]})).values();
      d3.select(this).attr(mark.attributes)
    });

    bars.transition()
      .attr("x", function(d){
        if(d.arrange === 'stacked')
          return context.x(d.values.x)
        else if(d.arrange === 'nested'){
          var position = d.subcats.indexOf(d.key);
          var offset = position ? context.x.rangeBand()/(d.subcats.length*(position)*.5)/2 : context.x.rangeBand()/2
          return context.x(d.values.x) + context.x.rangeBand()/2 - offset
        }
        else{
          var position = d.subcats.indexOf(d.key);
          return context.x(d.values.x)+context.x.rangeBand()/d.subcats.length*position;
        }
      })
      .attr("y", function(d){
        if(d.arrange !== 'stacked')
          return context.y(d.values.y)
        else
          return context.y(d.values.start);
      })
      .attr("width", function(d){
        if(d.arrange === 'stacked')
          return context.x.rangeBand();
        else if(d.arrange === 'nested'){
          var position = d.subcats.indexOf(d.key);
          return position ? context.x.rangeBand()/(d.subcats.length*(position)*.5) : context.x.rangeBand();
        }
        else
          return context.x.rangeBand()/d.subcats.length;
      })
      .attr("height", function(d){ return context.y(0) - context.y(d.values.y)  });

  }
  else if(config.y.type === "ordinal"){
    old_bar_groups.selectAll(".bar")
      .transition()
      .attr("x", context.x(0))
      .attr("width", 0)
    old_bar_groups.transition().remove();

    var nu_bar_groups = bar_groups.enter().append("g").attr("class", function(d){return "bar-group "+d.key})
    nu_bar_groups.append("title");

    var bars = bar_groups.selectAll("rect").data(function(d){return d.values instanceof Array ? d.values : [d] }, function(d){return d.key});
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
      .attr("fill-opacity", config.fill_opacity || .8);

    bars.each(function(d){
      var mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(context.raw_data.map(function(m){return m[mark.split]})).values();
    });

    bars.transition()
      .attr("x", function(d){
        if(d.arrange === 'stacked')
          return context.x(d.values.start)
        else{
          return context.x(0)
        }
      })
      .attr("y", function(d){
        if(d.arrange !== 'grouped')
          return context.y(d.values.y)
        else{
          var position = d.subcats.indexOf(d.key);
          return context.y(d.values.y)+context.y.rangeBand()/d.subcats.length*position;
        }
      })
      .attr("width", function(d){
        return context.x(d.values.x)
      })
      .attr("height", function(d){ 
        if(config.y.type === 'quantile')
          return 20
        else if(d.arrange === 'stacked')
          return context.y.rangeBand()
        else if(d.arrange === 'nested'){
          var position = d.subcats.indexOf(d.key);
          return position ? context.y.rangeBand()/(sibs.length*(position)*.75) : context.y.rangeBand();
        }
        else
          return context.y.rangeBand()/d.subcats.length;
      });

    // bars.sort(function(a,b){
    //   return mark.order ? d3.ascending(mark.order.indexOf(a.key), mark.order.indexOf(b.key)) : a-b
    // });
  }
  else if(config.x.type === 'linear' && config.x.bin){
    old_bar_groups.selectAll(".bar")
      .transition()
      .attr("y", context.y(0))
      .attr("height", 0)
    old_bar_groups.transition().remove();

    var nu_bar_groups = bar_groups.enter().append("g").attr("class", function(d){return "bar-group "+d.key})
    nu_bar_groups.append("title");

    var bars = bar_groups.selectAll("rect").data(function(d){return d.values instanceof Array ? d.values : [d] }, function(d){return d.key});
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

    bars.each(function(d){
      var mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(context.raw_data.map(function(m){return m[mark.split]})).values();
      d3.select(this).attr(mark.attributes);
      var parent = d3.select(this.parentNode).datum();
      var rangeSet = parent.key.split(',').map(function(m){return +m});
      d.rangeLow = d3.min(rangeSet);
      d.rangeHigh = d3.max(rangeSet);
    });

    bars.transition()
      .attr("x", function(d){
        return context.x(d.rangeLow)
      })
      .attr("y", function(d){
        if(d.arrange !== 'stacked')
          return context.y(d.values.y)
        else
          return context.y(d.values.start);
      })
      .attr("width", function(d){
        return context.x(d.rangeHigh) - context.x(d.rangeLow);
      })
      .attr("height", function(d){ return context.y(0) - context.y(d.values.y)  });

  }
  else if(config.y.type === 'linear' && config.y.bin){
    old_bar_groups.selectAll(".bar")
      .transition()
      .attr("x", context.x(0))
      .attr("width", 0)
    old_bar_groups.transition().remove();

    var nu_bar_groups = bar_groups.enter().append("g").attr("class", function(d){return "bar-group "+d.key})
    nu_bar_groups.append("title");

    var bars = bar_groups.selectAll("rect").data(function(d){return d.values instanceof Array ? d.values : [d] }, function(d){return d.key});
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
      .attr("fill-opacity", config.fill_opacity || .8);

    bars.each(function(d){
      var mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(context.raw_data.map(function(m){return m[mark.split]})).values();
      var parent = d3.select(this.parentNode).datum();
      var rangeSet = parent.key.split(',').map(function(m){return +m});
      d.rangeLow = d3.min(rangeSet);
      d.rangeHigh = d3.max(rangeSet);
    });

    bars.transition()
      .attr("x", function(d){
        if(d.arrange === 'stacked')
          return context.x(d.values.start)
        else{
          return context.x(0)
        }
      })
      .attr("y", function(d){
        return context.y(d.rangeHigh)
      })
      .attr("width", function(d){
        return context.x(d.values.x)
      })
      .attr("height", function(d){ 
        return context.y(d.rangeLow) - context.y(d.rangeHigh);
      });

  }
  else{
    old_bar_groups.selectAll(".bar")
      .transition()
      .attr("y", context.y(0))
      .attr("height", 0)
    old_bar_groups.transition().remove();
    bar_supergroups.remove();
  }
}