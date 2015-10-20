    var dataElement = ".graphic-wrapper";

    var settingsSCR = {
      max_width: 700,
      x: {column: "wc_value", type: "linear"},
      y: {column: "SITEID", type: "ordinal"},
      marks: [
        {type: "bar", per: ["SITEID"], split: "wc_category", arrange: "nested"}
      ],
      color_by: "wc_category",
      legend: {order: ["SCREEN", "RAND", "TARGET"]}
    };
    d3.csv("sample_SCRandRAND.csv", function(e,d){
      var long = webCharts.dataOps.lengthenRaw(d, ["SCREEN", "RAND", "TARGET"]);
      console.log(long);
      webCharts.createChart(dataElement, settingsSCR).init(long);
    });

    var dataPath = "http://interactive.it.rhoworld.com/dev/tools/chartmanager/uploads/2015-07-13_15:33:25___CTOTC09_CRF_FORMS.csv";
    var settings = {
      "max_width":600, resizable: true, range_band: 22, height: 500,
      "x":{"label":"","sort":"total-ascending","type":"ordinal","column":"SITE", behavior: 'firstfilter'},
      "y":{"sort":"alphabetical-descending","type":"linear","domain":[0,null],behavior: 'firstfilter', label: 'cheese', format: ''},
      "margin":{},
      "legend":{"label":"FORM_STATUS","mark":"square", order: ['Received', 'Outstanding < 60 days', 'Outstanding >= 60 days']},
      "marks":[
        {
          "arrange":"nested",
          "split":"FORM_STATUS",
          "type":"bar",
          "per":["SITE"],
          attributes: {"fill-opacity": 0.8},
          tooltip: 'x: $x\ny: $y\nevery day my form status be [FORM_STATUS]',
          // summarizeX: 'mean',
          summarizeY: 'count'
        }
      ],
      scale_text: true,
      "color_by":"FORM_STATUS",
      "colors":["#fc8d59","#ffffbf","#91cf60"].reverse()
    };
    var settings2 = {
      "max_width":600, resizable: true, range_band: 22, height: 500,
      "y":{"label":"","sort":"total-descending","type":"ordinal","column":"SITE", behavior: 'raw'},
      "x":{"sort":"total-descending","type":"linear","domain":[0,null],behavior: 'raw', label: 'cheese'},
      "margin":{},
      "legend":{"label":"FORM_STATUS","mark":"square", order: ['Received', 'Outstanding < 60 days', 'Outstanding >= 60 days']},
      "marks":[
        {
          "arrange":"nested",
          "split":"FORM_STATUS",
          "type":"bar",
          "per":["SITE"],
          attributes: {"fill-opacity": 0.8},
          tooltip: 'x: $x\ny: [SITE]\nevery day my form status be [FORM_STATUS]',
          // summarizeX: 'mean',
          summarizeX: 'count'
        }
      ],
      scale_text: true,
      "color_by":"FORM_STATUS",
      "colors":["#fc8d59","#ffffbf","#91cf60"].reverse()
    };

    var settingsT = {
      "max_width":"800",
      range_band: 20,
      "y":{
        "label":"",
        "type":"ordinal",
        "column":"STATION_NAME",
        "sort": "total-descending"
      },
      "x":{
        "label":"Max Temp",
        "type":"linear",
        "column":"EMXT",
        "domain": [0,null]
      },
      date_format: "%Y%m",
      "marks":[
        {
          "type":"bar",
          "per":["STATION_NAME"],
          "tooltip":"[STATION_NAME]\n$x",
          summarizeX: "max"
        }
      ]
    };
    var controlsT = webCharts.createControls(dataElement, {location: 'top', inputs:[
      {type: 'dropdown', option: 'y.column', label: 'Y Values', values: ["MMNT", "MMXT", "MNTM"]}
      ]});
    var tempChart = webCharts.createChart(dataElement, settingsT, controlsT);
    tempChart.on('resize', tempChart.clickTable);
    d3.csv('593576.csv', function(e,d){
      tempChart.init(d);
    });

    var settingsDJ = {
      x: {column: "Month", type: "time", label: "", format: "%x"},
      y: {column: "Close", type: "linear"},
      marks: [
        {type: "line", per: [], summarizeY: "mean", attributes: {stroke: 'black'}},
        // {type: "line", per: [], summarizeY: "min", attributes: {'stroke-dasharray': '5,5', stroke: 'blue'}},
        // {type: "line", per: [], summarizeY: "max", attributes: {'stroke-dasharray': '5,5', stroke: 'red'}},
        {type: "circle", per: ["Month"], summarizeY: "max", attributes: {fill: 'red', stroke: 'red'}, tooltip: "$x: $y"},
        {type: "circle", per: ["Month"], summarizeY: "min", attributes: {fill: 'blue', stroke: 'blue'}, radius: 2, tooltip: "$x: $y"}
      ],
      // max_width: 500,
      aspect: 2,
      gridlines: 'y',
      resizable: false,
      width: 300
    };
    var lc = webCharts.createChart(dataElement, settingsDJ, null);
    d3.csv('DJIA.csv', function(e,d){
      var filtered = d.filter(function(f){
        return new Date(f.Date) >= new Date('01/01/2000');
      });
      filtered.forEach(function(e){
        e.Year = d3.time.year(new Date(e.Date));
        e.Month = d3.time.month(new Date(e.Date));
      });
      lc.init(filtered);
    });
   

    var controls = webCharts.createControls(dataElement, {location: '',
        inputs: [
            {label: "Site", type: "subsetter", value_col: "SITE"},
            {label: 'Range band', type: 'number', option: 'range_band'},
            {label: "Y Axis", type: "dropdown", option: "marks.0.summarizeY", values: ["count", "percent"], require: true},
            {label: "Y Axis", type: "radio", option: "marks.0.summarizeY", values: ["count", "mean", "percent"], require: true},
            {label: "x Axis", type: "btngroup", option: "marks.0.summarizeX", values: ["count", "percent"], require: true},
            {label: "sort", type: "btngroup", option: "y.sort", values: ["total-descending", "alphabetical-descending"], require: true},
            {label: 'scale text', type: 'checkbox', option: 'scale_text'},
            {label: 'y label', type: 'text', option: 'y.label'}
        ]
    });
    var me = webCharts.createChart(dataElement, settings, controls);
    var me2 = webCharts.createChart(dataElement, settings2, controls);
    // me2.on('resize', butts)
    me2.config.colors = null;
    // me2.config.width = null;
    me2.config.max_width = 500;
    me2.config.range_band = null;
    d3.csv(dataPath, function(e,d){
      me.init(d);
      me2.init(d);

    });

     me.on('resize', function(){
      // this.adjustTicks( "x", null, null,60, "");
      // this.highlightMarks();
    });
    

