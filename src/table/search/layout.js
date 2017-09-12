export default function layout() {
    const context = this;

    this.search.wrap = this.wrap.insert('div', ':first-child').classed('search-container', true);
    this.search.wrap.append('span').classed('description', true).text('Search:');
    this.search.wrap.append('input').classed('search-box', true).on('input', function() {
        const inputText = this.value.toLowerCase();
        console.log(inputText);

        //Determine which rows contain input text.
        context.data.search = context.data.raw.filter(d => {
            let match = false;

            Object.keys(d).forEach(key => {
                if (match === false) {
                    const cellText = '' + d[key];
                    match = cellText.toLowerCase().indexOf(inputText) > -1;
                }
            });

            return match;
        });
        console.log(context.data.search.length);

        context.config.activeLink = 0;
        context.draw(context.data.search);
    });
}
