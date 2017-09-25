import updatePagination from '../../pagination/addPagination/updatePagination';

export default function filterRows(string) {
        const inputText = string.value.toLowerCase();
        //Determine which rows contain input text.
        this.data.search = this.data.raw.filter(d => {
            let match = false;

            Object.keys(d).forEach(var_name => {
                if (match === false) {
                    const cellText = '' + d[var_name];
                    match = cellText.toLowerCase().indexOf(inputText) > -1;
                }
            });

            return match;
        });
        this.config.activePage = 0;
        this.config.startIndex = this.config.activePage * this.config.nRowsPerPage; // first row shown
        this.config.endIndex = this.config.startIndex + this.config.nRowsPerPage; // last row shown
        this.draw(this.data.search);
}
