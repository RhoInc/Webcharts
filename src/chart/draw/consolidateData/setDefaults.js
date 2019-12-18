export default function setDefaults() {
    // x
    this.config.x = this.config.x || {};
    this.config.x.label =
        this.config.x.label !== undefined ? this.config.x.label : this.config.x.column;
    this.config.x.sort = this.config.x.sort || 'alphabetical-ascending';
    this.config.x.type = this.config.x.type || 'linear';
    this.config.x.range_band = this.config.x.range_band || this.config.range_band;

    // y
    this.config.y = this.config.y || {};
    this.config.y.label =
        this.config.y.label !== undefined ? this.config.y.label : this.config.y.column;
    this.config.y.sort = this.config.y.sort || 'alphabetical-descending';
    this.config.y.type = this.config.y.type || 'linear';
    this.config.y.range_band = this.config.y.range_band || this.config.range_band;

    // marks
    this.config.marks = this.config.marks && this.config.marks.length ? this.config.marks : [{}];
    this.config.marks.forEach(function(m, i) {
        m.id = m.id ? m.id : 'mark' + (i + 1);
        m.checkColumns = m.checkColumns !== false ? true : false;
    });

    //legend
    this.config.legend = this.config.legend || {};
    this.config.legend.label =
        this.config.legend.label !== undefined ? this.config.legend.label : this.config.color_by;
    this.config.legend.location =
        this.config.legend.location !== undefined ? this.config.legend.location : 'bottom';
    this.config.legend.mark =
        this.config.legend.mark !== undefined &&
        typeof this.config.legend.mark === 'string' &&
        ['bar', 'square', 'circle', 'line'].includes(this.config.legend.mark.toLowerCase())
            ? this.config.legend.mark.toLowerCase().replace('bar', 'square')
            : this.config.marks[0].type !== undefined &&
              typeof this.config.marks[0].type === 'string' &&
              ['bar', 'circle', 'line'].includes(this.config.marks[0].type.toLowerCase())
            ? this.config.marks[0].type.toLowerCase().replace('bar', 'square')
            : 'square';

    // dimensions
    this.config.margin = this.config.margin || {};

    // miscellaneous
    this.config.date_format = this.config.date_format || '%x';

    this.config.padding = this.config.padding !== undefined ? this.config.padding : 0.3;
    this.config.outer_pad = this.config.outer_pad !== undefined ? this.config.outer_pad : 0.1;

    this.config.resizable = this.config.resizable !== undefined ? this.config.resizable : true;

    this.config.aspect = this.config.aspect || 1.33;

    this.config.colors = this.config.colors || [
        'rgb(102,194,165)',
        'rgb(252,141,98)',
        'rgb(141,160,203)',
        'rgb(231,138,195)',
        'rgb(166,216,84)',
        'rgb(255,217,47)',
        'rgb(229,196,148)',
        'rgb(179,179,179)'
    ];

    this.config.scale_text = this.config.scale_text === undefined ? true : this.config.scale_text;
    this.config.transitions =
        this.config.transitions === undefined ? true : this.config.transitions;
}
