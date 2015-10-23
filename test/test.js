var dataPath = "anly_per_mock.csv";
var settings = {
  width: 300,
  resizable: false,
  "x":{"label":"eNO at Rand","sort":"alphabetical-ascending","type":"linear","column":"eno.rand"},
  "y":{"label":"Cat IgE","sort":"alphabetical-descending","type":"linear","summary":"mean","column":"cat.ige"},
  "legend":{"label":"Group","mark":"circle","highlight_on_hover":true},
  "marks":[{"type":"circle","per":["recruitid"]}],
  "aspect":"1",
  "color_by":"group.mock","gridlines":"xy","colors":["#fc8d59","#ffffbf","#91bfdb"]
};
var myChart = webCharts.createChart('.graphic-wrapper', settings);
d3.csv(dataPath, function(e,d){
  myChart.init(d);
});