fetch('https://raw.githubusercontent.com/RhoInc/data-library/master/data/miscellaneous/climate-data.csv')
    .then(response => response.text())
    .then(text => d3.csv.parse(text))
    .then(data => {
        const settings = {
            x: {
                type: 'time',
                column: 'DATE',
                label: 'Date'
            },
            y: {
                type: 'linear',
                column: 'Monthly Mean',
                label: 'Mean Temperature'
            },
            marks: [
                {
                    type: 'line',
                    per: ['STATION_NAME'],
                    summarizeY: 'mean'
                },
                {
                    type: 'circle',
                    per: ['STATION_NAME', 'DATE'],
                    summarizeY: 'mean'
                }
            ],
            color_by: 'STATION_NAME',
            color_dom: null,
            legend: {
                label: 'Measurement Location',
                location: 'top'
            },
            date_format: '%Y%m',
            aspect: 3,
        };
        const chart = new webCharts.createChart(
            '#container',
            settings,
        );
        chart.init(data);
    });

