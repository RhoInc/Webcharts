Controls.prototype.makeFilterControl = function(control, control_wrap){
      var changer = makeDropdownControl(control, control_wrap);
      changer.on("change", function(d){
      	var value = d3.select(this).property("value");
        context.targets.forEach(function(target){
          if(!target.config[d.option])
            target.config[d.option] = {};
          target.config[d.option].col = value;
        })
        
      	var filt_data = getValType(value);
      	drawOptions(this.parentNode, filt_data, d.option, value);
      });
   };