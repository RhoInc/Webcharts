
//---------------------------------bar_chart_testConfig.js_template-----------------------------------------------------------------
var testConfig = [


//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: mean, SummarizeX mean',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'mean',
		  SummarizeY: 'mean',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: mean, SummarizeX median',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'median',
		  SummarizeY: 'mean',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: mean, SummarizeX min',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'min',
		  SummarizeY: 'mean',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: mean, SummarizeX max',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'max',
		  SummarizeY: 'mean',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: mean, SummarizeX sum',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'sum',
		  SummarizeY: 'mean',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: mean, SummarizeX count',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'count',
		  SummarizeY: 'mean',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: mean, SummarizeX cumulative',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'cumulative',
		  SummarizeY: 'mean',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: mean, SummarizeX percent',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'percent',
		  SummarizeY: 'mean',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: median, SummarizeX mean',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'mean',
		  SummarizeY: 'median',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: median, SummarizeX median',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'median',
		  SummarizeY: 'median',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: median, SummarizeX min',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'min',
		  SummarizeY: 'median',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: median, SummarizeX max',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'max',
		  SummarizeY: 'median',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: median, SummarizeX sum',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'sum',
		  SummarizeY: 'median',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: median, SummarizeX count',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'count',
		  SummarizeY: 'median',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: median, SummarizeX cumulative',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'cumulative',
		  SummarizeY: 'median',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: median, SummarizeX percent',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'percent',
		  SummarizeY: 'median',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: min, SummarizeX mean',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'mean',
		  SummarizeY: 'min',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: min, SummarizeX median',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'median',
		  SummarizeY: 'min',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: min, SummarizeX min',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'min',
		  SummarizeY: 'min',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: min, SummarizeX max',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'max',
		  SummarizeY: 'min',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: min, SummarizeX sum',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'sum',
		  SummarizeY: 'min',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: min, SummarizeX count',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'count',
		  SummarizeY: 'min',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: min, SummarizeX cumulative',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'cumulative',
		  SummarizeY: 'min',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: min, SummarizeX percent',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'percent',
		  SummarizeY: 'min',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: max, SummarizeX mean',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'mean',
		  SummarizeY: 'max',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: max, SummarizeX median',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'median',
		  SummarizeY: 'max',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: max, SummarizeX min',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'min',
		  SummarizeY: 'max',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: max, SummarizeX max',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'max',
		  SummarizeY: 'max',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: max, SummarizeX sum',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'sum',
		  SummarizeY: 'max',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: max, SummarizeX count',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'count',
		  SummarizeY: 'max',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: max, SummarizeX cumulative',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'cumulative',
		  SummarizeY: 'max',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: max, SummarizeX percent',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'percent',
		  SummarizeY: 'max',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: sum, SummarizeX mean',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'mean',
		  SummarizeY: 'sum',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: sum, SummarizeX median',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'median',
		  SummarizeY: 'sum',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: sum, SummarizeX min',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'min',
		  SummarizeY: 'sum',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: sum, SummarizeX max',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'max',
		  SummarizeY: 'sum',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: sum, SummarizeX sum',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'sum',
		  SummarizeY: 'sum',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: sum, SummarizeX count',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'count',
		  SummarizeY: 'sum',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: sum, SummarizeX cumulative',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'cumulative',
		  SummarizeY: 'sum',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: sum, SummarizeX percent',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'percent',
		  SummarizeY: 'sum',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: count, SummarizeX mean',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'mean',
		  SummarizeY: 'count',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: count, SummarizeX median',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'median',
		  SummarizeY: 'count',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: count, SummarizeX min',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'min',
		  SummarizeY: 'count',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: count, SummarizeX max',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'max',
		  SummarizeY: 'count',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: count, SummarizeX sum',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'sum',
		  SummarizeY: 'count',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: count, SummarizeX count',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'count',
		  SummarizeY: 'count',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: count, SummarizeX cumulative',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'cumulative',
		  SummarizeY: 'count',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: count, SummarizeX percent',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'percent',
		  SummarizeY: 'count',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: cumulative, SummarizeX mean',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'mean',
		  SummarizeY: 'cumulative',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: cumulative, SummarizeX median',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'median',
		  SummarizeY: 'cumulative',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: cumulative, SummarizeX min',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'min',
		  SummarizeY: 'cumulative',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: cumulative, SummarizeX max',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'max',
		  SummarizeY: 'cumulative',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: cumulative, SummarizeX sum',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'sum',
		  SummarizeY: 'cumulative',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: cumulative, SummarizeX count',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'count',
		  SummarizeY: 'cumulative',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: cumulative, SummarizeX cumulative',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'cumulative',
		  SummarizeY: 'cumulative',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: cumulative, SummarizeX percent',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'percent',
		  SummarizeY: 'cumulative',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: percent, SummarizeX mean',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'mean',
		  SummarizeY: 'percent',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: percent, SummarizeX median',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'median',
		  SummarizeY: 'percent',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: percent, SummarizeX min',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'min',
		  SummarizeY: 'percent',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: percent, SummarizeX max',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'max',
		  SummarizeY: 'percent',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: percent, SummarizeX sum',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'sum',
		  SummarizeY: 'percent',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: percent, SummarizeX count',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'count',
		  SummarizeY: 'percent',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: percent, SummarizeX cumulative',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'cumulative',
		  SummarizeY: 'percent',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'SummarizeY: percent, SummarizeX percent',    
	notes: 'Plotting  against ',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'linear',
        label: 'Chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'Weight',
		},
      marks: [
        {
          type: 'circle',
		  per: ['weight'],
		  SummarizeX: 'percent',
		  SummarizeY: 'percent',
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



];