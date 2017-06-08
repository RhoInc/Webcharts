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




def create_sizing():
    width = ['default','500']
    height = ['default','500']
    max_width = ['default','300']
    margin = ['default','100']
    resizable = ['true','false']
    aspect = ['1.33','2','0.5']

    context = {
        'width':width,
        'height':height,
        'max_width':max_width,
        'margin':margin,
        'resizable':resizable,
        'aspect':aspect,
    }

    fname = "./output/sizing.json"
    with open(fname, 'w') as f:
        json = render_template('sizing_template.json', context)
        f.write(json)

def main():
    create_sizing();
#############################################################################

if __name__ == "__main__":
    main()
