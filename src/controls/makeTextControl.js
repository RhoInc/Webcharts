import stringAccessor from '../util/stringAccessor';

export default function (control, controlWrap) {
  const changer = controlWrap.append('input')
    .attr('type', 'text')
    .attr('class', 'changer')
    .datum(control)
    .property('value', () =>
      stringAccessor(this.targets[0].config, control.option)
    );

  changer.on('change', () => {
    const value = changer.property('value');
    this.changeOption(control.option, value, control.callback);
  });
}
