import { keys, select } from 'd3';

export default function makeBtnGroupControl(control, control_wrap) {
    let option_data = control.values ? control.values : keys(this.data[0]);

    let btn_wrap = control_wrap.append('div').attr('class', 'btn-group');

    let changers = btn_wrap
        .selectAll('button')
        .data(option_data)
        .enter()
        .append('button')
        .attr('class', 'btn btn-default btn-sm')
        .text(d => d)
        .classed('btn-primary', d => {
            return this.stringAccessor(this.targets[0].config, control.option) === d;
        });

    changers.on('click', d => {
        changers.each(function(e) {
            select(this).classed('btn-primary', e === d);
        });
        this.changeOption(control.option, d, control.callback, control.draw);
    });
}
