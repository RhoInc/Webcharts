export function controlInit(data){
  	this.data = data;
    if(!this.config.builder){
  		this.checkRequired(this.data);
    }
  	this.layout();
}
