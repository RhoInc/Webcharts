export default function setDefault(setting, _default_ = true) {
    this.config[setting] = this.config[setting] !== undefined ? this.config[setting] : _default_;
}
