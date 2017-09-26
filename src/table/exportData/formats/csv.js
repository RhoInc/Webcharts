export default function csv(data) {
    if (!data)
        data = this.data.filtered[0].values.map(d => d.raw);

    const
        CSVarray = [];

    data.forEach((d, i) => {
        //add headers to CSV array
        if (i === 0) {
            const headers = this.config.headers.map(header => `"${header.replace(/"/g, '""')}"`);
            CSVarray.push(headers);
        }

        //add rows to CSV array
        const row = this.config.cols.map(col => {
            let value = d[col];

            if (typeof value === 'string')
                value = value.replace(/"/g, '""');

            return `"${value}"`;
        });

        CSVarray.push(row);
    });

    //transform CSV array into CSV string
    const CSV = new Blob([CSVarray.join('\n')], { type: 'text/csv;charset=utf-8;' }),
        fileName = `Selected Data.csv`,
        link = this.wrap.select('.download#csv');

    if (navigator.msSaveBlob) {
        // IE 10+
        link.style({
            cursor: 'pointer',
            'text-decoration': 'underline',
            color: 'blue'
        });
        link.on('click', () => {
            navigator.msSaveBlob(CSV, fileName);
        });
    } else {
        // Browsers that support HTML5 download attribute
        if (link.node().download !== undefined) {
            var url = URL.createObjectURL(CSV);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }
}
