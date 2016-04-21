import 'd3';

var version = '1.6.0';

function stringAccessor (o, s, v) {
	//adapted from http://jsfiddle.net/alnitak/hEsys/
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');           
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            if(i == n-1 && v !== undefined)
                o[k] = v;
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

function makeTextControl (control, control_wrap){
  let changer = control_wrap.append('input')
    .attr('type', 'text')
    .attr('class', 'changer')
    .datum(control)
    .property('value', d => {
      return this.stringAccessor(this.targets[0].config, control.option);
    });

  changer.on('change', d => {
  	let value = changer.property('value');
    this.changeOption(control.option, value, control.callback);
  });
  
}

function naturalSorter (a, b){
  //adapted from http://www.davekoelle.com/files/alphanum.js
  function chunkify(t) {
    let tz = [];
    let x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      let m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  let aa = chunkify(a.toLowerCase());
  let bb = chunkify(b.toLowerCase());

  for (let x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      let c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      }
      else{
        return (aa[x] > bb[x]) ? 1 : -1;
      }
    }
  }

  return aa.length - bb.length;

}

function makeSubsetterControl (control, control_wrap){
  let targets = this.targets;
 	let changer = control_wrap.append('select')
    .attr('class', 'changer')
    .attr('multiple', control.multiple ? true : null)
    .datum(control);

  let option_data = control.values ? control.values :
  	d3.set(this.data.map(m => m[control.value_col]).filter(f => f) ).values();
  option_data.sort(naturalSorter);

  control.start = control.start ? control.start : control.loose ? option_data[0] : null;

  if(!control.multiple && !control.start){
  	option_data.unshift('All');
  }

  control.loose = !control.loose && control.start ? true : control.loose;

  let options = changer.selectAll('option').data(option_data)
    .enter().append('option')
    .text(d => d)
  	.property('selected', d => d === control.start);

  targets.forEach(e => {
    let match = e.filters.slice().map(m => m.col === control.value_col).indexOf(true);
    if(match > -1){
      e.filters[match] = {col: control.value_col, val: control.start ? control.start : 'All', choices: option_data, loose: control.loose};
    }
    else{
      e.filters.push({col: control.value_col, val: control.start ? control.start : 'All', choices: option_data, loose: control.loose});
    }
  });

  function setSubsetter(target, obj){
    let match = -1;
    target.filters.forEach((e,i) => {
      if(e.col === obj.col){
        match = i;
      }
    });
    if(match > -1){
      target.filters[match] = obj;
    }
  }

  changer.on('change', function(d){
    if(control.multiple){
      let values = options.filter(function(f){return d3.select(this).property('selected'); })[0]
        .map(m => d3.select(m).property('text'));

      let new_filter = {col: control.value_col, val: values, choices: option_data, loose: control.loose};
      targets.forEach(e => {
        setSubsetter(e, new_filter);
        //call callback function if provided
        if(control.callback){
          control.callback();
        }
        e.draw();
      });
    }
    else{
      let value = d3.select(this).select("option:checked").property('text');
      let new_filter = {col: control.value_col, val: value, choices: option_data, loose: control.loose};
      targets.forEach(e => {
        setSubsetter(e, new_filter);
        //call callback function if provided
        if(control.callback){
          control.callback();
        }
        e.draw();
      });
    }
  });

}

function makeRadioControl (control, control_wrap){
  let changers = control_wrap.selectAll('label')
  	.data(control.values ||  d3.keys(this.data[0]))
  	.enter().append('label')
    .attr('class', 'radio')
    .text((d,i) => control.relabels ? control.relabels[i] : d)
  .append('input')
    	.attr('type', 'radio')
      .attr('class', 'changer')
    	.attr('name', control.option.replace('.', '-')+'-'+this.targets[0].id)
      .property('value', d => d)
      .property('checked', d => {
        return this.stringAccessor(this.targets[0].config, control.option) === d;
      });

  changers.on('change', d => {
  	let value = null;
  	changers.each(function(c){
     	if(d3.select(this).property('checked')){
        value = d3.select(this).property('value') === 'none' ? null : c;
      }
    });
    this.changeOption(control.option, value, control.callback);
  });

}

function makeNumberControl (control, control_wrap){
  let changer = control_wrap.append('input')
    .attr('type', 'number')
    .attr('min', control.min !== undefined ? control.min : 0)
    .attr('max', control.max)
    .attr('step', control.step || 1)
    .attr('class', 'changer')
    .datum(control)
    .property('value', d => {
      return this.stringAccessor(this.targets[0].config, control.option);
    });

  changer.on('change', d => {
  	let value = +changer.property('value');
    this.changeOption(control.option, value, control.callback);
  });

}

function makeListControl (control, control_wrap){
  let changer = control_wrap.append('input')
    .attr('type', 'text')
    .attr('class', 'changer')
    .datum(control)
    .property('value', d => {
      return this.stringAccessor(this.targets[0].config, control.option);
    });

  changer.on('change', d => {
    let value = changer.property('value') ? changer.property('value').split(',').map(m => m.trim()) : null;
    this.changeOption(control.option, value, control.callback);
  });

}

function makeDropdownControl(control, control_wrap){
  let mainOption = control.option || control.options[0];
  let changer = control_wrap.append('select')
    .attr('class', 'changer')
  	.attr('multiple', control.multiple ? true : null)
    .datum(control);

  let opt_values = control.values && control.values instanceof Array ? control.values :
    	control.values ? d3.set(this.data.map(m => m[this.targets[0].config[control.values] ] )).values() :
      d3.keys(this.data[0]);

  if(!control.require || control.none){
  	opt_values.unshift('None');
  }

  let options = changer.selectAll('option').data(opt_values)
    .enter().append('option')
    .text(d => d)
    .property('selected', d => {
      return this.stringAccessor(this.targets[0].config, mainOption) === d;
    });

  changer.on('change', d => {
  	let value = changer.property('value') === 'None' ? null : changer.property('value');

    if(control.multiple){
     	value = options.filter(function(f){return d3.select(this).property('selected'); })[0]
        .map(m => d3.select(m).property('value') )
        .filter(f => f !== 'None');
    }

    if(control.options){
      this.changeOption(control.options, value, control.callback);
    }
    else{
      this.changeOption(control.option, value, control.callback);;
    }

  });

  return changer;
}

function makeCheckboxControl(control, control_wrap){
  let changer = control_wrap.append('input')
    .attr('type', 'checkbox')
    .attr('class', 'changer')
    .datum(control)
    .property('checked', d => {
      return this.stringAccessor(this.targets[0].config, control.option);
    });

  changer.on('change', d => {
  	let value = changer.property('checked');
    this.changeOption(d.option, value, control.callback);
  });

}

function makeBtnGroupControl(control, control_wrap){
  let option_data = control.values ? control.values : d3.keys(this.data[0]);

  let btn_wrap = control_wrap.append('div').attr('class', 'btn-group');

  let changers = btn_wrap.selectAll('button')
    	.data(option_data)
    	.enter().append('button')
      .attr('class', 'btn btn-default btn-sm')
      .text(d => d)
      .classed('btn-primary', d => {
        return this.stringAccessor(this.targets[0].config, control.option) === d;
      });

  changers.on('click', d => {
     changers.each(function(e){
       d3.select(this).classed('btn-primary', e === d);
     });
     this.changeOption(control.option, d, control.callback);
  });
}

function makeControlItem(control){
    let control_wrap = this.wrap.append('div')
      .attr('class', 'control-group')
      .classed('inline', control.inline)
      .datum(control);
    let ctrl_label = control_wrap.append('span').attr('class', 'control-label').text(control.label);
    if(control.required){
      ctrl_label.append('span').attr('class', 'label label-required').text('Required');
    }
    control_wrap.append('span').attr('class', 'span-description').text(control.description);

    if(control.type === 'text'){
    	this.makeTextControl(control, control_wrap);
    }
    else if(control.type === 'number'){
    	this.makeNumberControl(control, control_wrap);
    }
    else if(control.type ===  'list'){
    	this.makeListControl(control, control_wrap);
    }
    else if(control.type === 'dropdown'){
    	this.makeDropdownControl(control, control_wrap);
    }
    else if(control.type === 'btngroup'){
    	this.makeBtnGroupControl(control, control_wrap);
    }
    else if(control.type === 'checkbox'){
    	this.makeCheckboxControl(control, control_wrap);
    }
    else if(control.type === 'radio'){
    	this.makeRadioControl(control, control_wrap);
    }
    else if(control.type === 'subsetter'){
    	this.makeSubsetterControl(control, control_wrap);
    }
   else{
      throw new Error('Each control must have a type! Choose from: "text", "number", "list", "dropdown", "btngroup", "checkbox", "radio", "subsetter"');
   }
}

function layout$2(){
    this.wrap.selectAll('*').remove();
    this.ready = true;
   	this.controlUpdate();
}

function init$1(data){
  	this.data = data;
    if(!this.config.builder){
  		this.checkRequired(this.data);
    }
  	this.layout();
}

function controlUpdate(){
  if(this.config.inputs && this.config.inputs.length && this.config.inputs[0]){
    this.config.inputs.forEach(e => this.makeControlItem(e) );
  }
}

function checkRequired$1(dataset){
    if(!dataset[0] || !this.config.inputs){
      return;
    }
   	let colnames = d3.keys(dataset[0]);
   	this.config.inputs.forEach((e,i) => {
    	if(e.type === 'subsetter' && colnames.indexOf(e.value_col) === -1){
      		throw new Error( 'Error in settings object: the value "'+e.value_col+'" does not match any column in the provided dataset.');
    	}
  	});
}

