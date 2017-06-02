
//---------------------------------bar_chart_testConfig.js_template-----------------------------------------------------------------
var testConfig = [


//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:stacked, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:stacked, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:stacked, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:stacked, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:stacked, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:stacked, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:stacked, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:stacked, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:grouped, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:grouped, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:grouped, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:grouped, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:grouped, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:grouped, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:grouped, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:grouped, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:nested, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:nested, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:nested, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:nested, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:nested, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:nested, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:nested, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:, Arrange:nested, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:stacked, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:stacked, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:stacked, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:stacked, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:stacked, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:stacked, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:stacked, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:stacked, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:grouped, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:grouped, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:grouped, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:grouped, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:grouped, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:grouped, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:grouped, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:grouped, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:nested, summarizeY: mean Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:nested, summarizeY: median Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:nested, summarizeY: min Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:nested, summarizeY: max Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:nested, summarizeY: sum Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:nested, summarizeY: count Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:nested, summarizeY: cumulative Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:log, Split:Diet, Arrange:nested, summarizeY: percent Bin: null',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'log',
        label: 'weight',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },




//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:stacked, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:stacked, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:stacked, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:stacked, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:stacked, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:stacked, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:stacked, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:stacked, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:grouped, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:grouped, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:grouped, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:grouped, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:grouped, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:grouped, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:grouped, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:grouped, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:nested, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:nested, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:nested, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:nested, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:nested, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:nested, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:nested, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:, Arrange:nested, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:stacked, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:stacked, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:stacked, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:stacked, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:stacked, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:stacked, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:stacked, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:stacked, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:grouped, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:grouped, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:grouped, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:grouped, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:grouped, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:grouped, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:grouped, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:grouped, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:nested, summarizeX: mean Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:nested, summarizeX: median Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:nested, summarizeX: min Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:nested, summarizeX: max Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:nested, summarizeX: sum Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:nested, summarizeX: count Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:nested, summarizeX: cumulative Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:log, Split:Diet, Arrange:nested, summarizeX: percent Bin: null',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'log',
        label: 'weight',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },




//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: mean, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: median, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: min, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: max, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: sum, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: count, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: cumulative, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:stacked, summarizeY: percent, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: mean, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: median, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: min, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: max, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: sum, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: count, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: cumulative, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:grouped, summarizeY: percent, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: mean, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: median, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: min, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: max, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: sum, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: count, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: cumulative, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:, Arrange:nested, summarizeY: percent, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: mean, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: median, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: min, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: max, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: sum, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: count, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: cumulative, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:stacked, summarizeY: percent, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: mean, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: median, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: min, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: max, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: sum, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: count, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: cumulative, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:grouped, summarizeY: percent, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: mean, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: median, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: min, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: max, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: sum, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: count, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: cumulative, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Y:linear, Split:Diet, Arrange:nested, summarizeY: percent, bin: 10',    
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'chick',
      },
      y: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
		},
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: mean, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: median, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: min, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: max, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: sum, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: count, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: cumulative, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:stacked, summarizeX: percent, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: mean, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: median, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: min, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: max, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: sum, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: count, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: cumulative, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:grouped, summarizeX: percent, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: mean, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: median, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: min, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: max, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: sum, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: count, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: cumulative, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:, Arrange:nested, summarizeX: percent, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: mean, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: median, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: min, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: max, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: sum, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: count, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: cumulative, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:stacked, summarizeX: percent, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'stacked'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: mean, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: median, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: min, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: max, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: sum, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: count, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: cumulative, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:grouped, summarizeX: percent, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'grouped'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: mean, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: median, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: min, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: max, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: sum, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: count, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: cumulative, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'X:linear, Split:Diet, Arrange:nested, summarizeX: percent, Bin: 10',        
	notes: 'Plotting chick against weight',
    tests: [],
    settings: {
      max_width:500,
      x: {
        column: 'weight',
        type: 'linear',
        label: 'weight',
		bin: '10',
      },
      y: {
        column: '',
        type: 'ordinal',
        label: 'Chick',
      },
      marks: [
        {
          type: 'bar',
		  per: ['weight'],
		  
		  "split":'Diet',
		  "arrange":'nested'
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },

];