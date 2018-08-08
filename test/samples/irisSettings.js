export default {
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
            summarizeY: 'mean',
            values: {
                Species: ['setosa', 'versicolor', 'virginica']
            }
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
