import { keys } from 'd3';

export default function checkRequired(dataset) {
    if (!dataset[0] || !this.config.inputs) return;

    const colNames = keys(dataset[0]);

    this.config.inputs.forEach((input, i) => {
        if (input.type === 'subsetter' && colNames.indexOf(input.value_col) === -1)
            throw new Error(
                `Error in settings object: the value "${input.value_col}" does not match any column in the provided dataset.`
            );

        //Draw the chart when a control changes unless the user specifies otherwise.
        input.draw = input.draw === undefined ? true : input.draw;
    });
}
