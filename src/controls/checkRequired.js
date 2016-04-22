export default function checkRequired(dataset) {
  if (!dataset[0] || !this.config.inputs) {
    return;
  }
  const colnames = Object.keys(dataset[0]);
  this.config.inputs.forEach(e => {
    if (e.type === 'subsetter' && colnames.indexOf(e.value_col) === -1) {
      throw new Error(`Error in settings object: the value "${e.value_col}" does not match any column in the provided dataset.`);
    }
  });
}
