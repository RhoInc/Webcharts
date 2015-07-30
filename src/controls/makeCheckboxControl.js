export function makeCheckboxControl(control, control_wrap){
  let changer = control_wrap.append('input')
    .attr('type', 'checkbox')
    .attr('class', 'changer')
    .datum(control)
    .property('checked', d => {
      if(control.option.indexOf('.') !== -1)
        return this.targets[0].config[control.option.split('.')[0]][control.option.split('.')[1]];
      else
        return this.targets[0].config[control.option];
    });

  changer.on('change', d => {
  	let value = changer.property('checked');
    this.changeOption(d.option, value);
  });

}
