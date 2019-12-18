import { select, set, format, min, max } from 'd3';
import xOrdinal from './drawBars/xOrdinal';
import yOrdinal from './drawBars/yOrdinal';
import xBin from './drawBars/xBin';
import yBin from './drawBars/yBin';

export default function drawBars(marks) {
    const chart = this;
    const rawData = this.raw_data;
    const config = this.config;

    // bar super-groups
    const bar_supergroups = this.svg
        .selectAll('.bar-supergroup')
        .data(marks, (d, i) => i + '-' + d.per.join('-'));
    bar_supergroups
        .enter()
        .append('g')
        .attr('class', d => 'supergroup bar-supergroup ' + d.id);
    bar_supergroups.exit().remove();

    // bar groups
    const bar_groups = bar_supergroups.selectAll('.bar-group').data(
        d => d.data,
        d => d.key
    );
    const old_bar_groups = bar_groups.exit();

    let nu_bar_groups;
    let bars;

    // bar transitions
    const oldBarsTrans = config.transitions
        ? old_bar_groups.selectAll('.bar').transition()
        : old_bar_groups.selectAll('.bar');
    const oldBarGroupsTrans = config.transitions ? old_bar_groups.transition() : old_bar_groups;

    if (config.x.type === 'ordinal') {
        xOrdinal.call(this, oldBarsTrans, oldBarGroupsTrans, nu_bar_groups, bar_groups, bars);
    } else if (config.y.type === 'ordinal') {
        yOrdinal.call(this, oldBarsTrans, oldBarGroupsTrans, nu_bar_groups, bar_groups, bars);
    } else if (['linear', 'log'].indexOf(config.x.type) > -1 && config.x.bin) {
        xBin.call(this, oldBarsTrans, oldBarGroupsTrans, nu_bar_groups, bar_groups, bars);
    } else if (
        ['linear', 'log'].indexOf(config.y.type) > -1 &&
        config.y.type === 'linear' &&
        config.y.bin
    ) {
        yBin.call(this, oldBarsTrans, oldBarGroupsTrans, nu_bar_groups, bar_groups, bars);
    } else {
        oldBarsTrans.attr('y', this.y(0)).attr('height', 0);
        oldBarGroupsTrans.remove();
        bar_supergroups.remove();
    }

    //Link to the d3.selection from the data
    bar_supergroups.each(function(d) {
        d.supergroup = select(this);
        d.groups = d.supergroup.selectAll('.bar-group');
    });
}
