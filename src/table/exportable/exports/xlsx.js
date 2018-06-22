import download from './download';

export default function xlsx(data) {
    this.wrap.select('.export#xlsx').on('click', () => {
        const sheetName = 'Selected Data';
        const options = {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        };
        const arrayOfArrays = data.map(d =>
            Object.keys(d).filter(key => this.config.cols.indexOf(key) > -1).map(key => d[key])
        ); // convert data from array of objects to array of arrays.
        const workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        };
        const cols = [];

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

        const xlsx = XLSX.write(workbook, options);
        const s2ab = function(s) {
            const buffer = new ArrayBuffer(s.length),
                view = new Uint8Array(buffer);

            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;

            return buffer;
        }; // convert spreadsheet to binary or something, i don't know

        //Download .xlsx file.
        download.call(this, 'xlsx', [s2ab(xlsx)]);
    });
}
