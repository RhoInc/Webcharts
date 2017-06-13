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


def create_time_axis():
    y_types = ['linear','log']
    mark_type = ['circle','line','text']
    mark_per = ''
    x_format = ''
    x_label = ''
    y_label = ''

    context = {
    'y_types':y_types,
    'mark_type':mark_type,
 	'mark_per':mark_per,
 	'x_format':x_format,
 	'x_label':x_label,
 	'y_label':y_label,
    }

    fname = "./output/timeAxis.json"
    with open(fname, 'w') as f:
        json = render_template('timeAxis_template.json', context)
        f.write(json)

def main():
    create_time_axis()

if __name__ == "__main__":
    main()
