import { set, select } from 'd3';
import naturalSorter from '../util/naturalSorter';

export default function makeSubsetterControl(control, controlWrap) {
  const targets = this.targets;
  const changer = controlWrap.append('select')
    .attr('class', 'WebchartsControlGroup__Control')
    .attr('multiple', control.multiple ? true : null)
    .datum(control);

  const optionData = control.values ? control.values :
    set(this.data.map(m => m[control.value_col]).filter(f => f)).values();
  optionData.sort(naturalSorter);

  control.start = control.start ? control.start : control.loose ? optionData[0] : null;

  if (!control.multiple && !control.start) {
    optionData.unshift('All');
  }

  control.loose = !control.loose && control.start ? true : control.loose;

  const options = changer.selectAll('option').data(optionData)
    .enter().append('option')
    .text(d => d)
    .property('selected', d => d === control.start);

  targets.forEach(e => {
    const match = e.filters.slice().map(m => m.col === control.value_col).indexOf(true);
    if (match > -1) {
      e.filters[match] = { col: control.value_col, val: control.start ? control.start : 'All', choices: optionData, loose: control.loose };
    }
    else {
      e.filters.push({ col: control.value_col, val: control.start ? control.start : 'All', choices: optionData, loose: control.loose });
    }
  });

  function setSubsetter(target, obj) {
    let match = -1;
    target.filters.forEach((e, i) => {
      if (e.col === obj.col) {
        match = i;
      }
    });
    if (match > -1) {
      target.filters[match] = obj;
    }
  }

  changer.on('change', function subsetChange() {
    if (control.multiple) {
      const values = options.filter(function filterSelected() {
        return select(this).property('selected');
      })[0]
      .map(m => select(m).property('text'));

      const newFilter = { col: control.value_col, val: values, choices: optionData, loose: control.loose };
      targets.forEach(e => {
        setSubsetter(e, newFilter);
        // call callback function if provided
        if (control.callback) {
          control.callback();
        }
        e.draw();
      });
    }
    else {
      const value = select(this).select('option:checked').property('text');
      const newFilter = { col: control.value_col, val: value, choices: optionData, loose: control.loose };
      targets.forEach(e => {
        setSubsetter(e, newFilter);
        // call callback function if provided
        if (control.callback) {
          control.callback();
        }
        e.draw();
      });
    }
  });
}
