/** Renders a <code>\<input type="number"\></code> element whose value is assigned to a given option
*@memberof controls
*@method makeNumberControl
*@param {object} control an object describing the input from the <code>inputs</code> array from the config object
*@param {d3.selection} control_wrap the selected element in which to append the rendered input
*/
export function makeNumberControl(control, control_wrap){
  let changer = control_wrap.append('input')
    .attr('type', 'number')
    .attr('min', control.min !== undefined ? control.min : 0)
    .attr('max', control.max)
    .attr('step', control.step || 1)
    .attr('class', 'changer')
    .datum(control)
    .property('value', d => {
      if(control.option.indexOf('.') !== -1)
        return this.targets[0].config[control.option.split('.')[0]][control.option.split('.')[1]];
      else
        return this.targets[0].config[control.option];
    });

  changer.on('change', d => {
  	let value = +changer.property('value');
    this.changeOption(control.option, value);
  });

}
