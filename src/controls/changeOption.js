export function changeOption(option, value){

  this.targets.forEach(e => {
  	if(option instanceof Array){
  		option.forEach(o => this.stringAccessor(e.config, o, value) );
  	}
  	else{
    	this.stringAccessor(e.config, option, value);
    }
    e.draw();
  });

}
