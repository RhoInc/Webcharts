const settings = {
    x: {
        type: 'linear',
        column: 'sepal length',
        label: 'Sepal length',
        domain: null,
        format: '.1f',
    },
    y: {
        type: 'linear',
        column: 'sepal width',
        label: 'Sepal Width',
        domain: null,
        format: '.1f',
    },
    marks: [
        {
            type: 'circle',
            per: ['seq'],
            tooltip: '$x,$y',
        },
    ],
    color_by: 'species',
    legend: {
        label: 'Species',
    },
    aspect: 3,
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
                type: 'number',
                option: 'x.domain.0',
                label: 'X-domain Lower Limit',
            },
            {
                type: 'number',
                option: 'x.domain.1',
                label: 'X-domain Upper Limit',
            },
            {
                type: 'number',
                option: 'y.domain.0',
                label: 'Y-domain Lower Limit',
            },
            {
                type: 'number',
                option: 'y.domain.1',
                label: 'Y-domain Upper Limit',
            },
        ],
    },
);

const chart = new webCharts.createChart(
    '#container',
    settings,
    controls,
);

d3.csv(
    'https://cdn.jsdelivr.net/gh/RhoInc/data-library/data/miscellaneous/iris.csv',
    function(d,i) {
        d.seq = i;
        return d;
    },
    function(data) {
        chart.config.x.domain = d3.extent(data, d => +d[chart.config.x.column]);
        chart.config.y.domain = d3.extent(data, d => +d[chart.config.y.column]);
        chart.on('layout', function() {
            this.controls.wrap
                .selectAll('.control-group input')
                .filter(d => d.type === 'number')
                .attr('step', .1);
        });
        chart.init(data);
    }
);
