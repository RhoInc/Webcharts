(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define(["d3"], factory);
  } else if(typeof module === "object" && module.exports) {
    module.exports = factory(require("d3"));
  } else {
    root.webCharts = factory(root.d3);
  }
}(this, function(d3){

var webCharts = {version: "0.1.2"};

webCharts.colors = {
  qualitative: ['rgb(102,194,165)','rgb(252,141,98)','rgb(141,160,203)','rgb(231,138,195)','rgb(166,216,84)','rgb(255,217,47)','rgb(229,196,148)','rgb(179,179,179)'],
  // qualitative: ['rgb(102,194,165)','rgb(252,141,98)','rgb(141,160,203)','rgb(231,138,195)','rgb(166,216,84)','rgb(255,217,47)','rgb(229,196,148)','rgb(179,179,179)'],
  nb: ["#2A415A", "#50BD6F","#EE6148", "#4BBCF3", "#D79109","#A03249", "#81980F", "#F888CA", "#349782", "#CB0E73"]
};

//this is handy - via http://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

webCharts.controlUI = function(element, data, config, defaults, callback){
	if(config.location === "top")
   	this.div = d3.select(element).insert("div", ":first-child").attr("class", "wc-controls top");
	else
  	this.div = d3.select(element).append("div").attr("class", "wc-controls "+config.location);
  this.element = element;
	this.data = data;
	this.config = config;
	this.defaults = defaults ? defaults : {resizable: true, max_width: 800};
	this.callback = callback;
  this.targets = [];
	var context = this;

	this.init = function(raw){
  	context.data = raw;
    if(!context.config.builder)
  	 context.checkRequired(context.data);
  	context.layout();
    context.ready = true;
	};

  this.checkRequired = function(dataset){
   	var context = this;
   	var colnames = d3.keys(dataset[0]);
   	var controls = context.config.controls;
   	controls.forEach(function(e,i){
    	if(controls.type === "subsetter" && colnames.indexOf(e.value_col) === -1){
      		//d3.select(context.target.div).select(".loader").remove();
      		controls = controls.splice(controls[i],1);
      		throw new Error( "Error in settings object: the value '"+e.value_col+"' does not match any column in the provided dataset." );
    	}
  	});
	};

	this.reset = function(new_file){
		context.div.selectAll("*").remove();
		d3.select(context.target.div).selectAll(".wc-controls").remove();
		context.target.wrap.selectAll("*").remove();
		context.target.config = context.defaults;
		context.target.filepath = new_file;
		context.target.init();
	};

	this.layout = function(){
    context.div.selectAll("*").remove();
    context.div.append("div").attr("class", "main-settings");
    context.div.append("div").attr("class", "advanced-settings");
   	this.controlUpdate();
   	if(this.callback)
   		this.callback(this);
	}//end layout

	function makeControlItem(control, div1, div2){
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
    	makeTextControl(control, control_wrap)
    else if(control.type === "number")
    	makeNumberControl(control, control_wrap)
    else if(control.type ===  "list")
    	makeListControl(control, control_wrap);
    else if(control.type === "dropdown")
    	makeDropdownControl(control, control_wrap);
    else if(control.type === "btngroup")
    	makeBtnGroupControl(control, control_wrap);
    else if(control.type === "toggle")
    	makeToggleControl(control, control_wrap);
    else if(control.type === "radio")
    	makeRadioControl(control, control_wrap);
    else if(control.type === "set")
    	makeSetControl(control, control_wrap);
    else if(control.type === "paired_list")
    	makePairedListControl(control, control_wrap);
    else if(control.type === "subsetter")
    	makeSubsetterControl(control, control_wrap);
    else if(control.type === "filter")
    	makeFilterControl(control, control_wrap);
   else
      throw new Error("Each control must have a type! Choose from: 'text', 'number', 'list', 'dropdown', 'toggle', 'radio', 'set', 'subsetter', 'btngroup'");
	};//setup general control

  function makeTextControl(control, control_wrap){
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
  };//make text

  function makeListControl(control, control_wrap){
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
  };//make list

  function makeNumberControl(control, control_wrap){
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
  };//make number

  function makeDropdownControl(control, control_wrap){
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
  };//make dropdown

  function makeBtnGroupControl(control, control_wrap){
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
  };//make button group

  function makeLabelerControl(control, control_wrap, data){
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
  };//make labeler

  function toggleDisabled(toggle, links){
    links.forEach(function(e){
    	context.div.select(".control-section").selectAll(".changer").each(function(f){
       	if(e.options.indexOf(f.option) !== -1)
         		d3.select(this).attr("disabled", e.val === toggle ? true : null);
      	});
    });   
  };//toggle disabled

  function makeToggleControl(control, control_wrap){
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
  };//make toggle

  function makeRadioControl(control, control_wrap){
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
  };//make radio 

  function makeSetControl(control, control_wrap){
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
  };//make set

  function makeSubsetterControl(control, control_wrap){
   	var changer = control_wrap.append("select").attr("class", "changer").attr("multiple", control.multiple ? true : null).datum(control);
    var option_data = control.values ? control.values : 
    	d3.set(context.data.map(function(m){return m[control.value_col]}).filter(function(f){return f}) ).values();
    option_data.sort(d3.ascending);
    control.start = control.start ? control.start : control.loose ? option_data[0] : null;
    if((!control.multiple && !control.start) || control.all)
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
          setSubsetter(e, new_filter)
          e.draw();
        });
      }
      else{
        var value = d3.select(this_subsetter).property("value");
        var new_filter = {col: control.value_col, val: value, choices: option_data, loose: control.loose};
        context.targets.forEach(function(e){
          setSubsetter(e, new_filter)
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
  
  };//make subsetter

   function setSubsetter(target, obj){
      var match = -1;
      target.filters.forEach(function(e,i){
         if(e.col === obj.col)
         	match = i;
      });
      if(match > -1)
      	target.filters[match] = obj;
   };//set subsetter

   function getValType(variable){
   	var var_vals = d3.set(context.data.map(function(m){return m[variable]})).values();
      var vals_numbers = var_vals.filter(function(f){return +f || f=="NA" || f==0 });
      if(var_vals.length === vals_numbers.length && var_vals.length > 4)
      	return {type: "num", values: var_vals, varname: variable};
      else
      	return {type: "cat", values: var_vals, varname: variable};
   };//get value type

   function drawOptions(element, filt_data, option, variable){
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
   };//draw options

   function makeFilterControl(control, control_wrap){
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
   };//make filter

   context.div.selectAll(".changer").each(function(e,i){
      if(e.links){
      	var value = d3.select(this).attr("type") === "checkbox" ? !d3.select(this).property("checked") : d3.select(this).property("value");
      	toggleDisabled(value, e.links);
      }
   });//makeControlItem and all its friends

  	this.extraControlInfo = function(){
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
  	};//extra control info

  this.controlUpdate = function(){
   	var control_div = this.div.select(".main-settings");
   	var advanced_div = this.div.select(".main-settings");

   	if(this.config.controls.length && this.config.controls[0])
      	this.config.controls.forEach(function(e){makeControlItem(e,control_div,advanced_div) });
  };//controlUpdate

	return this;
};//CONTROLS

//set of functions to manipulate data
webCharts.dataOps = {
  //function to summarize array of numbers - basically just d3 shortcuts
  summarize: function(vals, stat){
    var nvals = vals.filter(function(f){return +f || +f === 0}).map(function(m){return +m});
    var mathed;
    if(!stat || stat === "mean")
      mathed = d3.mean(nvals);
    else if(stat === "median")
      mathed = d3.median(nvals);
    else if(stat === "max")
      mathed = d3.max(nvals)
    else if(stat === "min")
      mathed = d3.min(nvals)
    else if(stat === "sum")
      mathed = d3.sum(nvals.map(function(m){return +m}));
    else if(stat === "count")
      mathed = vals.length;

    return mathed;
  },

  //linear regression - returns object with slope, intercept and r2 given a set of xs and ys
  linearRegression: function(x,y){
    //http://stackoverflow.com/questions/20507536/d3-js-linear-regression
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < n; i++) {
      sum_x += x[i];
      sum_y += y[i];
      sum_xy += (x[i]*y[i]);
      sum_xx += (x[i]*x[i]);
      sum_yy += (y[i]*y[i]);
    } 

    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
    lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
    lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

    return lr;
  },//linear regression

  //standard error - borrowed this from somewhere on the internet
  standardError: function(vals){
    if(!vals)
      return null;
    var n = +vals.length;
    if (n < 1) return NaN;
    if (n === 1) return 0;

    var mean = d3.sum(vals)/n,
        i = -1,
        s = 0;

    while (++i < n) {
      var v = vals[i] - mean;
      s += v * v;
    };

    return Math.sqrt(s / (n - 1)) / Math.sqrt(n);
  },

  //is data continuous
  isCont: function(data, varname){
    var arr = d3.set(data.map(function(m){return m[varname]})).values();
    var test = true;
    arr.forEach(function(e){
      if(!+e && e !== "." && +e !== 0)
        test = false;
    });
    if(!test || arr.length < 4)
      return false;
    else
      return true;
  },

  lengthenRaw: function(data, columns){
    var my_data = [];
    data.forEach(function(e){
      columns.forEach(function(g){
        var obj = {};
        obj.wc_category = g;
        obj.wc_value = e[g];
        for(x in e){
          obj[x] = e[x]
        }
        my_data.push(obj)
      })
    });
    return my_data;
  }
};//dataOps


var chart = function(element, filepath, config, controls){
	this.element = element;
	this.filepath = filepath;
	this.div = element ? element : "body";
	this.filters = [];
	this.config = config || {};
	this.controls = controls;
  this.wrap = d3.select(this.div).append("div")//.attr("class", "wc-chart wc-"+this.chart_type.toLowerCase());

	var context = this;

  this.events = {onLayout: function(){}, onDatatransform: function(){}, onDraw: function(){}, onResize: function(){}};
  this.on = function(event, callback){
    var possible_events = ["layout", "datatransform", "draw", "resize"];
    if(possible_events.indexOf(event) < 0)
      return;
    callback = callback || function(){};
    this.events["on"+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
  };//on events

	return this;
};//BASIC CHART
chart.prototype.init = function(data){ 
    var context = this;
    var controls = context.controls;
    var config = context.config;
    if(d3.select(this.div).select(".loader").empty()){
        d3.select(this.div).insert("div", ":first-child").attr("class", "loader")
          .selectAll(".blockG").data(d3.range(8))
          .enter().append("div").attr("class", function(d){return "blockG rotate"+(d+1)});
    }
    context.wrap.attr("class", "wc-chart wc-"+this.chart_type.toLowerCase());

    var startup = function(data){
      if(controls){
          controls.targets.push(context);
          if(!controls.ready)
            controls.init(data);
          else
            controls.layout();
      }
      var meta_map = config.meta_map ? config.meta_map : data && data.length ? d3.keys(data[0]).map(function(m){return {col: m, label: m}}) : [];
      context.metaMap = d3.scale.ordinal()
        .domain(meta_map.map(function(m){return m.col}))
        .range(meta_map.map(function(m){return m.label}));

      context.raw_data = data;
      var visible = window.$ ? $(context.div).is(':visible') : true;
      if(!visible){
          var onVisible = setInterval(function(){
              var visible_now = $(context.div).is(':visible')
              if(visible_now){
                context.layout();
                context.wrap.datum(context)
                var init_data = context.transformData(data);
                context.draw(init_data)
                clearInterval(onVisible)
              };        
         }, 500);
      }   
      else{
        context.layout();
        context.wrap.datum(context)
        var init_data = context.transformData(data);
        context.draw(init_data)
      }; 
    };//startup

    if(context.filepath && !data){
        d3.csv(context.filepath, function(error, csv){
          context.raw_data = csv;
          context.onDataError(error);
          context.checkRequired(csv);
          startup(csv);
        });
      }
    else
      startup(data);
    //else return;

    return this;    
};//init
chart.prototype.onDataError = function(error){
  if(error){
      d3.select(this.div).select(".loader").remove();
      this.wrap.append("div").attr("class", "alert alert-error alert-danger").text("Dataset could not be loaded.");
      throw new Error("Dataset could not be loaded. Check provided path ("+this.filepath+").");
    };
};//on data error
chart.prototype.checkRequired = function(){
    var context = this;
    var config = context.config;
    var colnames = d3.keys(context.raw_data[0]);
    context.required_cols.forEach(function(e, i){
        if(colnames.indexOf(e) < 0){
            d3.select(context.div).select(".loader").remove();
            context.wrap.append("div").attr("class", "alert alert-error alert-danger").html("The value '"+e+"' for the <code>"+context.required_vars[i]+"</code> setting does not match any column in the provided dataset.");
            throw new Error("Error in settings object: The value '"+e+"' for the "+context.required_vars[i]+" setting does not match any column in the provided dataset.");
        };
      });
};//check required vars
chart.prototype.layout = function(){
  var context = this;
  var config = context.config;
  var wrap = context.wrap;
  var element = context.element;

  context.svg = wrap.append("svg")
    .attr({"class": "wc-svg",
        "xmlns": "http://www.w3.org/2000/svg",
        "version": "1.1",
        "xlink": "http://www.w3.org/1999/xlink"
     })
    .append("g");
  var svg = context.svg;  
  var defs = svg.append("defs");
  defs.append("pattern").attr({
    "id": "diagonal-stripes",
    "x": 0, "y": 0, "width": 3, "height": 8, 'patternUnits': "userSpaceOnUse", 'patternTransform': "rotate(30)"
  })
  .append("rect").attr({"x": "0", "y": "0", "width": "2", "height": "8", "style": "stroke:none; fill:black"});

  // defs.append("style").attr("type", "text/css").html(
  //   "@import url(http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,300,600,700);"+
  //   "*{font-family: 'Open Sans' Helvetica Arial sans-serif; font-size: inherit;}"+
  //   ".axis path.domain{fill: none; stroke: #ccc; shape-rendering: crispEdges; } .axis .tick line{stroke: #eee; shape-rendering: crispEdges; } .axis .tick text{font-size: .9em; }"
  // );

  var eid = typeof element === "string" ? element.replace(/\./g, "") : d3.select(element).attr("class").replace(/\s/g, "") ;
  var setting_string = typeof btoa !== 'undefined' ? btoa(JSON.stringify(config)) : Math.random()*100;
  var rand = Math.floor( Math.random()*setting_string.length );
  var setting_id = String(setting_string).slice( rand, rand+5);
  context.clippath_id = "plot-clip-"+eid+"-"+setting_id;
  defs.append("clipPath").attr("id", context.clippath_id).append("rect").attr("class", "plotting-area");

  svg.append("g").attr("class", "y axis")
    .append("text").attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("dy", ".75em")
      .attr("text-anchor", "middle");
  svg.append("g").attr("class", "x axis")
    .append("text").attr("class", "axis-title")
      .attr("dy", "-.35em")
      .attr("text-anchor", "middle");

  var overlay = svg.append("rect")
    .attr("class", "overlay")
    .attr("opacity", 0);

  var legend = wrap.append("ul").attr("class", "legend");
  legend.append("span").attr("class", "legend-title");

  if(context.extraLayout)
      context.extraLayout();

  d3.select(context.div).select(".loader").remove();

  context.events.onLayout(this);
};//end layout
chart.prototype.makeLegend = function(scale, label, custom_data){
  var context = this;
  var config = this.config;
  var legend = context.legend || context.wrap.select(".legend")//.style("padding-left", context.margin.left+"px");
  scale = scale || context.colorScale;
  label = !label && !config.meta_map ? "" : label || label === "" ? label : 
    context.metaMap.domain().indexOf(context.config.color_by) < 0 ? "" :
    context.metaMap(context.config.color_by);

  var legend_data = custom_data || scale.domain().slice(0).filter(function(f){return f !== undefined && f !== null}).map(function(m){
    return {label: m,  mark: context.legend_mark};
  });
  legend.select(".legend-title").text(label).style("display", label ? "inline" : "none");
  var leg_parts = legend.selectAll(".legend-item")
      .data(legend_data, function(d){return d.label});
  leg_parts.exit().remove()
  var new_parts = leg_parts.enter().append("li")
      .attr("class", "legend-item")

  new_parts.each(drawMark)
  
  function drawMark(e){
    if(!e.mark)
      return;
    d3.select(this).append("span").attr("class", "legend-mark-text").style("color", scale(e.label));
    var svg = d3.select(this).append("svg").attr("class", "legend-color-block");
    //e.mark = e.mark || "square";
    if(e.mark === "circle")
      svg.append("circle").attr({"cx": ".5em", "cy": ".45em", "r": ".45em", "class": "legend-mark"});
    else if(e.mark === "line")
      svg.append("line").attr({"x1": 0, "y1": ".5em", "x2": "1em", "y2": ".5em", "stroke-width": 2, "shape-rendering": "crispEdges", "class": "legend-mark"});
    else if(e.mark === "square")
      svg.append("rect").attr({"height": "1em", "width": "1em", "class": "legend-mark"});
  };

  leg_parts.sort(function(a,b){
    return scale.domain().indexOf(a) - scale.domain().indexOf(b);
  });
    
  leg_parts.selectAll(".legend-color-block").select(".legend-mark")
    .attr("fill", function(d){return d.color || scale(d.label)})
    .attr("stroke", function(d){return d.color || scale(d.label)})
    .each(function(e){
      d3.select(this).attr(e.attributes)
    });

  new_parts.append("span").attr("class", "legend-label").text(function(d){
    return context.metaMap.domain().indexOf(d.label) > -1 ? context.metaMap(d.label) : d.label;
  });

  leg_parts.on("mouseover", function(d){
    if(!config.highlight_on_legend)
      return;
    var fill = d3.select(this).select(".legend-mark").attr("fill");
    context.svg.selectAll(".wc-data-mark").attr("opacity", 0.1).filter(function(f){
      return d3.select(this).attr("fill") === fill || d3.select(this).attr("stroke") === fill;
    }).attr("opacity", 1)
  }).on("mouseout", function(d){
    if(!config.highlight_on_legend)
      return;
     context.svg.selectAll(".wc-data-mark").attr("opacity", 1)
  })

  if(scale.domain().length > 1)
    legend.style("display", "block");
  else
    legend.style("display", "none");

  context.legend = legend;
};//legend
chart.prototype.xScaleAxis = function(type, max_range, domain){
  //domain = type === "percent" ? [0,1] : domain;
  var config = this.config;

  if(type === "log")
    var x = d3.scale.log();
  else if(type === "ordinal")
    var x = d3.scale.ordinal();
  else if(type === "time")
    var x = d3.time.scale();
  else
    var x = d3.scale.linear();

  x.domain(domain)
  if(type === "ordinal")
    x.rangeBands([0, +max_range], config.padding, config.outer_pad);
  else
    x.range([+max_range*config.x_offset, +max_range-+max_range*config.x_offset]).clamp(Boolean(config.x_clamp));

  var x_format = config.x_format ? config.x_format : type === "percent" ? "0%" : type === "time" ? "%x" : ".0f";
  var tick_count = Math.max(2, Math.min(max_range/80,8));
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient(config.x_location)
    .ticks(tick_count)
    .tickFormat(type === "ordinal" ? null : type === "time" ? d3.time.format(x_format) : d3.format(x_format))
    .tickValues(config.x_ticks ? config.x_ticks : null)
    .innerTickSize(6)
    .outerTickSize(3);

  this.svg.select("g.x.axis").attr("class", "x axis "+type);
  this.x = x;
  this.xAxis = xAxis;
};//xScaleAxis
chart.prototype.yScaleAxis = function(type, max_range, domain){
  //domain = type === "percent" ? [0,1] : domain;
  var config = this.config;
  var y;
  if(type === "log")
    var y = d3.scale.log();
  else if(type === "ordinal")
    var y = d3.scale.ordinal();
  else if(type === "time")
   var y = d3.time.scale();
  else
    var y = d3.scale.linear();

  y.domain(domain);
  if(type === "ordinal")
    y.rangeBands([+max_range, 0], config.padding, config.outer_pad); 
  else
    y.range([+max_range, 0]).clamp(Boolean(config.y_clamp));

  var y_format = config.y_format ? config.y_format : type === "percent" ? "0%" : ".0f";
  var tick_count = Math.max(2, Math.min(max_range/80,8));
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(tick_count)
    .tickFormat(type === "ordinal" ? null : type === "time" ? d3.time.format(y_format) : d3.format(y_format))
    .tickValues(config.y_ticks ? config.y_ticks : null)
    .innerTickSize(6)
    .outerTickSize(3);

  this.svg.select("g.y.axis").attr("class", "y axis "+type);

  this.y = y;
  this.yAxis = yAxis;
};//yScaleAxis
chart.prototype.setColorScale = function(){
  var config = this.config;
  colordom = config.color_dom || d3.set(this.raw_data.map(function(m){return m[config.color_by]})).values()
    .filter(function(f){return f && f !== "undefined"});

  if(config.chunk_order)
    colordom = colordom.sort(function(a,b){return d3.ascending(config.chunk_order.indexOf(a), config.chunk_order.indexOf(b)); })

  this.colorScale = d3.scale.ordinal()
    .domain(colordom)
    .range(config.colors ? config.colors : webCharts.colors.nb);
};//set color scale
chart.prototype.textSize = function(width,height){
  var context = this
  var font_size = "14px";
  var point_size = 4;
  var stroke_width = 2;

  if(this.config.no_text_size){
    font_size = context.config.font_size;
    point_size = context.config.point_size || 4;
    stroke_width = context.config.stroke_width || 2;
  }
  else if(width >= 600){
    font_size = "14px";
    point_size = 4;
    stroke_width = 2;
  }
  else if(width > 450 && width < 600){
    font_size = "12px";
    point_size = 3;
    stroke_width = 2;
  }
  else if(width > 300 && width < 450){
    font_size = "10px";
    point_size = 2;
    stroke_width = 2;
  }
  else if(width <= 300){
    font_size = "10px";
    point_size = 2;
    stroke_width = 1;
  }

  // context.svg.select("defs style").html(
  //   "@import url(http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,300,600,700);"+
  //   "*{font-family: 'Open Sans' Helvetica Arial sans-serif; font-size: "+font_size+";}"+
  //   ".axis path.domain{fill: none; stroke: #ccc; shape-rendering: crispEdges; } .axis .tick line{stroke: #eee; shape-rendering: crispEdges; } .axis .tick text{font-size: .9em; }"
  // );

  context.wrap.style("font-size",font_size);
  context.config.flex_point_size = point_size;
  context.config.flex_stroke_width = stroke_width;
};//text size
chart.prototype.setMargins = function(){
  var context = this;
  var x_ticks = context.xAxis.tickFormat() ? context.x.domain().map(function(m){return context.xAxis.tickFormat()(m)}) : context.x.domain();
  var y_ticks = context.yAxis.tickFormat() ? context.y.domain().map(function(m){return context.yAxis.tickFormat()(m)}) : context.y.domain();

  var max_y_text_length = d3.max( y_ticks.map(function(m){return String(m).length}) );
  if(this.config.y_format && this.config.y_format.indexOf("%") > -1 )
    max_y_text_length += 1
  max_y_text_length = Math.max(2, max_y_text_length);
  var x_label_on = this.config.x_label ? 1 : 0;
  var y_label_on = this.config.y_label ? 1 : 0.25;
  var font_size = parseInt(this.wrap.style("font-size"));
  var x_second = this.config.x2_interval ? 1 : 0;
  var y_margin = max_y_text_length*font_size*.5+ (font_size*y_label_on*1.5) || 8;
  var x_margin = font_size+(font_size/1.5) + (font_size*x_label_on)+(font_size*x_second) || 8;

  y_margin += 6;
  x_margin += 3;

  return {top: this.config.margin && this.config.margin.top ? this.config.margin.top : 8, 
      right: this.config.margin && this.config.margin.right ? this.config.margin.right : 16, 
      bottom: this.config.margin && this.config.margin.bottom ? this.config.margin.bottom : x_margin, 
      left: this.config.margin && this.config.margin.left ? this.config.margin.left : y_margin};
};//margins
chart.prototype.drawGridlines = function(){
  var svg = this.svg;
  var gridlines = this.config.gridlines// === "none" ? null : config.gridlines;
  this.wrap.classed("gridlines", gridlines);
  if(gridlines){
    svg.select(".y.axis").selectAll(".tick line").attr("x1", 0);
    svg.select(".x.axis").selectAll(".tick line").attr("y1", 0);
    if(gridlines === "y" || gridlines === "xy")
      svg.select(".y.axis").selectAll(".tick line").attr("x1", this.plot_width);
    if(gridlines === "x" || gridlines === "xy")
      svg.select(".x.axis").selectAll(".tick line").attr("y1", -this.plot_height);
  }
  else{
    svg.select(".y.axis").selectAll(".tick line").attr("x1", 0);
    svg.select(".x.axis").selectAll(".tick line").attr("y1", 0);
  } 
};//gridlines
chart.prototype.drawText = function(text_data, class_match, bind_accessor, x_accessor, y_accessor, attr_accessor){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  var x = context.x;
  var y = context.y;

  //bind_accessor = bind_accessor ? bind_accessor : function(d){return d};
  class_match = class_match ? class_match : "note-text";
  x_accessor = x_accessor ? x_accessor : function(d){return d.x};
  y_accessor = y_accessor ? y_accessor : function(d){return d.y};
  attr_accessor = attr_accessor ? attr_accessor : function(d){return d.text};

  var texts = svg.selectAll("."+class_match)
    .data(text_data, bind_accessor);

  texts.exit().remove();

  texts.enter().append("text").attr("class", class_match);

  texts.text(function(d){
      var d_txt = attr_accessor(d);
      return d_txt
    })
    .attr("x", function(d){
      var d_pos = x_accessor(d);
      return config.x_type === "ordinal" ? x(d_pos)+x.rangeBand()/2 : x(d_pos);
    })
    .attr("y", function(d){
      var d_pos = y_accessor(d);
      return y(d_pos);
    });

  return texts;
};//drawText
chart.prototype.drawPoints = function(point_data, container, class_match, bind_accessor, x_accessor, y_accessor, attr_accessor){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  var x = context.x;
  var y = context.y;

  //bind_accessor = bind_accessor ? bind_accessor : function(d){return d};
  container = container || svg;
  class_match = class_match ? class_match : "scatter-point";
  x_accessor = x_accessor ? x_accessor : function(d){return d.x};
  y_accessor = y_accessor ? y_accessor : function(d){return d.y};
  attr_accessor = attr_accessor ? attr_accessor : function(d){return d};

  var points = container.selectAll("."+class_match)
    .data(point_data, bind_accessor);

  points.exit().select("circle")
    .transition()
    .attr("r", 0)
  points.exit().remove();

  var nupoints = points.enter().append("g").attr("class", class_match);
  nupoints.append("circle")
    .attr("r", 0);
  nupoints.append("title");

  if(class_match === "scatter-point"){
    nupoints.append("path").attr("class", "offscreen-mark").attr("d", d3.svg.symbol().type("triangle-down").size(6))
      .attr("fill", "none");

    points.select(".offscreen-mark").style("display", "none")
      .attr("stroke", function(d){
        var d_attr = attr_accessor(d);
        return colorScale(d_attr[config.color_by])
      });
  };

  points.select("circle")
    .attr("fill-opacity", config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : .6)
    //.style("-webkit-clip-path", "url('#plot-clip')")
    .attr("fill", function(d){
      var d_attr = attr_accessor(d);
      return colorScale(d_attr[config.color_by])
    })
    .attr("stroke", function(d){
      var d_attr = attr_accessor(d);
      return colorScale(d_attr[config.color_by])
    })
    .transition()
    .attr("r", config.point_size ? config.point_size : config.flex_point_size)
    .attr("cx", function(d){
      var d_pos = x_accessor(d);
      var x_pos = x(d_pos) || 0;
      return config.x_type === "ordinal" ? x_pos+x.rangeBand()/2 : x_pos;
    })
    .attr("cy", function(d){
      var d_pos = y_accessor(d);
      var y_pos = y(d_pos) || 0;
      return config.y_type === "ordinal" ? y_pos+y.rangeBand()/2 : y_pos;
    });
  //points.select("title").datum(function(d){return d});

  return points;
};//drawPoints
chart.prototype.drawSimpleLines = function(line_data, container, class_match, bind_accessor){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var w = context.plot_width;
  var h = context.plot_height;
  container = container || svg;
  class_match = class_match || "reference-line";
  var lines = container.selectAll("."+class_match).data(line_data, bind_accessor);
  lines.exit().remove();
  lines.enter().append("line").attr("class", class_match).append("title");
  lines.attr("shape-rendering", "crispEdges")
    .transition()
    .attr("x1", function(d){var unscale = d.xs ? d.xs[2] : false; var x1 = !d.xs ? 0 : context.x(d.xs[0]); return unscale ? d.xs[0] : config.x_type === "ordinal" ? x1 + context.x.rangeBand()/2 : x1})
    .attr("x2", function(d){var unscale = d.xs ? d.xs[2] : false; var x2 = !d.xs ? 0 : context.x(d.xs[1]); return unscale ? d.xs[1] : config.x_type === "ordinal" ? x2 + context.x.rangeBand()/2 : x2})
    .attr("y1", function(d){var unscale = d.ys ? d.ys[2] : false; var y1 = !d.ys ? 0 : context.y(d.ys[0]); return unscale ? d.ys[0] : config.y_type === "ordinal" ? y1 + context.y.rangeBand()/2 : y1})
    .attr("y2", function(d){var unscale = d.ys ? d.ys[2] : false; var y2 = !d.ys ? 0 : context.y(d.ys[1]); return unscale ? d.ys[1] : config.y_type === "ordinal" ? y2 + context.y.rangeBand()/2 : y2});
  lines.each(function(e){
    e.attributes = e.attributes || {};
    e.attributes["stroke-opacity"] = e.attributes["stroke-opacity"] || config.stroke_opacity || 1;
    e.attributes["stroke-width"] = e.attributes["stroke-width"] || config.stroke_width || 1;
    e.attributes["stroke"] = e.attributes["stroke"] || "black"; 
    d3.select(this).attr(e.attributes); 
    d3.select(this).select("title").datum(e);
  });
  return lines;
};//drawSimpleLines
chart.prototype.drawLines = function(line_drawer, line_data, datum_accessor, class_match, bind_accessor, attr_accessor){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  var x = context.x;
  var y = context.y;
  class_match = class_match ? class_match : "chart-line";
  attr_accessor = attr_accessor ? attr_accessor : function(d){return d};

  var line_grps = svg.selectAll("g."+class_match)
    .data(line_data, bind_accessor);
  line_grps.exit().remove();
  var nu_line_grps = line_grps.enter().append("g").attr("class", function(d){return class_match+" "+d.key})
  nu_line_grps.append("path");
  nu_line_grps.append("title");
  line_grps.select("path")
    .datum(datum_accessor)
    .attr("stroke", function(d){
      var d_attr = attr_accessor(d);
      return d_attr ? colorScale(d_attr[config.color_by]) : null;
    })
    .attr("stroke-width", config.stroke_width ? config.stroke_width : config.flex_stroke_width)
    .attr("stroke-linecap", "round")
    .attr("fill", "none")
    .transition()
    .attr("d", line_drawer);

  return line_grps;
};//drawLines
chart.prototype.drawRects = function(rect_data, container, class_match){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var w = context.plot_width;
  var h = context.plot_height;
  container = container || svg;
  class_match = class_match || "reference-region";
  var rects = container.selectAll("."+class_match).data(rect_data);
  rects.exit().remove();
  rects.enter().append("rect").attr("class", class_match).append("title");
  rects.attr({"stroke": "none", "shape-rendering": "crispEdges"})
    .transition()
    .attr("x", function(d){return config.x_type === "ordinal" ? d.xs[0] : context.x(d.xs[0]) } )
    .attr("y", function(d){return config.y_type === "ordinal" ? d.ys[0] : context.y(d.ys[1])})
    .attr("width", function(d){return config.x_type === "ordinal" ? d.xs[1] - d.xs[0] : context.x(d.xs[1]) - context.x(d.xs[0]) })
    .attr("height", function(d){return config.y_type === "ordinal" ? Math.abs(d.ys[0] - d.ys[1]) : context.y(d.ys[0]) - context.y(d.ys[1]) });
  rects.each(function(e){
    e.attributes = e.attributes || {};
    e.attributes["fill"] = e.attributes["fill"] || "#eee"; 
    d3.select(this).attr(e.attributes); 
  });
  return rects;
};//drawRects
chart.prototype.drawArea = function(area_drawer, area_data, datum_accessor, class_match, bind_accessor, attr_accessor){
  var context = this;
  var config = this.config;
  var svg = this.svg;
  var colorScale = this.colorScale;
  var x = context.x;
  var y = context.y;
  class_match = class_match ? class_match : "chart-area";
  attr_accessor = attr_accessor ? attr_accessor : function(d){return d};

  var area_grps = svg.selectAll("."+class_match)
    .data(area_data, bind_accessor);
  area_grps.exit().remove();
  area_grps.enter().append("g").attr("class", function(d){return class_match+" "+d.key})
    .append("path");
  area_grps.select("path")
    .datum(datum_accessor)
    .attr("fill", function(d){
      var d_attr = attr_accessor(d);
      return d_attr ? colorScale(d_attr[config.color_by]) : null;
    })
    .attr("fill-opacity", config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : 0.3)
    .transition()
    .attr("d", area_drawer);

  return area_grps;
};//drawArea
chart.prototype.updateRefLines = function(){
  //define/draw reference lines, if any
  var config = this.config;
  var context = this;
  var ref_line_data = !config.reference_lines ? [] : config.reference_lines.map(function(m){
    var xx = m.x;
    var yy = m.y;
    if(config.x_type === "time" && m.x)
      xx = d3.time.format(config.date_format).parse(m.x);
    if(config.y_type === "time" && m.y)
      yy = d3.time.format(config.date_format).parse(m.y);
    return {xs: !m.x && +m.x !== 0 ? [0, context.plot_width,true] : [xx, xx], ys: !m.y && +m.y !== 0 ? [0,context.plot_height,true] : [yy, yy], attributes: m.attributes};
  });
  var ref_lines = context.drawSimpleLines(ref_line_data).style("clip-path", "url(#"+context.clippath_id+")");
};//updateRefLines
chart.prototype.updateRefRegions = function(){
  //define/draw reference regions, if any
  var config = this.config;
  var context = this;
  var ref_region_data = !config.reference_regions ? [] : context.config.reference_regions.slice(0).map(function(m){
    var xx = m.x;
    var yy = m.y;
    if(config.x_type === "time")
      if(m.x)
        xx = m.x.map(function(w){return d3.time.format(config.date_format).parse(w)});
      else
        xx = context.x_dom;
    if(config.y_type === "time")
      if(m.y)
        yy = m.y.map(function(w){return d3.time.format(config.date_format).parse(w)});
      else
        yy = context.y_dom;
    return {xs: !xx ? [1, context.plot_width] : xx, ys: !m.y ? [0, context.plot_height-1] : yy, attributes: m.attributes};
  });
  context.drawRects(ref_region_data).style("clip-path", "url(#"+context.clippath_id+")");
};//updateRefRegions
chart.prototype.draw = function(processed_data, raw_data){
  var context = this;
  var raw = raw_data ? raw_data : context.raw_data;
  var config = context.config;
  var aspect2 = 1/config.aspect;
  var data = processed_data || context.transformData(raw);
  config.padding = config.padding ? config.padding : config.tight ? .01 : .3;
  config.outer_pad = config.outer_pad ? config.outer_pad : config.tight ? 0 : .1;
  config.x_offset = config.x_offset || 0;
  // config.y_behavior = config.y_behavior || "flex";
  // config.x_behavior = config.x_behavior || "flex";
  context.wrap.datum(data)

  var div_width = parseInt(context.wrap.style('width')); 

  context.setColorScale();

  config.resizable = config.resizable === false ? false : true;
  var max_width = config.max_width ? config.max_width : div_width;
  context.raw_width = config.resizable ? max_width : 
    config.width ? config.width : 
    div_width;
  context.raw_height = config.y_type === "ordinal" && +config.range_band ? (config.range_band+config.range_band*config.padding)*context.y_dom.length :
    config.resizable ? max_width*aspect2 : 
    config.height ? config.height : 
    div_width*aspect2;

  var pseudo_width = context.svg.select(".overlay").attr("width") ? context.svg.select(".overlay").attr("width") : context.raw_width;
  var pseudo_height = context.svg.select(".overlay").attr("height") ? context.svg.select(".overlay").attr("height") : context.raw_height;

  var x_axis_label = context.svg.select(".x.axis").select(".axis-title").text(function(){
    return typeof config.x_label === "string" ? config.x_label : typeof config.x_label === "function" ? config.x_label(context) : null;
  });
  var y_axis_label = context.svg.select(".y.axis").select(".axis-title").text(function(){
    return typeof config.y_label === "string" ? config.y_label : typeof config.y_label === "function" ? config.y_label(context) : null;
  });

  context.xScaleAxis(config.x_type, pseudo_width, context.x_dom);
  context.yScaleAxis(config.y_type, pseudo_height, context.y_dom);

  var id = config.id || Math.random();
  if(config.resizable)
    d3.select(window).on('resize.'+context.chart_type+"."+context.element+id, function(){context.resize()});
  else
    d3.select(window).on('resize.'+context.chart_type+"."+context.element+id, null);

  context.resize();
  context.events.onDraw(this);
};//end draw
chart.prototype.resize = function(){
  var context = this;
  var config = this.config;
  var aspect2 = 1/config.aspect;
  var div_width = parseInt(context.wrap.style('width'));
  var max_width = config.max_width ? config.max_width : div_width;
  var test = !config.resizable ? config.width : !max_width || div_width < max_width ? div_width : context.raw_width

  context.textSize(test);

  context.margin = context.setMargins();

  var svg_width = !config.resizable ? context.raw_width : 
    !config.max_width || div_width < config.max_width ? div_width :
    context.raw_width;
  context.plot_width = svg_width - context.margin.left - context.margin.right;
  var svg_height = config.y_type === "ordinal" && +config.range_band ? context.raw_height + context.margin.top + context.margin.bottom :
    !config.resizable && config.height ? config.height : 
    !config.resizable ? svg_width*aspect2 : 
    context.plot_width*aspect2;
  context.plot_height = svg_height - context.margin.top - context.margin.bottom;

  d3.select(context.svg.node().parentNode)
    .attr("width", svg_width)
    .attr("height", svg_height)
  .select("g")
    .attr("transform", "translate(" + context.margin.left + "," + context.margin.top + ")");

  context.svg.select(".overlay")
    .attr("width", context.plot_width)
    .attr("height", context.plot_height)
    .classed("zoomable", config.zoomable);

  context.svg.select(".plotting-area")
    .attr("width", context.plot_width)
    .attr("height", context.plot_height+1)
    .attr("transform", "translate(0, -1)");

  context.xScaleAxis(config.x_type, context.plot_width, context.x_dom);
  
  context.yScaleAxis(config.y_type, context.plot_height, context.y_dom);

  var g_x_axis = context.svg.select(".x.axis");
  var g_y_axis = context.svg.select(".y.axis");
  var x_axis_label = g_x_axis.select(".axis-title");
  var y_axis_label = g_y_axis.select(".axis-title");

  if(config.x_location !== "top")
    g_x_axis.attr("transform", "translate(0," + (context.plot_height) + ")")
  g_x_axis.transition().call(context.xAxis);
  g_y_axis.transition().call(context.yAxis);
  x_axis_label.attr("transform", "translate("+context.plot_width/2+","+(context.margin.bottom-2)+")")
  y_axis_label
    .attr("x", -1*context.plot_height / 2)
    .attr("y", -1*context.margin.left);

  //relabel axis ticks if metaMap says so
  context.svg.select(".x.axis.ordinal").selectAll(".tick text").text(function(d){ 
    return context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d; 
  });
  context.svg.select(".y.axis.ordinal").selectAll(".tick text").text(function(d){ 
    return context.metaMap.domain().indexOf(d) > -1 ? context.metaMap(d) : d; 
  });

  context.drawGridlines();
  //update legend - margins need to be set first
  context.makeLegend();

  //update reference regions and reference lines
  context.updateRefRegions();
  context.updateRefLines();

  //update the chart's specific marks
  context.updateDataMarks();

  //call .on("resize") function, if any
  context.events.onResize(this);
};//resize
chart.prototype.multiply = function(raw, split_by, constrain_domains, order){
  var context = this;
  var config = this.config;
  var wrap = context.wrap.classed("wc-layout wc-small-multiples", true).classed("wc-chart", false);
  var master_legend = wrap.append("ul").attr("class", "legend");
  var charts = [];
  if(raw){
    context.raw_data = raw;
    goAhead(raw);
  }
  else{
    d3.csv(context.filepath, function(error, csv){
      context.raw_data = csv;
      context.onDataError(error);
      context.checkRequired(csv);
      goAhead(csv);
    });
  };
  
  function goAhead(data){
    var split_vals = d3.set(data.map(function(m){return m[split_by]})).values().filter(function(f){return f});
    if(order)
      split_vals = split_vals.sort(function(a,b){return d3.ascending(order.indexOf(a), order.indexOf(b))});

    var master_chart = new webCharts[context.chart_type](context.wrap.node(), null, config, context.controls);
    master_chart.wrap.style("display", "none")

    split_vals.forEach(function(e){
      var split_data = data.filter(function(f){return f[split_by] === e});
      var mchart = new webCharts[context.chart_type](context.wrap.node(), null, config, context.controls);
      mchart.events = context.events;
      mchart.legend = master_legend;
      mchart.multiplied = {col: split_by, value: e};
      if(constrain_domains)
        mchart.on("datatransform", matchDomains);
      mchart.wrap.insert("span", "svg").attr("class", "wc-chart-title").text(e);
      charts.push({subchart: mchart, subdata: split_data});
    });

    context.children = charts;
    charts.forEach(function(e){e.subchart.init(e.subdata); });

    function matchDomains(chart){
      var allx = [];
      var ally = [];
      charts.forEach(function(e){
        master_chart.transformData(e.subdata);
        allx.push(master_chart.x_dom);
        ally.push(master_chart.y_dom);
      });
      
      chart.config.color_dom = d3.set(data.map(function(m){return m[config.color_by]})).values().filter(function(f){return f && f !== "undefined"});
      // var allx = d3.merge(charts.map(function(m){return m.x_dom}));
      chart.x_dom = config.x_dom ? config.x_dom : config.x_type !== "ordinal" ? d3.extent(d3.merge(allx)) : d3.set(d3.merge(allx)).values();
      chart.y_dom = config.y_com ? config.y_dom : config.y_type !== "ordinal" ? d3.extent(d3.merge(ally)) : d3.set(d3.merge(ally)).values();
      // var ally = d3.merge(charts.map(function(m){return m.y_dom}));
      // chart.y_dom = config.y_type !== "ordinal" ? d3.extent(ally) : d3.set(ally).values();
    };

  };//goAhead

  return this;
};//Multiply

webCharts.chart = chart;


//scatter plot
webCharts.scatterPlot = function(element, filepath, config, controls){
  chart.call(this, element, filepath, config, controls);
  
  this.required_vars = config.group.map(function(m){return "group"});
  this.required_cols = config.group.slice(0);
  this.required_vars.push("x_vals.col", "y_vals.col");
  this.required_cols.push(config.x_vals.col, config.y_vals.col);
  this.legend_mark = "circle";
  this.chart_type = "scatterPlot";

  config.tight = true;
  config.x_type = config.x_type || "linear";
  config.y_type = config.y_type || "linear";
  config.x_vals.stat = config.x_vals.stat || "mean";
  config.y_vals.stat = config.y_vals.stat || "mean";
  config.aspect = (config.x_type === "ordinal" || config.y_type === "ordinal") && config.aspect ? config.aspect : 1;
  config.zoomable = config.zoomable && config.x_type !== "ordinal" && config.y_type !== "ordinal" ? true : false;
  
  return this;
};
webCharts.scatterPlot.prototype = Object.create(chart.prototype);
webCharts.scatterPlot.prototype.extraLayout = function(){
	this.wrap.append("button").attr("class", "btn btn-xs btn-mini reset-zoom").text("reset");
};//end layout
webCharts.scatterPlot.prototype.transformData = function(raw){
	var context = this;
	var config = this.config;
  var stats = ["mean", "median", "min", "max", "sum", "count"];
  var x_behavior = config["x_behavior"] || "raw";
  var y_behavior = config["y_behavior"] || "raw";
  config.group = config.group.filter(function(f){return f})
	context.raw_data = raw;

	//remove NAs and other bullshit if both x and y continuous
  if(config.x_type !== "ordinal" && config.y_type !== "ordinal"){
		raw = raw.filter(function(f){
			return (+f[config.x_vals.col] || +f[config.x_vals.col] === 0) && (+f[config.y_vals.col] || +f[config.y_vals.col] === 0);
		});
  }

	if(config.initial_filter){
		raw = raw.filter(function(f){
	  		return config.initial_filter.vals.indexOf(f[config.initial_filter.col]) !== -1;
		}); 
	};

  var raw_dom_x = d3.extent( raw.map(function(m){return +m[config.x_vals.col]}).filter(function(f){return +f}) );
  var raw_dom_y = d3.extent( raw.map(function(m){return +m[config.y_vals.col]}).filter(function(f){return +f}) );

  var filtered = raw;
	
  var filt1_xs = [];
  var filt1_ys = [];
  if(context.filters.length){
    context.filters.forEach(function(e){
      filtered = filtered.filter(function(d){
        return e.val !== "All" ? d[e.col] === e.val : d;
      })
    });
    //get domain for all non-All values of first filter
    if(x_behavior === "firstfilter" || y_behavior === "firstfilter"){
      context.filters[0].choices.filter(function(f){return f !== "All"}).forEach(function(e){
        var perfilter = raw.filter(function(f){return f[context.filters[0].col] === e});
        d3.nest()
          .key(function(d){ return config.group.map(function(m){return d[m]}).join(" "); })
          .rollup(function(r){
            var obj = {raw: r};
            var y_vals = r.map(function(m){return +m[config.y_vals.col]}).filter(function(f){return f || f === 0}).sort(d3.ascending);
            var x_vals = r.map(function(m){return +m[config.x_vals.col]}).filter(function(f){return f || f === 0}).sort(d3.ascending);
            obj.x = config.x_type === "ordinal" ? r[0][config.x_vals.col] : webCharts.dataOps.summarize(x_vals, config.x_vals.stat);
            obj.y = config.y_type === "ordinal" ? r[0][config.y_vals.col] : webCharts.dataOps.summarize(y_vals, config.y_vals.stat);
            obj.x_info = {values: x_vals};
            obj.y_info = {values: y_vals};
            obj.x_info.q25 = config.error_bars && config.y_type === "ordinal" ? d3.quantile(x_vals, 0.25) : obj.x;
            obj.x_info.q75 = config.error_bars && config.y_type === "ordinal" ? d3.quantile(x_vals, 0.75) : obj.x;
            obj.y_info.q25 = config.error_bars ? d3.quantile(y_vals, 0.25) : obj.y;
            obj.y_info.q75 = config.error_bars ? d3.quantile(y_vals, 0.75) : obj.y; 
            filt1_xs.push([obj.x_info.q25, obj.x_info.q75, obj.x ]);
            filt1_ys.push([obj.y_info.q25, obj.y_info.q75, obj.y ]);
          })
          .entries(perfilter);
      }); 
    };
  };
  var filt1_dom_x = d3.extent( d3.merge(filt1_xs) );
  var filt1_dom_y = d3.extent( d3.merge(filt1_ys) );

  context.filtered_data = filtered;

	var nested = d3.nest()
		.key(function(d){
		  var test = config.group.map(function(m){return d[m]}); 
		  return test.join(" ");
		})
		//.key(function(d){return d[config.x_vals]})
		.rollup(function(r){
		  var obj = {raw: r};
		  var y_vals = r.map(function(m){return +m[config.y_vals.col]}).filter(function(f){return f || f === 0}).sort(d3.ascending);
		  var x_vals = r.map(function(m){return +m[config.x_vals.col]}).filter(function(f){return f || f === 0}).sort(d3.ascending);
      obj.x = config.x_type === "ordinal" ? r[0][config.x_vals.col] : webCharts.dataOps.summarize(x_vals, config.x_vals.stat);
      obj.y = config.y_type === "ordinal" ? r[0][config.y_vals.col] : webCharts.dataOps.summarize(y_vals, config.y_vals.stat);
      obj.x_info = {values: x_vals};
      obj.y_info = {values: y_vals};
      stats.forEach(function(e){
        obj.x_info[e] = webCharts.dataOps.summarize(x_vals, e); 
        obj.y_info[e] = webCharts.dataOps.summarize(y_vals, e);
      }); 
      obj.x_info.q25 = config.error_bars && config.y_type === "ordinal" ? d3.quantile(x_vals, 0.25) : obj.x;
      obj.x_info.q75 = config.error_bars && config.y_type === "ordinal" ? d3.quantile(x_vals, 0.75) : obj.x;
      obj.y_info.q25 = config.error_bars ? d3.quantile(y_vals, 0.25) : obj.y;
      obj.y_info.q75 = config.error_bars ? d3.quantile(y_vals, 0.75) : obj.y;
      obj.x_info.extent = [obj.x_info.q25, obj.x_info.q75, obj.x ];
      obj.y_info.extent = [obj.y_info.q25, obj.y_info.q75, obj.y ];      
		  return obj;
		})
		.entries(filtered);

  //extent of current data
  var flex_dom_x = d3.extent( d3.merge( nested.map(function(m){return m.values.x_info.extent}) ) );
  var flex_dom_y = d3.extent( d3.merge( nested.map(function(m){return m.values.y_info.extent}) ) );

  //several criteria must be met in order to use the 'firstfilter' domain
  var nonall = Boolean( context.filters.length && context.filters[0].val !== "All" && 
    context.filters.slice(1).filter(function(f){return f.val === "All"}).length === context.filters.length-1 );

  var x_dom = !context.filters.length ? flex_dom_x : x_behavior === "raw" ? raw_dom_x : nonall && x_behavior === "firstfilter" ? filt1_dom_x : flex_dom_x;
  var y_dom = !context.filters.length ? flex_dom_y : y_behavior === "raw" ? raw_dom_y : nonall && y_behavior === "firstfilter" ? filt1_dom_y : flex_dom_y;

  context.x_dom = config.x_dom ? config.x_dom : config.x_type === "ordinal" ? context.x_dom = d3.set(raw.map(function(m){return m[config.x_vals.col]})).values() : config.x_from0 ? [0, d3.max(x_dom)] : x_dom;

  context.y_dom =  config.y_dom ? config.y_dom : config.y_type === "ordinal" ? context.y_dom = d3.set(raw.map(function(m){return m[config.y_vals.col]})).values() : config.y_from0 ? [0, d3.max(y_dom)] : y_dom;

  context.current_data = nested;
  context.events.onDatatransform(context);
	return context.current_data;//filtered
};//end transformRaw
webCharts.scatterPlot.prototype.updateDataMarks = function(){
    var context = this;
    var config = this.config;
    var width = context.plot_width;
    var height = context.plot_height;
    var x = context.x;
    var y = context.y;
    var svg = context.svg;
    var d2 = d3.format(".2f");

    config.zoomable = config.zoomable && config.x_type !== "ordinal" && config.y_type !== "ordinal" ? true : false;

    var points = context.drawPoints(context.current_data, null, null, function(d,i){return d.key},function(d){return d.values.x},function(d){return d.values.y}, function(d){return d.values.raw[0]});
    points.selectAll("circle").classed("wc-data-mark", true);

    points.selectAll("title").text(function(d){
      var text = "";
      if(config.tooltip){
        config.tooltip.forEach(function(e,i){
          var label = e.label ? e.label : e.col;
          text += label +": "+d.values.raw[0][e.col];
          if(i < config.tooltip.length)
            text +="\n"; 
        });
      }
      else{
        var xtext = config.x_type === "ordinal" ? d.values["x"] : d2(d.values["x"]);
        var ytext = config.y_type === "ordinal" ? d.values["y"] : d2(d.values["y"]);
        text = xtext+", "+ytext;
      }
      return text;
    });

    //draw error bars
    var line_data = !config.error_bars ? [] : context.current_data.slice(0).map(function(m){
      var xs = config.y_type === "ordinal" ? [m.values.x_info.q25, m.values.x_info.q75] : [m.values.x, m.values.x];
      var ys = config.y_type === "ordinal" ? [m.values.y, m.values.y] : [m.values.y_info.q25, m.values.y_info.q75]
      return {key: m.key, xs: xs, ys: ys, attributes:{stroke: context.colorScale(m.values.raw[0][config.color_by]), "stroke-width": config.point_size/2}};
    });
    var ebars = context.drawSimpleLines(line_data, null, "error-bar", function(d){return d.key});
    
    if(config.x_type === "ordinal" && config.group.length > 1){
      points.each(function(e,i){
        var index = context.colorScale.domain().indexOf(e.values.raw[0][config.color_by]);
        d3.select(this).attr("transform", "translate("+(-1*context.x.rangeBand()/4+(context.x.rangeBand()/4/points.length*index))+",0)")
      });
      ebars.each(function(e,i){
        var index = context.colorScale.range().indexOf(e.attributes.stroke);
        d3.select(this).attr("transform", "translate("+(-1*context.x.rangeBand()/4+(context.x.rangeBand()/4/ebars.length*index))+",0)")
      });
    }
    if(config.y_type === "ordinal" && config.group.length > 1){
      points.each(function(e,i){
        var index = context.colorScale.domain().indexOf(e.values.raw[0][config.color_by]);
        d3.select(this).attr("transform", "translate(0,"+(-1*context.y.rangeBand()/4+(context.y.rangeBand()/4/points.length*index))+")")
      });
      ebars.each(function(e,i){
        var index = context.colorScale.range().indexOf(e.attributes.stroke);
        d3.select(this).attr("transform", "translate(0,"+(-1*context.y.rangeBand()/4+(context.y.rangeBand()/4/ebars.length*index))+")")
      });
    }

    //draw linear regression line
    if(config.regression_line){
      var all_x = context.current_data.slice(0).map(function(m){return m.values["x"]});
      var all_y = context.current_data.slice(0).map(function(m){return m.values["y"]});
      var lr = webCharts.dataOps.linearRegression(all_x, all_y);
      var max = x.domain()[1]
      var reg_line_data = [{xs: [0, max], ys: [lr.intercept, (max * lr.slope) + lr.intercept ] }];
      var reg_line = context.drawSimpleLines(reg_line_data, null, "regression-line")
        .style("clip-path", "url(#"+context.clippath_id+")").style("shape-rendering", "auto");
      reg_line.select("title").text("slope: "+d3.format(".2f")(lr.slope)+"\n"+"intercept: "+d3.format(".2f")(lr.intercept)+"\n"+"r2: "+d3.format(".2f")(lr.r2));
    }
    else{
      context.drawSimpleLines([], null, "regression-line")
    };
    //x/y line stuff
    var xyLine = d3.svg.line()
      .x(function(d) { return context.x(d); })
      .y(function(d) { return context.y(d); });

    var all_x = context.filtered_data.slice(0).map(function(m){return +m[config.x_vals.col]}).filter(function(f){return +f});
    var all_y = context.filtered_data.slice(0).map(function(m){return +m[config.y_vals.col]}).filter(function(f){return +f});
    var base_line_data = config.xy_line && config.x_type !== "ordinal" && config.y_type !== "ordinal" ? [{key: "X=Y", values: all_x.concat(all_y).sort(function(a,b){return a-b})}] : [];
    var base_line = context.drawLines(xyLine, base_line_data, function(d){return d.values},"xy-line", function(d){return d.key});
    //context.addTooltip(base_line, "X=Y");
    base_line.select("path").attr("stroke", "black")
      .style("clip-path", "url(#"+context.clippath_id+")")
      .attr({"stroke-dasharray": [5,5], "stroke-width": 1});
    //x/y lines

    //Zoomy stuff
    if(config.zoomable){
      function zoomed(){
        context.drawGridlines();
        context.wrap.select(".reset-zoom").style("display", "block")
        svg.select(".x.axis").transition().call(context.xAxis)
        svg.select(".y.axis").transition().call(context.yAxis)
        var points = context.drawPoints(context.current_data, null, null, function(d,i){return d.key},function(d){return d.values.x},function(d){return d.values.y}, function(d){return d.values.raw[0]});
        points.selectAll("circle")
          .style("clip-path", "url(#"+context.clippath_id+")")
          .transition().ease("linear")
          .attr("cx", function(d){return x(d.values["x"])})
          .attr("cy", function(d){return y(d.values["y"])});

        if(!svg.select(".regression-line").empty()){
          reg_line.transition().ease("linear")
            .attr("x1", x(0))
            .attr("y1", y(lr.intercept))
            .attr("x2", x(max))
            .attr("y2", y( (max * lr.slope) + lr.intercept ));
        }

        context.drawLines(xyLine, base_line_data, function(d){return d.values},"xy-line", function(d){return d.key})
          .select("path").attr({"stroke-dasharray": [5,5], "stroke-width": 1, "stroke": "black"});

        context.updateRefRegions();
        context.updateRefLines();

        //clamped scales for offscreen markers
        var x2 = x.copy().clamp(true);
        var y2 = y.copy().clamp(true);

        //for each point
        points.each(function(e){
          var point = d3.select(this)
          var offscreen_left = x(e.values["x"]) < 0 - point.attr("r")
          var offscreen_bottom = y(e.values["y"]) > height+point.attr("r")
          var offscreen_top = y(e.values["y"]) < 0 -point.attr("r")
          var offscreen_right = x(e.values["x"]) > width+point.attr("r")
          if(offscreen_left){
            point.select(".offscreen-mark").style("display", "block")
              .attr("transform", function(d){
                return "translate("+x2(0)+","+y2(d.values["y"])+")"+",rotate(90)"
              })
          }
          else if(offscreen_bottom){
            point.select(".offscreen-mark").style("display", "block")
              .attr("transform", function(d){
                return "translate("+x2(d.values["x"])+","+y2(0)+")"+",rotate(0)"
              })
          }
          else if(offscreen_top){
            point.select(".offscreen-mark").style("display", "block")
              .attr("transform", function(d){
                return "translate("+x2(d.values["x"])+","+y2(height)+")"+",rotate(-180)"
              })
          }
          else if(offscreen_right){
            point.select(".offscreen-mark").style("display", "block")
              .attr("transform", function(d){
                return "translate("+x2(width)+","+y2(d.values["y"])+")"+",rotate(-90)"
              })
          }
          else{
            point.selectAll(".offscreen-mark").style("display", "none")
          } 
        });
      };//zoomed()

      var zoom = d3.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([1, 10])
        .size([width, height])
        .on("zoom", zoomed);

      svg.select(".overlay").call(zoom);

      context.wrap.select(".reset-zoom").on("click", function(){
        zoom.translate([0,0]).scale(1)
        zoomed()
        d3.select(this).style("display","none")
        svg.selectAll(".offscreen-mark").style("display", "none");
        svg.selectAll(".scatter-point").selectAll("circle")
          .style("clip-path", null);
        context.drawGridlines();
      });

    }
    else{
      var zoom = d3.behavior.zoom().on("zoom", null);

      svg.select(".overlay")
        .call(zoom)
        .on("mousedown.zoom", null)
        .on("mousemove.zoom", null)
        .on("dblclick.zoom", null)
        .on("touchstart.zoom", null)
        .on("wheel.zoom", null)
        .on("mousewheel.zoom", null)
        .on("MozMousePixelScroll.zoom", null)

      points.selectAll("circle").style("clip-path", null);
      context.wrap.select(".reset-zoom").style("display", "none");
      svg.selectAll(".offscreen-mark").style("display", "none");
    }//zoomable

    context.wrap.select(".reset-zoom").style({"position": "absolute", "top":context.margin.top+3+"px", "left":context.margin.left+3+"px", "display":"none"});
};//moveStuff
//END scatterPlot

webCharts.lineChart = function(element, filepath, config, controls){
  this.required_vars = config.group.length ? config.group.map(function(m){return "group"}) : [];
  this.required_cols = config.group.length ? config.group.slice(0) : [];
  this.required_vars.push("x_vals.col");
  this.required_cols.push(config.x_vals.col);
	this.legend_mark = "line";
	this.chart_type = "lineChart";

  config.tight = true;
  config.aspect = config.aspect || 1.33;
  config.y_vals.stat = config.y_vals.stat || "mean";
  config.y_type = "linear";
  config.y_format = config.y_format || ".0f";
  config.x_type = config.x_type || "linear";
  config.date_format = config.date_format || "%x";

	chart.call(this, element, filepath, config, controls);

  return this;
};//END lineChart
webCharts.lineChart.prototype = Object.create(chart.prototype);
webCharts.lineChart.prototype.extraLayout = function(){
  var svg = this.svg;

  var x_mark = svg.select("g.x").append("g")
    .attr("class", "hover-item hover-tick hover-tick-x").style("display", "none");
  x_mark.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 0 ).attr("y2", 0).attr("stroke", "#ddd");
  x_mark.append("text").attr({"x": 0, "y": 0, "dx": ".5em", "dy": "-.5em"})

  var y_mark = svg.select("g.y.axis").append("g")
    .attr("class", "hover-item hover-tick hover-tick-y").style("display", "none");
  y_mark.append("text").attr({"x": 0, "y": 0, "dx": ".5em", "dy": ".35em"})
  y_mark.append("path").attr("d", d3.svg.symbol().type("triangle-down").size(15)).attr("transform", "rotate(90)")
};
//manipulate data
webCharts.lineChart.prototype.transformData = function(raw){
  var context = this;
  var config = this.config;
  if(typeof config.group === "string")
    config.group = [config.group];
  //var stats = ["mean", "median", "min", "max", "sum", "count"];
  var y_behavior = config["y_behavior"] || "flex";
  var dateConvert = d3.time.format(config.date_format);
  context.raw_data = raw;

  raw = config.group.length ? raw.filter(function(f){return f[config.group[0]]}) : raw;

  raw = raw.filter(function(f){return f[config.x_vals.col] && f[config.y_vals.col] !== ""})

  if(config.initial_filter){
    raw = raw.filter(function(f){
      return config.initial_filter.vals.indexOf(f[config.initial_filter.col]) !== -1
    }) 
  };
  if(config.x_type === "time"){
    raw = raw.filter(function(f){
      return f[config.x_vals.col] instanceof Date ? f[config.x_vals.col] : dateConvert.parse(f[config.x_vals.col]) 
    })
    raw.forEach(function(e){
      e[config.x_vals.col] = e[config.x_vals.col] instanceof Date ? e[config.x_vals.col] :
        dateConvert.parse(e[config.x_vals.col]);
    });
  };

  var raw_ys = [];
  var rawnested = d3.nest()
    .key(function(d){var test = config.group.map(function(m){return d[m]}); return  test.join(" ")})
    .key(function(d){return d[config.x_vals.col]})
    .rollup(function(r){
      if(config.y_vals.stat === "cumulative")
        raw_ys.push(0, raw.length);
      else{
        var line_vals = r.map(function(m){return m[config.y_vals.col]}).sort(d3.ascending);
        var min = webCharts.dataOps.summarize(line_vals, "min") || 0;
        var max = webCharts.dataOps.summarize(line_vals, "max") || webCharts.dataOps.summarize(line_vals, "count")
        raw_ys.push(min, max);
      }
    })
    .entries(raw);
  var raw_dom = d3.extent( raw.map(function(m){return +m[config.y_vals.col]}) );//d3.extent( raw_ys );

  var filtered = raw;
  var filt1 = [];
  if(context.filters.length){
    context.filters.forEach(function(e){
      filtered = filtered.filter(function(d){
        return e.val === "All" ? d : e.val instanceof Array ? e.val.indexOf(d[e.col]) > -1 : d[e.col] === e.val;
      })
    }); 
    //get domain for all non-All values of first filter
    if(y_behavior === "firstfilter"){
      context.filters[0].choices.filter(function(f){return f !== "All"}).forEach(function(e){
        var perfilter = raw.filter(function(f){return f[context.filters[0].col] === e});
        d3.nest()
          .key(function(d){var test = config.group.map(function(m){return d[m]}); return  test.join(" ")})
          .key(function(d){return d[config.x_vals.col]})
          .rollup(function(r){
            var line_vals = r.map(function(m){return m[config.y_vals.col]});
            filt1.push(webCharts.dataOps.summarize(line_vals, config.y_vals.stat));
            if(config.y_vals.stat === "cumulative"){
              var interm = perfilter.filter(function(f){
                  return config.x_type === "time" ? new Date(f[config.x_vals.col]) <= new Date(r[0][config.x_vals.col]) : 
                    +f[config.x_vals.col] <= +r[0][config.x_vals.col]
                });
              if(config.group.length)
                interm = interm.filter(function(f){return f[config.group[0]] === r[0][config.group[0]] })
              filt1.push(interm.length);
            }
          })
          .entries(perfilter);
      }); 
    };
  };
  var filt1_dom = d3.extent( filt1 );

  context.filtered_data = filtered;

  var nested = d3.nest()
    .key(function(d){var test = config.group.map(function(m){return d[m]}); return  test.join(" ")})
    .key(function(d){return d[config.x_vals.col]})
    .sortKeys(function(a,b){
      return config.x_type === "time" ? d3.ascending(new Date(a), new Date(b)) : 
        config.x_dom ? d3.ascending(config.x_dom.indexOf(a), config.x_dom.indexOf(b)) :
        d3.ascending(+a, +b);
    })
    .rollup(function(r){
      var obj = {raw: r};
      var line_vals = r.map(function(m){return +m[config.y_vals.col]});
      if(config.y_vals.stat === "cumulative"){
        var interm = filtered.filter(function(f){
            return config.x_type === "time" ? new Date(f[config.x_vals.col]) <= new Date(r[0][config.x_vals.col]) : 
              +f[config.x_vals.col] <= +r[0][config.x_vals.col]
          });
        if(config.group.length)
          interm = interm.filter(function(f){return f[config.group[0]] === r[0][config.group[0]] })
        obj.y = interm.length;
      }
      else
        obj.y = webCharts.dataOps.summarize(line_vals, config.y_vals.stat);
      //obj[config.y_vals.stat] = webCharts.dataOps.summarize(line_vals, config.y_vals.stat);
      //stats.forEach(function(e){obj[e] = webCharts.dataOps.summarize(line_vals, e)});
      return obj;
    })
    .entries(filtered);
  nested.forEach(function(e){
    e.extent = d3.extent(e.values.map(function(m){return m.values.y}));
  })

  //extent of current data
  var flex_dom = d3.extent( d3.merge( nested.map(function(m){return m.extent}) ) );

  //several criteria must be met in order to use the 'firstfilter' domain
  var nonall = Boolean( context.filters.length && context.filters[0].val !== "All" && 
    context.filters.slice(1).filter(function(f){return f.val === "All"}).length === context.filters.length-1 );
  var y_dom = y_behavior === "raw" ? raw_dom : !context.filters.length ? flex_dom : nonall && y_behavior === "firstfilter" ? filt1_dom : flex_dom;

  context.y_dom =  config.y_dom ? config.y_dom : config.y_from0 ? [0, d3.max(y_dom)] : y_dom;

  //var x_is_cont = webCharts.dataOps.isCont(context.raw_data, config.x_vals.col);
  
  context.x_dom =  config.x_dom ? config.x_dom : config.x_type === "linear" ? d3.extent(raw, function(d){ return +d[config.x_vals.col]}) :
    config.x_type === "time" ? d3.extent(raw, function(d){ return d[config.x_vals.col] }) : 
    d3.set(raw.map(function(m){return m[config.x_vals.col]})).values();

  context.current_data = nested;
  context.events.onDatatransform(context);
  return context.current_data;
};  //end transformRaw
webCharts.lineChart.prototype.updateDataMarks = function(){
    var context = this;
    var config = this.config;
    var width = context.plot_width;
    var height = context.plot_height;
    var dateConvert = d3.time.format(config.date_format);

    context.svg.select(".plotting-area")
      .attr("width", width)
      .attr("height", height);

    //LINES
    var line = d3.svg.line()
      .interpolate(config.interpolate)
      .x(function(d){
        return config.x_type === "linear" ? context.x(+d.key) : 
          config.x_type === "time" ? context.x(new Date(d.key)) :
          context.x(d.key) + context.x.rangeBand()/2 
      }) 
      .y(function(d) { return context.y(d.values.y);});

    var lines = context.drawLines(line, context.current_data, function(d){return d.values}, null, function(d){return d.key}, function(d){return d[0].values.raw[0]});
    lines.selectAll("path").classed("wc-data-mark", true);

    lines.selectAll("title").text(function(d){
      var text = "";
      if(config.tooltip){
        config.tooltip.forEach(function(e){
          var label = e.label ? e.label : e.col;
          text += label +": "+d.values[0].values.raw[0][e.col] +"\n"; 
        });
      }
      else{
        config.group.forEach(function(e){
          text += e + ": "+d.values[0].values.raw[0][e] +"\n"; 
        })
      }
      return text.trim();
    });

    //fill area under line(s)
    var area = d3.svg.area()
      .interpolate(config.interpolate)
      .x(function(d){ 
        return config.x_type === "linear" ? context.x(+d.key) : 
          config.x_type === "time" ? context.x(new Date(d.key)) :
          context.x(d.key)+ context.x.rangeBand()/2 
      }) 
      .y0(function(d){return height})
      .y1(function(d) { return context.y(d.values.y);});

     var area_data = config.fill_area ? context.current_data : [];
     context.drawArea(area, area_data, function(d){return d.values}, "line-area", function(d){return d.key}, function(d){return d[0].values.raw[0]});

    //points stuff 
    //config.fill_opacity = 0;

    var point_data = config.points ? d3.merge(lines.data().map(function(m){return m.values})) : [];

    var points = context.drawPoints(point_data, null, "line-point" , null, 
      function(d){return config.x_type === "time" ? new Date(d.key) : d.key}, 
      function(d){return d.values.y}, 
      function(d){return d.values.raw[0]});

    points.selectAll("title").text(function(d){ return d.key+", "+d3.format(config.y_format)(d.values.y) });

    context.svg.selectAll(".hover-item").moveToFront();
    context.svg.select(".line-group").moveToFront();

    if(config.hover_ticks){
      var decim = d3.format(config.y_format);
      context.svg.select(".hover-tick-x").select("line").attr("y1", -height)
      //context.svg.select(".overlay").on("mousemove", mousemove)
      context.svg.on("mousemove", mousemove)
      .on("mouseover", function() { 
          context.svg.selectAll(".hover-item").style("display", "block"); 
          context.svg.selectAll(".hover-tick-y").style("display", function(d){
              return context.colorScale.domain().filter(function(f){return f}).length <= 1 ? "block" : "none"
          })
          var leg_items = context.wrap.select(".legend").selectAll(".legend-item");
          leg_items.select(".legend-color-block").style("display", "none");
          leg_items.select(".legend-mark-text").style("display", "inline");
        })
      .on("mouseout", function() { 
        context.svg.selectAll(".hover-item").style("display", "none"); 
        var leg_items = context.wrap.select(".legend").selectAll(".legend-item");
        leg_items.select(".legend-color-block").style("display", "inline-block");
        leg_items.select(".legend-mark-text").style("display", "none");
      });
    }
    else{
      context.svg.select(".overlay").on("mousemove", null)
        .on("mouseover", null)
        .on("mouseout", null);
      context.svg.selectAll(".hover-item").style("display", "none")
    }

    function mousemove() {
      var mouse = this;
      context.current_data.forEach(function(e){
        var line_data = e.values;

        var bisectDate = d3.bisector(function(d) {return new Date(d.key) }).left;

        var x0 = context.x.invert(d3.mouse(mouse)[0]);
        var i = bisectDate(line_data, x0, 1, line_data.length-1);
        var d0 = line_data[i - 1];
        var d1 = line_data[i];
        if(!d0 || !d1)
          return;

        var d = config.x_type === "time" && x0 - new Date(d0.key) > new Date(d1.key) - x0 ? d1 : 
          x0 - d0.key > d1.key - x0 ? d1 : 
          d0;

        var hover_tick_x = context.svg.select(".hover-tick-x");
        var hover_tick_y = context.svg.selectAll(".hover-tick-y");
        var focus_enr = context.svg.selectAll(".focus").filter(function(f){return f.key === e.key});

        hover_tick_x.select("text")
          .text(config.x_type === "time" ? dateConvert(x0) :
            d3.format(config.x_format)(x0) 
          )
          .attr("text-anchor", context.x(x0) > width/2 ? "end" : "start")
          .attr("dx", context.x(x0) > width/2 ? "-.5em" : ".5em");
        
        var leg_item = context.wrap.select(".legend").selectAll(".legend-item").filter(function(f){return f.label === e.key});
        //leg_item.select(".legend-mark").style("display", "none");
        leg_item.select(".legend-mark-text").text(d.values.y || d.values.y === 0 ? decim(d.values.y) : null);
          
        hover_tick_x.attr("transform", "translate("+context.x(x0)+",0)");  //move tick reference on x-axis
        hover_tick_y.attr("transform", "translate("+context.x(x0)+","+context.y(d.values.y)+")");
        hover_tick_y.select("path").attr("fill", context.colorScale.range()[0] );  //move tick reference on x-axis
        hover_tick_y.select("text").text(decim(d.values.y))
          .attr("text-anchor", "end")//context.x(x0) > width/2 ? "end" : "start")
          .attr("dx", "-.5em")//context.x(x0) > width/2 ? "-.5em" : ".5em");

        hover_tick_x.select("line").attr("y1", 0)
          .attr("y2", context.colorScale.domain().filter(function(f){return f}).length <= 1 ? context.y(d.values.y) - height : -height);
      });//end forEach
     
    };//mousemove

};//moveStuff

webCharts.barChart = function (element, filepath, config, controls){
  if(typeof config.group === "string")
    config.group = [config.group];
  this.required_vars = config.group.map(function(m){return "group"});
  this.required_cols = config.group.slice(0);
  if(config.split_by){
    this.required_vars.push("split_by");
    this.required_cols.push(config.split_by);
  };

  this.legend_mark = "square";
  this.chart_type = "barChart";

  config.aspect = config.aspect || 1.33;
  config.fill_opacity = config.fill_opacity || 0.8;
  config.y_from0 = config.y_from0 === false ? false : true;
  config.x_from0 = config.x_from0 === false ? false : true;
  config.bar_type = config.bar_type || "stacked";
  config.match_split_to_color = config.match_split_to_color === false ? false : true;
  config.y_type = config.y_type || "linear";
  config.x_type = config.x_type || "ordinal";
  config.y_type = config.y_type === "linear" && config.percent ? "percent" : config.y_type;
  config.split_by = config.bar_columns ? "wc_category" : config.split_by;
  config.x_vals = config.bar_columns ? {col: "wc_value", stat: "mean"} : config.x_vals; 
  //call from constructor
  chart.call(this, element, filepath, config, controls);

  return this;
};//bar chart
webCharts.barChart.prototype = Object.create(chart.prototype);
webCharts.barChart.prototype.transformData = function(raw){
  var context = this;
  var config = this.config;
  if(typeof config.group === "string")
    config.group = [config.group];
  config.color_by = config.match_split_to_color ? config.split_by : config.color_by ? config.color_by : config.split_by;
  config.y_type = config.y_type || "linear";
  config.x_type = config.x_type || "ordinal";
  config.y_type = config.y_type === "linear" && config.percent ? "percent" : config.y_type;
  // config.x_format = config.percent && config.x_type === "linear" ? "0%" : ".0f";
  // config.y_format = config.percent && config.y_type === "linear" ? "0%" : ".0f";
  var stats = ["mean", "median", "min", "max", "sum", "count"];
  var contval = config.x_type === "ordinal" ? "y" : "x";
  var ordval = config.x_type === "ordinal" ? "x" : "y";
  config[contval+"_vals"] = config[contval+"_vals"] || {stat: "count"};
  config[contval+"_vals"].stat = config[contval+"_vals"].stat || "count";
  var ord_behavior = config[ordval+"_behavior"] || "raw";
  var cont_behavior = config[contval+"_behavior"] || "raw";
  var cont_override = config[contval+"_vals"].stat === "count" ? "count" : config.bar_type !== "stacked" ? null : "max";

  raw = config.bar_columns ? webCharts.dataOps.lengthenRaw(raw, config.bar_columns) : raw;
  
  var chunk_order = config.chunk_order || d3.set( raw.map(function(m){return m[config.split_by]}) ).values().filter(function(f){return f});

  raw.sort(function(a,b){
    return d3.ascending(chunk_order.indexOf(a[config.color_by]), chunk_order.indexOf(b[config.color_by]))
  });

  var rawnested = d3.nest()
    .key(function(d){
      var test = config.group.map(function(m){return d[m]}); 
      return test.join(" ");
    })
    .sortKeys(d3.ascending)
    .key(function(d){return d[config.split_by]})
    .sortKeys(d3.ascending)
    .rollup(function(r,i){return getXYInfo(r,i, cont_override)})
    .entries(raw);
  rawnested.forEach(calcStartTotal);

  var ord_dom_raw = rawnested.sort(function(a,b){
    return config.bar_order === "alphabetical" ? d3.descending(a.key, b.key) : 
      config.bar_order ? d3.descending(config.bar_order.indexOf(a.key), config.bar_order.indexOf(b.key)) : 
      d3.ascending(a.total, b.total);
  }).map(function(m){return m.key});

  var ordvals = rawnested.map(function(m){return m.key});
  //extent of raw data
  var raw_dom = d3.extent(rawnested.map(function(m){return m.total}));
 
  if(config.initial_filter){
    raw = raw.filter(function(f){
      return config.initial_filter.vals.indexOf(f[config.initial_filter.col]) !== -1;
    })
  };
      
  var filtered = raw;

  var filt1 = [];

  if(context.filters.length){
    context.filters.forEach(function(e){
      filtered = filtered.filter(function(d){
        return e.val === "All" ? d : e.val instanceof Array ? e.val.indexOf(d[e.col]) > -1 : d[e.col] === e.val;
      })
    }); 
    
    //get domain for all non-All values of first filter
    if(cont_behavior === "firstfilter"){
      context.filters[0].choices.filter(function(f){return f !== "All"}).forEach(function(e){
        var perfilter = raw.filter(function(f){return f[context.filters[0].col] === e});
        var filtnested = d3.nest()
          .key(function(d){
            var test = config.group.map(function(m){return d[m]}); 
            return test.join(" ");
          })
          .sortKeys(d3.ascending)
          .key(function(d){return d[config.split_by]})
          .sortKeys(d3.ascending)
          .rollup(function(r,i){return getXYInfo(r,i)})
          .entries(perfilter);
        filtnested.forEach(calcStartTotal);
        var filt_dom = d3.extent(filtnested.map(function(m){return m.total}));
        filt1.push(filt_dom);
      });
    };
  };
  
  var filt1_dom = d3.extent( d3.merge(filt1) );

  context.filtered = filtered;

  var nested = d3.nest()
    .key(function(d){
      var test = config.group.map(function(m){return d[m]}); 
      return test.join(" ");
    })
    .sortKeys(d3.ascending)
    .key(function(d){return d[config.split_by]})
    // .sortKeys(function(a,b){
    //   return chunk_order.indexOf(a) - chunk_order.indexOf(b);
    // })
    .rollup(getXYInfo)
    .entries(filtered);

  nested.forEach(calcStartTotal);

  function getXYInfo(r,i, stat_override){
    var obj = {raw: r};
    var x_vals = config.x_vals ? r.map(function(m){return m[config.x_vals.col]}).sort(d3.ascending) : [];
    var y_vals = config.y_vals ? r.map(function(m){return m[config.y_vals.col]}).sort(d3.ascending) : [];
    var stat_choice = stat_override ? stat_override : config.x_type === "ordinal" ? config.y_vals.stat : config.x_vals.stat;

    obj.x = config.x_type === "ordinal" ? config.group.map(function(m){return r[0][m]}).join(" ") : webCharts.dataOps.summarize(x_vals, stat_choice);
    obj.y = config.y_type === "ordinal" ? config.group.map(function(m){return r[0][m]}).join(" ") : webCharts.dataOps.summarize(y_vals, stat_choice);
    
    if(stat_override)
      return obj;
    obj.x_info = {values: x_vals};
    obj.y_info = {values: y_vals};
    stats.forEach(function(e){
      obj.x_info[e] = webCharts.dataOps.summarize(x_vals, e); 
      obj.y_info[e] = webCharts.dataOps.summarize(y_vals, e);
      obj.x_info.q25 = config.error_bars && config.y_type === "ordinal" ? d3.quantile(x_vals, 0.25) : obj.x;
      obj.x_info.q75 = config.error_bars && config.y_type === "ordinal" ? d3.quantile(x_vals, 0.75) : obj.x;
      obj.y_info.q25 = config.error_bars ? d3.quantile(y_vals, 0.25) : obj.y;
      obj.y_info.q75 = config.error_bars ? d3.quantile(y_vals, 0.75) : obj.y;
    });       
    return obj;
  };

  function calcStartTotal(e){     
    e.total = config.bar_type !== "stacked" ? d3.max(e.values.map(function(m){return +m.values[contval]})) : d3.sum(e.values.map(function(m){return +m.values[contval]}));
    var counter = 0;
    e.values.forEach(function(v,i){
      if(config[contval+"_type"] === "percent")
        v.values[contval] = v.values[contval]/e.total;
      if(config.x_type === "ordinal"){
        v.values.y = v.values.y || 0;
        counter += +v.values.y;
        v.values.start = e.values[i-1] ? counter : v.values.y;
      }
      else{
        v.values.x = v.values.x || 0;
        v.values.start = counter;
        counter += +v.values.x;
      }
    });

    e.subcats = chunk_order;
  };


  var ord_dom_flex = nested.sort(function(a,b){
    return config.bar_order === "alphabetical" ? d3.descending(a.key, b.key) : 
      config.bar_order ? d3.descending(config.bar_order.indexOf(a.key), config.bar_order.indexOf(b.key)) : 
      d3.ascending(a.total, b.total);
  }).map(function(m){return m.key});

  //extent of current data
  var flex_dom = d3.extent(nested.map(function(m){return m.total}));
  //several criteria must be met in order to use the 'firstfilter' domain
  var nonall = Boolean( context.filters.length && context.filters[0].val !== "All" && 
    context.filters.slice(1).filter(function(f){return f.val === "All"}).length === context.filters.length-1 );
  var cont_dom = !context.filters.length ? flex_dom : cont_behavior === "raw" ? raw_dom : nonall && cont_behavior === "firstfilter" ? filt1_dom : flex_dom;
  //sort ordinal domain from largest to smallest
  var ord_dom = ord_behavior === "flex" ? ord_dom_flex : ord_dom_raw;

  ord_dom = ord_dom.sort(function(a,b){
    return ordval === "x" ? d3.ascending(ord_dom_flex.indexOf(b), ord_dom_flex.indexOf(a) ) : d3.descending(ord_dom_flex.indexOf(b), ord_dom_flex.indexOf(a) );
  });

  context.x_dom = config.x_type === "percent" ? [0,1] : config.x_dom ? config.x_dom : contval !== "x" ? ord_dom : config.x_from0 ? [0, d3.max(cont_dom, function(d){ return d})] : cont_dom

  context.y_dom = config.y_type === "percent" ? [0,1] : config.y_dom ? config.y_dom : contval !== "y" ? ord_dom : config.y_from0 ? [0, d3.max(cont_dom)] : cont_dom;

  config.color_dom = chunk_order;

  context.current_data = nested;

  context.events.onDatatransform(context);

  return context.current_data;
}//end transformData
webCharts.barChart.prototype.updateDataMarks = function(){
  var context = this;
  var config = this.config;
  var width = context.plot_width;
  var height = context.plot_height;
  var x = context.x;
  var y = context.y;
  var svg = context.svg;
  var cont_val = config.x_type === "ordinal" ? "y" : "x";
  var toolformat = config.tool_format || config[cont_val+"_format"] || ".0f";
  var percformat = toolformat.replace("f", "%");
  var dfixed = d3.format(toolformat);
  var dperc = d3.format(percformat);

  var bar_groups = svg.selectAll(".bar-group").data(context.current_data, function(d){return d.key});
  bar_groups.exit().remove();
  bar_groups.enter().append("g").attr("class", function(d){return "bar-group "+d.key}).append("title");
  bar_groups.select("title").text(function(d){
    return d.values.map(function(m){
      var val = config[cont_val+"_type"] !== "percent" ? dfixed(m.values[cont_val]) : m.values[cont_val+"_info"].count;
      var perc = !config.split_by || config.bar_type !== "stacked" ? "" : config[cont_val+"_type"] !== "percent" ? " ("+dperc(m.values[cont_val]/d.total)+")" : " ("+dperc(m.values[cont_val])+")";
      var key = m.key === "undefined" ? d.key : m.key;
      return key+": "+val+perc;
    }).join("\n");
  });

  var bars = bar_groups.selectAll(".bar").data(function(d){return d.values}, function(d){return d.key});
  var oldbars = bars.exit();
  var nubars = bars.enter().append("rect").attr("class", function(d){return "wc-data-mark bar "+d.key});
  bars
    .attr("stroke",  function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
    .attr("fill", function(d){return context.colorScale(d.values.raw[0][config.color_by]) })
    .attr("fill-opacity", config.fill_opacity || .8)
    .style("clip-path", "url(#"+context.clippath_id+")");
  if(config.x_type === "ordinal"){
    nubars
      .attr("y", context.y(0))
      .attr("height", 0);
    if(config.bar_type === "grouped"){
      bars.transition()
        .attr("x", function(d,i){
          var sibs = d3.select(this.parentNode).datum().subcats.map(function(m){return String(m)}); 
          var position = sibs.indexOf(d.key);
          return context.x(d.values.x)+context.x.rangeBand()/sibs.length*position;
        })
        .attr("y", function(d){return context.y(d.values.y)})
        .attr("width", function(d,i){
          var sibs = d3.select(this.parentNode).datum().subcats; 
          return context.x.rangeBand()/sibs.length;
        })
        .attr("height", function(d){return context.y(0) - context.y(d.values.y)  })
    }
    else if(config.bar_type === "nested"){
      bars.transition()
        .attr("x", function(d){
          var sibs = d3.select(this.parentNode).datum().subcats.map(function(m){return String(m)}); 
          var position = sibs.indexOf(d.key);
          var offset = position ? context.x.rangeBand()/(sibs.length*(position)*.5)/2 : context.x.rangeBand()/2
          return context.x(d.values.x) + context.x.rangeBand()/2 - offset
        })
        .attr("y", function(d){return context.y(d.values.y)})
        .attr("width", function(d,i){
          var sibs = d3.select(this.parentNode).datum().subcats.map(function(m){return String(m)});  
          var position = sibs.indexOf(d.key);
          return position ? context.x.rangeBand()/(sibs.length*(position)*.5) : context.x.rangeBand();
        })
        .attr("height", function(d){return context.y(0) - context.y(d.values.y)  })
    }
    else{
      bars.transition()
        .attr("x", function(d){return context.x(d.values.x)})
        .attr("y", function(d){return context.y(d.values.start)})
        .attr("width", context.x.rangeBand())
        .attr("height", function(d){return context.y(0) - context.y(d.values.y)  })
    }
    oldbars.transition()
      .attr("y", context.y(0))
      .attr("height", 0)
      .remove();
  }
  else{
    nubars
      .attr("x", context.x(0))
      .attr("width", 0)
    if(config.bar_type === "grouped"){
      bars.transition()
        .attr("x", function(d){return context.x(0)})
        .attr("y", function(d,i){
          var sibs = d3.select(this.parentNode).datum().subcats; 
          var position = sibs.indexOf(d.key);
          return context.y(d.values.y)+context.y.rangeBand()/sibs.length*position;
        })
        .attr("height", function(d,i){
          var sibs = d3.select(this.parentNode).datum().subcats; 
          return context.y.rangeBand()/sibs.length;
        })
        .attr("width", function(d){return context.x(d.values.x)  })
    }
    else if(config.bar_type === "nested"){
      bars.transition()
        .attr("x", function(d){return context.x(0)})
        .attr("y", function(d){
          var sibs = d3.select(this.parentNode).datum().subcats.map(function(m){return String(m)}); 
          var position = sibs.indexOf(d.key);
          var offset = position ? context.y.rangeBand()/(sibs.length*(position)*.75)/2 : context.y.rangeBand()/2
          return context.y(d.values.y) + context.y.rangeBand()/2 - offset
        })
        //.attr("y", function(d){return context.y(d.values.y)})
        .attr("height", function(d,i){
          var sibs = d3.select(this.parentNode).datum().subcats.map(function(m){return String(m)});  
          var position = sibs.indexOf(d.key);
          return position ? context.y.rangeBand()/(sibs.length*(position)*.75) : context.y.rangeBand();
        })
        .attr("width", function(d){return context.x(d.values.x)  })
    }
    else{
      bars.transition()
        .attr("x", function(d){return context.x(d.values.start)})
        .attr("y", function(d){return context.y(d.values.y)})
        .attr("height", context.y.rangeBand())
        .attr("width", function(d){return context.x(d.values.x)  })
    }
    oldbars.transition()
        .attr("x", context.x(0))
        .attr("width", 0)
        .remove();
  }
  if(config.chunk_order)
    bars.sort(function(a,b){return d3.ascending(config.chunk_order.indexOf(a.key), config.chunk_order.indexOf(b.key)) })
};//moveStuff

//timeline - prototype
webCharts.timeline = function(element, filepath, config, controls){
  this.required_vars = config.group.map(function(m){return "group"});
  this.required_cols = config.group.slice(0);
  if(config.marks){
    this.required_vars = this.required_vars.concat(config.marks.map(function(m){return "marks"}));
    this.required_cols = this.required_cols.concat(config.marks.slice(0))
  }
  if(config.line && config.line.start && config.line.end){
    this.required_vars.push("line.start", "line.end");
    this.required_cols.push(config.line.start, config.line.end);
  };
  this.legend_mark = config.legend_mark || "circle";
  this.chart_type = "timeline";
  config.tight = true;
  config.x_type = "time";
  config.y_type = "ordinal"
  config.fill_opacity = config.fill_opacity || 1;
  config.point_size = config.point_size || 4;
  config.x_format = config.x_format|| "%b";
  config.aspect = config.aspect || 1.33;
  config.date_format = config.date_format || "%x";
  config.color_by = config.color_by || "label";
  config.lines = config.lines || [];

  //call from constructor
  chart.call(this, element, filepath, config, controls);

  return this;
};//END timeline
webCharts.timeline.prototype = Object.create(chart.prototype);
webCharts.timeline.prototype.extraLayout = function(){
  var svg = this.svg;
  svg.select(".x.axis").classed("minor", true);

  svg.append("g")
    .attr("class", "x axis major")
    .style("display", this.config.x2_interval ? "block" : "none");
};
webCharts.timeline.prototype.transformData = function(raw){
  var context = this;
  var config = this.config;
  var ord_behavior = config["y_behavior"] || "raw";
  var cont_behavior = config["x_behavior"] || "raw";
  context.timeFormat = d3.time.format(config.date_format);
  context.raw_data = raw;
  
  var date_cols = []
  if(config.line && config.line.start)
    date_cols[0] = config.line.start;
  if(config.line && config.line.end)
    date_cols[1] = config.line.end;
  if(config.marks)
    date_cols.concat(config.marks);

  var rawnested = d3.nest()
    .key(function(d){
      var test = config.group.map(function(m){return d[m]}); 
      return test.join(" ");
    })
    .rollup(rollUp)
    .entries(raw);
  rawnested.sort(function(a,b){
    return d3.min(b.values.dates) - d3.min(a.values.dates) || d3.max(b.values.dates) - d3.max(a.values.dates);
  });
  var raw_dom = d3.extent(d3.merge(rawnested.map(function(m){return m.values.dates})));
  var ord_dom_raw = rawnested.map(function(m){return m.key});

  var filtered = raw;

  var filt1_dom = [];
  var filt1 = [];
  if(context.filters.length){
    context.filters.forEach(function(e){
      filtered = filtered.filter(function(d){
        return e.val !== "All" ? d[e.col] === e.val : d;
      })
    }); 
    if(cont_behavior === "firstfilter"){
     
      context.filters[0].choices.filter(function(f){return f !== "All"}).forEach(function(e){
        var perfilter = raw.filter(function(f){return f[context.filters[0].col] === e});
        var filtnested = d3.nest()
          .key(function(d){return d[config.group]})
          .rollup(rollUp)
          .entries(perfilter);
        filt1.push( d3.extent(d3.merge(rawnested.map(function(m){return m.values.dates}))) );
      });
    };
  };
  var filt1_dom = d3.extent( d3.merge(filt1) );

  context.filtered = filtered;

  var nested = d3.nest()
    .key(function(d){return d[config.group]})
    .rollup(rollUp)
    .entries(filtered);

  function rollUp(d,i){
      var marks = [];
      if(config.marks && config.marks.length){
        d.forEach(function(e){
          var gmarks = config.marks.map(function(m){
            return e[m] && context.timeFormat.parse(e[m]) ? {label: config.color_by === "label" ? m : e[config.color_by], date: context.timeFormat.parse(e[m]), raw: e } : null;
          }).filter(function(f){return f});
          marks = marks.concat(gmarks );
        });
      }
      var lines = [];
      // if(config.line){
      //   d.forEach(function(e){
      //     if(e[config.line.start] && e[config.line.end]){
      //       if(context.timeFormat.parse(e[config.line.start]) && context.timeFormat.parse(e[config.line.end]) )
      //         lines.push({start: context.timeFormat.parse(e[config.line.start]), end: context.timeFormat.parse(e[config.line.end]), attributes: config.line.attributes} );
      //     }
      //   });
      // }
      if(config.lines && config.lines.length){
        d.forEach(function(e){
          var glines = config.lines.slice().map(function(m){
            return {dates: m.map(function(n){return e[n] ? context.timeFormat.parse(e[n]) : null }), span: m };
          });
          lines = lines.concat(glines)
        });
      }
      var mdates = marks.map(function(m){return m.date});
      var ldates = d3.merge( lines.map(function(m){return m.dates}) );
 
      var dates = d3.merge([mdates, ldates])
      // if(lines.length)
      //   lines.forEach(function(e){dates.push(e.start, e.end)})

      return {marks: marks, lines: lines, dates: dates, raw: d};
    }

  nested.sort(function(a,b){
    return d3.min(b.values.dates) - d3.min(a.values.dates) || d3.max(b.values.dates) - d3.max(a.values.dates);
  });

  var flex_dom = d3.extent(d3.merge(nested.map(function(m){return m.values.dates})));

  var nonall = Boolean( context.filters.length && context.filters[0].val !== "All" && 
    context.filters.slice(1).filter(function(f){return f.val === "All"}).length === context.filters.length-1 );
  var cont_dom = !context.filters.length ? flex_dom : cont_behavior === "raw" ? raw_dom : nonall && cont_behavior === "firstfilter" ? filt1_dom : flex_dom;

  var ord_dom_flex = nested.map(function(m){return m.key});
  var ord_dom = ord_behavior === "raw" ? ord_dom_raw : ord_dom_flex;

  context.x_dom = config.x_dom || cont_dom;
  context.y_dom = config.y_dom || ord_dom;
  config.color_dom = config.color_dom ? config.color_dom : (config.marks && config.marks.length) || config.lines ? 
    d3.set( d3.merge([config.marks, d3.merge(config.lines)]).filter(function(f){return f}) ).values() : [];

  context.current_data = nested;

  context.events.onDatatransform(context);
  return context.current_data;
};//end transformRaw
webCharts.timeline.prototype.updateDataMarks = function(){
  var context = this;
  var width = context.plot_width;
  var height = context.plot_height;
  var config = this.config;

  if(config.x2_interval){
    context.xAxis2 = d3.svg.axis()
      .orient("bottom")
      .ticks(d3.time[config.x2_interval], 1 )
      .tickFormat(d3.time.format(config.x2_format));

    var secondary_x = context.svg.select(".x.axis.major");
    secondary_x.style("display", "block");
    secondary_x.selectAll("text").style("text-anchor", "start").style("font-size", ".8em");
  }
  else{
    context.svg.select(".x.axis.major").style("display", "none");
  };

  if(config.x2_interval){
    context.xAxis2.scale(context.x);
    var secondary_x = context.svg.select(".x.axis.major");
    secondary_x.attr("transform", "translate(0," + (height + (parseInt(context.wrap.style("font-size")) ) ) + ")")
    secondary_x.transition().call(context.xAxis2); 
  }

  var line_groups = context.svg.selectAll(".line-group").data(context.current_data, function(d){return d.key})
  line_groups.enter().append("g").attr("class", "line-group");
  line_groups.exit().remove();
  line_groups.attr("transform", function(d){
    return "translate(0,"+context.y(d.key)+")";
  });

  line_groups.each(function(e){
    var cont = d3.select(this)
    var line_data = [];
    if(e.values.lines.length){
      e.values.lines.forEach(function(v){
        if(v.dates[0] && v.dates[1])
          line_data.push({xs: v.dates, ys: null, key: e.key, color_key: v.span[0], span: v.span});
      });
    }
    var lines = context.drawSimpleLines(line_data, cont, "timeline", function(d,i){return i});
    lines.attr("stroke", function(d){return context.colorScale(d.color_key)})
      .classed("wc-data-mark", true);
    lines.selectAll("title").text(function(d){
      return d.span.join(" - ")+"\n"+d.xs.map(function(m){return context.timeFormat(m) }).join(" - ")
    })

    var points = context.drawPoints(e.values.marks.filter(function(f){return f.date}), cont, "time-point", null,function(d){return d.date},function(d){return 0});
    points.selectAll("circle").attr("fill", function(d){return context.colorScale(d.label)})
      .attr("stroke", function(d){return context.colorScale(d.label)})
      .classed("wc-data-mark", true);
    points.selectAll("title").text(function(d){
      var label = config.meta_map ? context.metaMap(d.label) : d.label;
      return label+": "+ context.timeFormat(d.date); 
    });
    points.moveToFront();
  });   

  //line_groups.selectAll(".timeline title").text(function(d){return d.xs.map(function(m){return m ? context.timeFormat(m) : null}).join(" - ");})  
};//moveStuff

webCharts.bulletChart = function(element, filepath, config, controls){
  this.required_vars = [];
  this.required_cols = []
  this.legend_mark = "square";
  this.chart_type = "bulletChart";

  config.aspect = config.aspect || 1.33;
  config.y_type = config.y_type || "ordinal";
  config.x_type = config.x_type || "linear";

  chart.call(this, element, filepath, config, controls);
  return this;
};//testChart
webCharts.bulletChart.prototype = Object.create(chart.prototype);
webCharts.bulletChart.prototype.transformData = function(raw){
  var context = this;
  var config = this.config;
  raw.sort(function(a,b){return +b["SITEID"] - +a["SITEID"]})
  if(config.initial_filter){
    raw = raw.filter(function(f){
      return config.initial_filter.values.indexOf(f[config.initial_filter.col]) > -1
    })
  }
  //sub-cats
  var subcat_vals = d3.set(raw.map(function(m){return m[config.sub_cat]})).values();
  //get maxes
  var value_maxes = [];
  config.bar_values.forEach(function(e){
    value_maxes.push(d3.max(raw.map(function(m){return +m[e]})))
  });
  var nested = d3.nest()
    .key(function(d){return d[config.main_cat]})
    .key(function(d){return d[config.sub_cat]})
    .rollup(function(d){
      var subbars = config.bar_values.map(function(e){
        return {key: context.metaMap(e), raw: d, value: +d[0][e] || 0}
      })
      return subbars;
    })
    .entries(raw);

  config.color_dom = subcat_vals//config.bar_groups.map(function(m){return context.metaMap(m)});

  //var barmax = d3.max(nested.map(function(m){return d3.max(m.values.map(function(v){return v.value})) }));
  var barmax = d3.max(value_maxes)
  var targmax = d3.max(raw.map(function(m){return +m[config.target]}))
  var xmax = d3.max([barmax, targmax])
  context.x_dom = [0,xmax];
  context.y_dom = d3.set(raw.map(function(m){return m[config.main_cat]})).values();

  context.num_subbars = subcat_vals.length;

  context.current_data = nested;
  return nested;
};
webCharts.bulletChart.prototype.updateDataMarks = function(){
  var context = this;
  var config = this.config;
  var width = context.plot_width;
  var height = context.plot_height;

  var bar_grps = context.svg.selectAll(".bar-group").data(context.current_data, function(d){return d.key})
  bar_grps.enter().append("g").attr("class", "bar-group")
  bar_grps.exit().remove()
  bar_grps.attr("transform", function(d){
    return "translate(0,"+context.y(d.key) +")";
  });

  function barSubSort(a,b){
    return config.bar_order ? config.bar_order.indexOf(a.key) - config.bar_order.indexOf(b.key) : null;
  }

  function barSort(a,b){
    return config.chunk_order ? config.chunk_order.indexOf(b.key) - config.chunk_order.indexOf(a.key) : b.value - a.value; 
  };

  var bar_subgrps = bar_grps.selectAll(".bar-subgroup").data(function(d){return d.values.sort(barSubSort)}, function(d){return d.key})
  bar_subgrps.enter().append("g").attr("class", function(d){return "bar-subgroup "+d.key})
    .append("title")
  bar_subgrps.exit().remove();
  bar_subgrps.attr("transform", function(d,i){
    return "translate(0,"+context.y.rangeBand()*(i/context.num_subbars) +")";
  })
  .attr("fill", function(d){
    return context.colorScale(d.key)
  });
  bar_subgrps.select("title").text(function(d){
    return d.values.map(function(m){return m.key+": "+m.value}).join("\n")
  })

  var bars = bar_subgrps.selectAll(".bar").data(function(d){
    return d.values.sort(barSort)}, 
    function(d){return d.key}
  )
  bars.enter().append("rect").attr("class", function(d){return "bar "+d.key})
  bars.attr("width", function(d){ return context.x(d.value) })
  .attr("height", function(d,i){
    return context.y.rangeBand()/context.num_subbars - context.num_subbars - i*6
  })
  .attr("y", function(d,i){ return i*3})
  .attr("fill", "inherit")
  .attr("fill-opacity", function(d,i){
    return !config.bar_values || config.bar_values.length <= 1 ? 1 : i > 0 ? 1 : 0.3
  });
  
  var target_data = context.raw_data.map(function(m){return {x: m[config.target], y: m[config.main_cat]}}).filter(function(f){
   return f.x || f.x === "0";
  });
  
  var points = this.drawPoints(target_data, null, "target-point");
  points.selectAll("circle").attr("fill-opacity", 1).attr("fill", "black").attr("stroke", "black")

  context.drawGridlines();

  var legend_data = context.colorScale.domain().slice(0).filter(function(f){return f}).map(function(m){
      return {label: m, mark: context.legend_mark};
    });
    if(config.bar_order)
      legend_data = legend_data.sort(function(a,b){return config.bar_order.indexOf(a.label) - config.bar_order.indexOf(b.label)})
    legend_data.push({label: context.metaMap(config.target), color: "black", mark: "line"})
    //legend_data.push({label: "Total Screened = 5"}, {label: "Total Enrolled = 5"})
  context.makeLegend(null, "", legend_data);
  //context.svg.select(".y.axis").selectAll(".tick line").style("display", "block")
};


//work on these below
webCharts.webTable = function(element, filepath, config, controls, callback){
  this.chart_type = "webTable";
  this.required_cols = config.cols || [];
  chart.call(this, element, filepath, config, controls, callback);

  return this;
};//webTable
webCharts.webTable.prototype = Object.create(chart.prototype);
webCharts.webTable.prototype.layout = function(){
  var config = this.config;
  d3.select(this.div).select(".loader").remove();
  var table = this.wrap.append("table");
  table.append("thead").append("tr").attr("class", "headers");
  this.table = table;
  this.events.onLayout(this);
};//layout

webCharts.webTable.prototype.transformData = function(data){
  if(!data)
      return;
  var context = this;
    var config = context.config;
    var colList = config.cols || d3.keys(data[0]);
    if(config.keep){
      config.keep.forEach(function(e){
          if(colList.indexOf(e) === -1)
          colList.unshift(e)
      });
    };
  context.config.cols = colList;

  var filtered = data;

    if(context.filters.length){
      context.filters.forEach(function(e){
        var is_array = e.val instanceof Array;
          filtered = filtered.filter(function(d){
            if(is_array)
                return e.val.indexOf(d[e.col]) !== -1;
            else
                return e.val !== "All" ? d[e.col] === e.val : d
          });
        }); 
    };

    var slimmed = d3.nest()
      .key(function(d){
          if(config.row_per){
            var test = config.row_per.map(function(m){return d[m]}); 
            return  test.join(" ");
          }
          else
            return d;
      })
      .rollup(function(r){
          if(config.dataManipulate)
            r = config.dataManipulate(r);            
          var nuarr = r.map(function(m){
            var arr = [];
            for(x in m){
              arr.push({col: x, text: m[x]});
            };
          arr.sort(function(a,b){
                return config.cols.indexOf(a.col) - config.cols.indexOf(b.col);
            });
            return {cells: arr, raw: m};
          });
        return nuarr;
      })
      .entries(filtered);

  context.current_data = slimmed;
  
  context.events.onDatatransform(context);

  return context.current_data;
};//transformData

webCharts.webTable.prototype.draw = function(processed_data, raw_data){
  var context = this;
  var raw = raw_data ? raw_data : context.raw_data;
  var config = context.config;
  var data = processed_data || context.transformData(raw);
  context.wrap.datum(data)
  var table = context.table;

  var col_list = config.cols.length ? config.cols : data.length ? d3.keys(data[0].values[0].raw) : [];

  if(config.bootstrap)
    table.classed("table", true);
  else
    table.classed("table", false);
  //make a header
  var header_data = !data.length ? [] : config.headers && config.headers.length ? config.headers : col_list;
  headerRow = table.select("thead").select("tr.headers");
  var ths = headerRow.selectAll("th").data(header_data);
  ths.exit().remove();
  ths.enter().append("th");
  ths.text(function(d){return d});

  //add table rows (1 per svg row)
  var tbodies = table.selectAll("tbody").data(data, function(d,i){return d.key});
  tbodies.exit().remove();
  tbodies.enter().append("tbody");
  //sort tbodies by row_per
  if(config.row_per){
    var rev_order = config.row_per.slice(0).reverse();
    rev_order.forEach(function(e){
        tbodies.sort(function(a,b){
          return a.values[0].raw[e] -  b.values[0].raw[e];
        });
    });
  };
  var rows = tbodies.selectAll("tr").data(function(d){ return d.values }); 
  rows.exit().remove();
  rows.enter().append("tr");
  //sort rows by criteria in sort_rows
  if(config.sort_rows){
    var row_order = config.sort_rows.slice(0)//.reverse();
    row_order.unshift("0");

    rows.sort(function(a,b){
        var i = 0;
        while(i < row_order.length && a.raw[row_order[i]] == b.raw[row_order[i]] ){
          i++;
        }
        if(a.raw[row_order[i]] < b.raw[row_order[i]]) return -1;
        if(a.raw[row_order[i]] > b.raw[row_order[i]]) return 1;
        return 0;
    });
  };
  
  //add columns (once per row)
  var tds = rows.selectAll("td").data(function(d){return d.cells.filter(function(f){
    return col_list.indexOf(f.col) > -1;
  })});
  tds.exit().remove();
  tds.enter().append("td");
  tds.attr("class", function(d){return d.col})
  if(config.as_html)
    tds.html(function(d){return d.text});
  else
    tds.text(function(d){return d.text});

  if(config.row_per){
    rows.filter(function(f,i){
        return i > 0
    }).selectAll("td").filter(function(f){
        return config.row_per.indexOf(f.col) > -1
    }).text("");
  };

  if(config.data_tables){
    if(jQuery() && jQuery().dataTable){
      var dt_config = config.data_tables;
      dt_config.searching = config.searchable ? config.searchable : false;
      $(table.node()).dataTable(dt_config);
      var print_btn = $(".print-btn", wrap.node());
      print_btn.addClass("pull-right");
      $(".dataTables_wrapper").prepend( print_btn )
    }
    else
      throw new Error("dataTables jQuery plugin not available");
  };

  if(context.callback && context.callback[1]){
    //if an array of callbacks, call them all
      if(context.callback instanceof Array)
      context.callback.forEach(function(e,i){ if(i >= 1) e(context); });
  };
  context.events.onDraw(this);
};//draw

//accrualChart - obsolete
webCharts.accrualChart = function(element, filepath, config, controls){
  this.required_vars = ["count_date"];
  this.required_cols = [config.count_date];
  if(config.split_by && config.split_by !== "data_type"){
    this.required_vars.push("split_by");
    this.required_cols.push(config.split_by);
  };
  this.legend_mark = "line";
  this.chart_type = "accrualChart";

  //a couple helper functions that are used in multiple places
  config.x_type = "time";
  config.y_type = "linear";
  config.color_by = config.color_by ? config.color_by : config.split_by || "data_type";
  config.aspect = config.aspect || 1.33;
  config.date_format = config.date_format || "%x";
  config.x_format = config.x_format|| "%b";

  chart.call(this, element, filepath, config, controls);
  return this;
};//END accrualChart
webCharts.accrualChart.prototype = Object.create(chart.prototype);
webCharts.accrualChart.prototype.extraLayout = function(){
  var svg = this.svg;
  svg.select(".x.axis").classed("minor", true);

  svg.append("g")
    .attr("class", "x axis major")
    .style("display", this.config.x2_interval ? "block" : "none")

  var x_mark = svg.select("g.x.minor").append("g")
    .attr("class", "hover-item hover-tick hover-tick-x").style("display", "none");
  x_mark.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 0 ).attr("y2", 0).attr("stroke", "#ddd");
  x_mark.append("text").attr({"x": 0, "y": 0, "dx": ".5em", "dy": "-.5em"})

  var y_mark = svg.select("g.y.axis").append("g")
    .attr("class", "hover-item hover-tick hover-tick-y").style("display", "none");
  y_mark.append("text").attr({"x": 0, "y": 0, "dx": ".5em", "dy": ".35em"})
  y_mark.append("path").attr("d", d3.svg.symbol().type("triangle-down").size(15)).attr("transform", "rotate(90)")
};
webCharts.accrualChart.prototype.transformData = function(data){
  var context = this;
  var config = this.config;
  config.color_by = config.color_by ? config.color_by : config.split_by || "data_type";
  config.color_by = config.split_by || "data_type";
  var y_behavior = config["y_behavior"] || "flex";
  context.raw_data = data.slice(0);

  var timeFormat = d3.time.format(config.date_format);

  if(config.initial_filter && config.initial_filter.col){
    data = data.filter(function(f){
      return config.initial_filter.vals.indexOf(f[config.initial_filter.col]) !== -1;
    }) 
  };

  data.forEach(function(e){e.data_type = "Actual"; e.date = timeFormat.parse(e[config.count_date])});

  config.split_by = config.split_by || "data_type";
  var splits = d3.set(data.map(function(m){return m[config.split_by]})).values();
  //automatically extrapolate from/to earliest/latest date found - ??
  config.extrapolate_from = config.extrapolate_from || timeFormat(d3.min(data, function(d){ return d.date}));
  config.extrapolate_to = config.extrapolate_to || timeFormat(d3.max(data, function(d){ return d.date}));
  //add fake data at extrapolate_from date for each line - draws lines from specified date
  if(config.extrapolate_from){
    splits.forEach(function(e){
      var obj = {data_type: "Actual", extrapolation: true};
      obj[config.split_by] = e;
      obj[config.count_date] = config.extrapolate_from;
      obj.date = timeFormat.parse(config.extrapolate_from)
      data.unshift(obj)
    })
  };
  //add fake data at extrapolate_to date for each line - draws out lines to specified date
  if(config.extrapolate_to){
    splits.forEach(function(e){
      var obj = {data_type: "Actual", extrapolation: true};
      obj[config.split_by] = e;
      obj[config.count_date] = config.extrapolate_to;
      obj.date = timeFormat.parse(config.extrapolate_to)
      data.push(obj)
    })
  };

  if(context.raw_proj){
    context.raw_proj.forEach(function(e){e.data_type = "Projected"; e.date = timeFormat.parse(e[config.count_date])});
    data = data.concat(context.raw_proj);
  };

  data.sort(function(a,b){
    return a.date - b.date;
  });

  function rollUp(r, i, fdata){
    var key = r[0].date;
    //count cumulative enrollment at that date by filtering out all the dates in the dataset that occur after the current date, 
    //then counting the length of that array -- don't count fake extrapolation values
    fdata = fdata || filtered;
    var interm = fdata.filter(function(d){
      return d[config.split_by] === r[0][config.split_by] && d.date <= key && !d.extrapolation;
    });
    // var count = timeFormat.parse(config.extrapolate_from) < key && key <= timeFormat.parse(config.extrapolate_to) ? interm.length - 1 : interm.length;
    var count = interm.length
    var total = r[0].data_type !== "Projected" ? count : context.projCount(r, interm);

    y_maxes.push(total)
    return {key: key, count: total, raw: r}
  };

  var filtered = data;
  var y_maxes = [];
  if(context.filters.length){
    context.filters.forEach(function(e){   
      //actually filter data to match filters
      filtered = filtered.filter(function(d){
        return e.val !== "All" ? d[e.col] === e.val : d
      });
    }) 
    //get y-max for each possible value of first filter
    if(y_behavior === "firstfilter"){
      var filt_options = context.filters[0].choices.filter(function(f){return f !== "All"});
      filt_options.forEach(function(o){
        var perfilter = data.filter(function(f){return f[context.filters[0].col] === o});
        var filtnested = d3.nest()
          .key(function(d){return d[config.split_by]})
          .key(function(d){return d[config.count_date]})
          .rollup(function(r,i){
            return rollUp(r,i, perfilter)
          })
          .entries(data);
      });
    }
  };

  context.filtered_data = filtered;   

  var subtracts = [config.extrapolate_from, config.extrapolate_to].filter(function(f){return f}).length;
    
  //take raw data, nest it by enrollment date
  var nested = d3.nest()
    .key(function(d){return d[config.split_by]})
    .key(function(d){return d[config.count_date]})
    .rollup(rollUp)
    .entries(data);

  var rawnested = d3.nest()
    .key(function(d){return d[config.count_date]})
    .rollup(function(r,i){ 
      var key = r[0].date;
      var interm = data.filter(function(d){
        return d[config.split_by] === r[0][config.split_by] && d.date <= key && !d.extrapolation;
      });
      var count = interm.length
      var total = r[0].data_type !== "Projected" ? count : context.projCount(r, interm);
      return {key: key, count: total, raw: r}
    })
    .entries(data);
  var raw_max = rawnested[rawnested.length-1].values.count;

  var filt_max = d3.max(y_maxes);
  var current_max = d3.max(nested.map(function(m){return m.values[m.values.length-1].values.count}));

  var nonall = Boolean( context.filters.length && context.filters[0].val !== "All" && 
    context.filters.slice(1).filter(function(f){return f.val === "All"}).length === context.filters.length-1 );
  var y_max = !context.filters.length ? current_max : y_behavior === "raw" ? raw_max : nonall && y_behavior === "firstfilter" ? filt_max : current_max;

  context.x_dom = config.x_dom || d3.extent(data, function(d){ return d.date});
  context.y_dom = config.y_dom || [0, y_max];

  //config.color_dom = config.color_dom || nested.map(function(m){return m.key}).sort(function(a,b){return a.key === "Actual" || b.key === "Actual" ? 0 : 1});
  config.color_dom = nested.map(function(m){return m.key}).sort(function(a,b){return a.key === "Actual" || b.key === "Actual" ? 0 : 1})
    .sort(d3.ascending);

  context.current_data = nested;
  context.events.onDatatransform(context);

  return context.current_data;
};  //end transformRaw
webCharts.accrualChart.prototype.updateDataMarks = function(){
  var context = this;
  var config = this.config;
  var width = context.plot_width;
  var height = context.plot_height;
  var x = context.x;
  var y = context.y;
  var timeFormat = d3.time.format(config.date_format);
  var decim = d3.format(".0f");

  context.x.clamp(true);

  if(config.x2_interval && config.count_date){
    context.xAxis2 = d3.svg.axis()
      .orient("bottom")
      .ticks(d3.time[config.x2_interval], 1 )
      .tickFormat(config.x2_format ? d3.time.format(config.x2_format) : null);

    var secondary_x = context.svg.select(".x.axis.major");
    secondary_x.style("display", "block");
    secondary_x.selectAll("text").style("text-anchor", "start").style("font-size", ".8em");
  }
  else{
    context.svg.select(".x.axis.major").style("display", "none");
  };

  var enr_line = d3.svg.line()
    .x(function(d) { return x(d.values.key); })  //what data to use as x value
    .y(function(d) { return y(d.values.count);});

  var enr_area = d3.svg.area()
    .x(function(d) { return x(d.values.key); })  //what data to use as x value
    .y0(function(d){return height})
    .y1(function(d) { return y(d.values.count);});

  if(config.x2_interval){
    context.xAxis2.scale(x);
    var secondary_x = context.svg.select(".x.axis.major");
    secondary_x.attr("transform", "translate(0," + (height + (parseInt(context.wrap.style("font-size")) ) ) + ")")
    secondary_x.transition().call(context.xAxis2); 
  }

  var filter_vals = context.filters.filter(function(f){return f.val && f.val !== "All"});
    
  var main_lines = context.drawLines(enr_line, context.current_data, function(d){return d.values;}, "accrual-line", function(d){return d.key}, function(d){return d[0].values.raw[0]});

  var area_data = config.fill_area ? context.current_data : [];
  context.drawArea(enr_area, area_data, function(d){return d.values}, "accrual-area", function(d){return d.key}, function(d){return d[0].values.raw[0]});

  context.svg.selectAll(".hover-item").moveToFront();
  context.svg.select(".line-group").moveToFront();

  if(config.hover_ticks){
    context.svg.select(".hover-tick-x").select("line").attr("y1", -height)
    //context.svg.select(".overlay").on("mousemove", mousemove)
    context.svg.on("mousemove", mousemove)
    .on("mouseover", function() { 
        context.svg.selectAll(".hover-item").style("display", "block"); 
        context.svg.selectAll(".hover-tick-y").style("display", function(d){
            return context.colorScale.domain().length <= 1 ? "block" : "none"
        })
        var leg_items = context.wrap.select(".legend").selectAll(".legend-item");
        leg_items.select(".legend-color-block").style("display", "none");
        leg_items.select(".legend-mark-text").style("display", "inline");
      })
    .on("mouseout", function() { 
      context.svg.selectAll(".hover-item").style("display", "none"); 
      var leg_items = context.wrap.select(".legend").selectAll(".legend-item");
      leg_items.select(".legend-color-block").style("display", "inline-block");
      leg_items.select(".legend-mark-text").style("display", "none");
    });
  }
  else{
    context.svg.select(".overlay").on("mousemove", null)
      .on("mouseover", null)
      .on("mouseout", null);
    context.svg.selectAll(".hover-item").style("display", "none")
  }

  function mousemove() {
    var mouse = this;
   
    context.current_data.forEach(function(e){
      var line_data = e.values;

      var bisectDate = d3.bisector(function(d) {return d.values.key; }).right;

      var x0 = x.invert(d3.mouse(mouse)[0]);
      var i = bisectDate(line_data, x0, 1, line_data.length-1);
      var d0 = line_data[i - 1];
      var d1 = line_data[i];
      if(!d0 || !d1)
        return;
      var d = x0 - d0.key > d1.key - x0 ? d1 : d0;

      var hover_tick_x = context.svg.select(".hover-tick-x");
      var hover_tick_y = context.svg.selectAll(".hover-tick-y");
      var focus_enr = context.svg.selectAll(".focus").filter(function(f){return f.key === e.key});

      hover_tick_x.select("text").text(timeFormat(x0))
        .attr("text-anchor", x(x0) > width/2 ? "end" : "start")
        .attr("dx", x(x0) > width/2 ? "-.5em" : ".5em");
      
      var leg_item = context.wrap.select(".legend").selectAll(".legend-item").filter(function(f){return f.label === e.key});
      //leg_item.select(".legend-mark").style("display", "none");
      leg_item.select(".legend-mark-text").text(d.values.count || d.values.count === 0 ? decim(d.values.count) : null);
        
      hover_tick_x.attr("transform", "translate("+x(x0)+",0)");  //move tick reference on x-axis
      hover_tick_y.attr("transform", "translate(1,"+y(d.values.count)+")");
      hover_tick_y.select("path").attr("fill", context.colorScale(e.key));  //move tick reference on x-axis
      hover_tick_y.select("text").text(d.values.count);
    });//end forEach
   
  };
}; //moveStuff

return webCharts;

}));//END webCharts