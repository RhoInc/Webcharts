import stringAccessor from '../util/stringAccessor';

export default function changeOption(option, value, callback) {
  this.targets.forEach(e => {
    if (option instanceof Array) {
      option.forEach(o => stringAccessor(e.config, o, value));
    }
    else {
      stringAccessor(e.config, option, value);
    }
    // call callback function if provided
    if (callback) {
      callback();
    }
    e.draw();
  });
}
