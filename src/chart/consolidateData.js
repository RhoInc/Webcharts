import naturalSorter from '../dataOps/naturalSorter';
import { set, merge, ascending, nest, min, extent } from 'd3';

export default function consolidateData(raw) {
    let config = this.config;
    let all_data = [];
    let all_x = [];
    let all_y = [];

    this.setDefaults();

    config.marks.forEach((e, i) => {
        if (e.type !== 'bar') {
            e.arrange = null;
            e.split = null;
        }
        let mark_info = e.per ? this.transformData(raw, e) : { data: [], x_dom: [], y_dom: [] };

        all_data.push(mark_info.data);
        all_x.push(mark_info.x_dom);
        all_y.push(mark_info.y_dom);
        this.marks[i] = Object.create(e);
        this.marks[i].data = mark_info.data;
        //this.marks[i] = {type: e.type, per: e.per, data: mark_info.data, split: e.split, arrange: e.arrange, order: e.order, summarizeX: e.summarizeX, summarizeY: e.summarizeY, tooltip: e.tooltip, radius: e.radius, attributes: e.attributes};
    });

    if (config.x.type === 'ordinal') {
        if (config.x.domain) {
            this.x_dom = config.x.domain;
        } else if (config.x.order) {
            this.x_dom = set(merge(all_x))
                .values()
                .sort((a, b) => ascending(config.x.order.indexOf(a), config.x.order.indexOf(b)));
        } else if (config.x.sort && config.x.sort === 'alphabetical-ascending') {
            this.x_dom = set(merge(all_x)).values().sort(naturalSorter);
        } else if (config.y.type === 'time' && config.x.sort === 'earliest') {
            this.x_dom = nest()
                .key(d => d[config.x.column])
                .rollup(d => {
                    return d.map(m => m[config.y.column]).filter(f => f instanceof Date);
                })
                .entries(this.raw_data)
                .sort((a, b) => min(b.values) - min(a.values))
                .map(m => m.key);
        } else if (!config.x.sort || config.x.sort === 'alphabetical-descending') {
            this.x_dom = set(merge(all_x)).values().sort(naturalSorter);
        } else {
            this.x_dom = set(merge(all_x)).values();
        }
    } else if (config.marks.map(m => m.summarizeX === 'percent').indexOf(true) > -1) {
        this.x_dom = [0, 1];
    } else {
        this.x_dom = extent(merge(all_x));
    }

    if (config.y.type === 'ordinal') {
        if (config.y.domain) {
            this.y_dom = config.y.domain;
        } else if (config.y.order) {
            this.y_dom = set(merge(all_y))
                .values()
                .sort((a, b) => ascending(config.y.order.indexOf(a), config.y.order.indexOf(b)));
        } else if (config.y.sort && config.y.sort === 'alphabetical-ascending') {
            this.y_dom = set(merge(all_y)).values().sort(naturalSorter);
        } else if (config.x.type === 'time' && config.y.sort === 'earliest') {
            this.y_dom = nest()
                .key(d => d[config.y.column])
                .rollup(d => {
                    return d.map(m => m[config.x.column]).filter(f => f instanceof Date);
                })
                .entries(this.raw_data)
                .sort((a, b) => min(b.values) - min(a.values))
                .map(m => m.key);
        } else if (!config.y.sort || config.y.sort === 'alphabetical-descending') {
            this.y_dom = set(merge(all_y)).values().sort(naturalSorter).reverse();
        } else {
            this.y_dom = set(merge(all_y)).values();
        }
    } else if (config.marks.map(m => m.summarizeY === 'percent').indexOf(true) > -1) {
        this.y_dom = [0, 1];
    } else {
        this.y_dom = extent(merge(all_y));
    }
}
