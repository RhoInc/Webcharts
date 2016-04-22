import { set, keys, select } from 'd3';
import stringAccessor from '../util/stringAccessor';

export default function (control, controlWrap) {
  const mainOption = control.option || control.options[0];
  const changer = controlWrap.append('select')
    .attr('class', 'changer')
    .attr('multiple', control.multiple ? true : null)
    .datum(control);

  const optionValues = control.values && control.values instanceof Array ? control.values :
      control.values ? set(this.data.map(m => m[this.targets[0].config[control.values]])).values() :
      keys(this.data[0]);

  if (!control.require || control.none) {
    optionValues.unshift('None');
  }

  const options = changer.selectAll('option').data(optionValues)
    .enter().append('option')
    .text(d => d)
    .property('selected', d =>
      stringAccessor(this.targets[0].config, mainOption) === d
    );

  changer.on('change', () => {
    let value = changer.property('value') === 'None' ? null : changer.property('value');

    if (control.multiple) {
      value = options.filter(function isSelected() {
        return select(this).property('selected');
      })[0]
        .map(m => select(m).property('value'))
        .filter(f => f !== 'None');
    }

    if (control.options) {
      this.changeOption(control.options, value, control.callback);
    }
    else {
      this.changeOption(control.option, value, control.callback);
    }
  });

  return changer;
}
