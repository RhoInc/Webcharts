export function changeOption(option, value){

  this.targets.forEach(e => {
    this.stringAccessor(e.config, option, value);
    e.draw();
  });

}
