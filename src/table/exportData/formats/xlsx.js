export default function xlsx(data) {
    if (!data)
        data = this.data.filtered[0].values.map(d => d.raw);

    const
        options = {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary' 
        },
        arrayOfArrays = data
            .map(d => Object.keys(d)
                .filter(key => this.config.cols.indexOf(key) > -1)
                .map(key => d[key])
            ),
        workbook = {
            SheetNames: ['Selected Data'],
            Sheets: {'Selected Data': XLSX.utils.aoa_to_sheet([this.config.headers].concat(arrayOfArrays))}
        };

  //Add filters to workbook.
    workbook['!autofilter'] = {ref: `A1:${
        String.fromCharCode(64 + this.config.cols.length)}${
        data.length + 1}`};
    console.log(workbook);

    const
        xlsx = XLSX.write(workbook,options),
        s2ab = function(s) {
            const
                buffer = new ArrayBuffer(s.length),
                view = new Uint8Array(buffer);

            for (let i = 0; i !== s.length; ++i)
                view[i] = s.charCodeAt(i) & 0xFF;

            return buffer;
        };


    //transform CSV array into CSV string
    const
        blob = new Blob(
            [s2ab(xlsx)],
            {type: 'application/octet-stream;' }
        ),
        fileName = `Selected Data.xlsx`,
        link = this.wrap.select('.download#xlsx');

    if (navigator.msSaveBlob) {
        // IE 10+
        link.style({
            cursor: 'pointer',
            'text-decoration': 'underline',
            color: 'blue'
        });
        link.on('click', () => {
            navigator.msSaveBlob(blob, fileName);
        });
    } else {
        // Browsers that support HTML5 download attribute
        if (link.node().download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }
}
