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

    fname = "../barChart.json"
    with open(fname, 'w') as f:
        json = render_template('barChart_template.json', context)
        f.write(json)


def main():
    create_bar_chart()
#############################################################################

if __name__ == "__main__":
    main()
