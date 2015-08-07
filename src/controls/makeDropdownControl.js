/** Renders a <code>\<select\></code> element whose value is assigned to a given option
*@memberof controls
*@method makeDropdownControl
*@param {object} control an object describing the input from the <code>inputs</code> array from the config object
*@param {d3.selection} control_wrap the selected element in which to append the rendered input
*/
export function makeDropdownControl(control, control_wrap){
  let changer = control_wrap.append('select')
    .attr('class', 'changer')
  	.attr('multiple', control.multiple ? true : null)
    .datum(control);

  let opt_values = control.values && control.values instanceof Array ? control.values :
    	control.values ? d3.set(this.data.map(m => m[this.targets[0].config[control.values] ] )).values() :
      d3.keys(this.data[0]);

  if(!control.require || control.none)
  	opt_values.unshift('None');

  let options = changer.selectAll('option').data(opt_values)
    .enter().append('option')
    .text(d => d)
    .property('selected', d => {
      if(control.option.indexOf('.') !== -1)
        return this.targets[0].config[control.option.split('.')[0]][control.option.split('.')[1]] === d;
      else
        return this.targets[0].config[control.option] === d;
    });

  changer.on('change', d => {
  	let value = changer.property('value') === 'None' ? null : changer.property('value');

    if(control.multiple){
     	value = options.filter(function(f){return d3.select(this).property('selected'); })[0]
        .map(m => d3.select(m).property('value') )
        .filter(f => f !== 'None');
    }

    this.changeOption(control.option, value);

  });

  return changer;
}
