Webcharts is a charting library built on top of <a href="https://github.com/mbostock/d3">D3.js</a> that offers a simple way to create reusable, flexible, interactive charts with JavaScript. Charts can be customized with a handful of settings and extended through callback functions. Webcharts can also create sets of controls that are tied to charts to dynamically manipulate chart data, appearance, or behavior.

# How to Use
Like D3, Webcharts can be used modern browsers (IE9+, Chrome, Firefox, etc.) either in the global namespace:

	<!--include d3 first-->
    <script type='text/javascript' src='http://d3js.org/d3.v3.min.js'></script>
    <script type='text/javascript' src='webcharts.js'></script>

or with an AMD module loader like [Require.js](http://requirejs.org/):

    require.config({paths: {webCharts: "webcharts"}});

	require(["webCharts"], function(webCharts) {
	  console.log(webCharts.version);
	});

Webcharts also exports itself as a CommonJS module for compatibility with Node. First, install Webcharts with npm:

	npm install webCharts
	
Then, use it in your modules:

	var webCharts = require('webCharts');

# Making a Chart
Let's get right to it. A chart is created with a call to [webCharts.chart](Webcharts#webCharts.chart), a function that, passed a few arguments, returns an object that represents a chart:

	
	var settings = {
      "max_width":"500",
      "x":{
        "label":"Protein (g)",
        "type":"linear",
        "column":"Protein (g)"
      },
      "y":{
        "label":"Carbs (g)",
        "type":"linear",
        "column":"Carbo(g)"
      },
      "marks":[
        {
          "type":"circle",
          "per":["Food"],
          "tooltip":"[Food]"
        }
      ],
      "aspect":"1",
      "gridlines":"xy"
    };
    
	webCharts.chart('body', 'calories.csv', settings, null).init();

The first argument, <code>"body"</code>, tells the function where to draw the chart. This is a simple CSS selector, so it may reference a DOM element name (like in this example) or target and id or class attribute, like <code>".chart-wrapper"</code>.

The second argument, <code>"calories.csv"</code> is a path to a file containing some data. The file should contain comma-delimited values (and is therefore typically a .csv).

The third argument is a JavaScript object that sets a number of options for the chart. All of these possible options are described [here](Config). The config object in this example sets some basic options like what dataset fields should be mapped to the <code>x</code> and <code>y</code> axes, what type of <code>marks</code> should be drawn, how wide the chart can get (<code>max_width</code>, its <code>aspect</code> ratio, and where <code>gridlines</code> should be drawn.

The chart object returned by <code>webCharts.chart()</code> can then be initialized by calling its <code>init()</code> method, which triggers a set of other methods which parse the data from the data file, set up the components of the chart, and then render the chart as an SVG based on the given data and settings from the <code>config</code> object.

Behold! The code above will produce a chart like this:

![Example](example.png)

To see the real thing and look more closely at the code, [check out this gist](). There are plenty more examples below.

# Documentation
API documentation can be found right over <a href="https://github.com/RhoInc/Webcharts/wiki/Webcharts">here</a>.

# Examples
[Lab Results Over Time with Interactive Normal Ranges](http://graphics.rhoworld.com/tools/labnormals)

[Immunologic Outcomes Explorer](http://graphics.rhoworld.com/studies/leap/figure3)