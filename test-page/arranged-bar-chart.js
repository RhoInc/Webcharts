const settings = function(arrange) {
    return {
        ordinal: {
            type: 'ordinal',
            column: 'AEREL',
            label: 'Relationship',
        },
        linear: {
            type: 'linear',
            column: null,
            label: '# of Adverse Events',
        },
        marks: [
            {
                type: 'bar',
                per: ['AEREL'],
                summarizeX: 'count',
                summarizeY: 'count',
                tooltip: null,
                split: 'AESEV',
                arrange: arrange,
            },
        ],
        color_by: 'AESEV',
        legend: {
            label: 'Severity',
            order: ['MILD', 'MODERATE', 'SEVERE'],
        },
        resizable: false,
        aspect: 2,
    };
};

const onLayout = function() {
    this.wrap.select('.legend')
        .append('button')
        .classed('randomize-bar-order', true)
        .text('Randomize Bar Order')
        .on('click', () => {
            let randomOrder = this.colorScale.domain().sort(() => Math.random() < .5 ? -1 : 1);
            while (this.config.legend.order.join('|') === randomOrder.join('|')) {
                randomOrder = this.colorScale.domain().sort(() => Math.random() < .5 ? -1 : 1)
            }
            this.config.legend.order = randomOrder;
            this.draw();
        });
};
