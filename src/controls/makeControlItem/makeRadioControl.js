import { keys, select } from 'd3';

export default function makeRadioControl(control, control_wrap) {
    let changers = control_wrap
        .selectAll('label')
        .data(control.values || keys(this.data[0]))
        .enter()
        .append('label')
        .attr('class', 'radio')
        .text((d, i) => (control.relabels ? control.relabels[i] : d))
        .append('input')
        .attr('type', 'radio')
        .attr('class', 'changer')
        .attr('name', control.option.replace('.', '-') + '-' + this.targets[0].id)
        .property('value', d => d)
        .property('checked', d => {
            return this.stringAccessor(this.targets[0].config, control.option) === d;
        });

    changers.on('change', d => {
        let value = null;
        changers.each(function(c) {
            if (select(this).property('checked')) {
                value = select(this).property('value') === 'none' ? null : c;
            }
        });
        this.changeOption(control.option, value, control.callback, control.draw);
    });
}
