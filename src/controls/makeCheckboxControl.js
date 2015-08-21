export function makeCheckboxControl(control, control_wrap){
  let changer = control_wrap.append('input')
    .attr('type', 'checkbox')
    .attr('class', 'changer')
    .datum(control)
    .property('checked', d => {
      return this.stringAccessor(this.targets[0].config, control.option);
    });

  changer.on('change', d => {
  	let value = changer.property('checked');
    this.changeOption(d.option, value);
  });

}
