import { select, range } from 'd3';

export default function (data) {
  if (select(this.div).select('.loader').empty()) {
    select(this.div).insert('div', ':first-child')
      .attr('class', 'loader')
      .selectAll('.blockG').data(range(8))
        .enter().append('div')
        .attr('class', d => `blockG rotate${(d + 1)}`);
  }

  this.wrap.attr('class', 'wc-chart');

  this.setDefaults();

  this.raw_data = data;

  this.events.onInit.call(this);
  if (this.raw_data.length) {
    this.checkRequired(this.raw_data);
  }

  // connect this chart and its controls, if any
  if (this.controls) {
    this.controls.targets.push(this);
    if (!this.controls.ready) {
      this.controls.init(this.raw_data);
    }
    else {
      this.controls.layout();
    }
  }

  // make sure container is visible (has height and width) before trying to initialize
  const visible = select(this.div).property('offsetWidth') > 0;
  if (!visible) {
    console.warn(`The chart cannot be initialized inside an element with 0 width.
     The chart will be initialized as soon as the container element is given a width > 0.`);
    const onVisible = setInterval(() => {
      const visibleNow = select(this.div).property('offsetWidth') > 0;
      if (visibleNow) {
        this.layout();
        this.wrap.datum(this);
        this.draw();
        clearInterval(onVisible);
      }
    }, 500);
  }
  else {
    this.layout();
    this.wrap.datum(this);
    this.draw();
  }

  return this;
}
