import { nest, scale, extent, range, ascending, quantile, sum, merge, descending } from 'd3';
import naturalSorter from '../../../../dataOps/naturalSorter';
import summarize from '../../../../dataOps/summarize';

export default function makeNest(mark, entries, sublevel) {
    let dom_xs = [];
    let dom_ys = [];
    let this_nest = nest();

    if (
        (this.config.x.type === 'linear' && this.config.x.bin) ||
        (this.config.y.type === 'linear' && this.config.y.bin)
    ) {
        let xy = this.config.x.type === 'linear' && this.config.x.bin ? 'x' : 'y';
        let quant = scale
            .quantile()
            .domain(extent(entries.map(m => +m[this.config[xy].column])))
            .range(range(+this.config[xy].bin));

        entries.forEach(e => (e.wc_bin = quant(e[this.config[xy].column])));

        this_nest.key(d => quant.invertExtent(d.wc_bin));
    } else {
        this_nest.key(d => mark.per.map(m => d[m]).join(' '));
    }

    if (sublevel) {
        this_nest.key(d => d[sublevel]);
        this_nest.sortKeys((a, b) => {
            return this.config.x.type === 'time'
                ? ascending(new Date(a), new Date(b))
                : this.config.x.order
                  ? ascending(this.config.x.order.indexOf(a), this.config.x.order.indexOf(b))
                  : sublevel === this.config.color_by && this.config.legend.order
                    ? ascending(
                          this.config.legend.order.indexOf(a),
                          this.config.legend.order.indexOf(b)
                      )
                    : this.config.x.type === 'ordinal' || this.config.y.type === 'ordinal'
                      ? naturalSorter(a, b)
                      : ascending(+a, +b);
        });
    }
    this_nest.rollup(r => {
        let obj = { raw: r };
        let y_vals = r.map(m => m[this.config.y.column]).sort(ascending);
        let x_vals = r.map(m => m[this.config.x.column]).sort(ascending);
        obj.x = this.config.x.type === 'ordinal'
            ? r[0][this.config.x.column]
            : summarize(x_vals, mark.summarizeX);
        obj.y = this.config.y.type === 'ordinal'
            ? r[0][this.config.y.column]
            : summarize(y_vals, mark.summarizeY);

        obj.x_q25 = this.config.error_bars && this.config.y.type === 'ordinal'
            ? quantile(x_vals, 0.25)
            : obj.x;
        obj.x_q75 = this.config.error_bars && this.config.y.type === 'ordinal'
            ? quantile(x_vals, 0.75)
            : obj.x;
        obj.y_q25 = this.config.error_bars ? quantile(y_vals, 0.25) : obj.y;
        obj.y_q75 = this.config.error_bars ? quantile(y_vals, 0.75) : obj.y;
        dom_xs.push([obj.x_q25, obj.x_q75, obj.x]);
        dom_ys.push([obj.y_q25, obj.y_q75, obj.y]);

        if (mark.summarizeY === 'cumulative') {
            let interm = entries.filter(f => {
                return this.config.x.type === 'time'
                    ? new Date(f[this.config.x.column]) <= new Date(r[0][this.config.x.column])
                    : +f[this.config.x.column] <= +r[0][this.config.x.column];
            });
            if (mark.per.length) {
                interm = interm.filter(f => f[mark.per[0]] === r[0][mark.per[0]]);
            }

            let cumul = this.config.x.type === 'time'
                ? interm.length
                : sum(
                      interm.map(
                          m =>
                              +m[this.config.y.column] || +m[this.config.y.column] === 0
                                  ? +m[this.config.y.column]
                                  : 1
                      )
                  );
            dom_ys.push([cumul]);
            obj.y = cumul;
        }
        if (mark.summarizeX === 'cumulative') {
            let interm = entries.filter(f => {
                return this.config.y.type === 'time'
                    ? new Date(f[this.config.y.column]) <= new Date(r[0][this.config.y.column])
                    : +f[this.config.y.column] <= +r[0][this.config.y.column];
            });
            if (mark.per.length) {
                interm = interm.filter(f => f[mark.per[0]] === r[0][mark.per[0]]);
            }
            dom_xs.push([interm.length]);
            obj.x = interm.length;
        }

        return obj;
    });

    let test = this_nest.entries(entries);

    let dom_x = extent(merge(dom_xs));
    let dom_y = extent(merge(dom_ys));

    if (sublevel && mark.type === 'bar' && mark.split) {
        //calculate percentages in bars
        test.forEach(e => {
            let axis = this.config.x.type === 'ordinal' ||
                (this.config.x.type === 'linear' && this.config.x.bin)
                ? 'y'
                : 'x';
            e.total = sum(e.values.map(m => +m.values[axis]));
            let counter = 0;
            e.values.forEach((v, i) => {
                if (
                    this.config.x.type === 'ordinal' ||
                    (this.config.x.type === 'linear' && this.config.x.bin)
                ) {
                    v.values.y = mark.summarizeY === 'percent'
                        ? v.values.y / e.total
                        : v.values.y || 0;
                    counter += +v.values.y;
                    v.values.start = e.values[i - 1] ? counter : v.values.y;
                } else {
                    v.values.x = mark.summarizeX === 'percent'
                        ? v.values.x / e.total
                        : v.values.x || 0;
                    v.values.start = counter;
                    counter += +v.values.x;
                }
            });
        });

        if (mark.arrange === 'stacked') {
            if (
                this.config.x.type === 'ordinal' ||
                (this.config.x.type === 'linear' && this.config.x.bin)
            ) {
                dom_y = extent(test.map(m => m.total));
            }
            if (
                this.config.y.type === 'ordinal' ||
                (this.config.y.type === 'linear' && this.config.y.bin)
            ) {
                dom_x = extent(test.map(m => m.total));
            }
        }
    } else {
        let axis = this.config.x.type === 'ordinal' ||
            (this.config.x.type === 'linear' && this.config.x.bin)
            ? 'y'
            : 'x';
        test.forEach(e => (e.total = e.values[axis]));
    }

    if (
        (this.config.x.sort === 'total-ascending' && this.config.x.type == 'ordinal') ||
        (this.config.y.sort === 'total-descending' && this.config.y.type == 'ordinal')
    ) {
        totalOrder = test.sort((a, b) => ascending(a.total, b.total)).map(m => m.key);
    } else if (
        (this.config.x.sort === 'total-descending' && this.config.x.type == 'ordinal') ||
        (this.config.y.sort === 'total-ascending' && this.config.y.type == 'ordinal')
    ) {
        totalOrder = test.sort((a, b) => descending(+a.total, +b.total)).map(m => m.key);
    }

    return { nested: test, dom_x: dom_x, dom_y: dom_y };
}
