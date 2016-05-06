import { select, keys } from 'd3';
import stringAccessor from '../util/stringAccessor';

export default function makeBtnGroupControl(control, controlWrap) {
  const optionData = control.values ? control.values : keys(this.data[0]);

  const btnWrap = controlWrap.append('div')
    .attr('class', 'WebchartsControlGroup__ButtonGroup WebchartsButtonGroup btn-group');

  const changers = btnWrap.selectAll('button')
    .data(optionData)
    .enter().append('button')
    .attr('class', 'WebchartsButtonGroup__Button')
    .text(d => d)
    .classed('WebchartsButtonGroup__Button--active', d =>
      stringAccessor(this.targets[0].config, control.option) === d
    );

  changers.on('click', d => {
    changers.each(function toggleClass(e) {
      select(this).classed('WebchartsButtonGroup__Button--active', e === d);
    });
    if (control.options) {
      this.changeOption(control.options, d, control.callback);
    }
    else {
      this.changeOption(control.option, d, control.callback);
    }
  });
}
