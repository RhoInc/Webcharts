Controls.prototype.makeLabelerControl = function(control, control_wrap, data){
 	  var partial = control.option.indexOf(".") !== -1;
    var option_name = partial ? control.option.split(".")[0] : control.option;

    var labelers = control_wrap.selectAll("input.labeler").data(data, function(d){return d});
    labelers.exit().remove();
    labelers.enter().append("input").attr("type", "text").attr("class", "changer labeler")
    labelers.attr("placeholder", function(d){return "label for "+d})
      	.on("change", function(d){
         	var value = d3.select(this).property("value");
          context.targets.forEach(function(target){
           	if(control.multiple){
            	target.config[option_name].forEach(function(e){
            		if(e[control.option.split(".")[1]] === d)
               		e.label = value;
            	});
          	}
          	else
            	target.config[option_name].label = value;
          	target.draw();
          });
      	});
  };