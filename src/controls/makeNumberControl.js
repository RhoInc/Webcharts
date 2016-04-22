import stringAccessor from '../util/stringAccessor';

export default function makeNumberControl(control, controlWrap) {
  const changer = controlWrap.append('input')
    .attr('type', 'number')
    .attr('min', control.min !== undefined ? control.min : 0)
    .attr('max', control.max)
    .attr('step', control.step || 1)
    .attr('class', 'changer')
    .datum(control)
    .property('value', () =>
      stringAccessor(this.targets[0].config, control.option)
    );

  changer.on('change', () => {
    const value = +changer.property('value');
    this.changeOption(control.option, value, control.callback);
  });
}
