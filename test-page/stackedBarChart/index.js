const settings = {
    ordinal: {
        type: 'ordinal',
        column: 'AEREL',
        label: 'Relationship',
    },
    linear: {
        type: 'linear',
        column: null,
        label: '# of Adverse Events',
    },
    marks: [
        {
            type: 'bar',
            per: ['AEREL'],
            summarizeX: 'count',
            summarizeY: 'count',
            tooltip: null,
            split: 'AESEV',
            arrange: 'grouped',
        },
    ],
    color_by: 'AESEV',
    legend: {
        label: 'Severity',
        order: null,
    },
    resizable: false,
    aspect: 2,
};

hSettings = JSON.parse(JSON.stringify(settings));
hSettings.x = hSettings.ordinal;
hSettings.y = hSettings.linear;
hSettings.marks[0].tooltip = '$x: $y';

const hChart = new webCharts.createChart(
    '.bar-chart--horizontal',
    hSettings,
);

vSettings = JSON.parse(JSON.stringify(settings));
vSettings.x = vSettings.linear;
vSettings.y = vSettings.ordinal;
hSettings.marks[0].tooltip = '$y: $x';

const vChart = new webCharts.createChart(
    '.bar-chart--vertical',
    vSettings,
);

d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/sdtm/ae.csv',
    function(d,i) {
        d.seq = i;
        return d;
    },
    function(data) {
        hChart.init(data);
        vChart.init(data);
    }
);
