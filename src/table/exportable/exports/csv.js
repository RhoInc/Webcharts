import download from './download';

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

        //Download .csv file.
        download.call(this, 'csv', [CSVarray.join('\n')]);
    });
}