function changeOption(option, value, callback){

  this.targets.forEach(e => {
  	if(option instanceof Array){
  		option.forEach(o => this.stringAccessor(e.config, o, value) );
  	}
  	else{
    	this.stringAccessor(e.config, option, value);
    }
    //call callback function if provided
    if(callback){
    	callback();
    }
    e.draw();
  });

}

var controls = {
	changeOption: changeOption,
	checkRequired: checkRequired$1,
	controlUpdate: controlUpdate,
	init: init$1,
	layout: layout$2,
	makeControlItem: makeControlItem,
	makeBtnGroupControl: makeBtnGroupControl,
	makeCheckboxControl: makeCheckboxControl,
	makeDropdownControl: makeDropdownControl,
	makeListControl: makeListControl,
	makeNumberControl: makeNumberControl,
	makeRadioControl: makeRadioControl,
	makeSubsetterControl: makeSubsetterControl,
	makeTextControl: makeTextControl,
	stringAccessor: stringAccessor
};

function draw$1 (raw_data, processed_data){
  let raw = raw_data ? raw_data : this.raw_data;
  let config = this.config;
  let data = processed_data || this.transformData(raw);
  this.wrap.datum(data);
  let table = this.table;

  let col_list = config.cols.length ? config.cols : data.length ? d3.keys(data[0].values[0].raw) : [];

  if(config.bootstrap){
    table.classed('table', true);
  }
  else{
    table.classed('table', false);
  }

  let header_data = !data.length ? [] : config.headers && config.headers.length ? config.headers : col_list;
  let headerRow = table.select('thead').select('tr.headers');
  let ths = headerRow.selectAll('th').data(header_data);
  ths.exit().remove();
  ths.enter().append('th');
  ths.text(d => d);

  let tbodies = table.selectAll('tbody').data(data, d => d.key);
  tbodies.exit().remove();
  tbodies.enter().append('tbody');

  if(config.row_per){
    let rev_order = config.row_per.slice(0).reverse();
    rev_order.forEach(e => {
        tbodies.sort((a,b) => a.values[0].raw[e] -  b.values[0].raw[e] );
    });
  }
  let rows = tbodies.selectAll('tr').data(d => d.values );
  rows.exit().remove();
  rows.enter().append('tr');

  if(config.sort_rows){
    let row_order = config.sort_rows.slice(0);
    row_order.unshift('0');

    rows.sort((a,b) => {
        let i = 0;
        while(i < row_order.length && a.raw[row_order[i]] == b.raw[row_order[i]] ){
          i++;
        }
        if(a.raw[row_order[i]] < b.raw[row_order[i]]){
          return -1;
        }
        if(a.raw[row_order[i]] > b.raw[row_order[i]]){
          return 1;
        }
        return 0;
    });
  }

  let tds = rows.selectAll('td').data(d => d.cells.filter(f => col_list.indexOf(f.col) > -1) );
  tds.exit().remove();
  tds.enter().append('td');
  tds.attr('class', d => d.col);
  if(config.as_html){
    tds.html(d => d.text);
  }
  else{
    tds.text(d => d.text);
  }

  if(config.row_per){
    rows.filter((f,i) => i > 0).selectAll('td').filter(f => config.row_per.indexOf(f.col) > -1).text('');
  }

  if(config.data_tables){
    if(jQuery() && jQuery().dataTable){
      let dt_config = config.data_tables;
      dt_config.searching = config.searchable ? config.searchable : false;
      $(table.node()).dataTable(dt_config);
      let print_btn = $('.print-btn', wrap.node());
      print_btn.addClass('pull-right');
      $('.dataTables_wrapper').prepend( print_btn );
    }
    else{
      throw new Error('dataTables jQuery plugin not available');
    }
  }

  this.events.onDraw.call(this);
}

function transformData$1 (data){
  if(!data){
    return;
  }
  let config = this.config;
  let colList = config.cols || d3.keys(data[0]);
  if(config.keep){
    config.keep.forEach(e => {
        if(colList.indexOf(e) === -1){
          colList.unshift(e);
        }
    });
  }
  this.config.cols = colList;

  let filtered = data;

  if(this.filters.length){
    this.filters.forEach(e => {
      let is_array = e.val instanceof Array;
      filtered = filtered.filter(d => {
          if(is_array){
            return e.val.indexOf(d[e.col]) !== -1;
          }
          else{
            return e.val !== 'All' ? d[e.col] === e.val : d;
          }
      });
    });
  }

  let slimmed = d3.nest()
    .key(d => {
        if(config.row_per){
          return config.row_per.map(m => d[m]).join(' ');
        }
        else{
          return d;
        }
    })
    .rollup(r => {
        if(config.dataManipulate){
          r = config.dataManipulate(r);
        }
        let nuarr = r.map(m => {
          let arr = [];
          for(let x in m){
            arr.push({col: x, text: m[x]});
          }
          arr.sort((a,b) => config.cols.indexOf(a.col) - config.cols.indexOf(b.col) );
          return {cells: arr, raw: m};
        });
      return nuarr;
    })
    .entries(filtered);

  this.current_data = slimmed;

  this.events.onDatatransform.call(this);

  return this.current_data;
}

function layout$1 (){
  d3.select(this.div).select('.loader').remove();
  let table = this.wrap.append('table');
  table.append('thead').append('tr').attr('class', 'headers');
  this.table = table;
  this.events.onLayout.call(this);
}

function yScaleAxis (max_range, domain, type){
  if(max_range === undefined){
    max_range = this.plot_height;
  }
  if(domain === undefined){
    domain = this.y_dom;
  }
  if(type === undefined){
    type = this.config.y.type;
  }
  let config = this.config;
  let y;
  if(type === 'log'){
    y = d3.scale.log();
  }
  else if(type === 'ordinal'){
    y = d3.scale.ordinal();
  }
  else if(type === 'time'){
    y = d3.time.scale();
  }
  else{
    y = d3.scale.linear();
  }

  y.domain(domain);

  if(type === 'ordinal'){
    y.rangeBands([+max_range, 0], config.padding, config.outer_pad);
  }
  else{
    y.range([+max_range, 0]).clamp(Boolean(config.y_clamp));
  }

  let y_format = config.y.format ? config.y.format : config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1 ? '0%' : '.0f';
  let tick_count = Math.max(2, Math.min(max_range/80,8));
  let yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(tick_count)
    .tickFormat(type === 'ordinal' ? null : type === 'time' ? d3.time.format(y_format) : d3.format(y_format))
    .tickValues(config.y.ticks ? config.y.ticks : null)
    .innerTickSize(6)
    .outerTickSize(3);

  this.svg.select('g.y.axis').attr('class', 'y axis '+type);

  this.y = y;
  this.yAxis = yAxis;
}

function xScaleAxis (max_range, domain, type){
  if(max_range === undefined){
    max_range = this.plot_width;
  }
  if(domain === undefined){
    domain = this.x_dom;
  }
  if(type === undefined){
    type = this.config.x.type;
  }
  let config = this.config;
  let x;

  if(type === 'log'){
    x = d3.scale.log();
  }
  else if(type === 'ordinal'){
    x = d3.scale.ordinal();
  }
  else if(type === 'time'){
    x = d3.time.scale();
  }
  else{
    x = d3.scale.linear();
  }

  x.domain(domain);

  if(type === 'ordinal'){
    x.rangeBands([0, +max_range], config.padding, config.outer_pad);
  }
  else{
    x.range([0, +max_range]).clamp(Boolean(config.x.clamp));
  }

  let format = config.x.format ? config.x.format : config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1 ? '0%' : type === 'time' ? '%x' : '.0f';
  let tick_count = Math.max(2, Math.min(max_range/80,8));
  let xAxis = d3.svg.axis()
    .scale(x)
    .orient(config.x.location)
    .ticks(tick_count)
    .tickFormat(type === 'ordinal' ? null : type === 'time' ? d3.time.format(format) : d3.format(format))
    .tickValues(config.x.ticks ? config.x.ticks : null)
    .innerTickSize(6)
    .outerTickSize(3);

  this.svg.select('g.x.axis').attr('class', 'x axis '+type);
  this.x = x;
  this.xAxis = xAxis;
}

function updateDataMarks() {
  this.drawBars(this.marks.filter(f => f.type === 'bar'));
  this.drawLines(this.marks.filter(f => f.type === 'line'));
  this.drawPoints(this.marks.filter(f => f.type === 'circle'));
  this.drawText(this.marks.filter(f => f.type === 'text'));
}

function summarize (vals, operation){
  let nvals = vals.filter(f => +f || +f === 0)
    .map(m => +m);

  if(operation === 'cumulative'){
    return null;
  }

  let stat = operation || 'mean';
  let mathed = stat === 'count' ? vals.length :
  	stat === 'percent' ? vals.length :
  	d3[stat](nvals);

  return mathed;
}

