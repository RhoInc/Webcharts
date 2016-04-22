export default function makeControlItem(control) {
  const controlWrap = this.wrap.append('div')
    .attr('class', 'control-group')
    .classed('inline', control.inline)
    .datum(control);
  const controlLabel = controlWrap.append('span').attr('class', 'control-label').text(control.label);
  if (control.required) {
    controlLabel.append('span').attr('class', 'label label-required').text('Required');
  }
  controlWrap.append('span').attr('class', 'span-description').text(control.description);

  if (control.type === 'text') {
    this.makeTextControl(control, controlWrap);
  }
  else if (control.type === 'number') {
    this.makeNumberControl(control, controlWrap);
  }
  else if (control.type === 'list') {
    this.makeListControl(control, controlWrap);
  }
  else if (control.type === 'dropdown') {
    this.makeDropdownControl(control, controlWrap);
  }
  else if (control.type === 'btngroup') {
    this.makeBtnGroupControl(control, controlWrap);
  }
  else if (control.type === 'checkbox') {
    this.makeCheckboxControl(control, controlWrap);
  }
  else if (control.type === 'radio') {
    this.makeRadioControl(control, controlWrap);
  }
  else if (control.type === 'subsetter') {
    this.makeSubsetterControl(control, controlWrap);
  }
 else {
    throw new Error(`Each control must have a type! Choose from: "text", "number",
     "list", "dropdown", "btngroup", "checkbox", "radio", "subsetter"`);
  }
}
