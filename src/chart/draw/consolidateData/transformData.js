import makeNest from './transformData/makeNest';
import { time, set, extent, merge } from 'd3';

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
    let config = this.config;
    let x_behavior = config.x.behavior || 'raw';
    let y_behavior = config.y.behavior || 'raw';
    let sublevel = mark.type === 'line'
        ? config.x.column
        : mark.type === 'bar' && mark.split ? mark.split : null;
    let dateConvert = time.format(config.date_format);
    let totalOrder;

    //////////////////////////////////////////////////////////////////////////////////
    // DATA PREP
    // prepare data based on the properties of the mark - drop missing records, etc
    //////////////////////////////////////////////////////////////////////////////////

    // only use data for the current mark
    raw = mark.per && mark.per.length ? raw.filter(f => f[mark.per[0]] !== undefined) : raw;

    // Make sure data has x and y values
    if (config.x.column) {
        raw = raw.filter(f => f[config.x.column] !== undefined);
    }
    if (config.y.column) {
        raw = raw.filter(f => f[config.y.column] !== undefined);
    }

    //check that x and y have the correct formats
    if (config.x.type === 'time') {
        raw = raw.filter(
            f =>
                f[config.x.column] instanceof Date
                    ? f[config.x.column]
                    : dateConvert.parse(f[config.x.column])
        );
        raw.forEach(
            e =>
                (e[config.x.column] = e[config.x.column] instanceof Date
                    ? e[config.x.column]
                    : dateConvert.parse(e[config.x.column]))
        );
    }
    if (config.y.type === 'time') {
        raw = raw.filter(
            f =>
                f[config.y.column] instanceof Date
                    ? f[config.y.column]
                    : dateConvert.parse(f[config.y.column])
        );
        raw.forEach(
            e =>
                (e[config.y.column] = e[config.y.column] instanceof Date
                    ? e[config.y.column]
                    : dateConvert.parse(e[config.y.column]))
        );
    }

    if ((config.x.type === 'linear' || config.x.type === 'log') && config.x.column) {
        raw = raw.filter(f => {
            return mark.summarizeX !== 'count' && mark.summarizeX !== 'percent'
                ? +f[config.x.column] || +f[config.x.column] === 0
                : f;
        });
    }
    if ((config.y.type === 'linear' || config.y.type === 'log') && config.y.column) {
        raw = raw.filter(f => {
            return mark.summarizeY !== 'count' && mark.summarizeY !== 'percent'
                ? +f[config.y.column] || +f[config.y.column] === 0
                : f;
        });
    }

    //prepare nested data required for bar charts
    let raw_nest;
    if (mark.type === 'bar') {
        raw_nest = mark.arrange !== 'stacked'
            ? makeNest.call(this, mark, raw, sublevel)
            : makeNest.call(this, mark, raw);
    } else if (mark.summarizeX === 'count' || mark.summarizeY === 'count') {
        raw_nest = makeNest.call(this, mark, raw);
    }

    // Get the domain for the mark based on the raw data
    let raw_dom_x = mark.summarizeX === 'cumulative'
        ? [0, raw.length]
        : config.x.type === 'ordinal'
          ? set(raw.map(m => m[config.x.column])).values().filter(f => f)
          : mark.split && mark.arrange !== 'stacked'
            ? extent(merge(raw_nest.nested.map(m => m.values.map(p => p.values.raw.length))))
            : mark.summarizeX === 'count'
              ? extent(raw_nest.nested.map(m => m.values.raw.length))
              : extent(raw.map(m => +m[config.x.column]).filter(f => +f || +f === 0));

    let raw_dom_y = mark.summarizeY === 'cumulative'
        ? [0, raw.length]
        : config.y.type === 'ordinal'
          ? set(raw.map(m => m[config.y.column])).values().filter(f => f)
          : mark.split && mark.arrange !== 'stacked'
            ? extent(merge(raw_nest.nested.map(m => m.values.map(p => p.values.raw.length))))
            : mark.summarizeY === 'count'
              ? extent(raw_nest.nested.map(m => m.values.raw.length))
              : extent(raw.map(m => +m[config.y.column]).filter(f => +f || +f === 0));

    let filtered = raw;

    let filt1_xs = [];
    let filt1_ys = [];
    if (this.filters.length) {
        this.filters.forEach(e => {
            filtered = filtered.filter(d => {
                return e.val === 'All'
                    ? d
                    : e.val instanceof Array ? e.val.indexOf(d[e.col]) > -1 : d[e.col] === e.val;
            });
        });
        //get domain for all non-All values of first filter
        if (config.x.behavior === 'firstfilter' || config.y.behavior === 'firstfilter') {
            this.filters[0].choices.filter(f => f !== 'All').forEach(e => {
                let perfilter = raw.filter(f => f[this.filters[0].col] === e);
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
          : nonall && x_behavior === 'firstfilter' ? filt1_dom_x : flex_dom_x;
    let pre_y_dom = !this.filters.length
        ? flex_dom_y
        : y_behavior === 'raw'
          ? raw_dom_y
          : nonall && y_behavior === 'firstfilter' ? filt1_dom_y : flex_dom_y;

    let x_dom = config.x_dom
        ? config.x_dom
        : config.x.type === 'ordinal' && config.x.behavior === 'flex'
          ? set(filtered.map(m => m[config.x.column])).values()
          : config.x.type === 'ordinal'
            ? set(raw.map(m => m[config.x.column])).values()
            : pre_x_dom;

    let y_dom = config.y_dom
        ? config.y_dom
        : config.y.type === 'ordinal' && config.y.behavior === 'flex'
          ? set(filtered.map(m => m[config.y.column])).values()
          : config.y.type === 'ordinal'
            ? set(raw.map(m => m[config.y.column])).values()
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
    if (config.x.domain && (config.x.domain[0] || config.x.domain[0] === 0)) {
        x_dom[0] = config.x.domain[0];
    }
    if (config.x.domain && (config.x.domain[1] || config.x.domain[1] === 0)) {
        x_dom[1] = config.x.domain[1];
    }
    if (config.y.domain && (config.y.domain[0] || config.y.domain[0] === 0)) {
        y_dom[0] = config.y.domain[0];
    }
    if (config.y.domain && (config.y.domain[1] || config.y.domain[1] === 0)) {
        y_dom[1] = config.y.domain[1];
    }

    if (config.x.type === 'ordinal' && !config.x.order) {
        config.x.order = totalOrder;
    }
    if (config.y.type === 'ordinal' && !config.y.order) {
        config.y.order = totalOrder;
    }

    this.current_data = current_nested.nested;

    this.events.onDatatransform.call(this);

    return { config: mark, data: current_nested.nested, x_dom: x_dom, y_dom: y_dom };
}
