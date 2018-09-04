import { select } from 'd3';

export default function draw(raw_data, processed_data) {
    const chart = this;
    const config = this.config;

    //if pre-processing callback, run it now
    this.events.onPreprocess.call(this);

    /////////////////////////
    // Data prep  pipeline //
    /////////////////////////

    // if user passed raw_data to chart.draw(), use that, otherwise use chart.raw_data
    const raw = raw_data ? raw_data : this.raw_data ? this.raw_data : [];

    // warn the user about the perils of "processed_data"
    if (processed_data) {
        console.warn(
            "Drawing the chart using user-defined 'processed_data', this is an experimental, untested feature."
        );
    }

    //Call consolidateData - this applies filters from controls and prepares data for each set of marks.
    this.consolidateData(raw);

    /////////////////////////////
    // Prepare scales and axes //
    /////////////////////////////

    let div_width = parseInt(this.wrap.style('width'));

    this.setColorScale();

    let max_width = config.max_width ? config.max_width : div_width;
    this.raw_width = config.x.type === 'ordinal' && +config.x.range_band
        ? (+config.x.range_band + config.x.range_band * config.padding) * this.x_dom.length
        : config.resizable ? max_width : config.width ? config.width : div_width;
    this.raw_height = config.y.type === 'ordinal' && +config.y.range_band
        ? (+config.y.range_band + config.y.range_band * config.padding) * this.y_dom.length
        : config.resizable
          ? max_width * (1 / config.aspect)
          : config.height ? config.height : div_width * (1 / config.aspect);

    let pseudo_width = this.svg.select('.overlay').attr('width')
        ? this.svg.select('.overlay').attr('width')
        : this.raw_width;
    let pseudo_height = this.svg.select('.overlay').attr('height')
        ? this.svg.select('.overlay').attr('height')
        : this.raw_height;

    this.svg.select('.x.axis').select('.axis-title').text(d => {
        return typeof config.x.label === 'string'
            ? config.x.label
            : typeof config.x.label === 'function' ? config.x.label.call(this) : null;
    });
    this.svg.select('.y.axis').select('.axis-title').text(d => {
        return typeof config.y.label === 'string'
            ? config.y.label
            : typeof config.y.label === 'function' ? config.y.label.call(this) : null;
    });

    this.xScaleAxis(pseudo_width);
    this.yScaleAxis(pseudo_height);

    if (config.resizable && typeof window !== 'undefined') {
        select(window).on('resize.' + this.element + this.id, function() {
            chart.resize();
        });
    } else if (typeof window !== 'undefined') {
        select(window).on('resize.' + this.element + this.id, null);
    }

    this.events.onDraw.call(this);

    //////////////////////////////////////////////////////////////////////
    // Call resize - updates marks on the chart (amongst other things) //
    /////////////////////////////////////////////////////////////////////
    this.resize();
}
