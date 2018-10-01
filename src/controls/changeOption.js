export default function changeOption(option, value, callback) {
    var control = this;
    this.targets.forEach(e => {
        if (option instanceof Array) {
            option.forEach(o => this.stringAccessor(e.config, o, value));
        } else {
            this.stringAccessor(e.config, option, value);
        }
        //call callback function if provided
        if (callback) {
            callback();
        }
        if (control.draw) e.draw();
    });
}
