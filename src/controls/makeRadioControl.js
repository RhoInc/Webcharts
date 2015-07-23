Controls.prototype.makeRadioControl = function(control, control_wrap){
      var partial = control.option.indexOf(".") !== -1;
      var option_name = partial ? control.option.split(".")[0] : control.option;
      var changers = control_wrap.selectAll("label")
      	.data(control.values)
      	.enter().append("label").attr("class", "radio").text(function(d,i){return control.relabels ? control.relabels[i] : d})
      .append("input")
        	.attr("type", "radio").attr("class", "changer")
        	.attr("name", option_name+"-"+Math.random()).property("value", function(d){return d})
        	.property("checked", function(d){
           	if(partial)
            	return context.targets[0].config[option_name] && context.targets[0].config[option_name][control.option.split(".")[1]] && 
            		context.targets[0].config[option_name][control.option.split(".")[1]] === d ? true : false;
          	else
            	return context.targets[0].config[option_name] && context.targets[0].config[option_name] === d ? true : false;
          })
        	//.datum(control);

      context.targets.forEach(function(e){
        if(!e.config[option_name] && partial)
          e.config[option_name] = {};
      });

      changers.on("change", function(d){
      	var value = null;
      	changers.each(function(c){
         	if(d3.select(this).property("checked"))
            	value = d3.select(this).property("value") === "none" ? null : c//d3.select(this).property("value");
        	});
          context.targets.forEach(function(e){
            if(partial)
              e.config[option_name][control.option.split(".")[1]] = value;
            else
              e.config[option_name] = value;
            e.draw();
          });
      });
  };