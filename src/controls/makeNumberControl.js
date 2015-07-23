Controls.prototype.makeNumberControl = function(control, control_wrap){
      var changer = control_wrap.append("input").attr("type", "number").attr("min", "0").attr("step", control.step || 1)
        .attr("class", "changer").datum(control);
      var partial = control.option.indexOf(".") !== -1;
      var option_name = partial ? control.option.split(".")[0] : control.option;
      context.targets.forEach(function(e){
        if(e.config[option_name])
          changer.property("value", +e.config[option_name]);
      });
     
      changer.on("change", function(d){
      	var value = +d3.select(this).property("value");
        context.targets.forEach(function(e){
          if(!e.config[option_name])
            e.config[option_name] = {};
          if(partial)
            e.config[option_name][control.option.split(".")[1]] = value;
          else
            e.config[option_name] = value;
          e.draw();
        });
        
      });
  };