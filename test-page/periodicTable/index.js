const settings = {
    x: {
        column: 'Group',
        type: 'ordinal',
        label: 'Group',
        sort: 'alphabetical-ascending'
    },
    y: {
        column: 'Period',
        type: 'ordinal',
        label: 'Period',
        sort: 'alphabetical-descending'
    },
    marks: [
        {
            type: 'circle',
            per: [
                'Element'
            ],
            radius: 14,
            attributes: {
                fill: 'none',
                'stroke-width': 3,
            },
        },
        {
            type: 'text',
            per: [
                'Element'
            ],
            attributes: {
                dy: 5,
                'text-anchor': 'middle',
            },
            text: '[Symbol]',
        },
    ],
    color_by: 'Group',
    aspect: 3,
}

const chart = new webCharts.createChart(
    '#container',
    settings,
);

d3.csv(
    'https://cdn.jsdelivr.net/gh/RhoInc/data-library/data/miscellaneous/elements.csv',
    function(d,i) {
        d.seq = i;
        return d;
    },
    function(data) {
        chart.init(data.filter(d => d.Group !== ''));
    }
);
