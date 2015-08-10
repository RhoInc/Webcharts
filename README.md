Webcharts is a charting library built on top of <a href="https://github.com/mbostock/d3">D3.js</a> that offers a simple way to create reusable, flexible, interactive charts with JavaScript. Charts can be customized with a handful of settings and extended through callback functions. Webcharts can also create sets of controls that are tied to charts to dynamically manipulate chart data, appearance, or behavior.

## How to Use
Like D3, Webcharts can be used modern browsers (IE9+, Chrome, Firefox, etc.) either in the global namespace:

    <script type='text/javascript' src='http://d3js.org/d3.v3.min.js'></script> <!--include d3 first-->
    <script type='text/javascript' src='webcharts.js'></script>

or with an AMD module loader like [Require.js](http://requirejs.org/):

    require.config({paths: {webCharts: "webcharts"}});

	require(["webCharts"], function(webCharts) {
	  console.log(webCharts.version);
	});

Webcharts also exports itself as a CommonJS module for compatibility with Node:

	npm install webCharts
	----
	var webCharts = require('webCharts');

## Documentation
See the <a href="https://github.com/RhoInc/Webcharts/wiki">wiki</a> for API documentation

## Examples
[Lab Results Over Time with Interactive Normal Ranges](http://graphics.rhoworld.com/tools/labnormals)

[Immunologic Outcomes Explorer](http://graphics.rhoworld.com/studies/leap/figure3)