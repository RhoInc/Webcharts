export function drawBars(marks){
  let rawData = this.raw_data;
  let config = this.config;

  let bar_supergroups = this.svg.selectAll('.bar-supergroup').data(marks, d => d.per.join('-'));
  bar_supergroups.enter().append('g').attr('class', 'bar-supergroup');
  bar_supergroups.exit().remove();

  let bar_groups = bar_supergroups.selectAll('.bar-group').data(d => d.data, d => d.key);
  let old_bar_groups = bar_groups.exit();

  let nu_bar_groups;
  let bars;

  if(config.x.type === 'ordinal'){
    old_bar_groups.selectAll('.bar')
      .transition()
      .attr('y', this.y(0))
      .attr('height', 0);
    old_bar_groups.transition().remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group '+d.key );
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll("rect").data(d => d.values instanceof Array ? d.values : [d], d => d.key);
    bars.exit()
      .transition()
      .attr('y', this.y(0))
      .attr('height', 0)
      .remove();
    bars.enter().append('rect')
      .attr('class', d => 'wc-data-mark bar '+d.key )
      .style('clip-path', 'url(#'+this.id+')')
      .attr('y', this.y(0))
      .attr('height', 0)
      .append('title');

    bars
      .attr('stroke',  d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill-opacity', config.fill_opacity || 0.8);

    bars.each(function(d){
      let mark = d3.select(this.parentNode.parentNode).datum();
      d.tooltip = mark.tooltip;
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(rawData.map(m => m[mark.split])).values();
      d3.select(this).attr(mark.attributes);
    });

    let xformat = config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1 ? d3.format('0%') : d3.format(config.x.format);
    let yformat = config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1 ? d3.format('0%') : d3.format(config.y.format);
    bars.select('title').text(d => {
      let tt = d.tooltip || '';
      return tt.replace(/\$x/g, xformat(d.values.x))
        .replace(/\$y/g, yformat(d.values.y))
        .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig] );
    });

    bars.transition()
      .attr('x', d => {
        let position;
        if(!d.arrange || d.arrange === 'stacked')
          return this.x(d.values.x);
        else if(d.arrange === 'nested'){
          position = d.subcats.indexOf(d.key);
          let offset = position ? this.x.rangeBand()/(d.subcats.length*(position)*0.5)/2 : this.x.rangeBand()/2;
          return this.x(d.values.x) + this.x.rangeBand()/2 - offset;
        }
        else{
          position = d.subcats.indexOf(d.key);
          return this.x(d.values.x)+this.x.rangeBand()/d.subcats.length*position;
        }
      })
      .attr('y', d => {
        if(d.arrange !== 'stacked')
          return this.y(d.values.y);
        else
          return this.y(d.values.start);
      })
      .attr('width', d => {
        if(d.arrange === 'stacked')
          return this.x.rangeBand();
        else if(d.arrange === 'nested'){
          let position = d.subcats.indexOf(d.key);
          return position ? this.x.rangeBand()/(d.subcats.length*(position)*0.5) : this.x.rangeBand();
        }
        else
          return this.x.rangeBand()/d.subcats.length;
      })
      .attr('height', d => this.y(0) - this.y(d.values.y) );

  }
  else if(config.y.type === 'ordinal'){
    old_bar_groups.selectAll('.bar')
      .transition()
      .attr('x', this.x(0))
      .attr('width', 0);
    old_bar_groups.transition().remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group '+d.key );
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(d => d.values instanceof Array ? d.values : [d], d => d.key );
    bars.exit()
      .transition()
      .attr('x', this.x(0))
      .attr('width', 0)
      .remove();
    bars.enter().append('rect')
      .attr('class', d => 'wc-data-mark bar '+d.key )
      .style('clip-path', 'url(#'+this.id+')')
      .attr('x', this.x(0))
      .attr('width', 0)
      .append('title');

    bars
      .attr('stroke',  d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill-opacity', config.fill_opacity || 0.8);

    bars.each(function(d){
      let mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(rawData.map(m => m[mark.split])).values();
      d.tooltip = mark.tooltip;
    });

    let xformat = config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1 ? d3.format('0%') : d3.format(config.x.format);
    let yformat = config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1 ? d3.format('0%') : d3.format(config.y.format);
    bars.select('title').text(d => {
      let tt = d.tooltip || '';
      return tt.replace(/\$x/g, xformat(d.values.x))
        .replace(/\$y/g, yformat(d.values.y))
        .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig] );
    });

    bars.transition()
      .attr('x', d => {
        if(d.arrange === 'stacked')
          return this.x(d.values.start);
        else
          return this.x(0);
      })
      .attr('y', d => {
        if(d.arrange !== 'grouped')
          return this.y(d.values.y);
        else{
          let position = d.subcats.indexOf(d.key);
          return this.y(d.values.y) + this.y.rangeBand()/d.subcats.length * position;
        }
      })
      .attr('width', d => this.x(d.values.x) )
      .attr('height', d => {
        if(config.y.type === 'quantile')
          return 20;
        else if(d.arrange === 'stacked')
          return this.y.rangeBand();
        else if(d.arrange === 'nested'){
          let position = d.subcats.indexOf(d.key);
          return position ? this.y.rangeBand()/(sibs.length*(position)*0.75) : this.y.rangeBand();
        }
        else
          return this.y.rangeBand()/d.subcats.length;
      });
  }
  else if(config.x.type === 'linear' && config.x.bin){
    old_bar_groups.selectAll('.bar')
      .transition()
      .attr('y', this.y(0))
      .attr('height', 0);
    old_bar_groups.transition().remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group '+d.key );
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(d => d.values instanceof Array ? d.values : [d], d => d.key );
    bars.exit()
      .transition()
      .attr('y', this.y(0))
      .attr('height', 0)
      .remove();
    bars.enter().append('rect')
      .attr('class', d =>'wc-data-mark bar '+d.key )
      .style('clip-path', 'url(#'+this.id+')')
      .attr('y', this.y(0))
      .attr('height', 0)
      .append('title');

    bars
      .attr('stroke',  d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill-opacity', config.fill_opacity || 0.8);

    bars.each(function(d){
      let mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(rawData.map(m => m[mark.split])).values();
      d3.select(this).attr(mark.attributes);
      let parent = d3.select(this.parentNode).datum();
      let rangeSet = parent.key.split(',').map(m => +m);
      d.rangeLow = d3.min(rangeSet);
      d.rangeHigh = d3.max(rangeSet);
      d.tooltip = mark.tooltip;
    });

    let xformat = config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1 ? d3.format('0%') : d3.format(config.x.format);
    let yformat = config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1 ? d3.format('0%') : d3.format(config.y.format);
    bars.select('title').text(d => {
      let tt = d.tooltip || '';
      return tt.replace(/\$x/g, xformat(d.values.x))
        .replace(/\$y/g, yformat(d.values.y))
        .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig] );
    });

    bars.transition()
      .attr('x', d => this.x(d.rangeLow) )
      .attr('y', d => {
        if(d.arrange !== 'stacked')
          return this.y(d.values.y);
        else
          return this.y(d.values.start);
      })
      .attr('width', d => this.x(d.rangeHigh) - this.x(d.rangeLow) )
      .attr('height', d => this.y(0) - this.y(d.values.y) );

  }
  else if(config.y.type === 'linear' && config.y.bin){
    old_bar_groups.selectAll('.bar')
      .transition()
      .attr('x', this.x(0))
      .attr('width', 0);
    old_bar_groups.transition().remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group '+d.key );
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(d => d.values instanceof Array ? d.values : [d], d => d.key );
    bars.exit()
      .transition()
      .attr('x', this.x(0))
      .attr('width', 0)
      .remove();
    bars.enter().append('rect')
      .attr('class', d => 'wc-data-mark bar '+d.key )
      .style('clip-path', 'url(#'+this.id+')')
      .attr('x', this.x(0))
      .attr('width', 0)
      .append('title');

    bars
      .attr('stroke',  d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill-opacity', config.fill_opacity || 0.8);

    bars.each(function(d){
      let mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = d3.set(rawData.map(m => m[mark.split] )).values();
      let parent = d3.select(this.parentNode).datum();
      let rangeSet = parent.key.split(',').map(m => +m);
      d.rangeLow = d3.min(rangeSet);
      d.rangeHigh = d3.max(rangeSet);
      d.tooltip = mark.tooltip;
    });

    let xformat = config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1 ? d3.format('0%') : d3.format(config.x.format);
    let yformat = config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1 ? d3.format('0%') : d3.format(config.y.format);
    bars.select('title').text(d => {
      let tt = d.tooltip || '';
      return tt.replace(/\$x/g, xformat(d.values.x))
        .replace(/\$y/g, yformat(d.values.y))
        .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig] );
    });

    bars.transition()
      .attr('x', d => {
        if(d.arrange === 'stacked')
          return this.x(d.values.start);
        else{
          return this.x(0);
        }
      })
      .attr('y', d => this.y(d.rangeHigh))
      .attr('width', d => this.x(d.values.x) )
      .attr('height', d => this.y(d.rangeLow) - this.y(d.rangeHigh) );
  }
  else{
    old_bar_groups.selectAll('.bar')
      .transition()
      .attr('y', this.y(0))
      .attr('height', 0);
    old_bar_groups.transition().remove();
    bar_supergroups.remove();
  }

};
