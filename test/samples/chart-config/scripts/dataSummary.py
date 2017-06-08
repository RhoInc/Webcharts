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


def create_dataSummary():

    mark_summarizeX = ['mean','median','min','max','sum','count','cumulative','percent']
    mark_summarizeY = ['mean','median','min','max','sum','count','cumulative','percent']

    context = {
        'mark_summarizeX':mark_summarizeX,
        'mark_summarizeY':mark_summarizeY,
    }

    fname = "./output/dataSummary.json"
    with open(fname, 'w') as f:
        html = render_template('dataSummary_template.json', context)
        f.write(html)

def main():
    create_dataSummary()

if __name__ == "__main__":
    main()
