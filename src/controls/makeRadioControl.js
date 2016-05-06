import { keys, select } from 'd3';
import stringAccessor from '../util/stringAccessor';

export default function makeRadioControl(control, controlWrap) {
  const changers = controlWrap.selectAll('label')
    .data(control.values || keys(this.data[0]))
    .enter().append('label')
      .attr('class', 'WebchartsControlGroup__Label WebchartsControlGroup__Label--radio')
      .text((d, i) => control.relabels ? control.relabels[i] : d)
  .append('input')
      .attr('type', 'radio')
      .attr('class', 'WebchartsControlGroup__Control')
      .attr('name', `${control.option.replace('.', '-')}-${this.targets[0].id}`)
      .property('value', d => d)
      .property('checked', d =>
        stringAccessor(this.targets[0].config, control.option) === d
      );

  changers.on('change', () => {
    let value = null;
    changers.each(function isChecked(c) {
      if (select(this).property('checked')) {
        value = select(this).property('value') === 'none' ? null : c;
      }
    });
    if (control.options) {
      this.changeOption(control.options, value, control.callback);
    }
    else {
      this.changeOption(control.option, value, control.callback);
    }
  });
}
