export default function(data) {
    this.data = data;
    if (!this.config.builder) {
        this.checkRequired(this.data);
    }
    this.layout();
}
