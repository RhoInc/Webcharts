Controls.prototype.makeSetControl = function(control, control_wrap){
    control.set.forEach(function(e){
    	var changer = control_wrap.append("input").attr("type", "number").attr("class", "inline").attr("placeholder", e).datum(e);
      if(context.target.config[control.option])
      changer.property("value", context.target.config[control.option][e]);
    	changer.on("change", function(d){
       	var value = d3.select(this).property("value");
       	context.target.config[control.option][d] = +value;
       	context.target.draw();
      });
    });
  };