var settings = {
  "sortable":true,
  "searchable":true,
  "exportable":true,
  "exports": ['csv', 'xlsx'],
  "pagination":true,
  "nRowsPerPage":10,
  "nPageLinksDisplayed":5
};

var controls = webCharts.createControls(".chart",	{
		location: 'top',
		inputs:[
      {type: "subsetter", value_col: "Period", label: "Filter by Period"},
      {type: "subsetter", value_col: "Group", label: "Filter by Group"}
		]
	})

d3.csv('https://cdn.jsdelivr.net/gh/RhoInc/data-library/data/miscellaneous/elements.csv', function(error, data) {
  var table = webCharts.createTable(".chart", settings,controls);

  //Randomize columns.
    d3.select('button.randomize-columns')
        .on('click', function() {
            table.config.cols = Object.keys(data[0])
                .reverse()
                .filter(function(d) {
                    return Math.random() >= .5;
                });
            table.config.headers = table.config.cols;
            console.log(table.config.cols);
            table.draw(data);
        });

  //Randomize headers.
    d3.select('button.randomize-headers')
        .on('click', function() {
            table.config.headers = table.config.cols
                .map(function(key) {
                    const
                        strArr = [];

                    for (let i = 0; i < key.length; i++) {
                        strArr.push(
                            Math.random() >= .5
                                ? key.substring(i,i+1).toUpperCase()
                                : key.substring(i,i+1).toLowerCase());
                    }

                    return strArr.join('');
                });
            console.log(table.config.headers);
            table.draw(data);
        });

  table.init(data);

  d3.selectAll(".controls input").on("change",function(){
    settings.sortable = d3.select("input.sortable").property("checked")
    settings.searchable = d3.select("input.searchable").property("checked")
    settings.exportable = d3.select("input.exportable").property("checked")
    settings.pagination = d3.select("input.pagination").property("checked")
    settings.nRowsPerPage = +d3.select("input.items").node().value
    settings.nPageLinksDisplayed = +d3.select("input.pages").node().value
    settings.applyCSS = d3.select("input.applyCSS").property("checked")

    console.log(settings)

    d3.select(".chart").selectAll("*").remove()
    var controls = webCharts.createControls(".chart",	{
    		location: 'top',
    		inputs:[
          {type: "subsetter", value_col: "Period", label: "Filter by Period"},
          {type: "subsetter", value_col: "Group", label: "Filter by Group"}
    		]
    	})
    var table = webCharts.createTable(".chart", settings, controls);
    table.init(data);
  })
})
