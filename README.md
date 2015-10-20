#Overview
Webcharts is a charting library built on top of <a href="https://github.com/mbostock/d3">D3.js</a> that offers a simple way to create reusable, flexible, interactive charts with JavaScript. Charts can be customized with a handful of settings and extended through callback functions. Webcharts can also create sets of controls that are tied to charts to dynamically manipulate chart data, appearance, or behavior.

# How to Use
Like D3, Webcharts can be used in modern browsers (IE9+, Chrome, Firefox, etc.) either in the global namespace:
```html
<!--include d3 first-->
<script type='text/javascript' src='http://d3js.org/d3.v3.min.js'></script>
<script type='text/javascript' src='webcharts.js'></script>
```

or with an AMD module loader like [Require.js](http://requirejs.org/):
```javascript
require.config({paths: {webCharts: "webcharts"}});

require(["webCharts"], function(webCharts) {
   console.log(webCharts.version);
});
```

Webcharts also exports itself as a CommonJS module for compatibility with Node. First, install Webcharts with npm:
```bash
npm install webCharts
```
	
Then, use it in your modules:
```javascript
var webCharts = require('webCharts');
```

# Making a Chart
Let's get right to it. A chart is created with a call to [webCharts.createChart](https://github.com/RhoInc/Webcharts/wiki/Webcharts#webchartscreatechartelement-config-controls), a function that, passed a few arguments, returns an object that represents a chart:

```javascript	
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
d3.csv('calories.csv',function(error,csv){
    webCharts.createChart('body', settings).init(csv);
})
```
    
The first argument, <code>"body"</code>, tells the function where to draw the chart. This is a simple CSS selector, so it may reference a DOM element name (like in this example) or target and id or class attribute, like <code>".chart-wrapper"</code>.

The second argument is a JavaScript object that sets a number of options for the chart. All of the possible configuration options are described [here](Chart-Configuration). The config object in this example sets some basic options like what dataset fields should be mapped to the <code>x</code> and <code>y</code> axes, what type of <code>marks</code> should be drawn, how wide the chart can get (<code>max_width</code>), its <code>aspect</code> ratio, and where <code>gridlines</code> should be drawn.

The chart object returned by [webCharts.createChart](Webcharts#webchartscreatechartelement-config-controls) can then be initialized passing data to the chart via its <code>init()</code> method. The <code>init</code> method triggers a set of other methods which bind the data to the chart, set up the components of the chart, and then render the chart as an SVG based on the given data and settings from the <code>config</code> object.

Behold! The code above will produce a chart like this:

![Example](https://github.com/RhoInc/Webcharts/wiki/example.png)

To see the real thing and look more closely at the code, [check out this gist](http://bl.ocks.org/nbryant/aeaf8d734d7600ca3afa). There are plenty more examples below.

# Documentation
API documentation can be found <a href="https://github.com/RhoInc/Webcharts/wiki/Webcharts-API">here</a>.  Related libraries and a gallery of examples are [here](https://github.com/RhoInc/Webcharts/wiki/Gallery). 
