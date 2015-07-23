Controls.prototype.toggleDisabled = function(toggle, links){
    links.forEach(function(e){
    	context.div.select(".control-section").selectAll(".changer").each(function(f){
       	if(e.options.indexOf(f.option) !== -1)
         		d3.select(this).attr("disabled", e.val === toggle ? true : null);
      	});
    });   
  };