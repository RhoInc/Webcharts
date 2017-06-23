export default function makeListControl(control, control_wrap) {
    let changer = control_wrap
        .append('input')
        .attr('type', 'text')
        .attr('class', 'changer')
        .datum(control)
        .property('value', d => {
            return this.stringAccessor(this.targets[0].config, control.option);
        });

    changer.on('change', d => {
        let value = changer.property('value')
            ? changer.property('value').split(',').map(m => m.trim())
            : null;
        this.changeOption(control.option, value, control.callback);
    });
}
