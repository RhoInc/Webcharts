import { select, range } from 'd3';
import pagination from './pagination/index';

export default function init(data, test = false) {
    if (select(this.div).select('.loader').empty()) {
        select(this.div)
            .insert('div', ':first-child')
            .attr('class', 'loader')
            .selectAll('.blockG')
            .data(range(8))
            .enter()
            .append('div')
            .attr('class', d => 'blockG rotate' + (d + 1));
    }

    this.wrap.attr('class', 'wc-chart wc-table');

    this.setDefaults();

    //Attach pagination object to table object.
    this.pagination = pagination;

    this.data = {
        raw: data,
        passed: data,
        filtered: data,
        paginated: data.filter((d, i) => i < this.pagination.settings.nRows)
    };

    let startup = data => {
        //connect this table and its controls, if any
        if (this.controls) {
            this.controls.targets.push(this);
            if (!this.controls.ready) {
                this.controls.init(this.data.raw);
            } else {
                this.controls.layout();
            }
        }

        //make sure container is visible (has height and width) before trying to initialize
        var visible = select(this.div).property('offsetWidth') > 0 || test;
        if (!visible) {
            console.warn(
                `The table cannot be initialized inside an element with 0 width. The table will be initialized as soon as the container element is given a width > 0.`
            );
            var onVisible = setInterval(i => {
                let visible_now = select(this.div).property('offsetWidth') > 0;
                if (visible_now) {
                    this.layout();
                    this.wrap.datum(this);
                    this.draw();
                    clearInterval(onVisible);
                }
            }, 500);
        } else {
            this.layout();
            this.wrap.datum(this);
            this.draw();
        }
    };

    this.events.onInit.call(this);
    if (this.data.raw.length) {
        this.checkRequired(this.data.raw);
    }
    startup(data);

    return this;
}
