const settings = {
    x: {
        type: 'linear',
        column: 'sepal length',
        label: 'Sepal Length',
        bin: 15,
        format: '.1f',
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
                'fill-opacity': .5,
                fill: 'red',
            },
            values: {
                species: 'setosa',
            },
        },
        {
            type: 'bar',
            per: ['sepal length'],
            summarizeY: 'count',
            tooltip: '$y observations around $x',
            attributes: {
                'fill-opacity': .5,
                fill: 'blue',
            },
            values: {
                species: 'versicolor',
            },
        },
        {
            type: 'bar',
            per: ['sepal length'],
            summarizeY: 'count',
            tooltip: '$y observations around $x',
            attributes: {
                'fill-opacity': .5,
                fill: 'green',
            },
            values: {
                species: 'virginica',
            },
        },
    ],
    aspect: 3,
    gridlines: 'y',
};
console.log(JSON.stringify(settings, null, 4));

const controls = new webCharts.createControls(
    '#container',
    {
        inputs: [
            {
                type: 'dropdown',
                options: [
                    'x.column',
                    'marks.0.per.0',
                ],
                label: 'Dimension',
                values: [
                    'sepal length',
                    'sepal width',
                    'petal length',
                    'petal width',
                ],
                require: true,
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
});

chart.on('preprocess', function() {
    const context = this;
});

chart.on('resize', function() {
    const context = this;
});

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
