Controls.prototype.makeBtnGroupControl = function(control, control_wrap){
    var partial = control.option.indexOf(".") !== -1;
    var option_name = partial ? control.option.split(".")[0] : control.option;
    var option_data = control.values ? control.values : d3.keys(context.data[0]).map(function(m){return {label: m, val: m}});
    control_wrap = control_wrap.append("div").attr("class", "btn-group")
    var changers = control_wrap.selectAll("button")
      	.data(option_data)
      	.enter().append("button").attr("class", "btn btn-default btn-sm").text(function(d){return d.label})
    context.targets.forEach(function(e){
      changers.classed("btn-primary", function(d){
          return d.selected || (e.config[option_name] && e.config[option_name] === d.val) ? true : false;
        });
    });

    changers.on("click", function(d){
       changers.classed("btn-primary", false)
       d3.select(this).classed("btn-primary", true);
       var value = d.val;
       var datum = control_wrap.datum();
       if(!context.target.config[datum.option])
       	context.target.config[datum.option] = {};
       context.target.config[datum.option] = value;
       context.target.draw();
      });
  };