import { scale, time, svg, format } from 'd3';

export default function xScaleAxis(max_range, domain, type) {
    if (max_range === undefined) {
        max_range = this.plot_width;
    }
    if (domain === undefined) {
        domain = this.x_dom;
    }
    if (type === undefined) {
        type = this.config.x.type;
    }
    let config = this.config;
    let x;

    if (type === 'log') {
        x = scale.log();
    } else if (type === 'ordinal') {
        x = scale.ordinal();
    } else if (type === 'time') {
        x = time.scale();
    } else {
        x = scale.linear();
    }

    x.domain(domain);

    if (type === 'ordinal') {
        x.rangeBands([0, +max_range], config.padding, config.outer_pad);
    } else {
        x.range([0, +max_range]).clamp(Boolean(config.x.clamp));
    }

    let xFormat = config.x.format
        ? config.x.format
        : config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1
          ? '0%'
          : type === 'time' ? '%x' : '.0f';
    let tick_count = Math.max(2, Math.min(max_range / 80, 8));
    let xAxis = svg
        .axis()
        .scale(x)
        .orient(config.x.location)
        .ticks(tick_count)
        .tickFormat(
            type === 'ordinal' ? null : type === 'time' ? time.format(xFormat) : format(xFormat)
        )
        .tickValues(config.x.ticks ? config.x.ticks : null)
        .innerTickSize(6)
        .outerTickSize(3);

    this.svg.select('g.x.axis').attr('class', 'x axis ' + type);
    this.x = x;
    this.xAxis = xAxis;
}
