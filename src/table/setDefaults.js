export default function setDefaults() {
    //Pagination settings
    this.config.nRowsPerPage = this.config.nRowsPerPage || 10; // number of rows displayed per page
    this.config.nPageLinksDisplayed = this.config.nPageLinksDisplayed || 5; // number of rows displayed per page

    //Chart settings we probably don't need.
    this.config.margin = this.config.margin || {};
    this.config.padding = this.config.padding !== undefined ? this.config.padding : 0.3;
    this.config.outer_pad = this.config.outer_pad !== undefined ? this.config.outer_pad : 0.1;
    this.config.resizable = this.config.resizable !== undefined ? this.config.resizable : true;
    this.config.aspect = this.config.aspect || 1.33;
    this.config.scale_text = this.config.scale_text === undefined ? true : this.config.scale_text;
    this.config.transitions = this.config.transitions === undefined
        ? true
        : this.config.transitions;
}
