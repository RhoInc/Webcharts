chart.prototype.init = function(data){ 
    var context = this;
    var controls = context.controls;
    var config = context.config;
    if(d3.select(this.div).select(".loader").empty()){
        d3.select(this.div).insert("div", ":first-child").attr("class", "loader")
          .selectAll(".blockG").data(d3.range(8))
          .enter().append("div").attr("class", function(d){return "blockG rotate"+(d+1)});
    }
    context.wrap.attr("class", "wc-chart");
    if(this.chart_type)
      context.wrap.classed("wc-"+this.chart_type.toLowerCase(), true)

    context.setDefaults();

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
        // var init_data = context.transformData(data);
        context.draw()
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

    return this;    
};