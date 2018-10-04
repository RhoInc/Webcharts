export default function changeOption(option, value, callback, draw) {
    var control = this;
    this.targets.forEach(target => {
        if (option instanceof Array) {
            option.forEach(o => this.stringAccessor(target.config, o, value));
        } else {
            this.stringAccessor(target.config, option, value);
        }
        //call callback function if provided
        if (callback) {
            callback();
        }
        if (draw) target.draw();
    });
}
