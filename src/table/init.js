import { select, range } from 'd3';
import searchable from './searchable/index';
import exportable from './exportable/index';
import sortable from './sortable/index';
import pagination from './pagination/index';

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

    //Define default settings.
    this.setDefaults.call(this, data[0]);

    //Assign classes to container element.
    this.wrap.classed('wc-chart', true).classed('wc-table', this.config.applyCSS);

    //Define data object.
    this.data = {
        raw: data
    };

    //Attach searchable object to table object.
    this.searchable = searchable.call(this);

    //Attach sortable object to table object.
    this.sortable = sortable.call(this);

    //Attach pagination object to table object.
    this.pagination = pagination.call(this);

    //Attach pagination object to table object.
    this.exportable = exportable.call(this);

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
