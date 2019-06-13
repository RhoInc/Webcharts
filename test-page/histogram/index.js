const settings = {
    x: {
        type: 'linear',
        column: 'sepal length',
        label: 'Sepal Length',
        bin: 15,
        format: '.1f',
        //behavior: 'flex'
    },
    y: {
        type: 'linear',
        label: '# of Observations',
        behavior: 'flex',
        domain: [0],
    },
    marks: [
        {
            type: 'bar',
            per: ['sepal length'],
            summarizeY: 'count',
            tooltip: '$y observations around $x',
            attributes: {
                'fill-opacity': .75
            },
        },
    ],
    aspect: 3,
    gridlines: 'y',
    x_domain: 'raw',
};

const controls = new webCharts.createControls(
    '#container',
    {
        inputs: [
            {
                type: 'subsetter',
                value_col: 'species',
                label: 'Species',
            },
            {
                type: 'radio',
                option: 'x_domain',
                label: 'X-domain',
                values: ['raw', 'filtered', 'custom'],
            },
            {
                type: 'number',
                option: 'x.domain.0',
                label: 'Lower Limit',
            },
            {
                type: 'number',
                option: 'x.domain.1',
                label: 'Upper Limit',
            },
        ],
    },
);

const chart = new webCharts.createChart(
    '#container',
    settings,
    controls,
);

chart.on('layout', function() {
    const context = this;

    this.controls.xDomain = this.controls.wrap.selectAll('.control-group')
        .filter(function(d) {
            return d.label === 'X-domain';
        })
        .selectAll('.changer')
        .on('change', function(d) {
            context.config.x_domain = d;
            context.draw();
        });

    this.controls.limits = this.controls.wrap.selectAll('.control-group')
        .filter(function(d) {
            return d.label.indexOf('Limit') > -1;
        })
        .selectAll('.changer')
        .on('change', function(d) {
            context.config.x_domain = 'custom';
            context.controls.xDomain
                .property('checked', function(di) {
                    return di === 'custom';
                });
            context.config.x.domain[+d.option.split('.').pop()] = +this.value;
            context.draw();
        });
});

chart.on('preprocess', function() {
    const context = this;

    if (this.config.x_domain === 'filtered') {
        this.filtered_data = this.raw_data;
        this.filters.forEach(function(filter) {
            if (filter.val !== 'All')
                context.filtered_data = context.filtered_data
                    .filter(function(d) {
                        return filter.val === d[filter.col];
                    });
        });
    }

    if (this.config.x_domain !== 'custom') {
        this.config.x.domain = d3.extent(
            this[this.config.x_domain + '_data'],
            function(d) {
                return d[context.config.x.column];
            }
        );
    }

    this.controls.limits
        .property('value', function(d) {
            return context.config.x.domain[+d.option.split('.').pop()];
        });
});

chart.on('resize', function() {
    const context = this;
    this.svg.selectAll('.bin-boundary, .x.axis .tick').remove();
    this.current_data
        .sort(function(a,b) {
            return a.rangeLow - b.rangeLow;
        })
        .reduce(
            function(acc,cur) {
                if (acc.indexOf(cur.rangeLow) < 0)
                    acc.push(cur.rangeLow);
                if (acc.indexOf(cur.rangeHigh) < 0)
                    acc.push(cur.rangeHigh);
                return acc;
            },
            []
        )
        .forEach(function(d,i) {
            context.svg
                .append('text')
                .datum(d)
                .classed('bin-boundary', true)
                .attr({
                    x: context.x(d),
                    y: context.plot_height,
                    dy: 16,
                    'text-anchor': 'middle'
                })
                .text(d3.format(context.config.x.format)(d));
        });
});

d3.csv(
    'https://cdn.jsdelivr.net/gh/RhoInc/data-library/data/miscellaneous/iris.csv',
    function(d,i) {
        d.seq = i;
        return d;
    },
    function(data) {
        chart.config.x.domain = d3.extent(data, function(d) { return +d['sepal length']; });
        chart.init(data);
    }
);
