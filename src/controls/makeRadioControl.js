/** Renders a set of radio buttons that toggles the value assigned to a given option
*@memberof controls
*@method makeRadioControl
*@param {object} control an object describing the input from the <code>inputs</code> array from the config object
*@param {d3.selection} control_wrap the selected element in which to append the rendered input
*/
export function makeRadioControl(control, control_wrap){
  let changers = control_wrap.selectAll('label')
  	.data(control.values)
  	.enter().append('label')
    .attr('class', 'radio')
    .text((d,i) => control.relabels ? control.relabels[i] : d)
  .append('input')
    	.attr('type', 'radio')
      .attr('class', 'changer')
    	.attr('name', control.option.replace('.', '-')+'-'+this.targets[0].id)
      .property('value', d => d)
      .property('checked', d => {
        if(control.option.indexOf('.') !== -1)
          return this.targets[0].config[control.option.split('.')[0]][control.option.split('.')[1]] === d;
        else
          return this.targets[0].config[control.option] === d;
      });

  changers.on('change', d => {
  	let value = null;
  	changers.each(function(c){
     	if(d3.select(this).property('checked'))
        	value = d3.select(this).property('value') === 'none' ? null : c;
    });
    this.changeOption(control.option, value);
  });

}
