fetch('https://raw.githubusercontent.com/RhoInc/data-library/master/data/miscellaneous/climate-data.csv')
    .then(response => response.text())
    .then(text => d3.csv.parse(text))
    .then(data => {
        const h_settings = {
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
                location: 'bottom'
            },
            date_format: '%Y%m',
            aspect: 4,
            resizable: false,
        };
        const h_chart = new webCharts.createChart(
            '.time-series--horizontal',
            h_settings,
        );
        h_chart.init(data);

        const v_settings = {
            y: {
                type: 'time',
                column: 'DATE',
                label: 'Date'
            },
            x: {
                type: 'linear',
                column: 'Monthly Mean',
                label: 'Mean Temperature'
            },
            marks: [
                {
                    type: 'line',
                    per: ['STATION_NAME'],
                    summarizeX: 'mean'
                },
                {
                    type: 'circle',
                    per: ['STATION_NAME', 'DATE'],
                    summarizeX: 'mean'
                }
            ],
            color_by: 'STATION_NAME',
            color_dom: null,
            legend: {
                label: 'Measurement Location',
                location: 'bottom'
            },
            date_format: '%Y%m',
            aspect: 1,
            resizable: false,
        };
        const v_chart = new webCharts.createChart(
            '.time-series--vertical',
            v_settings,
        );
        v_chart.init(data);
    });

