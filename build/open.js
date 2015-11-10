(function (root, factory) {  
	if(typeof define === "function" && define.amd) {    
		define(["d3"], factory);  
	} 
	else if(typeof module === "object" && module.exports) {    
		module.exports = factory(require("d3"));  
	} 
	else {    
		root.webCharts = factory(root.d3);  }
	}(this, function(d3){

