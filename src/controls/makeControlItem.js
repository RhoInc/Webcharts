export default function(control) {
    let control_wrap = this.wrap
        .append('div')
        .attr('class', 'control-group')
        .classed('inline', control.inline)
        .datum(control);
    let ctrl_label = control_wrap.append('span').attr('class', 'control-label').text(control.label);
    if (control.required) {
        ctrl_label.append('span').attr('class', 'label label-required').text('Required');
    }
    control_wrap.append('span').attr('class', 'span-description').text(control.description);

    if (control.type === 'text') {
        this.makeTextControl(control, control_wrap);
    } else if (control.type === 'number') {
        this.makeNumberControl(control, control_wrap);
    } else if (control.type === 'list') {
        this.makeListControl(control, control_wrap);
    } else if (control.type === 'dropdown') {
        this.makeDropdownControl(control, control_wrap);
    } else if (control.type === 'btngroup') {
        this.makeBtnGroupControl(control, control_wrap);
    } else if (control.type === 'checkbox') {
        this.makeCheckboxControl(control, control_wrap);
    } else if (control.type === 'radio') {
        this.makeRadioControl(control, control_wrap);
    } else if (control.type === 'subsetter') {
        this.makeSubsetterControl(control, control_wrap);
    } else {
        throw new Error(
            'Each control must have a type! Choose from: "text", "number", "list", "dropdown", "btngroup", "checkbox", "radio", "subsetter"'
        );
    }
}
