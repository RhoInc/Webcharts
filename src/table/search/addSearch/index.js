import updatePagination from '../pagination/addPagination/updatePagination';

export default function addSearch() {
    this.search.wrap
        .select('.search-box')
        .on('input', function() {
            const inputText = this.value.toLowerCase();

          //Determine which rows contain input text.
            this.data.search = this.data.filtered
                .filter(d => {
                    let match = false;

                    Object.keys(d).forEach(key => {
                        if (match === false) {
                            const cellText = '' + d[var_name];
                            match = cellText.toLowerCase().indexOf(inputText) > -1;
                        }
                    });

                    return match;
                });

            this.config.activeLink = 0;
            this.draw(this.data.search);
        });

