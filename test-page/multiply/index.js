    const settings = {
        x: {
            type: 'linear',
            column: 'sepal length',
            label: 'Sepal length',
        },
        y: {
            type: 'linear',
            column: 'sepal width',
            label: 'Sepal Width',
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
        aspect: 1,
    };

    const chart = new webCharts.createChart(
        '#container',
        settings
    );

    d3.csv(
        'https://cdn.rawgit.com/RhoInc/viz-library/master/data/iris.csv',
        function(d,i) {
            d.seq = i;
            return d;
        },
        function(data) {
            webCharts.multiply(chart, data, 'species');
        }
    );
