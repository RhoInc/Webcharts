# Overview

This folder contains scripts that automate the creation of valid webcharts configuration objects for testing using jinja templates

# file summary

The following files are required for each test suite.

- A python script (e.g. `./barChart.py`) defines the relevant properties for a given test suite and outputs the config objects
- A jinja template (e.g.`./templates/barChart_tempalte.json`) provides the framework for creating the config objects
- The configuration json objects (e.g. `../barChart.json`) are structured as an array of objects, where each object is a valid webcharts config object.
 		  
# instructions

To generate a set of configuration objects:

1.  Install Python
2.  Install jinja2 (Ensure Python recognizes the jinja module)
3.  Open the python IDLE and run the python script (`run barChart.py`) or run the script from the command line (`python3 barChart.py`). Note that this will overwrite the existing file (if any).
