export function changeOption(option, value){

  this.targets.forEach(e => {
    if(option.indexOf('.') !== -1){
      e.config[option.split('.')[0]][option.split('.')[1]] = value;
    }
    else{
      e.config[option] = value;
    }
    e.draw();
  });

}
