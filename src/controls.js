"use strict";

var controlsProto = {

		checkRequired: controlCheckRequired,
		controlUpdate: controlUpdate,
		init: controlInit,
		layout: controlLayout,
		makeControlItem: makeControlItem,
		makeBtnGroupControl: makeBtnGroupControl,
		makeCheckboxControl: makeCheckboxControl,
		makeDropdownControl: makeDropdownControl,
		makeListControl: makeListControl,
		makeNumberControl: makeNumberControl,
		makeRadioControl: makeRadioControl,
		makeSubsetterControl: makeSubsetterControl,
		makeTextControl: makeTextControl

};
'use strict';

function makeCheckboxControl(control, control_wrap) {
  var targets = this.targets;
  var changer = control_wrap.append('input').attr('type', 'checkbox').attr('class', 'changer').datum(control);

  targets.forEach(function (e) {
    if (e.config[control.option]) changer.property('checked', e.config[control.option]);
  });

  changer.on('change', function (d) {
    var value = changer.property('checked');
    console.log(value);
    targets.forEach(function (e) {
      e.config[d.option] = value;
      e.draw();
    });
  });
}
"use strict";

function controlInit(raw) {
  this.data = raw;
  if (!this.config.builder) this.checkRequired(this.data);
  this.layout();
  this.ready = true;
}
/**The base controls object.
	*@alias module:webCharts.controls
	*@param {string} element - CSS selector identifying the element in which to create the chart.
	*@param {string} data - path to the file containing data for the chart. Expected to be a text file of comma-separated values.
	*@param {Object} config - the configuration object specifying all options for how the chart is to appear and behave.
*/
'use strict';

webCharts.controls = function () {
	var element = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
	var data = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	var defaults = arguments.length <= 3 || arguments[3] === undefined ? { resizable: true, max_width: 800 } : arguments[3];

	var controls = Object.create(controlsProto);

	controls.div = element;
	controls.data = data;
	controls.config = Object.create(config);
	controls.config.inputs = controls.config.inputs || [];
	controls.targets = [];

	if (config.location === 'top') controls.wrap = d3.select(element).insert('div', ':first-child').attr('class', 'wc-controls top');else controls.wrap = d3.select(element).append('div').attr('class', 'wc-controls ' + controls.config.location);

	return controls;
};
'use strict';

function controlCheckRequired(dataset) {
  var _this = this;

  var colnames = d3.keys(dataset[0]);
  console.log('line 5??');
  if (!this.config.inputs) return;
  this.config.inputs.forEach(function (e, i) {
    if (e.type === 'subsetter' && colnames.indexOf(e.value_col) === -1) {
      _this.config.inputs = _this.config.inputs.splice(controls[i], 1);
      throw new Error('Error in settings object: the value "' + e.value_col + '" does not match any column in the provided dataset.');
    }
  });
}
'use strict';

function makeControlItem(control) {
  var control_wrap = this.wrap.append('div').attr('class', 'control-group').classed('inline', control.inline).datum(control);
  var ctrl_label = control_wrap.append('span').attr('class', 'control-label').text(control.label);
  if (control.required) ctrl_label.append('span').attr('class', 'label label-required').text('Required');
  control_wrap.append('span').attr('class', 'span-description').text(control.description);

  if (control.type === 'text') this.makeTextControl(control, control_wrap);else if (control.type === 'number') this.makeNumberControl(control, control_wrap);else if (control.type === 'list') this.makeListControl(control, control_wrap);else if (control.type === 'dropdown') this.makeDropdownControl(control, control_wrap);else if (control.type === 'btngroup') this.makeBtnGroupControl(control, control_wrap);else if (control.type === 'checkbox') this.makeCheckboxControl(control, control_wrap);else if (control.type === 'radio') this.makeRadioControl(control, control_wrap);else if (control.type === 'subsetter') this.makeSubsetterControl(control, control_wrap);else throw new Error('Each control must have a type! Choose from: "text", "number", "list", "dropdown", "btngroup", "checkbox", "radio", "subsetter"');
}
'use strict';

