/** Maniuplates the config objects for each associated chart and calls their .draw() methods to trigger re-rendering
*@memberof controls
*@method changeOption
*@param {string} option property of the config object to change
*@param {*} value the new value to assign to the given option
*/
export function changeOption(option, value){

  this.targets.forEach(e => {
    if(option.indexOf('.') !== -1)
      e.config[option.split('.')[0]][option.split('.')[1]] = value;
    else
      e.config[option] = value;
    e.draw();
  });

}
