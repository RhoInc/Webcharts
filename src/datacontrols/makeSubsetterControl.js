Controls.prototype.makeSubsetterControl = function(control, control_wrap){
  var context = this;
   	var changer = control_wrap.append("select").attr("class", "changer").attr("multiple", control.multiple ? true : null).datum(control);
    var option_data = control.values ? control.values : 
    	d3.set(context.data.map(function(m){return m[control.value_col]}).filter(function(f){return f}) ).values();
    option_data.sort(d3.ascending);
    control.start = control.start ? control.start : control.loose ? option_data[0] : null;
    if(!control.multiple && !control.start)
    	option_data.unshift("All");
    //option_data.sort();
    control.loose = !control.loose && control.start ? true : control.loose;
    var options = changer.selectAll("option").data(option_data).enter().append("option").text(function(d){return d})
    	.property("selected", function(d){return d === control.start});

    context.targets.forEach(function(e){
      var match = e.filters.slice().map(function(m){return m.col === control.value_col}).indexOf(true);
      if(match > -1)
        e.filters[match] = {col: control.value_col, val: control.start ? control.start : "All", choices: option_data, loose: control.loose}
      else
        e.filters.push({col: control.value_col, val: control.start ? control.start : "All", choices: option_data, loose: control.loose});
    });

    if(control.chosen){//chosen plugin
      $(changer.node()).chosen(control.chosen).change(function(){
        var d = d3.select(this).datum();
        doTheSubset(d, 0, 0, this);
        $(this).trigger("chosen:updated");
      });
    }
    else
      changer.on("change", doTheSubset);

    function doTheSubset(d,i,c, current_context){
      var this_subsetter = current_context || this;
      if(control.multiple){
        var values = options.filter(function(f){return d3.select(this).property("selected")})[0].map(function(m){return d3.select(m).property("value")});

        var new_filter = {col: control.value_col, val: values, choices: option_data, loose: control.loose};
        context.targets.forEach(function(e){
          context.setSubsetter(e, new_filter)
          e.draw();
        });
      }
      else{
        var value = d3.select(this_subsetter).property("value");
        var new_filter = {col: control.value_col, val: value, choices: option_data, loose: control.loose};
        context.targets.forEach(function(e){
          context.setSubsetter(e, new_filter)
          e.draw();
        });
      };
      if(control.callback){
        context.targets.forEach(function(e){
          control.callback(e)
        });
      }
    };

    if(control.chosen)//chosen plugin
      $(this).trigger("chosen:updated");
  
  };