import { select, set, format, min, max } from 'd3';

export default function drawBars(marks) {
    let rawData = this.raw_data;
    let config = this.config;

    let bar_supergroups = this.svg
        .selectAll('.bar-supergroup')
        .data(marks, (d, i) => i + '-' + d.per.join('-'));

    bar_supergroups.enter().append('g').attr('class', d => 'supergroup bar-supergroup ' + d.id);

    bar_supergroups.exit().remove();

    let bar_groups = bar_supergroups.selectAll('.bar-group').data(d => d.data, d => d.key);
    let old_bar_groups = bar_groups.exit();

    let nu_bar_groups;
    let bars;

    let oldBarsTrans = config.transitions
        ? old_bar_groups.selectAll('.bar').transition()
        : old_bar_groups.selectAll('.bar');
    let oldBarGroupsTrans = config.transitions ? old_bar_groups.transition() : old_bar_groups;

    if (config.x.type === 'ordinal') {
        oldBarsTrans.attr('y', this.y(0)).attr('height', 0);

        oldBarGroupsTrans.remove();

        nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group ' + d.key);
        nu_bar_groups.append('title');

        bars = bar_groups.selectAll('rect').data(d => {
            return d.values instanceof Array
                ? d.values.sort(
                      (a, b) =>
                          this.colorScale.domain().indexOf(b.key) -
                          this.colorScale.domain().indexOf(a.key)
                  )
                : [d];
        }, d => d.key);

        let exitBars = config.transitions ? bars.exit().transition() : bars.exit();
        exitBars.attr('y', this.y(0)).attr('height', 0).remove();
        bars
            .enter()
            .append('rect')
            .attr('class', d => 'wc-data-mark bar ' + d.key)
            .style('clip-path', 'url(#' + this.id + ')')
            .attr('y', this.y(0))
            .attr('height', 0)
            .append('title');

        bars
            .attr('shape-rendering', 'crispEdges')
            .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]))
            .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]));

        bars.each(function(d) {
            let mark = select(this.parentNode.parentNode).datum();
            d.tooltip = mark.tooltip;
            d.arrange = mark.split ? mark.arrange : null;
            d.subcats = config.legend.order
                ? config.legend.order.slice().reverse()
                : mark.values && mark.values[mark.split]
                  ? mark.values[mark.split]
                  : set(rawData.map(m => m[mark.split])).values();
            select(this).attr(mark.attributes);
        });

        let xformat = config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1
            ? format('0%')
            : format(config.x.format);
        let yformat = config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1
            ? format('0%')
            : format(config.y.format);
        bars.select('title').text(d => {
            let tt = d.tooltip || '';
            return tt
                .replace(/\$x/g, xformat(d.values.x))
                .replace(/\$y/g, yformat(d.values.y))
                .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
        });

        let barsTrans = config.transitions ? bars.transition() : bars;
        barsTrans
            .attr('x', d => {
                let position;
                if (!d.arrange || d.arrange === 'stacked') {
                    return this.x(d.values.x);
                } else if (d.arrange === 'nested') {
                    let position = d.subcats.indexOf(d.key);
                    let offset = position
                        ? this.x.rangeBand() / (d.subcats.length * 0.75) / position
                        : this.x.rangeBand();
                    return this.x(d.values.x) + (this.x.rangeBand() - offset) / 2;
                } else {
                    position = d.subcats.indexOf(d.key);
                    return this.x(d.values.x) + this.x.rangeBand() / d.subcats.length * position;
                }
            })
            .attr('y', d => {
                if (d.arrange !== 'stacked') {
                    return this.y(d.values.y);
                } else {
                    return this.y(d.values.start);
                }
            })
            .attr('width', d => {
                if (!d.arrange || d.arrange === 'stacked') {
                    return this.x.rangeBand();
                } else if (d.arrange === 'nested') {
                    let position = d.subcats.indexOf(d.key);
                    return position
                        ? this.x.rangeBand() / (d.subcats.length * 0.75) / position
                        : this.x.rangeBand();
                } else {
                    return this.x.rangeBand() / d.subcats.length;
                }
            })
            .attr('height', d => this.y(0) - this.y(d.values.y));
    } else if (config.y.type === 'ordinal') {
        oldBarsTrans.attr('x', this.x(0)).attr('width', 0);

        oldBarGroupsTrans.remove();

        nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group ' + d.key);
        nu_bar_groups.append('title');

        bars = bar_groups.selectAll('rect').data(d => {
            return d.values instanceof Array
                ? d.values.sort(
                      (a, b) =>
                          this.colorScale.domain().indexOf(b.key) -
                          this.colorScale.domain().indexOf(a.key)
                  )
                : [d];
        }, d => d.key);

        let exitBars = config.transitions ? bars.exit().transition() : bars.exit();
        exitBars.attr('x', this.x(0)).attr('width', 0).remove();
        bars
            .enter()
            .append('rect')
            .attr('class', d => 'wc-data-mark bar ' + d.key)
            .style('clip-path', 'url(#' + this.id + ')')
            .attr('x', this.x(0))
            .attr('width', 0)
            .append('title');

        bars
            .attr('shape-rendering', 'crispEdges')
            .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]))
            .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]));

        bars.each(function(d) {
            let mark = select(this.parentNode.parentNode).datum();
            d.arrange = mark.split && mark.arrange ? mark.arrange : mark.split ? 'grouped' : null;
            d.subcats = config.legend.order
                ? config.legend.order.slice().reverse()
                : mark.values && mark.values[mark.split]
                  ? mark.values[mark.split]
                  : set(rawData.map(m => m[mark.split])).values();
            d.tooltip = mark.tooltip;
        });

        let xformat = config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1
            ? format('0%')
            : format(config.x.format);
        let yformat = config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1
            ? format('0%')
            : format(config.y.format);
        bars.select('title').text(d => {
            let tt = d.tooltip || '';
            return tt
                .replace(/\$x/g, xformat(d.values.x))
                .replace(/\$y/g, yformat(d.values.y))
                .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
        });

        let barsTrans = config.transitions ? bars.transition() : bars;
        barsTrans
            .attr('x', d => {
                if (d.arrange === 'stacked' || !d.arrange) {
                    return d.values.start !== undefined ? this.x(d.values.start) : this.x(0);
                } else {
                    return this.x(0);
                }
            })
            .attr('y', d => {
                if (d.arrange === 'nested') {
                    let position = d.subcats.indexOf(d.key);
                    let offset = position
                        ? this.y.rangeBand() / (d.subcats.length * 0.75) / position
                        : this.y.rangeBand();
                    return this.y(d.values.y) + (this.y.rangeBand() - offset) / 2;
                } else if (d.arrange === 'grouped') {
                    let position = d.subcats.indexOf(d.key);
                    return this.y(d.values.y) + this.y.rangeBand() / d.subcats.length * position;
                } else {
                    return this.y(d.values.y);
                }
            })
            .attr('width', d => this.x(d.values.x) - this.x(0))
            .attr('height', d => {
                if (config.y.type === 'quantile') {
                    return 20;
                } else if (d.arrange === 'nested') {
                    let position = d.subcats.indexOf(d.key);
                    return position
                        ? this.y.rangeBand() / (d.subcats.length * 0.75) / position
                        : this.y.rangeBand();
                } else if (d.arrange === 'grouped') {
                    return this.y.rangeBand() / d.subcats.length;
                } else {
                    return this.y.rangeBand();
                }
            });
    } else if (['linear', 'log'].indexOf(config.x.type) > -1 && config.x.bin) {
        oldBarsTrans.attr('y', this.y(0)).attr('height', 0);

        oldBarGroupsTrans.remove();

        nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group ' + d.key);
        nu_bar_groups.append('title');

        bars = bar_groups
            .selectAll('rect')
            .data(d => (d.values instanceof Array ? d.values : [d]), d => d.key);

        let exitBars = config.transitions ? bars.exit().transition() : bars.exit();
        exitBars.attr('y', this.y(0)).attr('height', 0).remove();
        bars
            .enter()
            .append('rect')
            .attr('class', d => 'wc-data-mark bar ' + d.key)
            .style('clip-path', 'url(#' + this.id + ')')
            .attr('y', this.y(0))
            .attr('height', 0)
            .append('title');

        bars
            .attr('shape-rendering', 'crispEdges')
            .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]))
            .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]));

        bars.each(function(d) {
            let mark = select(this.parentNode.parentNode).datum();
            d.arrange = mark.split ? mark.arrange : null;
            d.subcats = config.legend.order
                ? config.legend.order.slice().reverse()
                : mark.values && mark.values[mark.split]
                  ? mark.values[mark.split]
                  : set(rawData.map(m => m[mark.split])).values();
            select(this).attr(mark.attributes);
            let parent = select(this.parentNode).datum();
            let rangeSet = parent.key.split(',').map(m => +m);
            d.rangeLow = min(rangeSet);
            d.rangeHigh = max(rangeSet);
            d.tooltip = mark.tooltip;
        });

        let xformat = config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1
            ? format('0%')
            : format(config.x.format);
        let yformat = config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1
            ? format('0%')
            : format(config.y.format);
        bars.select('title').text(d => {
            let tt = d.tooltip || '';
            return tt
                .replace(/\$x/g, xformat(d.values.x))
                .replace(/\$y/g, yformat(d.values.y))
                .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
        });

        let barsTrans = config.transitions ? bars.transition() : bars;
        barsTrans
            .attr('x', d => this.x(d.rangeLow))
            .attr('y', d => {
                if (d.arrange !== 'stacked') {
                    return this.y(d.values.y);
                } else {
                    return this.y(d.values.start);
                }
            })
            .attr('width', d => this.x(d.rangeHigh) - this.x(d.rangeLow))
            .attr('height', d => this.y(0) - this.y(d.values.y));
    } else if (
        ['linear', 'log'].indexOf(config.y.type) > -1 &&
        config.y.type === 'linear' &&
        config.y.bin
    ) {
        oldBarsTrans.attr('x', this.x(0)).attr('width', 0);
        oldBarGroupsTrans.remove();

        nu_bar_groups = bar_groups.enter().append('g').attr('class', d => 'bar-group ' + d.key);
        nu_bar_groups.append('title');

        bars = bar_groups
            .selectAll('rect')
            .data(d => (d.values instanceof Array ? d.values : [d]), d => d.key);

        let exitBars = config.transitions ? bars.exit().transition() : bars.exit();
        exitBars.attr('x', this.x(0)).attr('width', 0).remove();
        bars
            .enter()
            .append('rect')
            .attr('class', d => 'wc-data-mark bar ' + d.key)
            .style('clip-path', 'url(#' + this.id + ')')
            .attr('x', this.x(0))
            .attr('width', 0)
            .append('title');

        bars
            .attr('shape-rendering', 'crispEdges')
            .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]))
            .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]));

        bars.each(function(d) {
            let mark = select(this.parentNode.parentNode).datum();
            d.arrange = mark.split ? mark.arrange : null;
            d.subcats = config.legend.order
                ? config.legend.order.slice().reverse()
                : mark.values && mark.values[mark.split]
                  ? mark.values[mark.split]
                  : set(rawData.map(m => m[mark.split])).values();
            let parent = select(this.parentNode).datum();
            let rangeSet = parent.key.split(',').map(m => +m);
            d.rangeLow = min(rangeSet);
            d.rangeHigh = max(rangeSet);
            d.tooltip = mark.tooltip;
        });

        let xformat = config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1
            ? format('0%')
            : format(config.x.format);
        let yformat = config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1
            ? format('0%')
            : format(config.y.format);
        bars.select('title').text(d => {
            let tt = d.tooltip || '';
            return tt
                .replace(/\$x/g, xformat(d.values.x))
                .replace(/\$y/g, yformat(d.values.y))
                .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
        });

        let barsTrans = config.transitions ? bars.transition() : bars;
        barsTrans
            .attr('x', d => {
                if (d.arrange === 'stacked') {
                    return this.x(d.values.start);
                } else {
                    return this.x(0);
                }
            })
            .attr('y', d => this.y(d.rangeHigh))
            .attr('width', d => this.x(d.values.x))
            .attr('height', d => this.y(d.rangeLow) - this.y(d.rangeHigh));
    } else {
        oldBarsTrans.attr('y', this.y(0)).attr('height', 0);
        oldBarGroupsTrans.remove();
        bar_supergroups.remove();
    }

    //Link to the d3.selection from the data
    bar_supergroups.each(function(d) {
        d.supergroup = d3.select(this);
        d.groups = d.supergroup.selectAll('.bar-group');
    });
}