function makeTextControl(control, control_wrap) {
  var targets = this.targets;
  var changer = control_wrap.append('input').attr('type', 'text').attr('class', 'changer').datum(control);

  targets.forEach(function (e) {
    if (e.config[control.option]) changer.property('value', e.config[control.option]);
  });

  changer.on('change', function (d) {
    var value = d3.select(this).property('value');
    targets.forEach(function (e) {
      if (!e.config[d.option]) e.config[d.option] = {};
      e.config[d.option] = value;
      e.draw();
    });
  });
}
'use strict';

function makeListControl(control, control_wrap) {
  var targets = this.targets;
  var changer = control_wrap.append('input').attr('type', 'text').attr('class', 'changer').datum(control);

  targets.forEach(function (e) {
    if (e.config[control.option]) changer.property('value', e.config[control.option]);
  });

  changer.on('change', function (d) {
    var value = d3.select(this).property('value') ? d3.select(this).property('value').split(',').map(function (m) {
      return m.trim();
    }) : null;
    targets.forEach(function (e) {
      if (!e.config[d.option]) e.config[d.option] = {};
      e.config[d.option] = value;
      e.draw();
    });
  });
}
'use strict';

function makeNumberControl(control, control_wrap) {
  var targets = this.targets;
  var changer = control_wrap.append('input').attr('type', 'number').attr('min', '0').attr('step', control.step || 1).attr('class', 'changer').datum(control);

  var partial = control.option.indexOf('.') !== -1;
  var option_name = partial ? control.option.split('.')[0] : control.option;

  targets.forEach(function (e) {
    if (e.config[option_name]) changer.property('value', +e.config[option_name]);
  });

  changer.on('change', function (d) {
    var value = +d3.select(this).property('value');
    targets.forEach(function (e) {
      if (!e.config[option_name]) e.config[option_name] = {};
      if (partial) e.config[option_name][control.option.split('.')[1]] = value;else e.config[option_name] = value;
      e.draw();
    });
  });
}
'use strict';

function makeDropdownControl(control, control_wrap) {
  var targets = this.targets;
  var partial = control.option.indexOf('.') !== -1;
  var option_name = partial ? control.option.split('.')[0] : control.option;
  var changer = control_wrap.append('select').attr('class', 'changer').attr('multiple', control.multiple ? true : null).datum(control);

  var opt_values = control.values ? control.values instanceof Array ? control.values : d3.set(context.data.map(function (m) {
    return m[context.targets[0].config[control.values]];
  })).values() : null;

  var option_data = opt_values ? opt_values.map(function (m) {
    return { label: m };
  }) : d3.keys(context.data[0]).map(function (m) {
    return { label: m };
  });

  if (!control.require || control.none) option_data.unshift({ label: 'None' });

  var options = changer.selectAll('option').data(option_data).enter().append('option').text(function (d) {
    return d.label;
  });

  targets.forEach(function (e) {
    if (e.config[option_name]) changer.property('value', partial ? e.config[option_name][control.option.split('.')[1]] : e.config[option_name]);else changer.property('value', control.require ? '' : 'None');
  });

  changer.on('change', function (d) {
    var value = d3.select(this).property('value');
    var values = undefined;
    if (control.multiple) {
      values = options.filter(function (f) {
        return d3.select(this).property('selected');
      })[0].map(function (m) {
        return d3.select(m).property('value');
      }).filter(function (f) {
        return f !== 'None';
      });
    }

    value = value === 'None' ? null : value;

    targets.forEach(function (e) {
      if (!e.config[option_name]) e.config[option_name] = control.multiple ? [] : {};
      if (partial) {
        if (control.multiple) e.config[option_name][control.option.split('.')[1]] = values;else e.config[option_name][control.option.split('.')[1]] = value;
      } else e.config[option_name] = control.multiple ? values : value;
      e.draw();
    });
  });

  return changer;
}
'use strict';

function makeBtnGroupControl(control, control_wrap) {
  var targets = this.targets;
  var partial = control.option.indexOf('.') !== -1;
  var option_name = partial ? control.option.split('.')[0] : control.option;
  var option_data = control.values ? control.values : d3.keys(context.data[0]).map(function (m) {
    return { label: m, val: m };
  });

  var btn_wrap = control_wrap.append('div').attr('class', 'btn-group');

  var changers = btn_wrap.selectAll('button').data(option_data).enter().append('button').attr('class', 'btn btn-default btn-sm').text(function (d) {
    return d.label;
  });

  targets.forEach(function (e) {
    changers.classed('btn-primary', function (d) {
      return d.selected || e.config[option_name] && e.config[option_name] === d.val ? true : false;
    });
  });

  changers.on('click', function (d) {
    changers.classed('btn-primary', false);
    d3.select(this).classed('btn-primary', true);
    var value = d.val;
    var datum = btn_wrap.datum();
    targets.forEach(function (e) {
      if (!e.config[datum.option]) e.config[datum.option] = {};
      e.config[datum.option] = value;
      e.draw();
    });
  });
}
"use strict";
'use strict';

