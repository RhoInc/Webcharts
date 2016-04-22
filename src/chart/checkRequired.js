import { select } from 'd3';

export default function checkRequired(data) {
  const colnames = Object.keys(data[0]);
  const requiredVars = [];
  const requiredCols = [];
  if (this.config.x.column) {
    requiredVars.push('this.config.x.column');
    requiredCols.push(this.config.x.column);
  }
  if (this.config.y.column) {
    requiredVars.push('this.config.y.column');
    requiredCols.push(this.config.y.column);
  }
  if (this.config.color_by) {
    requiredVars.push('this.config.color_by');
    requiredCols.push(this.config.color_by);
  }
  this.config.marks.forEach((e, i) => {
    if (e.per && e.per.length) {
      e.per.forEach((p, j) => {
        requiredVars.push(`this.config.marks[${i}].per[${j}]`);
        requiredCols.push(p);
      });
    }
    if (e.split) {
      requiredVars.push(`this.config.marks[${i}].split`);
      requiredCols.push(e.split);
    }
  });

  requiredCols.forEach((e, i) => {
    if (colnames.indexOf(e) < 0) {
      select(this.div).select('.loader').remove();
      const errorMessage = `The value "${e}" for the ${requiredVars[i]} setting does not match any column in the provided dataset.`;
      this.wrap.append('div')
          .style('color', 'red')
          .html(errorMessage);
      throw new Error(`Error in configuration object: ${errorMessage}`);
    }
  });
}