function transformData (raw, mark){
  let config = this.config;
  let x_behavior = config.x.behavior || 'raw';
  let y_behavior = config.y.behavior || 'raw';
  let sublevel = mark.type === 'line' ? config.x.column :
    mark.type === 'bar' && mark.split ? mark.split :
    null;
  let dateConvert = d3.time.format(config.date_format);
  let totalOrder;

  function calcStartTotal(e){
    let axis = config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin) ? 'y' : 'x';
    e.total = d3.sum(e.values.map(m => +m.values[axis]));
    let counter = 0;
    e.values.forEach((v,i) => {
      if(config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin)){
        v.values.y = mark.summarizeY === 'percent' ? v.values.y/e.total : v.values.y || 0;
        counter += +v.values.y;
        v.values.start = e.values[i-1] ? counter : v.values.y;
      }
      else{
        v.values.x = mark.summarizeX === 'percent' ? v.values.x/e.total : v.values.x || 0;
        v.values.start = counter;
        counter += +v.values.x;
      }
    });
  }

  raw = mark.per && mark.per.length ? raw.filter(f => f[mark.per[0]] ) : raw;

  //make sure data has x and y values
  if(config.x.column){
    raw = raw.filter(f => f[config.x.column] !== undefined );
  }
  if(config.y.column){
    raw = raw.filter(f => f[config.y.column] !== undefined );
  }

  if(config.x.type === 'time'){
    raw = raw.filter(f => f[config.x.column] instanceof Date ? f[config.x.column] : dateConvert.parse(f[config.x.column]) );
    raw.forEach(e => e[config.x.column] = e[config.x.column] instanceof Date ? e[config.x.column] : dateConvert.parse(e[config.x.column]) );
  }
  if(config.y.type === 'time'){
    raw = raw.filter(f => f[config.y.column] instanceof Date ? f[config.y.column] : dateConvert.parse(f[config.y.column]) );
    raw.forEach(e => e[config.y.column] = e[config.y.column] instanceof Date ? e[config.y.column] : dateConvert.parse(e[config.y.column]) );
  }

  if( (config.x.type === 'linear' || config.x.type === 'log') && config.x.column){
    raw = raw.filter(f => {
      return (mark.summarizeX !== 'count' && mark.summarizeX !== 'percent') ? (+f[config.x.column] || +f[config.x.column] === 0) : f;
    });
  }
  if( (config.y.type === 'linear' || config.y.type === 'log') && config.y.column){
    raw = raw.filter(f => {
      return (mark.summarizeY !== 'count' && mark.summarizeY !== 'percent')  ? (+f[config.y.column] || +f[config.y.column] === 0) : f;
    });
  }

  let raw_nest;
  if(mark.type === 'bar'){
    raw_nest = mark.arrange !== 'stacked' ? makeNest(raw, sublevel) : makeNest(raw);
  }
  else if(mark.summarizeX === 'count' || mark.summarizeY === 'count'){
    raw_nest = makeNest(raw);
  }

  let raw_dom_x = mark.summarizeX === 'cumulative' ? [0, raw.length] :
    config.x.type === 'ordinal' ? d3.set( raw.map(m => m[config.x.column]) ).values().filter(f => f) :
    mark.split && mark.arrange !== 'stacked' ? d3.extent( d3.merge( raw_nest.nested.map(m => m.values.map(p => p.values.raw.length) ) ) ) :
    mark.summarizeX === 'count' ? d3.extent( raw_nest.nested.map(m => m.values.raw.length) ) :
    d3.extent( raw.map(m => +m[config.x.column]).filter(f => +f || +f === 0) );

  let raw_dom_y = mark.summarizeY === 'cumulative' ? [0, raw.length] :
    config.y.type === 'ordinal' ? d3.set( raw.map(m => m[config.y.column]) ).values().filter(f => f) :
    mark.split && mark.arrange !== 'stacked' ? d3.extent( d3.merge( raw_nest.nested.map(m => m.values.map(p => p.values.raw.length) ) ) ) :
    mark.summarizeY === 'count' ? d3.extent( raw_nest.nested.map(m => m.values.raw.length) ) :
    d3.extent( raw.map(m => +m[config.y.column]).filter(f => +f || +f === 0) );

  let filtered = raw;

  function makeNest(entries, sublevel){
    let dom_xs = [];
    let dom_ys = [];
    let this_nest = d3.nest();

    if((config.x.type === 'linear' && config.x.bin) || (config.y.type === 'linear' && config.y.bin)){
      let xy = (config.x.type === 'linear' && config.x.bin) ? 'x' : 'y';
      let quant = d3.scale.quantile()
        .domain(d3.extent(entries.map(m => +m[config[xy].column]) ) )
        .range(d3.range(+config[xy].bin));

      entries.forEach(e => e.wc_bin = quant(e[config[xy].column]) );

      this_nest.key(d => quant.invertExtent(d.wc_bin) );
    }
    else{
      this_nest.key(d => mark.per.map(m => d[m]).join(' ') );
    }

    if(sublevel){
      this_nest.key(d => d[sublevel]);
      this_nest.sortKeys((a,b) => {
        return config.x.type === 'time' ? d3.ascending(new Date(a), new Date(b)) :
          config.x_dom ? d3.ascending(config.x_dom.indexOf(a), config.x_dom.indexOf(b)) :
          sublevel === config.color_by && config.legend.order ? d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)) :
          config.x.type === 'ordinal' || config.y.type === 'ordinal' ? naturalSorter(a,b) :
          d3.ascending(+a, +b);
      });
    }
    this_nest.rollup(r => {
      let obj = {raw: r};
      let y_vals = r.map(m => m[config.y.column]).sort(d3.ascending);
      let x_vals = r.map(m => m[config.x.column]).sort(d3.ascending);
      obj.x = config.x.type === 'ordinal' ? r[0][config.x.column] : summarize(x_vals, mark.summarizeX);
      obj.y = config.y.type === 'ordinal' ? r[0][config.y.column] : summarize(y_vals, mark.summarizeY);

      obj.x_q25 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(x_vals, 0.25) : obj.x;
      obj.x_q75 = config.error_bars && config.y.type === 'ordinal' ? d3.quantile(x_vals, 0.75) : obj.x;
      obj.y_q25 = config.error_bars ? d3.quantile(y_vals, 0.25) : obj.y;
      obj.y_q75 = config.error_bars ? d3.quantile(y_vals, 0.75) : obj.y;
      dom_xs.push([obj.x_q25, obj.x_q75, obj.x ]);
      dom_ys.push([obj.y_q25, obj.y_q75, obj.y ]);

      if(mark.summarizeY === 'cumulative'){
        let interm = entries.filter(f => {
            return config.x.type === 'time' ? new Date(f[config.x.column]) <= new Date(r[0][config.x.column]) :
              +f[config.x.column] <= +r[0][config.x.column];
          });
        if(mark.per.length){
          interm = interm.filter(f => f[mark.per[0]] === r[0][mark.per[0]] );
        }

        let cumul = config.x.type === 'time' ? interm.length :
          d3.sum( interm.map(m => +m[config.y.column] || +m[config.y.column] === 0 ? +m[config.y.column] : 1) );
        dom_ys.push([cumul]);
        obj.y = cumul;
      }
      if(mark.summarizeX === 'cumulative'){
        let interm = entries.filter(f => {
            return config.y.type === 'time' ? new Date(f[config.y.column]) <= new Date(r[0][config.y.column]) :
              +f[config.y.column] <= +r[0][config.y.column];
          });
        if(mark.per.length){
          interm = interm.filter(f => f[mark.per[0]] === r[0][mark.per[0]] );
        }
        dom_xs.push([interm.length]);
        obj.x = interm.length;
      }

      return obj;
    });

    let test = this_nest.entries(entries);

    let dom_x = d3.extent( d3.merge(dom_xs) );
    let dom_y = d3.extent( d3.merge(dom_ys) );
    
    if(sublevel && mark.type === 'bar' && mark.arrange === 'stacked'){
      test.forEach(calcStartTotal);
      if(config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin)){
        dom_y = d3.extent( test.map(m => m.total) );
      }
      if(config.y.type === 'ordinal' || (config.y.type === 'linear' && config.y.bin)){
        dom_x = d3.extent( test.map(m => m.total) );
      }
    }
    else if(sublevel && mark.type === 'bar' && mark.split){
      test.forEach(calcStartTotal);
    }
    else{
      let axis = config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin) ? 'y' : 'x';
      test.forEach(e => e.total = e.values[axis]);
    }

    if( (config.x.sort === 'total-ascending' && config.x.type == 'ordinal') || (config.y.sort === 'total-descending' && config.y.type == 'ordinal') ){
      totalOrder = test.sort((a,b) => d3.ascending(a.total, b.total) ).map(m => m.key);
    }
    else if( (config.x.sort === 'total-descending' && config.x.type == 'ordinal') || (config.y.sort === 'total-ascending' && config.y.type == 'ordinal') ){
      totalOrder = test.sort((a,b) => d3.descending(+a.total, +b.total) ).map(m => m.key);
    }

    return {nested: test, dom_x: dom_x, dom_y: dom_y};
  }

  let filt1_xs = [];
  let filt1_ys = [];
  if(this.filters.length){
    this.filters.forEach(e => {
      filtered = filtered.filter(d => {
        return e.val === 'All' ? d : e.val instanceof Array ? e.val.indexOf(d[e.col]) > -1 : d[e.col] === e.val;
      });
    });
    //get domain for all non-All values of first filter
    if(config.x.behavior === 'firstfilter' || config.y.behavior === 'firstfilter'){
      this.filters[0].choices.filter(f => f !== 'All').forEach(e => {
        let perfilter = raw.filter(f => f[this.filters[0].col] === e);
        let filt_nested = makeNest(perfilter, sublevel);
        filt1_xs.push(filt_nested.dom_x);
        filt1_ys.push(filt_nested.dom_y);
      });
    }
  }

  //filter on mark-specific instructions
  if(mark.values){
    for(let a in mark.values){
      filtered = filtered.filter(f =>{
        return mark.values[a].indexOf(f[a]) > -1;
      });
    }
  }

  let filt1_dom_x = d3.extent( d3.merge(filt1_xs) );
  let filt1_dom_y = d3.extent( d3.merge(filt1_ys) );

  this.filtered_data = filtered;

  let current_nested = makeNest(filtered, sublevel);

  let flex_dom_x = current_nested.dom_x;
  let flex_dom_y = current_nested.dom_y;

  if(mark.type === 'bar'){
    if(config.y.type === 'ordinal' && mark.summarizeX === 'count'){
      config.x.domain = config.x.domain ? [0, config.x.domain[1]] : [0, null];
    }
    else if(config.x.type === 'ordinal' && mark.summarizeY === 'count'){
      config.y.domain = config.y.domain ? [0, config.y.domain[1]] : [0, null];
    }
  }

  //several criteria must be met in order to use the 'firstfilter' domain
  let nonall = Boolean( this.filters.length && this.filters[0].val !== 'All' &&
    this.filters.slice(1).filter(f => f.val === 'All').length === this.filters.length-1 );

  let pre_x_dom = !this.filters.length ? flex_dom_x : x_behavior === 'raw' ? raw_dom_x : nonall && x_behavior === 'firstfilter' ? filt1_dom_x : flex_dom_x;
  let pre_y_dom = !this.filters.length ? flex_dom_y : y_behavior === 'raw' ? raw_dom_y : nonall && y_behavior === 'firstfilter' ? filt1_dom_y : flex_dom_y;

  let x_dom = config.x_dom ? config.x_dom :
    config.x.type === 'ordinal' && config.x.behavior === 'flex' ? d3.set(filtered.map(m => m[config.x.column])).values() :
    config.x.type === 'ordinal' ? d3.set(raw.map(m => m[config.x.column])).values() :
    config.x_from0 ? [0, d3.max(pre_x_dom)] :
    pre_x_dom;

  let y_dom =  config.y_dom ? config.y_dom :
    config.y.type === "ordinal" && config.y.behavior === 'flex' ? d3.set(filtered.map(m => m[config.y.column] )).values() :
    config.y.type === "ordinal" ? d3.set(raw.map(m => m[config.y.column] )).values() :
    config.y_from0 ? [0, d3.max(pre_y_dom)] :
    pre_y_dom;

  if(config.x.domain && (config.x.domain[0] || config.x.domain[0] === 0) ){
    x_dom[0] = config.x.domain[0];
  }
  if(config.x.domain && (config.x.domain[1] || config.x.domain[1] === 0) ){
    x_dom[1] = config.x.domain[1];
  }
  if(config.y.domain && (config.y.domain[0] || config.y.domain[0] === 0) ){
    y_dom[0] = config.y.domain[0];
  }
  if(config.y.domain && (config.y.domain[1] || config.y.domain[1] === 0) ){
    y_dom[1] = config.y.domain[1];
  }

  if(config.x.type === 'ordinal' && !config.x.order){
    config.x.order = totalOrder;
  }
  if(config.y.type === 'ordinal' && !config.y.order){
    config.y.order = totalOrder;
  }

  this.current_data = current_nested.nested;

  this.events.onDatatransform.call(this);

  return {data: current_nested.nested, x_dom: x_dom, y_dom: y_dom};
}

