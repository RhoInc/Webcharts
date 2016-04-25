import { select } from 'd3';

export default function draw(rawData = this.raw_data, processedData) {
  const context = this;
  const config = this.config;
  const aspect2 = 1 / config.aspect;
  // if pre-processing callback, run it now
  this.events.onPreprocess.call(this);
  // then do normal processing
  const raw = rawData || [];
  const data = processedData || this.consolidateData(raw);

  this.wrap.datum(data);

  const divWidth = parseInt(this.wrap.style('width'), 10);

  this.setColorScale();

  const maxWidth = config.max_width ? config.max_width : divWidth;
  this.raw_width = config.x.type === 'ordinal' && +config.range_band ?
    (+config.range_band + (config.range_band * config.padding)) * this.x_dom.length :
    config.resizable ?
    maxWidth :
    config.width ?
    config.width :
    divWidth;
  this.raw_height = config.y.type === 'ordinal' && +config.range_band ?
    (+config.range_band + (config.range_band * config.padding)) * this.y_dom.length :
    config.resizable ?
    maxWidth * aspect2 :
    config.height ?
    config.height :
    divWidth * aspect2;

  const pseudoWidth = this.svg.select('.overlay').attr('width') ? this.svg.select('.overlay').attr('width') : this.raw_width;
  const pseudoHeight = this.svg.select('.overlay').attr('height') ? this.svg.select('.overlay').attr('height') : this.raw_height;

  this.svg.select('.x.axis').select('.axis-title').text(() =>
    typeof config.x.label === 'string' ? config.x.label : typeof config.x.label === 'function' ? config.x.label.call(this) : null
  );
  this.svg.select('.y.axis').select('.axis-title').text(() =>
    typeof config.y.label === 'string' ? config.y.label : typeof config.y.label === 'function' ? config.y.label.call(this) : null
  );

  this.xScaleAxis(pseudoWidth);
  this.yScaleAxis(pseudoHeight);

  const eventName = `resize.${context.element}-${context.id}`;
  if (config.resizable && typeof window !== 'undefined') {
    select(window).on(eventName, () => this.resize());
  }
  else if (typeof window !== 'undefined') {
    select(window).on(eventName, null);
  }

  this.events.onDraw.call(this);
  this.resize();
}
