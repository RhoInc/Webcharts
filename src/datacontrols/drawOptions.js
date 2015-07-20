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