export default function (control, control_wrap){
  let targets = this.targets;
 	let changer = control_wrap.append('select')
    .attr('class', 'changer')
    .attr('multiple', control.multiple ? true : null)
    .datum(control);

  let option_data = control.values ? control.values :
  	d3.set(this.data.map(m => m[control.value_col]).filter(f => f) ).values();
  option_data.sort(webCharts.dataOps.naturalSorter);

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
        e.draw();
      });
    }
    else{
      let value = d3.select(this).select("option:checked").property('text');
      let new_filter = {col: control.value_col, val: value, choices: option_data, loose: control.loose};
      targets.forEach(e => {
        setSubsetter(e, new_filter);
        e.draw();
      });
    }
  });

}