function textSize (width){
  let font_size = '14px';
  let point_size = 4;
  let stroke_width = 2;

  if(!this.config.scale_text){
    font_size = this.config.font_size;
    point_size = this.config.point_size || 4;
    stroke_width = this.config.stroke_width || 2;
  }
  else if(width >= 600){
    font_size = '14px';
    point_size = 4;
    stroke_width = 2;
  }
  else if(width > 450 && width < 600){
    font_size = '12px';
    point_size = 3;
    stroke_width = 2;
  }
  else if(width > 300 && width < 450){
    font_size = '10px';
    point_size = 2;
    stroke_width = 2;
  }
  else if(width <= 300){
    font_size = '10px';
    point_size = 2;
    stroke_width = 1;
  }

  this.wrap.style('font-size',font_size);
  this.config.flex_point_size = point_size;
  this.config.flex_stroke_width = stroke_width;

}

function setMargins (){
  let y_ticks = this.yAxis.tickFormat() ? this.y.domain().map(m => this.yAxis.tickFormat()(m)) : this.y.domain();

  let max_y_text_length = d3.max( y_ticks.map(m => String(m).length) );
  if(this.config.y_format && this.config.y_format.indexOf('%') > -1 ){
    max_y_text_length += 1;
  }
  max_y_text_length = Math.max(2, max_y_text_length);
  let x_label_on = this.config.x.label ? 1.5 : 0;
  let y_label_on = this.config.y.label ? 1.5 : 0.25;
  let font_size = parseInt(this.wrap.style('font-size'));
  let x_second = this.config.x2_interval ? 1 : 0;
  let y_margin = max_y_text_length*font_size*0.5+ (font_size*y_label_on*1.5) || 8;
  let x_margin = font_size+(font_size/1.5) + (font_size*x_label_on)+(font_size*x_second) || 8;

  y_margin += 6;
  x_margin += 3;

  return {
    top: this.config.margin && this.config.margin.top ? this.config.margin.top : 8,
    right: this.config.margin && this.config.margin.right ? this.config.margin.right : 16,
    bottom: this.config.margin && this.config.margin.bottom ? this.config.margin.bottom : x_margin,
    left: this.config.margin && this.config.margin.left ? this.config.margin.left : y_margin
  };
}

function setDefaults (){

	this.config.x = this.config.x || {};
	this.config.y = this.config.y || {};

	this.config.x.label = this.config.x.label !== undefined ? this.config.x.label : this.config.x.column;
	this.config.y.label = this.config.y.label !== undefined ? this.config.y.label : this.config.y.column;

	this.config.x.sort = this.config.x.sort || 'alphabetical-ascending';
	this.config.y.sort = this.config.y.sort || 'alphabetical-descending';

	this.config.x.type = this.config.x.type || 'linear';
	this.config.y.type = this.config.y.type || 'linear';

	this.config.margin = this.config.margin || {};
	this.config.legend = this.config.legend || {};
	this.config.legend.label = this.config.legend.label !== undefined ? this.config.legend.label : this.config.color_by;
	this.config.legend.location = this.config.legend.location !== undefined ? this.config.legend.location : 'bottom';
	this.config.marks = this.config.marks && this.config.marks.length ? this.config.marks : [{}];

	this.config.date_format = this.config.date_format || '%x';

	this.config.padding = this.config.padding !== undefined ? this.config.padding : 0.3;
	this.config.outer_pad = this.config.outer_pad !== undefined ? this.config.outer_pad : 0.1;

	this.config.resizable = this.config.resizable !== undefined ? this.config.resizable : true;

	this.config.aspect = this.config.aspect || 1.33;

	this.config.colors = this.config.colors || ['rgb(102,194,165)','rgb(252,141,98)','rgb(141,160,203)','rgb(231,138,195)','rgb(166,216,84)','rgb(255,217,47)','rgb(229,196,148)','rgb(179,179,179)'];

	this.config.scale_text = this.config.scale_text === undefined ? true : this.config.scale_text;
	this.config.transitions = this.config.transitions === undefined ? true : this.config.transitions;

}

function setColorScale (){
  let config = this.config;
  let data = config.legend.behavior === 'flex' ? this.filtered_data : this.raw_data;
  let colordom = config.color_dom || d3.set(data.map(m => m[config.color_by] )).values()
    .filter(f => f && f !== 'undefined');

  if(config.legend.order){
    colordom = colordom.sort((a,b) => d3.ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)) );
  }
  else{
  	colordom = colordom.sort(naturalSorter);
  }

  this.colorScale = d3.scale.ordinal()
    .domain(colordom)
    .range(config.colors);
}

