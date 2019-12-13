hSettings = JSON.parse(JSON.stringify(settings('grouped')));
hSettings.x = hSettings.ordinal;
hSettings.y = hSettings.linear;
hSettings.marks[0].tooltip = '$x: $y';

const hChart = new webCharts.createChart(
    '.bar-chart--horizontal',
    hSettings,
);

vSettings = JSON.parse(JSON.stringify(settings('grouped')));
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
        hChart.on('layout', onLayout);
        hChart.init(data);
        vChart.on('layout', onLayout);
        vChart.init(data);
    }
);
