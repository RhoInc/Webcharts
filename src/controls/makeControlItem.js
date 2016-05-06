export default function makeControlItem(control) {
  const controlWrap = this.wrap.append('div')
    .attr('class', `WebchartsControlGroup WebchartsControlGroup--${control.type}`)
    .classed('WebchartsControlGroup--inline', control.inline)
    .datum(control);
  controlWrap.append('span')
    .attr('class', 'WebchartsControlGroup__Title')
    .text(control.label);

  controlWrap.append('span')
    .attr('class', 'WebchartsControlGroup__Description')
    .text(control.description);

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
