export default function controlUpdate() {
    if (this.config.inputs && this.config.inputs.length && this.config.inputs[0])
        this.config.inputs.forEach(input => this.makeControlItem(input));
}
