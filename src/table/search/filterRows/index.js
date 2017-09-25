export default function filterRows(table) {
        const inputText = this.value.toLowerCase();
        //Determine which rows contain input text.
        table.data.search = table.data.raw.filter(d => {
            let match = false;

            Object.keys(d).forEach(var_name => {
                if (match === false) {
                    const cellText = '' + d[var_name];
                    match = cellText.toLowerCase().indexOf(inputText) > -1;
                }
            });

            return match;
        });
        table.config.activeLink = 0;
        table.draw(table.data.search);
}
