import { select, set, format } from 'd3';

// TODO: merge xOrdinal and yOrdinal into a single function
export default function xOrdinal(oldBarsTrans, oldBarGroupsTrans, nu_bar_groups, bar_groups, bars) {
    const chart = this;
    const rawData = this.raw_data;
    const config = this.config;

    oldBarsTrans.attr('y', this.y(0)).attr('height', 0);

    oldBarGroupsTrans.remove();

    nu_bar_groups = bar_groups
        .enter()
        .append('g')
        .attr('class', d => 'bar-group ' + d.key);
    nu_bar_groups.append('title');

    bars = bar_groups.selectAll('rect').data(
        d => {
            return d.values instanceof Array
                ? d.values.sort(
                      (a, b) =>
                          this.colorScale.domain().indexOf(a.key) -
                          this.colorScale.domain().indexOf(b.key)
                  ) // controls the order of the bars in the DOM
                : [d];
        },
        d => d.key
    );

    let exitBars = config.transitions ? bars.exit().transition() : bars.exit();
    exitBars
        .attr('y', this.y(0))
        .attr('height', 0)
        .remove();
    bars.enter()
        .append('rect')
        .attr('class', d => 'wc-data-mark bar ' + d.key)
        .style('clip-path', `url(#${chart.id})`)
        .attr('y', this.y(0))
        .attr('height', 0)
        .append('title');

    // sort bars in DOM to display widest bar behind every other bar and narrowest bar in front of every other bar - that's poorly worded but you get the gist
    bars.sort(
        (a, b) => this.colorScale.domain().indexOf(a.key) - this.colorScale.domain().indexOf(b.key)
    );

    bars.attr('shape-rendering', 'crispEdges')
        .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]))
        .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]));

    bars.each(function(d) {
        let mark = select(this.parentNode.parentNode).datum();
        d.tooltip = mark.tooltip;
        d.arrange = mark.split && mark.arrange ? mark.arrange : mark.split ? 'grouped' : null;
        d.subcats = config.legend.order
            ? config.legend.order.slice()
            : mark.values && mark.values[mark.split]
            ? mark.values[mark.split]
            : set(rawData.map(m => m[mark.split]))
                  .values()
                  .sort(); // controls the order of the bars in the chart
        select(this).attr(mark.attributes);
    });

    let xformat =
        config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1
            ? format('0%')
            : format(config.x.format);
    let yformat =
        config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1
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
                return this.x(d.values.x) + (this.x.rangeBand() / d.subcats.length) * position;
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
}
