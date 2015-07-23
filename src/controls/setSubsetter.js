Controls.prototype.setSubsetter = function(target, obj){
      var match = -1;
      target.filters.forEach(function(e,i){
         if(e.col === obj.col)
         	match = i;
      });
      if(match > -1)
      	target.filters[match] = obj;
  };