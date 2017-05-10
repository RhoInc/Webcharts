export default function(marks) {
    let config = this.config;

    let point_supergroups = this.svg
        .selectAll('.point-supergroup')
        .data(marks, (d, i) => i + '-' + d.per.join('-'));
    point_supergroups.enter().append('g').attr('class', 'point-supergroup');
    point_supergroups.exit().remove();

    let points = point_supergroups.selectAll('.point').data(d => d.data, d => d.key);
    let oldPoints = points.exit();

    let oldPointsTrans = config.transitions
        ? oldPoints.selectAll('circle').transition()
        : oldPoints.selectAll('circle');
    oldPointsTrans.attr('r', 0);

    let oldPointGroupTrans = config.transitions ? oldPoints.transition() : oldPoints;
    oldPointGroupTrans.remove();

    let nupoints = points.enter().append('g').attr('class', d => d.key + ' point');
    nupoints.append('circle').attr('class', 'wc-data-mark').attr('r', 0);
    nupoints.append('title');
    //static attributes
    points
        .select('circle')
        .attr(
            'fill-opacity',
            config.fill_opacity || config.fill_opacity === 0 ? config.fill_opacity : 0.6
        )
        .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]))
        .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]));
    //attach mark info
    points.each(function(d) {
        let mark = d3.select(this.parentNode).datum();
        d.mark = mark;
        d3.select(this).select('circle').attr(mark.attributes);
    });
    //animated attributes
    let pointsTrans = config.transitions
        ? points.select('circle').transition()
        : points.select('circle');
    pointsTrans
        .attr('r', d => d.mark.radius || config.flex_point_size)
        .attr('cx', d => {
            let x_pos = this.x(d.values.x) || 0;
            return config.x.type === 'ordinal' ? x_pos + this.x.rangeBand() / 2 : x_pos;
        })
        .attr('cy', d => {
            let y_pos = this.y(d.values.y) || 0;
            return config.y.type === 'ordinal' ? y_pos + this.y.rangeBand() / 2 : y_pos;
        });

    points.select('title').text(d => {
        let tt = d.mark.tooltip || '';
        let xformat = config.x.summary === 'percent'
            ? d3.format('0%')
            : config.x.type === 'time'
                  ? d3.time.format(config.x.format)
                  : d3.format(config.x.format);
        let yformat = config.y.summary === 'percent'
            ? d3.format('0%')
            : config.y.type === 'time'
                  ? d3.time.format(config.y.format)
                  : d3.format(config.y.format);
        return tt
            .replace(
                /\$x/g,
                config.x.type === 'time' ? xformat(new Date(d.values.x)) : xformat(d.values.x)
            )
            .replace(
                /\$y/g,
                config.y.type === 'time' ? yformat(new Date(d.values.y)) : yformat(d.values.y)
            )
            .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
    });

    return points;
}
