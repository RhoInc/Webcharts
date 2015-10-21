export default function (control, control_wrap){
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
    this.changeOption(control.option, value);
  });

}
