Controls.prototype.makeToggleControl = function(control, control_wrap){
      control_wrap.select(".control-label");//.classed("inline", true);
      var changer = control_wrap.append("input").attr("type", "checkbox").attr("class", "changer").datum(control);
      context.targets.forEach(function(e){
        if(e.config[control.option])
          changer.property("checked", e.config[control.option]);
      });

      changer.on("change", function(d){
      	var value = d3.select(this).property("checked");
        context.targets.forEach(function(e){
        	if(!e.config[d.option])
           	e.config[d.option] = {};
          e.config[d.option] = value;
          e.draw();
        	if(control.links)
         	  toggleDisabled(!value, control.links);
        });
      });
  };