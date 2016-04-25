import { select, format, set, min, max } from 'd3';

export default function drawBars(marks) {
  const rawData = this.raw_data;
  const config = this.config;

  const xformat = config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1 ?
    format('0%') :
    format(config.x.format);
  const yformat = config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1 ?
    format('0%') :
    format(config.y.format);

  const barSuperGroups = this.svg.selectAll('.bar-supergroup').data(marks, (d, i) => `${i}-${d.per.join('-')}`);
  barSuperGroups.enter().append('g').attr('class', 'bar-supergroup');
  barSuperGroups.exit().remove();

  const barGroups = barSuperGroups.selectAll('.bar-group').data(d => d.data, d => d.key);
  const oldBarGroups = barGroups.exit();

  let nuBarGroups;
  let bars;

  const oldBarsTrans = config.transitions ? oldBarGroups.selectAll('.bar').transition() : oldBarGroups.selectAll('.bar');
  const oldBarGroupsTrans = config.transitions ? oldBarGroups.transition() : oldBarGroups;

  // ordinal x axis
  if (config.x.type === 'ordinal') {
    oldBarsTrans
      .attr('y', this.y(0))
      .attr('height', 0);

    oldBarGroupsTrans.remove();

    nuBarGroups = barGroups.enter().append('g').attr('class', d => `bar-group ${d.key}`);
    nuBarGroups.append('title');

    bars = barGroups.selectAll('rect').data(d =>
      (
        d.values instanceof Array ?
        d.values.sort((a, b) => this.colorScale.domain().indexOf(b.key) - this.colorScale.domain().indexOf(a.key)) :
        [d]
      )
    , d => d.key);

    const exitBars = config.transitions ? bars.exit().transition() : bars.exit();
    exitBars
      .attr('y', this.y(0))
      .attr('height', 0)
      .remove();
    bars.enter().append('rect')
      .attr('class', d => `wc-data-mark bar ${d.key}`)
      .style('clip-path', `url(#${this.id})`)
      .attr('y', this.y(0))
      .attr('height', 0)
      .append('title');

    bars
      .attr('shape-rendering', 'crispEdges')
      .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]))
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]));

    bars.each(function assignMark(d) {
      const mark = select(this.parentNode.parentNode).datum();
      d.tooltip = mark.tooltip;
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = config.legend.order ?
        config.legend.order.slice().reverse() :
        mark.values && mark.values[mark.split] ?
        mark.values[mark.split] :
        set(rawData.map(m => m[mark.split])).values();
      select(this).attr(mark.attributes);
    });

    bars.select('title').text(d => {
      const tt = d.tooltip || '';
      return tt.replace(/\$x/g, xformat(d.values.x))
        .replace(/\$y/g, yformat(d.values.y))
        .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
    });

    const barsTrans = config.transitions ?
      bars.transition() :
      bars;

    barsTrans
      .attr('x', d => {
        let position;
        let finalXPosition;
        if (!d.arrange || d.arrange === 'stacked') {
          return this.x(d.values.x);
        }
        else if (d.arrange === 'nested') {
          position = d.subcats.indexOf(d.key);
          const offset = position ?
            this.x.rangeBand() / (d.subcats.length * 0.75) / (position) :
            this.x.rangeBand();
          finalXPosition = this.x(d.values.x) + (this.x.rangeBand() - offset) / 2;
        }
        else {
          position = d.subcats.indexOf(d.key);
          finalXPosition = this.x(d.values.x) + this.x.rangeBand() / d.subcats.length * position;
        }
        return finalXPosition;
      })
      .attr('y', d => {
        let finalYPosition;
        if (d.arrange !== 'stacked') {
          finalYPosition = this.y(d.values.y);
        }
        else {
          finalYPosition = this.y(d.values.start);
        }
        return finalYPosition;
      })
      .attr('width', d => {
        let finalWidth;
        if (d.arrange === 'stacked') {
          return this.x.rangeBand();
        }
        else if (d.arrange === 'nested') {
          const position = d.subcats.indexOf(d.key);
          finalWidth = position ?
            this.x.rangeBand() / (d.subcats.length * 0.75) / (position) :
            this.x.rangeBand();
        }
        else {
          finalWidth = this.x.rangeBand() / d.subcats.length;
        }
        return finalWidth;
      })
      .attr('height', d => this.y(0) - this.y(d.values.y));
  }
  // ordinal Y axis
  else if (config.y.type === 'ordinal') {
    oldBarsTrans
      .attr('x', this.x(0))
      .attr('width', 0);

    oldBarGroupsTrans.remove();

    nuBarGroups = barGroups.enter().append('g').attr('class', d => `bar-group ${d.key}`);
    nuBarGroups.append('title');

    bars = barGroups.selectAll('rect').data(d =>
      (
        d.values instanceof Array ?
        d.values.sort((a, b) => this.colorScale.domain().indexOf(b.key) - this.colorScale.domain().indexOf(a.key)) :
        [d]
      )
    , d => d.key);

    const exitBars = config.transitions ?
      bars.exit().transition() :
      bars.exit();
    exitBars
      .attr('x', this.x(0))
      .attr('width', 0)
      .remove();
    bars.enter().append('rect')
      .attr('class', d => `wc-data-mark bar ${d.key}`)
      .style('clip-path', `url(#${this.id})`)
      .attr('x', this.x(0))
      .attr('width', 0)
      .append('title');

    bars
      .attr('shape-rendering', 'crispEdges')
      .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]))
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]));

    bars.each(function assignMark(d) {
      const mark = select(this.parentNode.parentNode).datum();
      d.arrange = mark.split && mark.arrange ?
        mark.arrange :
        mark.split ?
        'grouped' :
        null;
      d.subcats = config.legend.order ?
        config.legend.order.slice().reverse() :
        mark.values && mark.values[mark.split] ?
        mark.values[mark.split] :
        set(rawData.map(m => m[mark.split])).values();
      d.tooltip = mark.tooltip;
    });

    bars.select('title').text(d => {
      const tt = d.tooltip || '';
      return tt.replace(/\$x/g, xformat(d.values.x))
        .replace(/\$y/g, yformat(d.values.y))
        .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
    });

    const barsTrans = config.transitions ?
      bars.transition() :
      bars;

    barsTrans
      .attr('x', d => {
        let finalXPosition;
        if (d.arrange === 'stacked' || !d.arrange) {
          finalXPosition = d.values.start !== undefined ?
            this.x(d.values.start) :
            this.x(0);
        }
        else {
          finalXPosition = this.x(0);
        }
        return finalXPosition;
      })
      .attr('y', d => {
        let finalYPosition;
        let position;
        if (d.arrange === 'nested') {
          position = d.subcats.indexOf(d.key);
          const offset = position ?
            this.y.rangeBand() / (d.subcats.length * 0.75) / (position) :
            this.y.rangeBand();
          finalYPosition = this.y(d.values.y) + (this.y.rangeBand() - offset) / 2;
        }
        else if (d.arrange === 'grouped') {
          position = d.subcats.indexOf(d.key);
          finalYPosition = this.y(d.values.y) + this.y.rangeBand() / d.subcats.length * position;
        }
        else {
          return this.y(d.values.y);
        }
        return finalYPosition;
      })
      .attr('width', d => this.x(d.values.x) - this.x(0))
      .attr('height', d => {
        let finalHeight;
        if (config.y.type === 'quantile') {
          finalHeight = 20;
        }
        else if (d.arrange === 'nested') {
          const position = d.subcats.indexOf(d.key);
          finalHeight = position ?
            this.y.rangeBand() / (d.subcats.length * 0.75) / (position) :
            this.y.rangeBand();
        }
        else if (d.arrange === 'grouped') {
          finalHeight = this.y.rangeBand() / d.subcats.length;
        }
        else {
          finalHeight = this.y.rangeBand();
        }
        return finalHeight;
      });
  }
  // x is linear and a bin is defined
  else if (config.x.type === 'linear' && config.x.bin) {
    oldBarsTrans
      .attr('y', this.y(0))
      .attr('height', 0);

    oldBarGroupsTrans.remove();

    nuBarGroups = barGroups.enter().append('g').attr('class', d => `bar-group ${d.key}`);
    nuBarGroups.append('title');

    bars = barGroups.selectAll('rect').data(d => d.values instanceof Array ? d.values : [d], d => d.key);

    const exitBars = config.transitions ?
      bars.exit().transition() :
      bars.exit();

    exitBars
      .attr('y', this.y(0))
      .attr('height', 0)
      .remove();

    bars.enter().append('rect')
      .attr('class', d => `wc-data-mark bar ${d.key}`)
      .style('clip-path', `url(#${this.id})`)
      .attr('y', this.y(0))
      .attr('height', 0)
      .append('title');

    bars
      .attr('shape-rendering', 'crispEdges')
      .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]))
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]));

    bars.each(function assignMark(d) {
      const mark = select(this.parentNode.parentNode).datum();

      d.arrange = mark.split ?
        mark.arrange :
        null;

      d.subcats = config.legend.order ?
        config.legend.order.slice().reverse() :
        mark.values && mark.values[mark.split] ?
        mark.values[mark.split] :
        set(rawData.map(m => m[mark.split])).values();

      select(this).attr(mark.attributes);

      const parent = select(this.parentNode).datum();
      const rangeSet = parent.key.split(',').map(m => +m);

      d.rangeLow = min(rangeSet);
      d.rangeHigh = max(rangeSet);
      d.tooltip = mark.tooltip;
    });

    bars.select('title').text(d => {
      const tt = d.tooltip || '';
      return tt.replace(/\$x/g, xformat(d.values.x))
        .replace(/\$y/g, yformat(d.values.y))
        .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
    });

    const barsTrans = config.transitions ?
      bars.transition() :
      bars;

    barsTrans
      .attr('x', d => this.x(d.rangeLow))
      .attr('y', d => {
        let finalYPosition;
        if (d.arrange !== 'stacked') {
          finalYPosition = this.y(d.values.y);
        }
        else {
          finalYPosition = this.y(d.values.start);
        }
        return finalYPosition;
      })
      .attr('width', d => this.x(d.rangeHigh) - this.x(d.rangeLow))
      .attr('height', d => this.y(0) - this.y(d.values.y));
  }
  // y is linear and bin is defined
  else if (config.y.type === 'linear' && config.y.bin) {
    oldBarsTrans
      .attr('x', this.x(0))
      .attr('width', 0);
    oldBarGroupsTrans.remove();

    nuBarGroups = barGroups.enter().append('g').attr('class', d => `bar-group ${d.key}`);
    nuBarGroups.append('title');

    bars = barGroups.selectAll('rect').data(d => d.values instanceof Array ? d.values : [d], d => d.key);

    const exitBars = config.transitions ? bars.exit().transition() : bars.exit();
    exitBars
      .attr('x', this.x(0))
      .attr('width', 0)
      .remove();
    bars.enter().append('rect')
      .attr('class', d => `wc-data-mark bar ${d.key}`)
      .style('clip-path', `url(#${this.id})`)
      .attr('x', this.x(0))
      .attr('width', 0)
      .append('title');

    bars
      .attr('shape-rendering', 'crispEdges')
      .attr('stroke', d => this.colorScale(d.values.raw[0][config.color_by]))
      .attr('fill', d => this.colorScale(d.values.raw[0][config.color_by]));

    bars.each(function assignMark(d) {
      const mark = select(this.parentNode.parentNode).datum();
      d.arrange = mark.split ? mark.arrange : null;
      d.subcats = config.legend.order ?
        config.legend.order.slice().reverse() :
        mark.values && mark.values[mark.split] ?
        mark.values[mark.split] :
        set(rawData.map(m => m[mark.split])).values();
      const parent = select(this.parentNode).datum();
      const rangeSet = parent.key.split(',').map(m => +m);
      d.rangeLow = min(rangeSet);
      d.rangeHigh = max(rangeSet);
      d.tooltip = mark.tooltip;
    });

    bars.select('title').text(d => {
      const tt = d.tooltip || '';
      return tt.replace(/\$x/g, xformat(d.values.x))
        .replace(/\$y/g, yformat(d.values.y))
        .replace(/\[(.+?)\]/g, (str, orig) => d.values.raw[0][orig]);
    });

    const barsTrans = config.transitions ? bars.transition() : bars;
    barsTrans
      .attr('x', d => {
        let finalXPosition;
        if (d.arrange === 'stacked') {
          finalXPosition = this.x(d.values.start);
        }
        else {
          finalXPosition = this.x(0);
        }
        return finalXPosition;
      })
      .attr('y', d => this.y(d.rangeHigh))
      .attr('width', d => this.x(d.values.x))
      .attr('height', d => this.y(d.rangeLow) - this.y(d.rangeHigh));
  }
  else {
    oldBarsTrans
      .attr('y', this.y(0))
      .attr('height', 0);
    oldBarGroupsTrans.remove();
    barSuperGroups.remove();
  }
}
