import { select, keys } from 'd3';
import stringAccessor from '../util/stringAccessor';

export default function makeBtnGroupControl(control, controlWrap) {
  const optionData = control.values ? control.values : keys(this.data[0]);

  const btnWrap = controlWrap.append('div').attr('class', 'btn-group');

  const changers = btnWrap.selectAll('button')
    .data(optionData)
    .enter().append('button')
    .attr('class', 'btn btn-default btn-sm')
    .text(d => d)
    .classed('btn-primary', d =>
      stringAccessor(this.targets[0].config, control.option) === d
    );

  changers.on('click', d => {
    changers.each(function toggleClass(e) {
      select(this).classed('btn-primary', e === d);
    });
    this.changeOption(control.option, d, control.callback);
  });
}
