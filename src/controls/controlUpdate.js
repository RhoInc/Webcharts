/** Triggers rendering of each input as defined by the <code>inputs</code> array in {@link webCharts~controls.config config}
*@memberof controls
*@method controlUpdate
*/
export function controlUpdate(){
  if(this.config.inputs && this.config.inputs.length && this.config.inputs[0]){
    this.config.inputs.forEach(e => this.makeControlItem(e) );
  }
}
