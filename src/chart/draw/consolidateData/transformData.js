import cleanData from './transformData/cleanData';
import makeNest from './transformData/makeNest';
import { set, extent, merge } from 'd3';

//////////////////////////////////////////////////////////
// transformData(raw, mark) provides specifications and data for
// each set of marks. As such, it is called once for each
// item specified in the config.marks array.
//
// parameters
// raw - the raw data for use in the mark. Filters from controls
//       are typically already applied.
// mark - a single mark object from config.marks
////////////////////////////////////////////////////////

export default function transformData(raw, mark) {
    //convenience mappings
    const config = this.config;
    const x_behavior = config.x.behavior || 'raw';
    const y_behavior = config.y.behavior || 'raw';
    const sublevel =
        mark.type === 'line'
            ? config.x.column
            : mark.type === 'bar' && mark.split
            ? mark.split
            : null;

    //////////////////////////////////////////////////////////////////////////////////
    // DATA PREP
    // prepare data based on the properties of the mark - drop missing records, etc
    //////////////////////////////////////////////////////////////////////////////////
    const cleaned = cleanData.call(this, mark, raw);

    //prepare nested data required for bar charts
    let raw_nest;
    if (mark.type === 'bar') {
        raw_nest =
            mark.arrange !== 'stacked'
                ? makeNest.call(this, mark, cleaned, sublevel)
                : makeNest.call(this, mark, cleaned);
    } else if (mark.summarizeX === 'count' || mark.summarizeY === 'count') {
        raw_nest = makeNest.call(this, mark, cleaned);
    }

    // Get the domain for the mark based on the raw data
    let raw_dom_x =
        mark.summarizeX === 'cumulative'
            ? [0, cleaned.length]
            : config.x.type === 'ordinal'
            ? set(cleaned.map(m => m[config.x.column]))
                  .values()
                  .filter(f => f)
            : mark.split && mark.arrange !== 'stacked'
            ? extent(merge(raw_nest.nested.map(m => m.values.map(p => p.values.raw.length))))
            : mark.summarizeX === 'count'
            ? extent(raw_nest.nested.map(m => m.values.raw.length))
            : extent(cleaned.map(m => +m[config.x.column]).filter(f => +f || +f === 0));

    let raw_dom_y =
        mark.summarizeY === 'cumulative'
            ? [0, cleaned.length]
            : config.y.type === 'ordinal'
            ? set(cleaned.map(m => m[config.y.column]))
                  .values()
                  .filter(f => f)
            : mark.split && mark.arrange !== 'stacked'
            ? extent(merge(raw_nest.nested.map(m => m.values.map(p => p.values.raw.length))))
            : mark.summarizeY === 'count'
            ? extent(raw_nest.nested.map(m => m.values.raw.length))
            : extent(cleaned.map(m => +m[config.y.column]).filter(f => +f || +f === 0));

    let filtered = cleaned;

    let filt1_xs = [];
    let filt1_ys = [];
    if (this.filters.length) {
        this.filters.forEach(e => {
            filtered = filtered.filter(d => {
                return e.all === true && e.index === 0
                    ? d
                    : e.val instanceof Array
                    ? e.val.indexOf(d[e.col]) > -1
                    : d[e.col] + '' === e.val.toString() + '';
            });
        });
        //get domain for all non-All values of first filter
        if (config.x.behavior === 'firstfilter' || config.y.behavior === 'firstfilter') {
            this.filters[0].choices
                .filter(f => f !== 'All')
                .forEach(e => {
                    let perfilter = cleaned.filter(f => f[this.filters[0].col] === e);
                    let filt_nested = makeNest.call(this, mark, perfilter, sublevel);
                    filt1_xs.push(filt_nested.dom_x);
                    filt1_ys.push(filt_nested.dom_y);
                });
        }
    }

    //filter on mark-specific instructions
    if (mark.values) {
        for (let a in mark.values) {
            filtered = filtered.filter(f => {
                return mark.values[a].indexOf(f[a]) > -1;
            });
        }
    }
    let filt1_dom_x = extent(merge(filt1_xs));
    let filt1_dom_y = extent(merge(filt1_ys));

    // why are we calling makeNest twice?
    let current_nested = makeNest.call(this, mark, filtered, sublevel);

    let flex_dom_x = current_nested.dom_x;
    let flex_dom_y = current_nested.dom_y;

    if (mark.type === 'bar') {
        if (config.y.type === 'ordinal' && mark.summarizeX === 'count') {
            config.x.domain = config.x.domain ? [0, config.x.domain[1]] : [0, null];
        } else if (config.x.type === 'ordinal' && mark.summarizeY === 'count') {
            config.y.domain = config.y.domain ? [0, config.y.domain[1]] : [0, null];
        }
    }

    //several criteria must be met in order to use the 'firstfilter' domain
    let nonall = Boolean(
        this.filters.length &&
            this.filters[0].val !== 'All' &&
            this.filters.slice(1).filter(f => f.val === 'All').length === this.filters.length - 1
    );

    let pre_x_dom = !this.filters.length
        ? flex_dom_x
        : x_behavior === 'raw'
        ? raw_dom_x
        : nonall && x_behavior === 'firstfilter'
        ? filt1_dom_x
        : flex_dom_x;
    let pre_y_dom = !this.filters.length
        ? flex_dom_y
        : y_behavior === 'raw'
        ? raw_dom_y
        : nonall && y_behavior === 'firstfilter'
        ? filt1_dom_y
        : flex_dom_y;

    let x_dom = config.x_dom
        ? config.x_dom
        : config.x.type === 'ordinal' && config.x.behavior === 'flex'
        ? set(filtered.map(m => m[config.x.column])).values()
        : config.x.type === 'ordinal'
        ? set(cleaned.map(m => m[config.x.column])).values()
        : pre_x_dom;

    let y_dom = config.y_dom
        ? config.y_dom
        : config.y.type === 'ordinal' && config.y.behavior === 'flex'
        ? set(filtered.map(m => m[config.y.column])).values()
        : config.y.type === 'ordinal'
        ? set(cleaned.map(m => m[config.y.column])).values()
        : pre_y_dom;

    //set lower limit of linear domain to 0 when other axis is ordinal and mark type is set to 'bar', provided no values are negative
    if (mark.type === 'bar') {
        if (
            config.x.behavior !== 'flex' &&
            config.x.type === 'linear' &&
            config.y.type === 'ordinal' &&
            raw_dom_x[0] >= 0
        )
            x_dom[0] = 0;

        if (
            config.y.behavior !== 'flex' &&
            config.x.type === 'ordinal' &&
            config.y.type === 'linear' &&
            raw_dom_y[0] >= 0
        )
            y_dom[0] = 0;
    }

    //update domains with those specified in the config
    if (
        config.x.domain &&
        (config.x.domain[0] || config.x.domain[0] === 0) &&
        !isNaN(+config.x.domain[0])
    ) {
        x_dom[0] = config.x.domain[0];
    }
    if (
        config.x.domain &&
        (config.x.domain[1] || config.x.domain[1] === 0) &&
        !isNaN(+config.x.domain[1])
    ) {
        x_dom[1] = config.x.domain[1];
    }
    if (
        config.y.domain &&
        (config.y.domain[0] || config.y.domain[0] === 0) &&
        !isNaN(+config.y.domain[0])
    ) {
        y_dom[0] = config.y.domain[0];
    }
    if (
        config.y.domain &&
        (config.y.domain[1] || config.y.domain[1] === 0) &&
        !isNaN(+config.y.domain[1])
    ) {
        y_dom[1] = config.y.domain[1];
    }

    if (config.x.type === 'ordinal' && !config.x.order) {
        x_dom.sort(
            (a, b) => current_nested.totalOrder.indexOf(a) - current_nested.totalOrder.indexOf(b)
        );
    }
    if (config.y.type === 'ordinal' && !config.y.order) {
        y_dom.sort(
            (a, b) => current_nested.totalOrder.indexOf(a) - current_nested.totalOrder.indexOf(b)
        );
    }

    this.current_data = current_nested.nested;

    this.events.onDatatransform.call(this);

    return { config: mark, data: current_nested.nested, x_dom: x_dom, y_dom: y_dom };
}
