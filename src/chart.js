import {objects} from './objects';

export var chartCount = 0;

export function createChart(element = 'body', config = {}, controls = null){

    let chart = Object.create(objects.chart);

	chart.div = element;

	chart.config = Object.create(config);

	chart.controls = controls;

	chart.raw_data = [];

	chart.filters = [];

	chart.marks = [];

	chart.wrap = d3.select(chart.div).append('div');

	chart.events = {
		onInit(){},
		onLayout(){},
		onDatatransform(){},
		onDraw(){},
		onResize(){}
	};
	
	chart.on = function(event, callback){
		let possible_events = ['init','layout', 'datatransform', 'draw', 'resize'];
		if(possible_events.indexOf(event) < 0){
			return;
		}
		if(callback){
			chart.events['on'+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
		}
	};

	//increment chart count to get unique chart id
    chartCount++;

    chart.id = chartCount;

    return chart;
}
