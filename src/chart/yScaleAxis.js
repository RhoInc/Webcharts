import { scale, time, svg, format } from 'd3';

export default function yScaleAxis(max_range, domain, type) {
    if (max_range === undefined) {
        max_range = this.plot_height;
    }
    if (domain === undefined) {
        domain = this.y_dom;
    }
    if (type === undefined) {
        type = this.config.y.type;
    }
    let config = this.config;
    let y;
    if (type === 'log') {
        y = scale.log();
    } else if (type === 'ordinal') {
        y = scale.ordinal();
    } else if (type === 'time') {
        y = time.scale();
    } else {
        y = scale.linear();
    }

    y.domain(domain);

    if (type === 'ordinal') {
        y.rangeBands([+max_range, 0], config.padding, config.outer_pad);
    } else {
        y.range([+max_range, 0]).clamp(Boolean(config.y_clamp));
    }

    let yFormat = config.y.format
        ? config.y.format
        : config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1 ? '0%' : '.0f';
    let tick_count = Math.max(2, Math.min(max_range / 80, 8));
    let yAxis = svg
        .axis()
        .scale(y)
        .orient('left')
        .ticks(tick_count)
        .tickFormat(
            type === 'ordinal' ? null : type === 'time' ? time.format(yFormat) : format(yFormat)
        )
        .tickValues(config.y.ticks ? config.y.ticks : null)
        .innerTickSize(6)
        .outerTickSize(3);

    this.svg.select('g.y.axis').attr('class', 'y axis ' + type);

    this.y = y;
    this.yAxis = yAxis;
}
