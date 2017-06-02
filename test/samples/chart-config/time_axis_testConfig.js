
//---------------------------------bar_chart_testConfig.js_template-----------------------------------------------------------------
var testConfig = [


//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Mark Type: circle',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
	  resizable:true,
	  width:500,
	  height:500,
      max_width:500,
      x: {
        column: 'DATE',
        type: 'time',
        label: 'date',
		format: "%b'%y",
      },
      y: {
        column: 'Monthly Mean',
        type: 'linear',
        label: 'Monthly Mean',
		},
		date_format: "%Y%m",
      marks: [
        {
          type: 'circle',
		  per: ["DATE"],
		  
        }
      ]
    },
    dataPath: '../../data/climate_data.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Mark Type: line',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
	  resizable:true,
	  width:500,
	  height:500,
      max_width:500,
      x: {
        column: 'DATE',
        type: 'time',
        label: 'date',
		format: "%b'%y",
      },
      y: {
        column: 'Monthly Mean',
        type: 'linear',
        label: 'Monthly Mean',
		},
		date_format: "%Y%m",
      marks: [
        {
          type: 'line',
		  per: [],
		  
        }
      ]
    },
    dataPath: '../../data/climate_data.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Mark Type: text',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
	  resizable:true,
	  width:500,
	  height:500,
      max_width:500,
      x: {
        column: 'DATE',
        type: 'time',
        label: 'date',
		format: "%b'%y",
      },
      y: {
        column: 'Monthly Mean',
        type: 'linear',
        label: 'Monthly Mean',
		},
		date_format: "%Y%m",
      marks: [
        {
          type: 'text',
		  per: ["DATE"],
		  text:'$y',
		  
        }
      ]
    },
    dataPath: '../../data/climate_data.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Mark Type: circle',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
	  resizable:true,
	  width:500,
	  height:500,
      max_width:500,
      x: {
        column: 'DATE',
        type: 'time',
        label: 'date',
		format: "%b'%y",
      },
      y: {
        column: 'Monthly Mean',
        type: 'log',
        label: 'Monthly Mean',
		},
		date_format: "%Y%m",
      marks: [
        {
          type: 'circle',
		  per: ["DATE"],
		  
        }
      ]
    },
    dataPath: '../../data/climate_data.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Mark Type: line',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
	  resizable:true,
	  width:500,
	  height:500,
      max_width:500,
      x: {
        column: 'DATE',
        type: 'time',
        label: 'date',
		format: "%b'%y",
      },
      y: {
        column: 'Monthly Mean',
        type: 'log',
        label: 'Monthly Mean',
		},
		date_format: "%Y%m",
      marks: [
        {
          type: 'line',
		  per: [],
		  
        }
      ]
    },
    dataPath: '../../data/climate_data.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Mark Type: text',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
	  resizable:true,
	  width:500,
	  height:500,
      max_width:500,
      x: {
        column: 'DATE',
        type: 'time',
        label: 'date',
		format: "%b'%y",
      },
      y: {
        column: 'Monthly Mean',
        type: 'log',
        label: 'Monthly Mean',
		},
		date_format: "%Y%m",
      marks: [
        {
          type: 'text',
		  per: ["DATE"],
		  text:'$y',
		  
        }
      ]
    },
    dataPath: '../../data/climate_data.csv'
  },



{
    label: 'Y:linear, Mark Type: bar, Mark Per:  ',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
	  resizable:true,
	  width:500,
	  height:500,
      max_width:500,
      x: {
        column: 'DATE',
        type: 'time',
        label: 'date',
		format: "%b'%y",
      },
      y: {
        column: 'Monthly Mean',
        type: 'ordinal',
        label: 'Monthly Mean',
		},
		date_format: "%Y%m",
      marks: [
        {
          type: 'bar',
		  per: ["DATE"],
		  
        }
      ]
    },
    dataPath: '../../data/climate_data.csv'
  },

];