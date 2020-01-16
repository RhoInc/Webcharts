d3.csv(
    './OlympicMedals2018.csv',
    function(d) {
        return d;
    },
    function(data) {
        const settings = {
            max_width: '500',
            x: {
                type: 'linear',
                label: 'Total Gold Medals',
                column: 'n_combined_gold',
                domain: [0, null],
            },
            y: {
                type: 'ordinal',
                label: 'Country (IOC code)',
                column: 'country_code',
                sort: 'total-descending',
                range_band: 10,
            },
            marks: [
                {
                    type: 'bar',
                    per: ['country_code'],
                    tooltip: '[country_code] won [n_combined_gold] medals'
                }
            ],
            gridlines: 'x'
        };

        const controls = new webCharts.createControls(
            '.chart',
            {
                inputs: [
                    {
                        type: 'dropdown',
                        label: 'Variable',
                        option: 'x.column',
                        require: true,
                        values: Object.keys(data[0]).filter(key => key !== 'country_code'),
                    },
                    {
                        type: 'radio',
                        label: 'Sort',
                        option: 'y.sort',
                        values: [
                            'alphabetical-ascending',
                            'alphabetical-descending',
                            'total-ascending',
                            'total-descending'
                        ],
                    },
                ],
            }
        );

        const chart = webCharts.createChart(
            '.chart',
            settings,
            controls
        );

        chart.on('draw', function() {
            console.log(this.config.y);
        });

        chart.init(data);
    }
);
