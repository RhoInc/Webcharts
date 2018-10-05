export default function makeControlItem(control) {
    const control_wrap = this.wrap
        .append('div')
        .attr('class', 'control-group')
        .classed('inline', control.inline)
        .datum(control);

    //Add control label span.
    const ctrl_label = control_wrap
        .append('span')
        .attr('class', 'wc-control-label')
        .text(control.label);

    //Add control _Required_ text to control label span.
    if (control.required)
        ctrl_label.append('span').attr('class', 'label label-required').text('Required');

    //Add control description span.
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
            'Each control must have a type! Choose from: "text", "number", "list", "dropdown", "btngroup", "checkbox", "radio", or "subsetter".'
        );
    }
}
