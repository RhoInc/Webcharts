
//---------------------------------config_settings_testConfig.js_template-----------------------------------------------------------------
var testConfig = [



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:default, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:default, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:default, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:default, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:default, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:default, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:default, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:default, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:default, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:default, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:default, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:default, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:300, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:300, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:300, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:300, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:300, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:300, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:300, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:300, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:default, Max Width:300, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:300, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:300, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:default, Max Width:300, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:default, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:default, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:default, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:default, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:default, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:default, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:default, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:default, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:default, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:default, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:default, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:default, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:300, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:300, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:300, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:300, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:300, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:300, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:300, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:300, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:default, Height:500, Max Width:300, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:300, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:300, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:default, Height:500, Max Width:300, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:default, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:default, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:default, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:default, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:default, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:default, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:default, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:default, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:default, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:default, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:default, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:default, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:300, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:300, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:300, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:300, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:300, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:300, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:300, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:300, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:default, Max Width:300, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:300, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:300, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:default, Max Width:300, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  width:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:default, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:default, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:default, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:default, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:default, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:default, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:default, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:default, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:default, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:default, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:default, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:default, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:300, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:300, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:300, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:300, Margin:default, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:300, Margin:default, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:300, Margin:default, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:300, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:1.33,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:300, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:2,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: true, Width:500, Height:500, Max Width:300, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:true,
	  aspect:0.5,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:300, Margin:100, Aspect: 1.33',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:1.33,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:300, Margin:100, Aspect: 2',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:2,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



//----------------------------------------------------------------------------------------------------------------------
  {
    label: 'Resizable: false, Width:500, Height:500, Max Width:300, Margin:100, Aspect: 0.5',    
	notes: 'Testing various config settings (seen in label)',
    tests: [],
    settings: {
	  resizable:false,
	  aspect:0.5,
	  width:500,
	  height:500,
	  x: {
        column: 'Chick',
        type: 'ordinal',
        label: 'Chick',
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
        }
      ]
    },
    dataPath: '../../data/ChickWeight.csv'
  },



];

module.exports = testConfig;
