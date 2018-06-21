import { time } from 'd3';

export default function csv(data) {
    this.wrap.select('.export#csv').on('click', () => {
        const CSVarray = [];

        //add headers to CSV array
        const headers = this.config.headers.map(header => `"${header.replace(/"/g, '""')}"`);
        CSVarray.push(headers);

        //add rows to CSV array
        data.forEach((d, i) => {
            const row = this.config.cols.map(col => {
                let value = d[col];

                if (typeof value === 'string') value = value.replace(/"/g, '""');

                return `"${value}"`;
            });

            CSVarray.push(row);
        });

        //transform CSV array into CSV string
        const CSV = new Blob([CSVarray.join('\n')], { type: 'text/csv;charset=utf-8;' }),
            fileName = `webchartsTableExport_${time.format('%Y-%m-%dT%H-%M-%S')(new Date())}.csv`,
            link = this.wrap.select('.export#csv');

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
    });
}
