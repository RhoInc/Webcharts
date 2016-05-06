import stringAccessor from '../util/stringAccessor';

export default function makeCheckboxControl(control, controlWrap) {
  const changer = controlWrap.append('input')
    .attr('type', 'checkbox')
    .attr('class', 'changer')
    .datum(control)
    .property('checked', () =>
      stringAccessor(this.targets[0].config, control.option)
    );

  changer.on('change', d => {
    const value = changer.property('checked');
    if (d.options) {
      this.changeOption(d.options, value, control.callback);
    }
    else {
      this.changeOption(d.option, value, control.callback);
    }
  });
}
