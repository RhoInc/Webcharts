import { select, format, time } from 'd3';

export default function drawText(marks) {
    const config = this.config;

    const textSupergroups = this.svg
        .selectAll('.text-supergroup')
        .data(marks, (d, i) => `${i}-${d.per.join('-')}`);

    textSupergroups.enter().append('g').attr('class', d => 'supergroup text-supergroup ' + d.id);

    textSupergroups.exit().remove();

    const texts = textSupergroups.selectAll('.text').data(d => d.data, d => d.key);
    const oldTexts = texts.exit();

    // don't need to transition position of outgoing text
    // const oldTextsTrans = config.transitions ? oldTexts.selectAll('text').transition() : oldTexts.selectAll('text');

    const oldTextGroupTrans = config.transitions ? oldTexts.transition() : oldTexts;
    oldTextGroupTrans.remove();

    const nutexts = texts.enter().append('g').attr('class', d => `${d.key} text`);
    nutexts.append('text').attr('class', 'wc-data-mark');
    // don't need to set initial location for incoming text

    // attach mark info
    function attachMarks(d) {
        d.mark = select(this.parentNode).datum();
        select(this).select('text').attr(d.mark.attributes);
    }
    texts.each(attachMarks);

    // parse text like tooltips
    texts.select('text').style('clip-path', `url(#${chart.id})`).text(d => {
        const tt = d.mark.text || '';
        const xformat = config.x.summary === 'percent'
            ? format('0%')
            : config.x.type === 'time' ? time.format(config.x.format) : format(config.x.format);
        const yformat = config.y.summary === 'percent'
            ? format('0%')
            : config.y.type === 'time' ? time.format(config.y.format) : format(config.y.format);
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
    // animated attributes
    const textsTrans = config.transitions
        ? texts.select('text').transition()
        : texts.select('text');
    textsTrans
        .attr('x', d => {
            const xPos = this.x(d.values.x) || 0;
            return config.x.type === 'ordinal' ? xPos + this.x.rangeBand() / 2 : xPos;
        })
        .attr('y', d => {
            const yPos = this.y(d.values.y) || 0;
            return config.y.type === 'ordinal' ? yPos + this.y.rangeBand() / 2 : yPos;
        });
    //add a reference to the selection from it's data
    textSupergroups.each(function(d) {
        d.supergroup = select(this);
        d.groups = d.supergroup.selectAll('g.text');
        d.texts = d.groups.select('text');
    });
    return texts;
}
