var settings = {
      "max_width":"500",
      "x":{
        "label":"Protein (g)",
        "type":"linear",
        "column":"Protein (g)",
        format: '1f'
      },
      "y":{
        "label":"Carbs (g)",
        "type":"linear",
        "column":"Carbo(g)",
        format: '1f'
      },
      "marks":[
        {
          "type":"circle",
          "per":["Food"],
          "tooltip":"[Food]\n[Measure]\n$x grams protein\n$y grams carbs"
        },
        {
          type: 'text',
          text: '$x, $y',
          per: ['Food'],
          attributes: {
            'text-anchor': 'middle',
            'dx': '0.25em',
            'dy': '-0.25em'
          }
        }
      ],
      "aspect":"1",
      "gridlines":"xy"
    };
    
var calChart = webcharts.createChart('body', settings);

d3.csv('calories.csv', function(error, data){
      calChart.init(data);
});