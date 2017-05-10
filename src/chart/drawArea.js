export default function(
    area_drawer,
    area_data,
    datum_accessor,
    class_match = 'chart-area',
    bind_accessor,
    attr_accessor = function(d) {
        return d;
    }
) {
    var area_grps = this.svg.selectAll('.' + class_match).data(area_data, bind_accessor);
    area_grps.exit().remove();
    area_grps
        .enter()
        .append('g')
        .attr('class', function(d) {
            return class_match + ' ' + d.key;
        })
        .append('path');

    var areaPaths = area_grps
        .select('path')
        .datum(datum_accessor)
        .attr('fill', d => {
            var d_attr = attr_accessor(d);
            return d_attr ? this.colorScale(d_attr[this.config.color_by]) : null;
        })
        .attr(
            'fill-opacity',
            this.config.fill_opacity || this.config.fill_opacity === 0
                ? this.config.fill_opacity
                : 0.3
        );

    //don't transition if config says not to
    var areaPathTransitions = this.config.transitions ? areaPaths.transition() : areaPaths;

    areaPathTransitions.attr('d', area_drawer);

    return area_grps;
}
