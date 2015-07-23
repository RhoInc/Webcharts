Controls.prototype.makeDropdownControl = function(control, control_wrap){
  var context = this;
    var partial = control.option.indexOf(".") !== -1;
    var option_name = partial ? control.option.split(".")[0] : control.option;
    var changer = control_wrap.append("select").attr("class", "changer")
    	.attr("multiple", control.multiple ? true : null)
      .datum(control);

    var opt_values = control.values ? control.values instanceof Array ? control.values : 
      	d3.set(context.data.map(function(m){return m[context.targets[0].config[control.values] ]} )).values() : null;
    
    var option_data = opt_values ? opt_values.map(function(m){return {label: m}}) : d3.keys(context.data[0]).map(function(m){return {label: m}});
    
    if(!control.require || control.none)
    	option_data.unshift({label: "None"});

    var options = changer.selectAll("option").data(option_data).enter().append("option").text(function(d){return d.label});

    context.targets.forEach(function(e){
      if(e.config[option_name])
        changer.property("value", partial ? e.config[option_name][control.option.split(".")[1]] : e.config[option_name]);
      else
        changer.property("value", control.require ? "" : "None");
    });
    
    changer.on("change", function(d){
    	var value = d3.select(this).property("value");
      if(control.multiple)
       	var values = options.filter(function(f){return d3.select(this).property("selected")})[0].map(function(m){return d3.select(m).property("value")}).filter(function(f){return f !== "None"});

      value = value === "None" ? null : value;

      context.targets.forEach(function(e){
        if(!e.config[option_name]){
          e.config[option_name] = control.multiple ? [] : {};
        }
        if(partial){
          if(control.multiple){
            if(control.labeler){
                e.config[option_name] = values.map(function(m,i){
                  var existing = e.config[option_name].filter(function(f){return f[control.option.split(".")[1]] === m});
                  var obj = existing.length ? existing[0] : {}
                  obj[control.option.split(".")[1]] = m;
                  return obj;
                });
              }
              else
                e.config[option_name][control.option.split(".")[1]] = values;
            }
            else
              e.config[option_name][control.option.split(".")[1]] = value;
        }
        else
          e.config[option_name] = control.multiple ? values : value;
        if(control.labeler){
          var value_data = control.multiple ? values : value;
          makeLabelerControl(control, control_wrap, value_data);
        }
        
        e.draw();
      });
      
      if(control.links)
       	toggleDisabled(value, control.links)
    });

    return changer;
  };