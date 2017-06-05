#!/usr/bin/env python

import os
from jinja2 import Environment, FileSystemLoader

PATH = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_ENVIRONMENT = Environment(
    autoescape=False,
    loader=FileSystemLoader(os.path.join(PATH, 'templates')),
    trim_blocks=False)


def render_template(template_filename, context):
    return TEMPLATE_ENVIRONMENT.get_template(template_filename).render(context)


def create_index_html():
    fname = "testConfig.js"
    # x_type time not tested in template yet
    x_types = ['linear','log']
    x_column = 'Number'
    x_bin = ['','2']
    x_domain = ['','domain[0] = 0, domain[1] = 3']
    x_sort = ['','total-descending']
    x_behavior = ['raw','flex','firstfilter']
    x_label = 'Element Number (#)'
    x_format = ['','.2f']

    y_types = ['linear','log']
    y_column = 'Weight'
    y_bin = ['','2']    
    y_domain = ['','domain[0] = 0, domain[1] = 3']
    y_behavior = ['raw','flex','firstfilter']
    y_label = 'Element Number (#)'
    y_format = ['','.2f']

    mark_type = ['circle','line','bar','text']
    mark_per = 'Element'
    mark_summarizeX = ['mean','median','min','max','sum','count','cumulative','percent']
    mark_summarizeY = ['mean','median','min','max','sum','count','cumulative','percent']               
    mark_tooltip = ['','$x','$y']
    mark_text = ['','$x','$y']
    mark_attributes = []
    mark_split = []
    mark_arrange = ['stacked','grouped','nested']
    
    context = {
        'x_types':x_types,
        'x_column':x_column,
        'x_bin':x_bin,
        'x_domain':x_domain,
        'x_sort':x_sort,
        'x_behavior':x_behavior,
        'x_label':x_label,
        'x_format':x_format,

        'y_types':y_types,
        'y_column':y_column,
        'y_bin': y_bin,
        'y_domain':y_domain,
        'y_behavior':y_behavior,
        'y_label':y_label,
        'y_format':y_format,

        'mark_type':mark_type,
        'mark_per':mark_per,
        'mark_summarizeX':mark_summarizeX,
        'mark_summarizeY':mark_summarizeY,   
        'mark_tooltip':mark_tooltip,
        'mark_text':mark_text,
        'mark_attributes':mark_attributes,
        'mark_split':mark_split,
        'mark_arrange':mark_arrange
    }
    
    with open(fname, 'w') as f:
        html = render_template('index.html', context)
        f.write(html)
        

#----------------------------------------------scatter_plots----------------------------------------------------  
def create_scatter_plot():
    x_column = ''
    y_column = ''
    x_label = ''
    y_label = ''
    x_types = ['linear','log']
    y_types = ['linear','log']
    mark_type = ['circle','line','text']
    mark_per = ['Element','group']

    fname = "scatter_plot_testConfig.js"

    context = {
        'x_column':x_column,
        'y_column':y_column,
        'x_label':x_label,
        'y_label':y_label,
        'x_types':x_types,
        'y_types':y_types,
        'mark_type':mark_type,
        'mark_per':mark_per
    }
    
    with open(fname, 'w') as f:
        html = render_template('scatter_plot.html', context)
        f.write(html)

#----------------------------------------------bar_chart----------------------------------------------------------  
def create_bar_chart():
    x_column = 'Chick'
    y_column = 'weight'
    x_label = 'chick'
    y_label = 'weight'
    x_types = ['linear','log']
    y_types = ['linear','log']
    mark_type = 'bar'
    mark_split = ['','Diet']
    mark_arrange = ['stacked','grouped','nested']
    mark_summarizeX = ['mean','median','min','max','sum','count','cumulative','percent']
    mark_summarizeY = ['mean','median','min','max','sum','count','cumulative','percent']               

    
    fname = "bar_chart_testConfig.js"
    
    context = {
        'x_column':x_column,
        'y_column':y_column,
        'x_label':x_label,
        'y_label':y_label,
        'x_types':x_types,
        'y_types':y_types,
        'mark_type':mark_type,
        'mark_split':mark_split,
        'mark_arrange':mark_arrange,
        'mark_summarizeX':mark_summarizeX,
        'mark_summarizeY':mark_summarizeY
    }
    
    with open(fname, 'w') as f:
        html = render_template('bar_chart.html', context)
        f.write(html)



        
#--------------------------------------------config_settings---------------------------------------------------------------  
def create_config_settings():
    width = ['default','500']
    height = ['default','500']
    max_width = ['default','300']
    margin = ['default','100']
    resizable = ['true','false']
    aspect = ['1.33','2','0.5']
    
    fname = "config_settings_testConfig.js"
    
    context = {
        'width':width,
        'height':height,
        'max_width':max_width,
        'margin':margin,
        'resizable':resizable,
        'aspect':aspect,
    }
    
    with open(fname, 'w') as f:
        html = render_template('config_settings.html', context)
        f.write(html)

#---------------------------------------------time_axis------------------------------------------------------------  
def create_time_axis():
    y_types = ['linear','log']
    mark_type = ['circle','line','text']
    mark_per = ''
    x_format = ''
    x_label = ''
    y_label = ''

    fname = "time_axis_testConfig.js"
    
    context = {

    	'y_types':y_types,
    	'mark_type':mark_type,
 	'mark_per':mark_per,
 	'x_format':x_format,
 	'x_label':x_label,
 	'y_label':y_label,
    }
    
    with open(fname, 'w') as f:
        html = render_template('time_axis.html', context)
        f.write(html)

#--------------------------------------sumamrize_tests--------------------------------------------------------------  
def summarize_template():
    fname = "summarize_chart_testConfig.js"
    mark_summarizeX = ['mean','median','min','max','sum','count','cumulative','percent']
    mark_summarizeY = ['mean','median','min','max','sum','count','cumulative','percent']               
    context = {
        'mark_summarizeX':mark_summarizeX,
        'mark_summarizeY':mark_summarizeY,   
    }
    
    with open(fname, 'w') as f:
        html = render_template('summarize_chart.html', context)
        f.write(html)
        
#-----------------------------------------------------------------------------------------------------------------  



def main():
    create_scatter_plot()
    create_bar_chart()
    create_config_settings()
    create_time_axis()
    summarize_template()
#############################################################################

if __name__ == "__main__":
    main()