function makeRadioControl(control, control_wrap) {
  var targets = this.targets;
  var partial = control.option.indexOf('.') !== -1;
  var option_name = partial ? control.option.split('.')[0] : control.option;
  var changers = control_wrap.selectAll('label').data(control.values).enter().append('label').attr('class', 'radio').text(function (d, i) {
    return control.relabels ? control.relabels[i] : d;
  }).append('input').attr('type', 'radio').attr('class', 'changer').attr('name', option_name + '-' + Math.random()).property('value', function (d) {
    return d;
  }).property('checked', function (d) {
    if (partial) return targets[0].config[option_name] && targets[0].config[option_name][control.option.split('.')[1]] && targets[0].config[option_name][control.option.split('.')[1]] === d ? true : false;else return targets[0].config[option_name] && targets[0].config[option_name] === d ? true : false;
  });

  targets.forEach(function (e) {
    if (!e.config[option_name] && partial) e.config[option_name] = {};
  });

  changers.on('change', function (d) {
    var value = null;
    changers.each(function (c) {
      if (d3.select(this).property('checked')) value = d3.select(this).property('value') === 'none' ? null : c;
    });
    targets.forEach(function (e) {
      if (partial) e.config[option_name][control.option.split('.')[1]] = value;else e.config[option_name] = value;
      e.draw();
    });
  });
}
'use strict';

function makeSubsetterControl(control, control_wrap) {
  var targets = this.targets;
  var changer = control_wrap.append('select').attr('class', 'changer').attr('multiple', control.multiple ? true : null).datum(control);

  var option_data = control.values ? control.values : d3.set(this.data.map(function (m) {
    return m[control.value_col];
  }).filter(function (f) {
    return f;
  })).values();
  option_data.sort(d3.ascending);

  control.start = control.start ? control.start : control.loose ? option_data[0] : null;

  if (!control.multiple && !control.start) option_data.unshift('All');

  control.loose = !control.loose && control.start ? true : control.loose;

  var options = changer.selectAll('option').data(option_data).enter().append('option').text(function (d) {
    return d;
  }).property('selected', function (d) {
    return d === control.start;
  });

  targets.forEach(function (e) {
    var match = e.filters.slice().map(function (m) {
      return m.col === control.value_col;
    }).indexOf(true);
    if (match > -1) e.filters[match] = { col: control.value_col, val: control.start ? control.start : 'All', choices: option_data, loose: control.loose };else e.filters.push({ col: control.value_col, val: control.start ? control.start : 'All', choices: option_data, loose: control.loose });
  });

  function setSubsetter(target, obj) {
    var match = -1;
    target.filters.forEach(function (e, i) {
      if (e.col === obj.col) match = i;
    });
    if (match > -1) target.filters[match] = obj;
  }

  changer.on('change', function (d) {
    var _this = this;

    if (control.multiple) {
      (function () {
        var values = options.filter(function (f) {
          return d3.select(this).property('selected');
        })[0].map(function (m) {
          return d3.select(m).property('value');
        });

        var new_filter = { col: control.value_col, val: values, choices: option_data, loose: control.loose };
        targets.forEach(function (e) {
          setSubsetter(e, new_filter);
          e.draw();
        });
      })();
    } else {
      (function () {
        var value = d3.select(_this).property('value');
        var new_filter = { col: control.value_col, val: value, choices: option_data, loose: control.loose };
        targets.forEach(function (e) {
          setSubsetter(e, new_filter);
          e.draw();
        });
      })();
    }
  });
}
"use strict";

function controlUpdate() {
  var _this = this;

  if (this.config.inputs && this.config.inputs.length && this.config.inputs[0]) this.config.inputs.forEach(function (e) {
    return _this.makeControlItem(e);
  });
}
'use strict';

function controlLayout() {
    this.wrap.selectAll('*').remove();
    this.controlUpdate();
}