function resize (){
  let config = this.config;

  let aspect2 = 1/config.aspect;
  let div_width = parseInt(this.wrap.style('width'));
  let max_width = config.max_width ? config.max_width : div_width;
  let preWidth = !config.resizable ? config.width : !max_width || div_width < max_width ? div_width : this.raw_width;

  this.textSize(preWidth);

  this.margin = this.setMargins();

  let svg_width = config.x.type === 'ordinal' && +config.range_band ? this.raw_width + this.margin.left + this.margin.right :
    !config.resizable ? this.raw_width :
    !config.max_width || div_width < config.max_width ? div_width :
    this.raw_width;
  this.plot_width = svg_width - this.margin.left - this.margin.right;
  var svg_height = config.y.type === 'ordinal' && +config.range_band ? this.raw_height + this.margin.top + this.margin.bottom :
    !config.resizable && config.height ? config.height :
    !config.resizable ? svg_width * aspect2 :
    this.plot_width * aspect2;
  this.plot_height = svg_height - this.margin.top - this.margin.bottom;

  d3.select(this.svg.node().parentNode)
    .attr('width', svg_width)
    .attr('height', svg_height)
  .select('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  this.svg.select('.overlay')
    .attr('width', this.plot_width)
    .attr('height', this.plot_height)
    .classed('zoomable', config.zoomable);

  this.svg.select('.plotting-area')
    .attr('width', this.plot_width)
    .attr('height', this.plot_height+1)
    .attr('transform', 'translate(0, -1)');

  this.xScaleAxis();
  this.yScaleAxis();

  let g_x_axis = this.svg.select('.x.axis');
  let g_y_axis = this.svg.select('.y.axis');
  let x_axis_label = g_x_axis.select('.axis-title');
  let y_axis_label = g_y_axis.select('.axis-title');

  if(config.x_location !== 'top'){
    g_x_axis.attr('transform', 'translate(0,' + (this.plot_height) + ')');
  }
  let gXAxisTrans = config.transitions ? g_x_axis.transition() : g_x_axis;
  gXAxisTrans.call(this.xAxis);
  let gYAxisTrans = config.transitions ? g_y_axis.transition() : g_y_axis;
  gYAxisTrans.call(this.yAxis);

  x_axis_label
    .attr('transform', 'translate('+this.plot_width/2+','+(this.margin.bottom-2)+')');
  y_axis_label
    .attr('x', -1*this.plot_height / 2)
    .attr('y', -1*this.margin.left);

  this.svg.selectAll('.axis .domain').attr({'fill': 'none', 'stroke': '#ccc', 'stroke-width': 1, 'shape-rendering': 'crispEdges'});
  this.svg.selectAll('.axis .tick line').attr({'stroke': '#eee', 'stroke-width': 1, 'shape-rendering': 'crispEdges'});

  this.drawGridlines();
  //update legend - margins need to be set first
  this.makeLegend();

  //update the chart's specific marks
  this.updateDataMarks();

  //call .on("resize") function, if any
  this.events.onResize.call(this);
}

function makeLegend (scale = this.colorScale, label='', custom_data=null){
  let config = this.config;

  config.legend.mark = config.legend.mark ? config.legend.mark :
    config.marks.length && config.marks[0].type === 'bar' ? 'square' :
    config.marks.length ? config.marks[0].type :
    'square';

  let legend_label = label ? label :
   typeof config.legend.label === 'string' ? config.legend.label : '';

  let legendOriginal = this.legend || this.wrap.select('.legend');
  let legend = legendOriginal;

  if (this.config.legend.location === 'top' || this.config.legend.location === 'left') {
    this.wrap.node().insertBefore(legendOriginal.node(), this.svg.node().parentNode);
  }
  else {
    this.wrap.node().appendChild(legendOriginal.node());
  }
  legend.style('padding', 0);

  let legend_data = custom_data || scale.domain().slice(0).filter(f => f !== undefined && f !== null).map(m => {
    return {label: m,  mark: config.legend.mark};
  });

  legend.select('.legend-title')
    .text(legend_label)
    .style('display', legend_label ? 'inline' : 'none')
    .style('margin-right', '1em');

  let leg_parts = legend.selectAll('.legend-item')
      .data(legend_data, d => d.label + d.mark);

  leg_parts.exit().remove();

  const legendPartDisplay = this.config.legend.location === 'bottom' || this.config.legend.location === 'top' ?
    'inline-block' : 'block';
  let new_parts = leg_parts.enter().append('li')
    .attr('class', 'legend-item')
    .style({'list-style-type': 'none', 'margin-right': '1em'});
  new_parts.append('span')
    .attr('class', 'legend-mark-text')
    .style('color', d => scale(d.label) );
  new_parts.append('svg')
    .attr('class', 'legend-color-block')
    .attr('width', '1.1em')
    .attr('height', '1.1em')
    .style({
      'position': 'relative',
      'top': '0.2em'
    });

  leg_parts.style('display', legendPartDisplay);

  if(config.legend.order){
    leg_parts.sort((a,b) => d3.ascending(config.legend.order.indexOf(a.label), config.legend.order.indexOf(b.label)) );
  }

  leg_parts.selectAll('.legend-color-block').select('.legend-mark').remove();
  leg_parts.selectAll('.legend-color-block').each(function(e){
    let svg = d3.select(this);
    if(e.mark === 'circle'){
      svg.append('circle').attr({'cx': '.5em', 'cy': '.45em', 'r': '.45em', 'class': 'legend-mark'});
    }
    else if(e.mark === 'line'){
      svg.append('line').attr({'x1': 0, 'y1': '.5em', 'x2': '1em', 'y2': '.5em', 'stroke-width': 2, 'shape-rendering': 'crispEdges', 'class': 'legend-mark'});
    }
    else if(e.mark === 'square'){
      svg.append('rect').attr({'height': '1em', 'width': '1em', 'class': 'legend-mark', 'shape-rendering': 'crispEdges'});
    }
  });
  leg_parts.selectAll('.legend-color-block').select('.legend-mark')
    .attr('fill', d => d.color || scale(d.label))
    .attr('stroke', d => d.color || scale(d.label))
    .each(function(e){ d3.select(this).attr(e.attributes); });

  new_parts.append('span')
    .attr('class', 'legend-label')
    .style('margin-left', '0.25em')
    .text(d => d.label);

  if(scale.domain().length > 0){
    const legendDisplay = this.config.legend.location === 'bottom' || this.config.legend.location === 'top' ? 
      'block' : 
      'inline-block';
    legend.style('display', legendDisplay);
  }
  else{
    legend.style('display', 'none');
  }

  this.legend = legend;
}

function layout (){
  this.svg = this.wrap.append("svg")
    .attr({"class": "wc-svg",
        "xmlns": "http://www.w3.org/2000/svg",
        "version": "1.1",
        "xlink": "http://www.w3.org/1999/xlink"
     })
    .append("g")
    .style('display', 'inline-block');

  let defs = this.svg.append("defs");
  defs.append("pattern").attr({
    "id": "diagonal-stripes",
    "x": 0, "y": 0, "width": 3, "height": 8, 'patternUnits': "userSpaceOnUse", 'patternTransform': "rotate(30)"
  })
  .append("rect").attr({"x": "0", "y": "0", "width": "2", "height": "8", "style": "stroke:none; fill:black"});

  defs.append('clipPath').attr('id', this.id).append('rect').attr('class', 'plotting-area');

  //y axis
  this.svg.append('g').attr('class', 'y axis')
    .append('text').attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('dy', '.75em')
      .attr('text-anchor', 'middle');
  //x axis
  this.svg.append('g').attr('class', 'x axis')
    .append('text').attr('class', 'axis-title')
      .attr('dy', '-.35em')
      .attr('text-anchor', 'middle');
  //overlay
  this.svg.append('rect')
    .attr('class', 'overlay')
    .attr('opacity', 0)
    .attr('fill', 'none')
    .style('pointer-events', 'all');
  //add legend
  const legend = this.wrap.append('ul');
  legend
    .attr('class', 'legend')
    .style('vertical-align', 'top')
      .append('span')
    .attr('class', 'legend-title');

  d3.select(this.div).select('.loader').remove();

  this.events.onLayout.call(this);
}

function init (data){
    if(d3.select(this.div).select('.loader').empty()){
        d3.select(this.div).insert('div', ':first-child')
          .attr('class', 'loader')
          .selectAll('.blockG').data(d3.range(8))
            .enter().append('div')
            .attr('class', d => 'blockG rotate'+(d+1) );
    }

    this.wrap.attr('class', 'wc-chart');

    this.setDefaults();

    this.raw_data = data;

    let startup = (data => {
      //connect this chart and its controls, if any
      if(this.controls){
          this.controls.targets.push(this);
          if(!this.controls.ready){
            this.controls.init(this.raw_data);
          }
          else{
            this.controls.layout();
          }
      }

      //make sure container is visible (has height and width) before trying to initialize
      var visible = d3.select(this.div).property('offsetWidth') > 0;
      if(!visible){
          console.warn(`The chart cannot be initialized inside an element with 0 width. The chart will be initialized as soon as the container element is given a width > 0.`);
          var onVisible = setInterval(i => {
              let visible_now = d3.select(this.div).property('offsetWidth') > 0;
              if(visible_now){
                this.layout();
                this.wrap.datum(this);
                this.draw();
                clearInterval(onVisible);
              }
         }, 500);
      }
      else{
        this.layout();
        this.wrap.datum(this);
        this.draw();
      }
    });

    this.events.onInit.call(this);
    if(this.raw_data.length){
      this.checkRequired(this.raw_data);
    }
    startup(data);

    return this;
}

function drawText (marks) {
  const config = this.config;

  const textSupergroups = this.svg.selectAll('.text-supergroup').data(marks, (d, i) => `${i}-${d.per.join('-')}`);
  textSupergroups.enter().append('g').attr('class', 'text-supergroup');
  textSupergroups.exit().remove();

  const texts = textSupergroups.selectAll('.text')
    .data(d => d.data, d => d.key);
  const oldTexts = texts.exit();

  // don't need to transition position of outgoing text
  // const oldTextsTrans = config.transitions ? oldTexts.selectAll('text').transition() : oldTexts.selectAll('text');

  const oldTextGroupTrans = config.transitions ? oldTexts.transition() : oldTexts;
  oldTextGroupTrans.remove();

  const nutexts = texts.enter().append('g').attr('class', d => `${d.key} text`);
  nutexts.append('text')
    .attr('class', 'wc-data-mark');
  // don't need to set initial location for incoming text

  // attach mark info
  function attachMarks(d) {
    d.mark = d3.select(this.parentNode).datum();
    d3.select(this).select('text').attr(d.mark.attributes);
  }
  texts.each(attachMarks);

  // parse text like tooltips
  texts.select('text').text(d => {
    const tt = d.mark.text || '';
    const xformat = config.x.summary === 'percent' ?
      d3.format('0%') :
      config.x.type === 'time' ?
      d3.time.format(config.x.format) :
      d3.format(config.x.format);
    const yformat = config.y.summary === 'percent' ?
      d3.format('0%') :
      config.y.type === 'time' ?
      d3.time.format(config.y.format) :
      d3.format(config.y.format);
    return tt.replace(/\$x/g, config.x.type === 'time' ? xformat(new Date(d.values.x)) : xformat(d.values.x))
      .replace(/\$y/g, config.y.type === 'time' ? yformat(new Date(d.values.y)) : yformat(d.values.y))
      .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
  });
  // animated attributes
  const textsTrans = config.transitions ? texts.select('text').transition() : texts.select('text');
  textsTrans
    .attr('x', d => {
      const xPos = this.x(d.values.x) || 0;
      return config.x.type === 'ordinal' ? xPos + this.x.rangeBand() / 2 : xPos;
    })
    .attr('y', d => {
      const yPos = this.y(d.values.y) || 0;
      return config.y.type === 'ordinal' ? yPos + this.y.rangeBand() / 2 : yPos;
    });

  return texts;
}

function drawPoints (marks){
  let config = this.config;

  let point_supergroups = this.svg.selectAll('.point-supergroup').data(marks, (d,i) => i+'-'+d.per.join('-'));
  point_supergroups.enter().append('g').attr('class', 'point-supergroup');
  point_supergroups.exit().remove();

  let points = point_supergroups.selectAll('.point')
    .data(d => d.data, d => d.key );
  let oldPoints = points.exit();
  
  let oldPointsTrans = config.transitions ? oldPoints.selectAll('circle').transition() : oldPoints.selectAll('circle');
  oldPointsTrans.attr('r', 0);

  let oldPointGroupTrans = config.transitions ? oldPoints.transition() : oldPoints;
  oldPointGroupTrans.remove();

  let nupoints = points.enter().append('g').attr('class', d => d.key+' point');
  nupoints.append('circle').attr('class', 'wc-data-mark')
    .attr('r', 0);
  nupoints.append('title');
  //static attributes
  points.select('circle')
    .attr('fill-opacity', config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : 0.6)
    .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) )
    .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]) );
  //attach mark info
  points.each(function(d){
    let mark = d3.select(this.parentNode).datum();
    d.mark = mark;
    d3.select(this).select('circle').attr(mark.attributes);
  });
  //animated attributes
  let pointsTrans = config.transitions ?  points.select('circle').transition() :  points.select('circle');
  pointsTrans
    .attr('r', d => d.mark.radius || config.flex_point_size)
    .attr('cx', d => {
      let x_pos = this.x(d.values.x) || 0;
      return config.x.type === 'ordinal' ? x_pos + this.x.rangeBand()/2 : x_pos;
    })
    .attr('cy', d => {
      let y_pos = this.y(d.values.y) || 0;
      return config.y.type === 'ordinal' ? y_pos + this.y.rangeBand()/2 : y_pos;
    });


  points.select('title').text(d => {
    let tt = d.mark.tooltip || '';
    let xformat = config.x.summary === 'percent' ? d3.format('0%') : config.x.type === 'time' ? d3.time.format(config.x.format) : d3.format(config.x.format);
    let yformat = config.y.summary === 'percent' ? d3.format('0%') : config.y.type === 'time' ? d3.time.format(config.y.format) : d3.format(config.y.format);
    return tt.replace(/\$x/g, config.x.type === 'time' ? xformat(new Date(d.values.x)) : xformat(d.values.x))
      .replace(/\$y/g, config.y.type === 'time' ? yformat(new Date(d.values.y)) : yformat(d.values.y))
      .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig] );
  });
  
  return points;
}

