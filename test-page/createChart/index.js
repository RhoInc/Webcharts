const settings = {
    x: {
        type: 'linear',
        column: 'sepal length',
        label: 'Sepal length',
        domain: ['minimum',null],
    },
    y: {
        type: 'linear',
        column: 'sepal width',
        label: 'Sepal Width',
        domain: ['minimum',null],
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
        mark: 'circle',
        location: 'bottom',
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
                type: 'radio',
                option: 'x.domain.0',
                label: 'X-domain Lower Limit',
                values: ['minimum',0],
            },
            {
                type: 'radio',
                option: 'y.domain.0',
                label: 'Y-domain Lower Limit',
                values: ['minimum',0],
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
    'https://cdn.rawgit.com/RhoInc/viz-library/master/data/iris.csv',
    function(d,i) {
        d.seq = i;
        return d;
    },
    function(data) {
        chart.init(data);
    }
);
