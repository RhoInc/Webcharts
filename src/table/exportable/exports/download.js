import { time } from 'd3';

export default function download(fileType, data) {
    //transform blob array into a blob of characters
    const blob = new Blob(data, {
        type: fileType === 'csv'
            ? 'text/csv;charset=utf-8;'
            : fileType === 'xlsx'
              ? 'application/octet-stream'
              : console.warn(`File type not supported: ${fileType}`)
    });
    const fileName = `webchartsTableExport_${time.format('%Y-%m-%dT%H-%M-%S')(
        new Date()
    )}.${fileType}`;
    const link = this.wrap.select(`.export#${fileType}`);

    if (navigator.msSaveBlob)
        //IE
        navigator.msSaveBlob(blob, fileName);
    else if (link.node().download !== undefined) {
        //21st century browsers
        var url = URL.createObjectURL(blob);
        link.node().setAttribute('href', url);
        link.node().setAttribute('download', fileName);
    }
}
