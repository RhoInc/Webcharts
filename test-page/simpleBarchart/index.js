var settings = {
  max_width: "500",
  x: {
    label: "Total",
    type: "linear",
    column: "Total",
    domain: [0, null]
  },
  y: {
    type: "ordinal",
    column: "Country",
    sort: "total-descending"
  },
  marks: [
    {
      type: "bar",
      per: ["Country"],
      tooltip: "[Country] won [Total] medals"
    }
  ],
  gridlines: "x"
};

var medalChart = webCharts.createChart(".chart", settings);

d3.csv("OlympicMedals2012.csv", function(error, data) {
  //just keep the countries with the 10 most medals
  var sub = data.filter(function(d, i) {
    return i <= 11;
  });

  medalChart.init(sub);
});
