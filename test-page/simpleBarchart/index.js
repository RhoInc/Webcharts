d3.csv(
    './OlympicMedals2018.csv',
    function(d) {
        return d;
    },
    function(data) {
        const settings = {
            marks: [
                {
                    type: 'bar',
                    per: ['country_code'],
                    tooltip: '[country_code] won $ medals'
                }
            ],
            resizable: false,
        };
        const linearAxis = {
            type: 'linear',
            label: 'Total Gold Medals',
            column: 'n_combined_gold',
        };
        const ordinalAxis = {
            type: 'ordinal',
            label: 'Country (IOC code)',
            column: 'country_code',
            sort: 'total-descending',
            range_band: 15,
        };

        // controls
        const controls = new webCharts.createControls(
            '.controls',
            {
                inputs: [
                    {
                        type: 'dropdown',
                        label: 'Variable',
                        option: 'column',
                        require: true,
                        values: Object.keys(data[0]).filter(key => key !== 'country_code'),
                    },
                    {
                        type: 'dropdown',
                        label: 'Sort',
                        option: 'sort',
                        require: true,
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

        // ordinal y-axis
        const verticalSettings = JSON.parse(JSON.stringify(settings));
        verticalSettings.linearAxis = 'x';
        verticalSettings.ordinalAxis = 'y';
        verticalSettings.x = Object.assign({}, linearAxis);
        verticalSettings.y = Object.assign({}, ordinalAxis);
        verticalSettings.marks[0].tooltip = verticalSettings.marks[0].tooltip.replace('$', '$x');
        verticalSettings.gridlines = 'x';
        const verticalChart = webCharts.createChart(
            '.chart--vertical',
            verticalSettings,
            controls
        );
        verticalChart.init(data);

        // ordinal x-axis
        const horizontalSettings = JSON.parse(JSON.stringify(settings));
        horizontalSettings.linearAxis = 'y';
        horizontalSettings.ordinalAxis = 'x';
        horizontalSettings.x = Object.assign({}, ordinalAxis);
        horizontalSettings.y = Object.assign({}, linearAxis);
        horizontalSettings.marks[0].tooltip = horizontalSettings.marks[0].tooltip.replace('$', '$y');
        horizontalSettings.gridlines = 'y';
        horizontalSettings.height = 500;
        horizontalSettings.margin = {
            bottom: 150,
            left: 100,
        };
        const horizontalChart = webCharts.createChart(
            '.chart--horizontal',
            horizontalSettings,
            controls
        );
        horizontalChart.on('resize', function() {
            this.svg
                .selectAll('.x.axis .tick text')
                .attr('transform', 'rotate(-45) translate(-5,-5)')
                .style('text-anchor', 'end');
        });
        horizontalChart.init(data);

        const variableControl = controls.wrap
            .selectAll('.control-group select')
            .filter(d => d.label === 'Variable');
        variableControl.selectAll('option').property('selected', d => d === linearAxis.column);
        variableControl
            .on('change', function(d) {
                controls.targets.forEach(target => {
                    target.config[target.config.linearAxis].column = this.value;
                    target.draw();
                });
            });
        const sortControl = controls.wrap
            .selectAll('.control-group select')
            .filter(d => d.label === 'Sort');
        sortControl.selectAll('option').property('selected', d => d === ordinalAxis.sort);
        sortControl
            .on('change', function(d) {
                controls.targets.forEach(target => {
                    target.config[target.config.ordinalAxis].sort = this.value;
                    target.draw();
                });
            });
    }
);
