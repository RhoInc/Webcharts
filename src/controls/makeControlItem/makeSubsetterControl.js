import naturalSorter from '../../dataOps/naturalSorter';
import { set, select } from 'd3';

export default function makeSubsetterControl(control, control_wrap) {
    const targets = this.targets; // associated charts and tables.

    //dropdown selection
    const changer = control_wrap
        .append('select')
        .classed('changer', true)
        .attr('multiple', control.multiple ? true : null)
        .datum(control);

    //dropdown option data
    const option_data = control.values
        ? control.values
        : set(this.data.map(m => m[control.value_col])) //.filter(f => f))
              .values()
              .sort(naturalSorter); // only sort when values are derived

    //initial dropdown option
    control.start = control.start ? control.start : control.loose ? option_data[0] : null;

    //conditionally add All option
    if (!control.multiple && !control.start) {
        option_data.unshift('All');
        control.all = true;
    } else {
        control.all = false;
    }

    //what does loose mean?
    control.loose = !control.loose && control.start ? true : control.loose;

    //dropdown options selection
    const options = changer
        .selectAll('option')
        .data(option_data)
        .enter()
        .append('option')
        .text(d => d)
        .property('selected', d => d === control.start);

    //define filter object for each associated target
    targets.forEach(e => {
        const match = e.filters
            .slice()
            .map(m => m.col === control.value_col)
            .indexOf(true);
        if (match > -1) {
            e.filters[match] = {
                col: control.value_col,
                val: control.start ? control.start : !control.multiple ? 'All' : option_data,
                index: 0,
                choices: option_data,
                loose: control.loose,
                all: control.all
            };
        } else {
            e.filters.push({
                col: control.value_col,
                val: control.start ? control.start : !control.multiple ? 'All' : option_data,
                index: 0,
                choices: option_data,
                loose: control.loose,
                all: control.all
            });
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

    //add event listener to control
    changer.on('change', function(d) {
        if (control.multiple) {
            let values = options
                .filter(function(f) {
                    return select(this).property('selected');
                })[0]
                .map(m => select(m).property('text'));

            let new_filter = {
                col: control.value_col,
                val: values,
                index: null, //  could specify an array of indices but seems like a waste of resources give it doesn't inform anything without an overall 'All'
                choices: option_data,
                loose: control.loose,
                all: control.all
            };
            targets.forEach(e => {
                setSubsetter(e, new_filter);
                //call callback function if provided
                if (control.callback) {
                    control.callback();
                }
                if (control.draw) e.draw();
            });
        } else {
            let value = select(this)
                .select('option:checked')
                .property('text');
            let index = select(this)
                .select('option:checked')
                .property('index');
            let new_filter = {
                col: control.value_col,
                val: value,
                index: index,
                choices: option_data,
                loose: control.loose,
                all: control.all
            };
            targets.forEach(e => {
                setSubsetter(e, new_filter);
                //call callback function if provided
                if (control.callback) {
                    control.callback();
                }
                e.draw();
            });
        }
    });
}