// var dataPath2 = "http://interactive.it.rhoworld.com/dev/tools/chartmanager/uploads/2015-07-13_15:03:08___VIS.csv";
// var settings2 = {"max_width":"800","x":{"label":"","type":"ordinal","column":"AVISIT"},"y":{"label":"","sort":"alphabetical-descending","type":"linear","summary":"percent","domain":[0,null], column: "STUDYID"},"margin":{},"legend":{"label":"Status","mark":"square","highlight_on_hover":true,"order":["Expected","In Window","Out of Window","Overdue"]},"marks":[{"arrange":"stacked","split":"CAT","per":["AVISIT"],"type":"bar"}],"reference_regions":[],"date_format":"%x","padding":0.3,"outer_pad":0.1,"resizable":true,"aspect":"2","flex_point_size":4,"flex_stroke_width":2,"color_by":"CAT","colors":["#2b83ba","#abdda4","#fdae61","#d7191c"]};
// var bob = webCharts.createChart(dataElement, settings2, null);
// d3.csv(dataPath2, function(e,d){
//   bob.init(d);
// });


var dataPath3 = "http://interactive.it.rhoworld.com/dev/tools/chartmanager/uploads/2015-07-13_12:43:04___anly_per_mock.csv";
var settings3 = {
  "width":"200",resizable: false,
  "x":{"label":"eNO at Rand","sort":"alphabetical-ascending","type":"linear","column":"eno.rand"},
  "y":{"label":"Cat IgE","sort":"alphabetical-descending","type":"linear","summary":"mean","column":"cat.ige"},
  "margin":{},
  "legend":{"label":"Group","mark":"circle","highlight_on_hover":true},
  "marks":[{"arrange":null,"split":null,"type":"circle","per":["recruitid"]}],
  "aspect":"1",
  "color_by":"group.mock","gridlines":"xy","colors":["#fc8d59","#ffffbf","#91bfdb"]
};
var s = webCharts.createChart(dataElement, settings3);
d3.csv(dataPath3, function(e,d){
  console.log(s);
  webCharts.multiply(s, d, "site");
});

