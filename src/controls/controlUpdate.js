export function controlUpdate(){
  if(this.config.inputs && this.config.inputs.length && this.config.inputs[0])
    this.config.inputs.forEach(e => this.makeControlItem(e) );
}
