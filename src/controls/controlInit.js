/** Begins 
*@memberof controls
*@method init
*@param {Array} [raw] raw data to be used to populate control inputs
*/
export function controlInit(raw){
  	this.data = raw;
    if(!this.config.builder)
  	 this.checkRequired(this.data);
  	this.layout();
}
