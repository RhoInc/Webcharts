function createTable(element, settings) {
    var controls = webCharts.createControls(
        element,
        {
            inputs: [
                {type: 'subsetter', value_col: 'Period', label: 'Filter by Period'},
                {type: 'subsetter', value_col: 'Group', label: 'Filter by Group'}
            ]
        }
    );

    return webCharts.createTable(element, settings, controls);
}

var table = createTable(
    '.table',
    {
        'sortable': true,
        'searchable': true,
        'nRowsPerPage': 10,
        'nPageLinksDisplayed': 5,
        'pagination': true,
        'exportable': true,
        'exports': ['csv', 'xlsx'],
        'applyCSS': true,
    }
);

d3.csv(
    'https://cdn.jsdelivr.net/gh/RhoInc/data-library/data/miscellaneous/elements.csv',
    function(d) {
        return d;
    },
    function(data) {
        table.init(data);

        //Update settings.
        d3.selectAll('.controls input')
            .on('change',function(){
                var settings = {
                    sortable: d3.select('input.sortable').property('checked'),
                    searchable: d3.select('input.searchable').property('checked'),
                    nRowsPerPage: +d3.select('input.items').node().value,
                    nPageLinksDisplayed: +d3.select('input.pages').node().value,
                    pagination: d3.select('input.pagination').property('checked'),
                    exportable: d3.select('input.exportable').property('checked'),
                    applyCSS: d3.select('input.applyCSS').property('checked'),
                };

                console.log(settings);

                d3.select('.table').selectAll('*').remove()
                var table = createTable(
                    '.table',
                    settings
                );
                table.init(data);
            });
    }
);

//Randomize columns.
d3.select('button.randomize-columns')
    .on('click', function() {
        var table = d3.select('.wc-table').datum();
        table.config.cols = Object.keys(table.data.raw[0])
            .reverse()
            .filter(function(d) {
                return Math.random() >= .5;
            });
        table.config.headers = table.config.cols;
        console.log(table.config.cols);
        table.draw();
    });

//Randomize headers.
d3.select('button.randomize-headers')
    .on('click', function() {
        var table = d3.select('.wc-table').datum();
        table.config.headers = table.config.cols
            .map(function(key) {
                const strArr = [];

                for (let i = 0; i < key.length; i++) {
                    strArr.push(
                        Math.random() >= .5
                            ? key.substring(i,i+1).toUpperCase()
                            : key.substring(i,i+1).toLowerCase()
                    );
                }

                return strArr.join('');
            });
        console.log(table.config.headers);
        table.draw();
    });
