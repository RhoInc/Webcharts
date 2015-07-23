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