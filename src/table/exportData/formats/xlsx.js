export default function xlsx(data) {
    if (!data) data = this.data.filtered[0].values.map(d => d.raw);

    const sheetName = 'Selected Data',
        options = {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        },
        arrayOfArrays = data.map(d =>
            Object.keys(d).filter(key => this.config.cols.indexOf(key) > -1).map(key => d[key])
        ), // convert data from array of objects to array of arrays.
        workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        },
        cols = [];

    //Convert headers and data from array of arrays to sheet.
    workbook.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(
        [this.config.headers].concat(arrayOfArrays)
    );

    //Add filters to spreadsheet.
    workbook.Sheets[sheetName]['!autofilter'] = {
        ref: `A1:${String.fromCharCode(64 + this.config.cols.length)}${data.length + 1}`
    };

    //Define column widths in spreadsheet.
    this.table.selectAll('thead tr th').each(function() {
        cols.push({ wpx: this.offsetWidth });
    });
    workbook.Sheets[sheetName]['!cols'] = cols;

    const xlsx = XLSX.write(workbook, options),
        s2ab = function(s) {
            const buffer = new ArrayBuffer(s.length),
                view = new Uint8Array(buffer);

            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;

            return buffer;
        }; // convert spreadsheet to binary or something, i don't know

    //transform CSV array into CSV string
    const blob = new Blob([s2ab(xlsx)], { type: 'application/octet-stream;' }),
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
