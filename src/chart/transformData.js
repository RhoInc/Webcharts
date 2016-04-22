import { time, sum, extent, merge, set, max, scale, range, nest, ascending, descending, quantile } from 'd3';
import naturalSorter from '../util/naturalSorter';
import summarize from '../util/summarize';

export default function transformData(rawData, mark) {
  const config = this.config;
  const xBehavior = config.x.behavior || 'raw';
  const yBehavior = config.y.behavior || 'raw';
  const sublevel = mark.type === 'line' ? config.x.column :
    mark.type === 'bar' && mark.split ? mark.split :
    null;
  const dateConvert = time.format(config.date_format);
  let totalOrder;
  let raw = rawData;

  function calcStartTotal(e) {
    const axis = config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin) ? 'y' : 'x';
    e.total = sum(e.values.map(m => +m.values[axis]));
    let counter = 0;
    e.values.forEach((v, i) => {
      if (config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin)) {
        v.values.y = mark.summarizeY === 'percent' ? v.values.y / e.total : v.values.y || 0;
        counter += +v.values.y;
        v.values.start = e.values[i - 1] ? counter : v.values.y;
      }
      else {
        v.values.x = mark.summarizeX === 'percent' ? v.values.x / e.total : v.values.x || 0;
        v.values.start = counter;
        counter += +v.values.x;
      }
    });
  }

  raw = mark.per && mark.per.length ? raw.filter(f => f[mark.per[0]]) : raw;

  // make sure data has x and y values
  if (config.x.column) {
    raw = raw.filter(f => f[config.x.column] !== undefined);
  }
  if (config.y.column) {
    raw = raw.filter(f => f[config.y.column] !== undefined);
  }

  if (config.x.type === 'time') {
    raw = raw.filter(f => f[config.x.column] instanceof Date ? f[config.x.column] : dateConvert.parse(f[config.x.column]));
    raw.forEach(e => {
      e[config.x.column] = e[config.x.column] instanceof Date ? e[config.x.column] : dateConvert.parse(e[config.x.column]);
    });
  }
  if (config.y.type === 'time') {
    raw = raw.filter(f => f[config.y.column] instanceof Date ? f[config.y.column] : dateConvert.parse(f[config.y.column]));
    raw.forEach(e => {
      e[config.y.column] = e[config.y.column] instanceof Date ? e[config.y.column] : dateConvert.parse(e[config.y.column]);
    });
  }

  if ((config.x.type === 'linear' || config.x.type === 'log') && config.x.column) {
    raw = raw.filter(f =>
      (mark.summarizeX !== 'count' && mark.summarizeX !== 'percent') ?
      (+f[config.x.column] || +f[config.x.column] === 0) :
      f
    );
  }
  if ((config.y.type === 'linear' || config.y.type === 'log') && config.y.column) {
    raw = raw.filter(f =>
      (mark.summarizeY !== 'count' && mark.summarizeY !== 'percent') ?
      (+f[config.y.column] || +f[config.y.column] === 0) :
      f
    );
  }

  let rawNest;

  function makeNest(entries, sublevelKey) {
    const domXs = [];
    const domYs = [];
    const thisNest = nest();

    if ((config.x.type === 'linear' && config.x.bin) || (config.y.type === 'linear' && config.y.bin)) {
      const xy = (config.x.type === 'linear' && config.x.bin) ? 'x' : 'y';
      const quant = scale.quantile()
        .domain(extent(entries.map(m => +m[config[xy].column])))
        .range(range(+config[xy].bin));

      entries.forEach(e => {
        e.wc_bin = quant(e[config[xy].column]);
      });

      thisNest.key(d => quant.invertExtent(d.wc_bin));
    }
    else {
      thisNest.key(d => mark.per.map(m => d[m]).join(' '));
    }

    if (sublevelKey) {
      thisNest.key(d => d[sublevelKey]);
      thisNest.sortKeys((a, b) =>
        config.x.type === 'time' ? ascending(new Date(a), new Date(b)) :
          config.x_dom ? ascending(config.x_dom.indexOf(a), config.x_dom.indexOf(b)) :
          sublevelKey === config.color_by && config.legend.order ? ascending(config.legend.order.indexOf(a), config.legend.order.indexOf(b)) :
          config.x.type === 'ordinal' || config.y.type === 'ordinal' ? naturalSorter(a, b) :
          ascending(+a, +b)
      );
    }
    thisNest.rollup(r => {
      const obj = { raw: r };
      const yVals = r.map(m => m[config.y.column]).sort(ascending);
      const xVals = r.map(m => m[config.x.column]).sort(ascending);
      obj.x = config.x.type === 'ordinal' ? r[0][config.x.column] : summarize(xVals, mark.summarizeX);
      obj.y = config.y.type === 'ordinal' ? r[0][config.y.column] : summarize(yVals, mark.summarizeY);

      obj.x_q25 = config.error_bars && config.y.type === 'ordinal' ? quantile(xVals, 0.25) : obj.x;
      obj.x_q75 = config.error_bars && config.y.type === 'ordinal' ? quantile(xVals, 0.75) : obj.x;
      obj.y_q25 = config.error_bars ? quantile(yVals, 0.25) : obj.y;
      obj.y_q75 = config.error_bars ? quantile(yVals, 0.75) : obj.y;
      domXs.push([obj.x_q25, obj.x_q75, obj.x]);
      domYs.push([obj.y_q25, obj.y_q75, obj.y]);

      if (mark.summarizeY === 'cumulative') {
        let interm = entries.filter(f =>
          config.x.type === 'time' ?
          new Date(f[config.x.column]) <= new Date(r[0][config.x.column]) :
          +f[config.x.column] <= +r[0][config.x.column]
        );
        if (mark.per.length) {
          interm = interm.filter(f => f[mark.per[0]] === r[0][mark.per[0]]);
        }

        const cumul = config.x.type === 'time' ?
          interm.length :
          sum(interm.map(m => +m[config.y.column] || +m[config.y.column] === 0 ? +m[config.y.column] : 1));

        domYs.push([cumul]);
        obj.y = cumul;
      }
      if (mark.summarizeX === 'cumulative') {
        let interm = entries.filter(f =>
          config.y.type === 'time' ?
          new Date(f[config.y.column]) <= new Date(r[0][config.y.column]) :
          +f[config.y.column] <= +r[0][config.y.column]
        );
        if (mark.per.length) {
          interm = interm.filter(f => f[mark.per[0]] === r[0][mark.per[0]]);
        }
        domXs.push([interm.length]);
        obj.x = interm.length;
      }

      return obj;
    });

    const test = thisNest.entries(entries);

    let domX = extent(merge(domXs));
    let domY = extent(merge(domYs));

    if (sublevelKey && mark.type === 'bar' && mark.arrange === 'stacked') {
      test.forEach(calcStartTotal);
      if (config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin)) {
        domY = extent(test.map(m => m.total));
      }
      if (config.y.type === 'ordinal' || (config.y.type === 'linear' && config.y.bin)) {
        domX = extent(test.map(m => m.total));
      }
    }
    else if (sublevelKey && mark.type === 'bar' && mark.split) {
      test.forEach(calcStartTotal);
    }
    else {
      const axis = config.x.type === 'ordinal' || (config.x.type === 'linear' && config.x.bin) ? 'y' : 'x';
      test.forEach(e => {
        e.total = e.values[axis];
      });
    }

    if (
      (config.x.sort === 'total-ascending' && config.x.type === 'ordinal') ||
      (config.y.sort === 'total-descending' && config.y.type === 'ordinal')
    ) {
      totalOrder = test.sort((a, b) => ascending(a.total, b.total)).map(m => m.key);
    }
    else if (
      (config.x.sort === 'total-descending' && config.x.type === 'ordinal') ||
      (config.y.sort === 'total-ascending' && config.y.type === 'ordinal')
    ) {
      totalOrder = test.sort((a, b) => descending(+a.total, +b.total)).map(m => m.key);
    }

    return { nested: test, dom_x: domX, dom_y: domY };
  }

  if (mark.type === 'bar') {
    rawNest = mark.arrange !== 'stacked' ? makeNest(raw, sublevel) : makeNest(raw);
  }
  else if (mark.summarizeX === 'count' || mark.summarizeY === 'count') {
    rawNest = makeNest(raw);
  }

  const rawDomX = mark.summarizeX === 'cumulative' ? [0, raw.length] :
    config.x.type === 'ordinal' ? set(raw.map(m => m[config.x.column])).values().filter(f => f) :
    mark.split && mark.arrange !== 'stacked' ? extent(merge(rawNest.nested.map(m => m.values.map(p => p.values.raw.length)))) :
    mark.summarizeX === 'count' ? extent(rawNest.nested.map(m => m.values.raw.length)) :
    extent(raw.map(m => +m[config.x.column]).filter(f => +f || +f === 0));

  const rawDomY = mark.summarizeY === 'cumulative' ? [0, raw.length] :
    config.y.type === 'ordinal' ? set(raw.map(m => m[config.y.column])).values().filter(f => f) :
    mark.split && mark.arrange !== 'stacked' ? extent(merge(rawNest.nested.map(m => m.values.map(p => p.values.raw.length)))) :
    mark.summarizeY === 'count' ? extent(rawNest.nested.map(m => m.values.raw.length)) :
    extent(raw.map(m => +m[config.y.column]).filter(f => +f || +f === 0));

  let filtered = raw;

  const filt1Xs = [];
  const filt1Ys = [];
  if (this.filters.length) {
    this.filters.forEach(e => {
      filtered = filtered.filter(d =>
        e.val === 'All' ? d : e.val instanceof Array ? e.val.indexOf(d[e.col]) > -1 : d[e.col] === e.val
      );
    });
    // get domain for all non-All values of first filter
    if (config.x.behavior === 'firstfilter' || config.y.behavior === 'firstfilter') {
      this.filters[0].choices.filter(f => f !== 'All').forEach(e => {
        const perfilter = raw.filter(f => f[this.filters[0].col] === e);
        const filtNested = makeNest(perfilter, sublevel);
        filt1Xs.push(filtNested.domX);
        filt1Ys.push(filtNested.domY);
      });
    }
  }

  // filter on mark-specific instructions
  if (mark.values) {
    for (const a in mark.values) {
      if (Object.hasOwnProperty.call(mark.values, a)) {
        filtered = filtered.filter(f =>
          mark.values[a].indexOf(f[a]) > -1
        );
      }
    }
  }

  const filt1DomX = extent(merge(filt1Xs));
  const filt1DomY = extent(merge(filt1Ys));

  this.filtered_data = filtered;

  const currentNested = makeNest(filtered, sublevel);

  const flexDomX = currentNested.domX;
  const flexDomY = currentNested.domY;

  if (mark.type === 'bar') {
    if (config.y.type === 'ordinal' && mark.summarizeX === 'count') {
      config.x.domain = config.x.domain ? [0, config.x.domain[1]] : [0, null];
    }
    else if (config.x.type === 'ordinal' && mark.summarizeY === 'count') {
      config.y.domain = config.y.domain ? [0, config.y.domain[1]] : [0, null];
    }
  }

  // several criteria must be met in order to use the 'firstfilter' domain
  const nonall = Boolean(
    this.filters.length &&
    this.filters[0].val !== 'All' &&
    this.filters.slice(1).filter(f => f.val === 'All').length === this.filters.length - 1
  );

  const preXDom = !this.filters.length ? flexDomX : xBehavior === 'raw' ? rawDomX : nonall && xBehavior === 'firstfilter' ? filt1DomX : flexDomX;
  const preYDom = !this.filters.length ? flexDomY : yBehavior === 'raw' ? rawDomY : nonall && yBehavior === 'firstfilter' ? filt1DomY : flexDomY;

  const xDom = config.x.domain ? config.x.domain :
    config.x.type === 'ordinal' && config.x.behavior === 'flex' ? set(filtered.map(m => m[config.x.column])).values() :
    config.x.type === 'ordinal' ? set(raw.map(m => m[config.x.column])).values() :
    config.x_from0 ? [0, max(preXDom)] :
    preXDom;

  const yDom = config.y.domain ? config.y.domain :
    config.y.type === 'ordinal' && config.y.behavior === 'flex' ? set(filtered.map(m => m[config.y.column])).values() :
    config.y.type === 'ordinal' ? set(raw.map(m => m[config.y.column])).values() :
    config.y_from0 ? [0, max(preYDom)] :
    preYDom;

  if (config.x.domain && (config.x.domain[0] || config.x.domain[0] === 0)) {
    xDom[0] = config.x.domain[0];
  }
  if (config.x.domain && (config.x.domain[1] || config.x.domain[1] === 0)) {
    xDom[1] = config.x.domain[1];
  }
  if (config.y.domain && (config.y.domain[0] || config.y.domain[0] === 0)) {
    yDom[0] = config.y.domain[0];
  }
  if (config.y.domain && (config.y.domain[1] || config.y.domain[1] === 0)) {
    yDom[1] = config.y.domain[1];
  }

  if (config.x.type === 'ordinal' && !config.x.order) {
    config.x.order = totalOrder;
  }
  if (config.y.type === 'ordinal' && !config.y.order) {
    config.y.order = totalOrder;
  }

  this.current_data = currentNested.nested;

  this.events.onDatatransform.call(this);

  return { data: currentNested.nested, x_dom: xDom, y_dom: yDom };
}
