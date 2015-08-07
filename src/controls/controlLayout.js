/** Clears container div and triggers rendering of control inputs
*@memberof controls
*@method layout
*/
export function controlLayout(){
    this.wrap.selectAll('*').remove();
    this.ready = true;
   	this.controlUpdate();
}
