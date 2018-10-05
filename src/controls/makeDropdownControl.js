import { set, keys, select } from 'd3';

export default function makeDropdownControl(control, control_wrap) {
    let mainOption = control.option || control.options[0];
    let changer = control_wrap
        .append('select')
        .attr('class', 'changer')
        .attr('multiple', control.multiple ? true : null)
        .datum(control);

    let opt_values = control.values && control.values instanceof Array
        ? control.values
        : control.values
          ? set(this.data.map(m => m[this.targets[0].config[control.values]])).values()
          : keys(this.data[0]);

    if (!control.require || control.none) {
        opt_values.unshift('None');
    }

    let options = changer
        .selectAll('option')
        .data(opt_values)
        .enter()
        .append('option')
        .text(d => d)
        .property('selected', d => {
            return this.stringAccessor(this.targets[0].config, mainOption) === d;
        });

    changer.on('change', d => {
        let value = changer.property('value') === 'None' ? null : changer.property('value');

        if (control.multiple) {
            value = options
                .filter(function(f) {
                    return select(this).property('selected');
                })[0]
                .map(m => select(m).property('value'))
                .filter(f => f !== 'None');
        }

        if (control.options) {
            this.changeOption(control.options, value, control.callback, control.draw);
        } else {
            this.changeOption(control.option, value, control.callback, control.draw);
        }
    });

    return changer;
}
