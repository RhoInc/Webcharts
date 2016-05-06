import stringAccessor from '../util/stringAccessor';

export default function (control, controlWrap) {
  const changer = controlWrap.append('input')
    .attr('type', 'text')
    .attr('class', 'WebchartsControlGroup__Control')
    .datum(control)
    .property('value', () =>
      stringAccessor(this.targets[0].config, control.option)
    );

  changer.on('change', () => {
    const value = changer.property('value');
    if (control.options) {
      this.changeOption(control.options, value, control.callback);
    }
    else {
      this.changeOption(control.option, value, control.callback);
    }
  });
}