function drawLines (marks){
  let config = this.config;
  let line = d3.svg.line()
    .interpolate(config.interpolate)
    .x(d => {
      return config.x.type === 'linear' ? this.x(+d.values.x) :
        config.x.type === 'time' ? this.x(new Date(d.values.x)) :
        this.x(d.values.x) + this.x.rangeBand()/2;
    })
    .y(d => {
      return config.y.type === 'linear' ? this.y(+d.values.y) :
        config.y.type === 'time' ? this.y(new Date(d.values.y)) :
        this.y(d.values.y) + this.y.rangeBand()/2;
    });

  let line_supergroups = this.svg.selectAll('.line-supergroup').data(marks, (d,i) => i+'-'+d.per.join('-'));
  line_supergroups.enter().append('g').attr('class', 'line-supergroup');
  line_supergroups.exit().remove();

  let line_grps = line_supergroups.selectAll('.line')
    .data(d => d.data, d => d.key);
  line_grps.exit().remove();
  let nu_line_grps = line_grps.enter().append('g').attr('class', d => d.key +' line');
  nu_line_grps.append('path');
  nu_line_grps.append('title');
  
  let linePaths = line_grps.select('path').attr('class', 'wc-data-mark')
    .datum(d => d.values)
    .attr('stroke', d => this.colorScale(d[0].values.raw[0][config.color_by]) )
    .attr('stroke-width', config.stroke_width ? config.stroke_width : config.flex_stroke_width)
    .attr('stroke-linecap', 'round')
    .attr('fill', 'none');
  let linePathsTrans = config.transitions ? linePaths.transition() : linePaths;
  linePathsTrans.attr('d', line);

  line_grps.each(function(d){
    let mark = d3.select(this.parentNode).datum();
    d.tooltip = mark.tooltip;
    d3.select(this).select('path').attr(mark.attributes);
  });

  line_grps.select('title').text(d => {
    let tt = d.tooltip || '';
    let xformat = config.x.summary === 'percent' ? d3.format('0%') : d3.format(config.x.format);
    let yformat = config.y.summary === 'percent' ? d3.format('0%') : d3.format(config.y.format);
    return tt.replace(/\$x/g, xformat(d.values.x))
      .replace(/\$y/g, yformat(d.values.y))
      .replace(/\[(.+?)\]/g, (str, orig) => d.values[0].values.raw[0][orig] );
  });

  return line_grps;
}

function drawGridlines (){
  this.wrap.classed('gridlines', this.config.gridlines);
  if(this.config.gridlines){
    this.svg.select('.y.axis').selectAll('.tick line').attr('x1', 0);
    this.svg.select('.x.axis').selectAll('.tick line').attr('y1', 0);
    if(this.config.gridlines === 'y' || this.config.gridlines === 'xy')
      this.svg.select('.y.axis').selectAll('.tick line').attr('x1', this.plot_width);
    if(this.config.gridlines === 'x' || this.config.gridlines === 'xy')
      this.svg.select('.x.axis').selectAll('.tick line').attr('y1', -this.plot_height);
  }
  else{
    this.svg.select('.y.axis').selectAll('.tick line').attr('x1', 0);
    this.svg.select('.x.axis').selectAll('.tick line').attr('y1', 0);
  }
};

