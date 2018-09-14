    d3.csv(
        'https://cdn.rawgit.com/RhoInc/viz-library/master/data/iris.csv',
        function(d,i) {
            d.seq = i;
            return d;
        },
        function(data) {
            webCharts.createTable('#container', {exports: ['csv', 'xlsx']}).init(data);
        }
    );
