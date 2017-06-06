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
    mark_summarizeX = ['mean','median','min','max','sum','count','cumulative','percentmark_value']
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


def main():
    create_index_html()

#############################################################################

if __name__ == "__main__":
    main()
