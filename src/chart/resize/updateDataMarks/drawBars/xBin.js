import { select, set, format, min, max } from 'd3';

export default function xBin(oldBarsTrans, oldBarGroupsTrans, nu_bar_groups, bar_groups, bars) {
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
        d => (d.values instanceof Array ? d.values : [d]),
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

    bars.attr('shape-rendering', 'crispEdges')
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
}
