export const linear_linear = {
    x: {
        type: 'linear',
        column: 'Sepal.Length',
        label: 'Sepal Length'
    },
    y: {
        type: 'linear',
        column: 'Sepal.Width',
        label: 'Sepal Width'
    },
    marks: [
        {
            type: 'circle',
            per: ['Sepal.Length', 'Sepal.Width'],
            summarizeX: 'mean',
            summarizeY: 'mean'
        },
        {
            type: 'circle',
            per: ['Sepal.Length', 'Sepal.Width'],
            summarizeX: 'min',
            summarizeY: 'min'
        },
        {
            type: 'circle',
            per: ['Sepal.Length', 'Sepal.Width'],
            summarizeX: 'max',
            summarizeY: 'max'
        },
        {
            type: 'circle',
            per: ['Sepal.Length', 'Sepal.Width'],
            summarizeX: 'sum',
            summarizeY: 'sum'
        }
    ],
    color_by: 'Species',
    legend: {}
};

export const ordinal_linear = {
    x: {
        type: 'ordinal',
        column: 'Species',
        label: 'Species'
    },
    y: {
        type: 'linear',
        column: 'Sepal.Length',
        label: 'Sepal Length'
    },
    marks: [
        {
            type: 'bar',
            per: ['Species'],
            summarizeY: 'mean'
        },
        {
            type: 'circle',
            per: ['Species'],
            summarizeY: 'min'
        },
        {
            type: 'circle',
            per: ['Species'],
            summarizeY: 'median'
        },
        {
            type: 'circle',
            per: ['Species'],
            summarizeY: 'max'
        }
    ],
    color_by: 'Species',
    legend: {},
    padding: 0,
    outer_pad: 0
};

export const linear_ordinal = {
    x: {
        type: 'linear',
        column: 'Sepal.Length',
        label: 'Sepal Length'
    },
    y: {
        type: 'ordinal',
        column: 'Species',
        label: 'Species'
    },
    marks: [
        {
            type: 'bar',
            per: ['Species'],
            summarizeX: 'mean'
        },
        {
            type: 'circle',
            per: ['Species'],
            summarizeX: 'min'
        },
        {
            type: 'circle',
            per: ['Species'],
            summarizeX: 'median'
        },
        {
            type: 'circle',
            per: ['Species'],
            summarizeX: 'max'
        }
    ],
    color_by: 'Species',
    legend: {},
    padding: 0,
    outer_pad: 0
};

export const ordinal_ordinal = {
    x: {
        type: 'ordinal',
        column: 'Species',
        label: 'Species'
    },
    y: {
        type: 'ordinal',
        column: 'Species',
        label: 'Species'
    },
    marks: [
        //{
        //    type: 'bar',
        //    per: ['Species']
        //},
        {
            type: 'circle',
            per: ['Species']
        },
        {
            type: 'text',
            per: ['Species'],
            text: '$x - $y'
        }
    ],
    color_by: 'Species',
    legend: {},
    padding: 0,
    outer_pad: 0
};
