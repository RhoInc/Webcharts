export default function applySearchTerm(data) {
    if (this.searchable.searchTerm) {
        //Determine which rows contain input text.
        this.data.searched = this.data.filtered.filter(d => {
            let match = false;

            Object.keys(d).filter(key => this.config.cols.indexOf(key) > -1).forEach(var_name => {
                if (match === false) {
                    const cellText = '' + d[var_name];
                    match = cellText.toLowerCase().indexOf(this.searchable.searchTerm) > -1;
                }
            });

            return match;
        });
        this.data.processing = this.data.searched;
    } else {
        //Otherwise delete previously searched data and set data to filtered data.
        delete this.data.searched;
        this.data.processing = this.data.filtered;
    }
}
