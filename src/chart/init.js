import { select, range } from 'd3';

export default function init(data, test = false) {
    this.test = test;

    if (
        select(this.div)
            .select('.loader')
            .empty()
    ) {
        select(this.div)
            .insert('div', ':first-child')
            .attr('class', 'loader')
            .selectAll('.blockG')
            .data(range(8))
            .enter()
            .append('div')
            .attr('class', d => 'blockG rotate' + (d + 1));
    }

    this.wrap.attr('class', 'wc-chart');

    this.setDefaults();

    this.raw_data = data;
    this.initial_data = data;

    let startup = data => {
        //connect this chart and its controls, if any
        if (this.controls) {
            this.controls.targets.push(this);
            if (!this.controls.ready) {
                this.controls.init(this.raw_data);
            } else {
                this.controls.layout();
            }
        }

        //make sure container is visible (has height and width) before trying to initialize
        var visible = select(this.div).property('offsetWidth') > 0 || test;
        if (!visible) {
            console.warn(
                `The chart cannot be initialized inside an element with 0 width. The chart will be initialized as soon as the container element is given a width > 0.`
            );
            var onVisible = setInterval(i => {
                let visible_now = select(this.div).property('offsetWidth') > 0;
                if (visible_now) {
                    this.layout();
                    this.draw();
                    clearInterval(onVisible);
                }
            }, 500);
        } else {
            this.layout();
            this.draw();
        }
    };

    this.events.onInit.call(this);
    if (this.raw_data.length) {
        this.checkRequired(this.raw_data);
    }
    startup(data);

    return this;
}