function drawBars (marks){
  let rawData = this.raw_data;
  let config = this.config;

  let bar_supergroups = this.svg.selectAll('.bar-supergroup').data(marks, (d,i) => i+'-'+d.per.join('-'));
  bar_supergroups.enter().append('g').attr('class', 'bar-supergroup');
  bar_supergroups.exit().remove();

  let bar_groups = bar_supergroups.selectAll('.bar-group').data(d => d.data, d => d.key);
  let old_bar_groups = bar_groups.exit();

  let nu_bar_groups;
  let bars;

  let oldBarsTrans = config.transitions ? old_bar_groups.selectAll('.bar').transition() : old_bar_groups.selectAll('.bar');
  let oldBarGroupsTrans = config.transitions ? old_bar_groups.transition() : old_bar_groups;

  if(config.x.type === 'ordinal'){
    oldBarsTrans
      .attr('y', this.y(0))
      .attr('height', 0);
    
    oldBarGroupsTrans.remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group '+d.key );
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(d => {
      return (
        d.values instanceof Array ? d.values.sort((a,b) => this.colorScale.domain().indexOf(b.key) - this.colorScale.domain().indexOf(a.key)) 
        : [d]
      );
    }, d => d.key );

    let exitBars = config.transitions ? bars.exit().transition() : bars.exit();
    exitBars
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
      .attr('shape-rendering', 'crispEdges')
      .attr('stroke',  d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) );

    bars.each(function(d){
      let mark = d3.select(this.parentNode.parentNode).datum();
      d.tooltip = mark.tooltip;
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = config.legend.order ? config.legend.order.slice().reverse() : mark.values && mark.values[mark.split] ? mark.values[mark.split] : d3.set(rawData.map(m => m[mark.split])).values();
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

    let barsTrans = config.transitions ? bars.transition() : bars;
    barsTrans
      .attr('x', d => {
        let position;
        if(!d.arrange || d.arrange === 'stacked'){
          return this.x(d.values.x);
        }
        else if(d.arrange === 'nested'){
          let position = d.subcats.indexOf(d.key);
          let offset = position ? this.x.rangeBand()/(d.subcats.length*0.75)/(position) : this.x.rangeBand();
          return this.x(d.values.x) + (this.x.rangeBand() - offset)/2;
        }
        else{
          position = d.subcats.indexOf(d.key);
          return this.x(d.values.x)+this.x.rangeBand()/d.subcats.length*position;
        }
      })
      .attr('y', d => {
        if(d.arrange !== 'stacked'){
          return this.y(d.values.y);
        }
        else{
          return this.y(d.values.start);
        }
      })
      .attr('width', d => {
        if(d.arrange === 'stacked'){
          return this.x.rangeBand();
        }
        else if(d.arrange === 'nested'){
          let position = d.subcats.indexOf(d.key);
          return position ? this.x.rangeBand()/(d.subcats.length*0.75)/(position) : this.x.rangeBand();
        }
        else{
          return this.x.rangeBand()/d.subcats.length;
        }
      })
      .attr('height', d => this.y(0) - this.y(d.values.y) );

  }
  else if(config.y.type === 'ordinal'){
    oldBarsTrans
      .attr('x', this.x(0))
      .attr('width', 0);

    oldBarGroupsTrans.remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group '+d.key );
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(d => {
      return (
        d.values instanceof Array ? d.values.sort((a,b) => this.colorScale.domain().indexOf(b.key) - this.colorScale.domain().indexOf(a.key)) 
        : [d]
      );
    }, d => d.key );

    let exitBars = config.transitions ? bars.exit().transition() : bars.exit();
    exitBars
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
      .attr('shape-rendering', 'crispEdges')
      .attr('stroke',  d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) );

    bars.each(function(d){
      let mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split && mark.arrange ? mark.arrange : mark.split ? 'grouped' : null;
      d.subcats = config.legend.order ? config.legend.order.slice().reverse() : mark.values && mark.values[mark.split] ? mark.values[mark.split] : d3.set(rawData.map(m => m[mark.split])).values();
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

    let barsTrans = config.transitions ? bars.transition() : bars;
    barsTrans
      .attr('x', d => {
        if(d.arrange === 'stacked' || !d.arrange){
          return d.values.start !== undefined ? this.x(d.values.start) : this.x(0);
        }
        else{
          return this.x(0);
        }
      })
      .attr('y', d => {
        if(d.arrange === 'nested'){
          let position = d.subcats.indexOf(d.key);
          let offset = position ? this.y.rangeBand()/(d.subcats.length*0.75)/(position) : this.y.rangeBand();
          return this.y(d.values.y) + (this.y.rangeBand() - offset)/2;
        }
        else if(d.arrange === 'grouped'){
          let position = d.subcats.indexOf(d.key);
          return this.y(d.values.y) + this.y.rangeBand()/d.subcats.length * position;
        }
        else{
          return this.y(d.values.y);
        }
      })
      .attr('width', d => this.x(d.values.x) - this.x(0) )
      .attr('height', d => {
        if(config.y.type === 'quantile'){
          return 20;
        }
        else if(d.arrange === 'nested'){
          let position = d.subcats.indexOf(d.key);
          return position ? this.y.rangeBand()/(d.subcats.length*0.75)/(position) : this.y.rangeBand();
        }
        else if(d.arrange === 'grouped'){
          return this.y.rangeBand()/d.subcats.length;
        }
        else{
          return this.y.rangeBand();
        }
      });
  }
  else if(config.x.type === 'linear' && config.x.bin){
    oldBarsTrans
      .attr('y', this.y(0))
      .attr('height', 0);

    oldBarGroupsTrans.remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group '+d.key );
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(d => d.values instanceof Array ? d.values : [d], d => d.key );
    
    let exitBars = config.transitions ? bars.exit().transition() : bars.exit();
    exitBars
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
      .attr('shape-rendering', 'crispEdges')
      .attr('stroke',  d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) );

    bars.each(function(d){
      let mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = config.legend.order ? config.legend.order.slice().reverse() : mark.values && mark.values[mark.split] ? mark.values[mark.split] : d3.set(rawData.map(m => m[mark.split])).values();
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

    let barsTrans = config.transitions ? bars.transition() : bars;
    barsTrans
      .attr('x', d => this.x(d.rangeLow) )
      .attr('y', d => {
        if(d.arrange !== 'stacked'){
          return this.y(d.values.y);
        }
        else{
          return this.y(d.values.start);
        }
      })
      .attr('width', d => this.x(d.rangeHigh) - this.x(d.rangeLow) )
      .attr('height', d => this.y(0) - this.y(d.values.y) );

  }
  else if(config.y.type === 'linear' && config.y.bin){
    oldBarsTrans
      .attr('x', this.x(0))
      .attr('width', 0);
    oldBarGroupsTrans.remove();

    nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group '+d.key );
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(d => d.values instanceof Array ? d.values : [d], d => d.key );
    
    let exitBars = config.transitions ? bars.exit().transition() : bars.exit();
    exitBars
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
      .attr('shape-rendering', 'crispEdges')
      .attr('stroke',  d => this.colorScale(d.values.raw[0][config.color_by]) )
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]) );

    bars.each(function(d){
      let mark = d3.select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = config.legend.order ? config.legend.order.slice().reverse() : mark.values && mark.values[mark.split] ? mark.values[mark.split] : d3.set(rawData.map(m => m[mark.split] )).values();
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

    let barsTrans = config.transitions ? bars.transition() : bars;
    barsTrans
      .attr('x', d => {
        if(d.arrange === 'stacked'){
          return this.x(d.values.start);
        }
        else{
          return this.x(0);
        }
      })
      .attr('y', d => this.y(d.rangeHigh))
      .attr('width', d => this.x(d.values.x) )
      .attr('height', d => this.y(d.rangeLow) - this.y(d.rangeHigh) );
  }
  else{
    oldBarsTrans
      .attr('y', this.y(0))
      .attr('height', 0);
    oldBarGroupsTrans.remove();
    bar_supergroups.remove();
  }

}

function drawArea (area_drawer, area_data, datum_accessor, class_match = 'chart-area', bind_accessor, attr_accessor = function(d){return d}){
  var area_grps = this.svg.selectAll('.'+class_match)
    .data(area_data, bind_accessor);
  area_grps.exit().remove();
  area_grps.enter().append('g').attr('class', function(d){return class_match+' '+d.key})
    .append('path');
  
  var areaPaths = area_grps.select('path')
    .datum(datum_accessor)
    .attr('fill', d => {
      var d_attr = attr_accessor(d);
      return d_attr ? this.colorScale(d_attr[this.config.color_by]) : null;
    })
    .attr('fill-opacity', this.config.fill_opacity || this.config.fill_opacity === 0 ? this.config.fill_opacity : 0.3);

  //don't transition if config says not to
  var areaPathTransitions = this.config.transitions ? areaPaths.transition() : areaPaths;
  
  areaPathTransitions.attr('d', area_drawer);

  return area_grps;
}

function draw (raw_data, processed_data){
  var context = this;
  let config = this.config;
  let aspect2 = 1/config.aspect;
  //if pre-processing callback, run it now
  this.events.onPreprocess.call(this);
  //then do normal processing
  let raw = raw_data ? raw_data : this.raw_data ? this.raw_data : [];
  let data = processed_data || this.consolidateData(raw);

  this.wrap.datum(data);

  let div_width = parseInt(this.wrap.style('width'));

  this.setColorScale();

  let max_width = config.max_width ? config.max_width : div_width;
  this.raw_width = config.x.type === "ordinal" && +config.range_band ? (+config.range_band+(config.range_band*config.padding))*this.x_dom.length :
    config.resizable ? max_width :
    config.width ? config.width :
    div_width;
  this.raw_height = config.y.type === "ordinal" && +config.range_band ? (+config.range_band+(config.range_band*config.padding))*this.y_dom.length :
    config.resizable ? max_width*aspect2 :
    config.height ? config.height :
    div_width*aspect2;

  let pseudo_width = this.svg.select(".overlay").attr("width") ? this.svg.select(".overlay").attr("width") : this.raw_width;
  let pseudo_height = this.svg.select(".overlay").attr("height") ? this.svg.select(".overlay").attr("height") : this.raw_height;

  this.svg.select(".x.axis").select(".axis-title").text(d => {
    return typeof config.x.label === "string" ? config.x.label : typeof config.x.label === "function" ? config.x.label.call(this) : null;
  });
  this.svg.select(".y.axis").select(".axis-title").text(d => {
    return typeof config.y.label === "string" ? config.y.label : typeof config.y.label === "function" ? config.y.label.call(this) : null;
  });

  this.xScaleAxis(pseudo_width);
  this.yScaleAxis(pseudo_height);

  if(config.resizable && typeof window !== 'undefined'){
    d3.select(window).on('resize.'+context.element+context.id, function(){ context.resize(); });
  }
  else if(typeof window !== 'undefined'){
    d3.select(window).on('resize.'+context.element+context.id, null);
  }

  this.events.onDraw.call(this);
  this.resize();
}

function consolidateData (raw){
  let config = this.config;
  let all_data = [];
  let all_x = [];
  let all_y = [];

  this.setDefaults();

  config.marks.forEach((e,i) => {
    if(e.type !== 'bar'){
      e.arrange = null;
      e.split = null;
    }
    let mark_info = e.per ? this.transformData(raw, e) : {data: [], x_dom: [], y_dom: []};

    all_data.push(mark_info.data);
    all_x.push(mark_info.x_dom);
    all_y.push(mark_info.y_dom);
    this.marks[i] = Object.create(e);
    this.marks[i].data = mark_info.data;
    //this.marks[i] = {type: e.type, per: e.per, data: mark_info.data, split: e.split, arrange: e.arrange, order: e.order, summarizeX: e.summarizeX, summarizeY: e.summarizeY, tooltip: e.tooltip, radius: e.radius, attributes: e.attributes};
  });

  if(config.x.type === 'ordinal'){
    if(config.x.domain){
      this.x_dom = config.x.domain;
    }
    else if( config.x.order ){
      this.x_dom = d3.set(d3.merge(all_x)).values()
        .sort((a,b) => d3.ascending(config.x.order.indexOf(a), config.x.order.indexOf(b)) );
    }
    else if( config.x.sort && config.x.sort === 'alphabetical-ascending' ){
      this.x_dom = d3.set(d3.merge(all_x)).values().sort(naturalSorter);
    }
    else if(config.y.type === 'time' && config.x.sort === 'earliest' ){
      this.x_dom = d3.nest()
        .key(d => d[config.x.column] )
        .rollup(d =>{
          return d.map(m => m[config.y.column] ).filter(f => f instanceof Date);
        })
        .entries(this.raw_data)
        .sort((a,b) => d3.min(b.values) - d3.min(a.values) )
        .map(m => m.key);
    }
    else if( !config.x.sort || config.x.sort === 'alphabetical-descending' ){
      this.x_dom = d3.set(d3.merge(all_x)).values().sort(naturalSorter);
    }
    else{
      this.x_dom = d3.set(d3.merge(all_x)).values();
    }
  }
  else if(config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1){
    this.x_dom = [0,1];
  }
  else{
    this.x_dom = d3.extent(d3.merge(all_x));
  }

  if(config.y.type === 'ordinal'){
    if(config.y.domain){
      this.y_dom = config.y.domain;
    }
    else if( config.y.order ){
      this.y_dom = d3.set(d3.merge(all_y)).values()
        .sort((a,b) => d3.ascending(config.y.order.indexOf(a), config.y.order.indexOf(b)) );
    }
    else if( config.y.sort && config.y.sort === 'alphabetical-ascending' ){
      this.y_dom = d3.set(d3.merge(all_y)).values().sort(naturalSorter);
    }
    else if( config.x.type === 'time' && config.y.sort === 'earliest' ){
      this.y_dom = d3.nest()
        .key(d => d[config.y.column] )
        .rollup(d => {
          return d.map(m => m[config.x.column] ).filter(f => f instanceof Date );
        })
        .entries(this.raw_data)
        .sort((a,b) => d3.min(b.values) - d3.min(a.values) )
        .map(m => m.key);
    }
    else if( !config.y.sort || config.y.sort === 'alphabetical-descending' ){
      this.y_dom = d3.set(d3.merge(all_y)).values().sort(naturalSorter).reverse();
    }
    else{
      this.y_dom = d3.set(d3.merge(all_y)).values();
    }
  }
  else if(config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1){
    this.y_dom = [0,1];
  }
  else{
    this.y_dom = d3.extent(d3.merge(all_y));
  }

}

function checkRequired (data){
    let colnames = Object.keys(data[0]);
    let requiredVars = [];
    let requiredCols = [];
    if(this.config.x.column){
    	requiredVars.push('this.config.x.column');
    	requiredCols.push(this.config.x.column);
    }
    if(this.config.y.column){
    	requiredVars.push('this.config.y.column');
    	requiredCols.push(this.config.y.column);
    }
    if(this.config.color_by){
    	requiredVars.push('this.config.color_by');
    	requiredCols.push(this.config.color_by);
    }
    this.config.marks.forEach((e,i) => {
    	if(e.per && e.per.length){
    		e.per.forEach((p,j) => {
    			requiredVars.push('this.config.marks['+i+'].per['+j+']');
	    		requiredCols.push(p);
    		});
	    }
	    if(e.split){
	    	requiredVars.push('this.config.marks['+i+'].split');
	    	requiredCols.push(e.split);
	    }
    });

    requiredCols.forEach((e, i) => {
        if(colnames.indexOf(e) < 0){
            d3.select(this.div).select('.loader').remove();
            this.wrap.append('div')
            	.style('color', 'red')
            	.html('The value "'+e+'" for the <code>'+requiredVars[i]+'</code> setting does not match any column in the provided dataset.');
            throw new Error('Error in settings object: The value "'+e+'" for the '+requiredVars[i]+' setting does not match any column in the provided dataset.');
        }
      });
}

const chartProto = {
  raw_data: [],
  config: {}
};

var chart = Object.create(chartProto, {
  'checkRequired': { value: checkRequired },
  'consolidateData': { value: consolidateData },
  'draw': { value: draw },
  'drawArea': { value: drawArea },
  'drawBars': { value: drawBars },
  'drawGridlines': { value: drawGridlines },
  'drawLines': { value: drawLines },
  'drawPoints': { value: drawPoints },
  'drawText': { value: drawText },
  'init': { value: init },
  'layout': { value: layout },
  'makeLegend': { value: makeLegend },
  'resize': { value: resize },
  'setColorScale': { value: setColorScale },
  'setDefaults': { value: setDefaults },
  'setMargins': { value: setMargins },
  'textSize': { value: textSize },
  'transformData': { value: transformData },
  'updateDataMarks': { value: updateDataMarks },
  'xScaleAxis': { value: xScaleAxis },
  'yScaleAxis': { value: yScaleAxis }
});

var table = Object.create(chart, {
	'layout': {value: layout$1},
	'transformData': {value: transformData$1},
	'draw': {value: draw$1}
});

var objects = {
  chart: chart,
  table: table,
  controls: controls
};

var chartCount = 0;

function createChart(element = 'body', config = {}, controls = null){

    let thisChart = Object.create(chart);

	thisChart.div = element;

	thisChart.config = Object.create(config);

	thisChart.controls = controls;

	thisChart.raw_data = [];

	thisChart.filters = [];

	thisChart.marks = [];

	thisChart.wrap = d3.select(thisChart.div).append('div');

	thisChart.events = {
		onInit(){},
		onLayout(){},
		onPreprocess(){},
		onDatatransform(){},
		onDraw(){},
		onResize(){}
	};
	
	thisChart.on = function(event, callback){
		let possible_events = ['init','layout', 'preprocess', 'datatransform', 'draw', 'resize'];
		if(possible_events.indexOf(event) < 0){
			return;
		}
		if(callback){
			thisChart.events['on'+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
		}
	};

	//increment thisChart count to get unique thisChart id
    chartCount++;

    thisChart.id = chartCount;

    return thisChart;
}

function createControls(element = 'body', config = {}){
    let thisControls = Object.create(controls);
    
    thisControls.div = element;

    thisControls.config = Object.create(config);
    thisControls.config.inputs = thisControls.config.inputs || [];

    thisControls.targets = [];

    if(config.location === 'bottom'){
        thisControls.wrap = d3.select(element).append('div').attr('class', 'wc-controls');
    }
	else{
	  	thisControls.wrap = d3.select(element).insert('div', ':first-child').attr('class', 'wc-controls');
    }

    return thisControls;
}

function createTable(element = 'body', config = {}, controls=null){
    let thisTable = Object.create(table);
    
	thisTable.div = element;
	
	thisTable.config = Object.create(config);
	
	thisTable.controls = controls;
	
	thisTable.filters = [];
	
	thisTable.required_cols = [];
	
	thisTable.marks = [];
	
	thisTable.wrap = d3.select(thisTable.div).append('div');
    
	thisTable.events = {
		onInit(){},
		onLayout(){},
		onDatatransform(){},
		onDraw(){},
		onResize(){}
	};
	
	thisTable.on = function(event, callback){
		let possible_events = ['init','layout', 'datatransform', 'draw', 'resize'];
		if(possible_events.indexOf(event) < 0){
			return;
		}
		if(callback){
			thisTable.events['on'+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
		}
	};

    return thisTable;
}

function multiply (chart, data, split_by, order){
  let config = chart.config;
  let wrap = chart.wrap.classed('wc-layout wc-small-multiples', true).classed('wc-chart', false);
  let master_legend = wrap.append('ul').attr('class', 'legend');

  function goAhead(data){
    let split_vals = d3.set(data.map(m => m[split_by])).values().filter(f => f);
    if(order){
      split_vals = split_vals.sort((a,b) => d3.ascending(order.indexOf(a), order.indexOf(b)) );
    }

    split_vals.forEach(e => {
      var mchart = createChart(chart.wrap.node(), config, chart.controls);
      mchart.events = chart.events;
      mchart.legend = master_legend;
      mchart.filters.unshift({col: split_by, val: e, choices: split_vals});
      mchart.wrap.insert('span', 'svg').attr('class', 'wc-chart-title').text(e);
      mchart.init(data);
    });
  }

  goAhead(data);
}

function lengthenRaw (data, columns){
  let my_data = [];

  data.forEach(e => {

    columns.forEach(g => {
      let obj = Object.create(e);
      obj.wc_category = g;
      obj.wc_value = e[g];
      my_data.push(obj);
    });

  });

  return my_data;
  
}

function getValType (data, variable){
	let var_vals = d3.set(data.map(m => m[variable])).values();
	let vals_numbers = var_vals.filter(f => +f || +f === 0 );

	if(var_vals.length === vals_numbers.length && var_vals.length > 4){
		return 'continuous';
	}
	else{
		return 'categorical';
	}
}

var dataOps = {
  getValType: getValType,
  lengthenRaw: lengthenRaw,
  naturalSorter: naturalSorter,
  summarize: summarize
};

var index = {
  version,
  dataOps,
  objects,
  createChart,
  createControls,
  createTable,
  multiply
};

export default index;