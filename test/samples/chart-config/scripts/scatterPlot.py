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

def create_scatter_plot():
    x_column = 'Boil'
    y_column = 'Weight'
    x_label = 'Boil'
    y_label = 'Weight'
    x_types = ['linear']
    y_types = ['linear']
    mark_type = ['circle','text']
    mark_per = ['Element','Group']


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

    fname = "./output/scatterPlot.json"

    with open(fname, 'w') as f:
        json = render_template('scatterPlot_template.json', context)
        f.write(json)

def main():
    create_scatter_plot()

#############################################################################

if __name__ == "__main__":
    main()
