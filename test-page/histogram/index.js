const settings = {
    x: {
        type: 'linear',
        column: 'sepal length',
        label: 'Sepal Length',
        bin: 15,
        format: '.1f',
        domain: [3, 10],
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
        },
    ],
    aspect: 3,
    gridlines: 'y',
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
            //{
            //    type: 'radio',
            //    option: 'x.domain.0',
            //    label: 'X-domain Lower Limit',
            //    values: ['minimum',0],
            //},
            //{
            //    type: 'radio',
            //    option: 'y.domain.0',
            //    label: 'Y-domain Lower Limit',
            //    values: ['minimum',0],
            //},
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
        chart.init(data);
    }
);
