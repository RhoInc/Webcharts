(function (root, factory) { if(typeof define === "function" && define.amd) { define(["webCharts"], factory); } else if(typeof module === "object" && module.exports) {module.exports = factory(require("webCharts")); } else { root.dataControls = factory(root.webCharts); } }(this, function(webCharts){dataControls = {version: "0.2"};
var Controls = function(element, data, config, defaults, callback){
	if(config.location === "top")
   		this.div = d3.select(element).insert("div", ":first-child").attr("class", "wc-controls top");
	else
  		this.div = d3.select(element).append("div").attr("class", "wc-controls "+config.location);
  this.element = element;
	this.data = data || [];
	this.config = config;
  this.config.controls = this.config.controls || [];
	this.defaults = defaults ? defaults : {resizable: true, max_width: 800};
	this.callback = callback;
  this.targets = [];

	this.div.selectAll(".changer").each(function(e,i){
    if(e.links){
    	var value = d3.select(this).attr("type") === "checkbox" ? !d3.select(this).property("checked") : d3.select(this).property("value");
    	toggleDisabled(value, e.links);
    }
  });

  return this;
};
dataControls.controls = Controls;
Controls.prototype.init = function(raw){
  	this.data = raw;
    if(!this.config.builder)
  	 this.checkRequired(this.data);
  	this.layout();
    this.ready = true;
};
Controls.prototype.checkRequired = function(dataset){
   	var context = this;
   	var colnames = d3.keys(dataset[0]);
   	var controls = context.config.controls;
    console.log('line 5??')
    if(!controls)
      return;
   	controls.forEach(function(e,i){
    	if(controls.type === "subsetter" && colnames.indexOf(e.value_col) === -1){
      		//d3.select(context.target.div).select(".loader").remove();
      		controls = controls.splice(controls[i],1);
      		throw new Error( "Error in settings object: the value '"+e.value_col+"' does not match any column in the provided dataset." );
    	}
  	});
};
Controls.prototype.reset = function(new_file){
	this.div.selectAll("*").remove();
	
	this.layout();
    this.ready = true;
	// context.target.wrap.selectAll("*").remove();
	// context.target.config = context.defaults;
	// context.target.filepath = new_file;
	// context.target.init();
};
Controls.prototype.layout = function(){
    this.div.selectAll("*").remove();
    this.div.append("div").attr("class", "main-settings");
    this.div.append("div").attr("class", "advanced-settings");
   	this.controlUpdate();
   	if(this.callback)
   		this.callback(this);
};
Controls.prototype.makeControlItem = function(control, div1, div2){
    var control_section = control.advanced ? div2 : div1;
    var control_wrap = control_section.insert("div", ".adv-btn")
      .attr("class", "control-group")
      .classed("inline", control.inline)
      .datum(control);
    var ctrl_label = control_wrap.append("span").attr("class", "control-label").text(control.label);
    if(control.required)
      ctrl_label.append("span").attr("class", "label label-required").text("Required");
    control_wrap.append("span").attr("class", "span-description").text(control.description);

    if(control.type === "text")
    	this.makeTextControl(control, control_wrap)
    else if(control.type === "number")
    	this.makeNumberControl(control, control_wrap)
    else if(control.type ===  "list")
    	this.makeListControl(control, control_wrap);
    else if(control.type === "dropdown")
    	this.makeDropdownControl(control, control_wrap);
    else if(control.type === "btngroup")
    	this.makeBtnGroupControl(control, control_wrap);
    else if(control.type === "toggle")
    	this.makeToggleControl(control, control_wrap);
    else if(control.type === "radio")
    	this.makeRadioControl(control, control_wrap);
    else if(control.type === "set")
    	this.makeSetControl(control, control_wrap);
    else if(control.type === "paired_list")
    	this.makePairedListControl(control, control_wrap);
    else if(control.type === "subsetter")
    	this.makeSubsetterControl(control, control_wrap);
    else if(control.type === "filter")
    	this.makeFilterControl(control, control_wrap);
   else
      throw new Error("Each control must have a type! Choose from: 'text', 'number', 'list', 'dropdown', 'toggle', 'radio', 'set', 'subsetter', 'btngroup'");
};
Controls.prototype.makeTextControl = function(control, control_wrap){
    var changer = control_wrap.append("input").attr("type", "text").attr("class", "changer").datum(control);
    context.targets.forEach(function(e){
      if(e.config[control.option])
        changer.property("value", e.config[control.option]);
    });
    
    changer.on("change", function(d){
    	var value = d3.select(this).property("value");
      context.targets.forEach(function(e){
        if(!e.config[d.option])
          e.config[d.option] = {};
        e.config[d.option] = value;
        e.draw();
      });
    });
  };
Controls.prototype.makeListControl = function(control, control_wrap){
    var changer = control_wrap.append("input").attr("type", "text").attr("class", "changer").datum(control);
    context.targets.forEach(function(e){
      if(e.config[control.option])
        changer.property("value", e.config[control.option]);
    });
    
    changer.on("change", function(d){
      var value = d3.select(this).property("value") ? d3.select(this).property("value").split(",").map(function(m){return m.trim()}) : null;
      context.targets.forEach(function(e){
        if(!e.config[d.option])
          e.config[d.option] = {};
        e.config[d.option] = value;
        e.draw();
      });
    });
  };
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
Controls.prototype.toggleDisabled = function(toggle, links){
    links.forEach(function(e){
    	context.div.select(".control-section").selectAll(".changer").each(function(f){
       	if(e.options.indexOf(f.option) !== -1)
         		d3.select(this).attr("disabled", e.val === toggle ? true : null);
      	});
    });   
  };
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
Controls.prototype.setSubsetter = function(target, obj){
      var match = -1;
      target.filters.forEach(function(e,i){
         if(e.col === obj.col)
         	match = i;
      });
      if(match > -1)
      	target.filters[match] = obj;
  };
Controls.prototype.getValType = function(variable){
   	var var_vals = d3.set(context.data.map(function(m){return m[variable]})).values();
      var vals_numbers = var_vals.filter(function(f){return +f || f=="NA" || f==0 });
      if(var_vals.length === vals_numbers.length && var_vals.length > 4)
      	return {type: "num", values: var_vals, varname: variable};
      else
      	return {type: "cat", values: var_vals, varname: variable};
  };
Controls.prototype.drawOptions = function(element, filt_data, option, variable){
   	var div = d3.select(element);
      div.selectAll(".filter-values").remove();
      if(filt_data.type === "cat"){ 
      	var filt_values = div.selectAll(".filter-values").data(filt_data.values.sort());
      	if(variable && variable !== "None"){
         	var filt_buttons = filt_values.enter().append("label").attr("class", "filter-values");
         	filt_buttons.append("input")
            	.attr("type", "checkbox")
              	.property("checked", true)
              	.on("change", function(d){
                 	var chosen_filts = filt_values.filter(function(f){return d3.select(this).select("input").property("checked")}).data();
                 	var value = d3.select(this).property("value");
                  context.targets.forEach(function(target){
                    target.config[option] = {col: variable, vals: chosen_filts};
                    target.draw();
                  });
              	});
          	filt_buttons.append("span").text(function(d){return d ? d : "N/A"})
        };
      }
      else if(filt_data.type === "num"){
      	var missing_data = filt_data.values.indexOf("NA") !== -1;
      	filt_data.values = filt_data.values.filter(function(f){return f !== "NA"});
      	var range_div = div.append("div").attr("class","numeric filter-values").datum(filt_data);
      	range_div.append("span").attr("class","slider-label min").text(d3.min(filt_data.values));
      	range_div.append("span").attr("class","slider-label max pull-right").text(d3.max(filt_data.values));
      	var range_slider = range_div.append("div").attr("class","range");
        	$(range_div.node()).find("div.range").slider({
         	range: true,
         	min: +d3.min(filt_data.values),
         	max: +d3.max(filt_data.values),
         	values: d3.extent(filt_data.values).map(function(m){return +m}),
         	slide: function(event, ui){
            	//update the labels
            	$( "span.min", range_div.node() ).text( ui.values[ 0 ]);
            	$( "span.max", range_div.node() ).text( ui.values[ 1 ]);

            	//update the settings object
            	var chosen_filts = filt_data.values.filter(function(f){
              		return +f >= ui.values[0] && +f <= ui.values[1];
            	});
            	context.targets.forEach(function(target){
                target.config[option] = {col: variable, vals: chosen_filts};
                target.draw();
              });       
          	}
        	});
      };
   };
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
Controls.prototype.extraControlInfo = function(){
   	  this.div.select(".control-section").selectAll(".control-group").each(function(e){
	      if(e.require){
	      	d3.select(this).select(".control-label").append("span")
	         	.attr("class", "label label-required")
	         	.text("Required")
	      };
	      if(e.description){
	      	d3.select(this).insert("span", ".changer")
	         	.attr("class", "span-description")
	         	.text(e.description)
	      };
    	});
  	};
Controls.prototype.controlUpdate = function(){
   	var control_div = this.div.select(".main-settings");
   	var advanced_div = this.div.select(".main-settings");
   	var context = this;

   	if(this.config.controls && this.config.controls.length && this.config.controls[0])
      	this.config.controls.forEach(function(e){context.makeControlItem(e,control_div,advanced_div) });
  };
//# sourceMappingURL=/maps/controls.js.map
 return dataControls; }));