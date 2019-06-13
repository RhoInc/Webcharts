export default {
    x: {
        type: 'linear',
        column: 'Sepal.Length',
        bin: 15
    },
    y: {
        type: 'linear',
        behavior: 'flex',
        domain: [0]
    },
    marks: [
        {
            type: 'bar',
            per: ['Sepal.Length'],
            summarizeY: 'count'
        }
    ]
};
