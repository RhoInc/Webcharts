import { keys } from 'd3';

export default function checkRequired(dataset) {
    if (!dataset[0] || !this.config.inputs) {
        return;
    }
    let colnames = keys(dataset[0]);
    this.config.inputs.forEach((e, i) => {
        if (e.type === 'subsetter' && colnames.indexOf(e.value_col) === -1) {
            throw new Error(
                'Error in settings object: the value "' +
                    e.value_col +
                    '" does not match any column in the provided dataset.'
            );
        }

        //draw the chart when a control changes unless the user specifies otherwise
        e.draw = e.draw == undefined ? true : e.draw;
    });
}
