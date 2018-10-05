const settings = {
    exports: ['csv', 'xlsx'],
};

const controls =  new webCharts.createControls(
    '#container',
    {
        inputs: [
            {
                type: 'subsetter',
                value_col: 'species',
                label: 'Species',
            },
        ],
    },
);

const table = webCharts.createTable(
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
        table.init(data);
    }
);
