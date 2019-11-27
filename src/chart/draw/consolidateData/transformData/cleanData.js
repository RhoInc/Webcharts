import { time } from 'd3';

export default function cleanData(mark, raw) {
    const dateConvert = time.format(this.config.date_format);
    let clean = raw;
    // only use data for the current mark
    clean = mark.per && mark.per.length ? clean.filter(f => f[mark.per[0]] !== undefined) : clean;

    // Make sure data has x and y values
    if (this.config.x.column) {
        clean = clean.filter(f => [undefined, null].indexOf(f[this.config.x.column]) < 0);
    }
    if (this.config.y.column) {
        clean = clean.filter(f => [undefined, null].indexOf(f[this.config.y.column]) < 0);
    }

    //check that x and y have the correct formats
    if (this.config.x.type === 'time') {
        clean = clean.filter(f =>
            f[this.config.x.column] instanceof Date
                ? f[this.config.x.column]
                : dateConvert.parse(f[this.config.x.column])
        );
        clean.forEach(
            e =>
                (e[this.config.x.column] =
                    e[this.config.x.column] instanceof Date
                        ? e[this.config.x.column]
                        : dateConvert.parse(e[this.config.x.column]))
        );
    }
    if (this.config.y.type === 'time') {
        clean = clean.filter(f =>
            f[this.config.y.column] instanceof Date
                ? f[this.config.y.column]
                : dateConvert.parse(f[this.config.y.column])
        );
        clean.forEach(
            e =>
                (e[this.config.y.column] =
                    e[this.config.y.column] instanceof Date
                        ? e[this.config.y.column]
                        : dateConvert.parse(e[this.config.y.column]))
        );
    }

    if ((this.config.x.type === 'linear' || this.config.x.type === 'log') && this.config.x.column) {
        clean = clean.filter(f => {
            return mark.summarizeX !== 'count' && mark.summarizeX !== 'percent'
                ? !(isNaN(f[this.config.x.column]) || /^\s*$/.test(f[this.config.x.column])) // is or coerces to a number and is not a string that coerces to 0
                : f;
        });
    }
    if ((this.config.y.type === 'linear' || this.config.y.type === 'log') && this.config.y.column) {
        clean = clean.filter(f => {
            return mark.summarizeY !== 'count' && mark.summarizeY !== 'percent'
                ? !(isNaN(f[this.config.y.column]) || /^\s*$/.test(f[this.config.y.column])) // is or coerces to a number and is not a string that coerces to 0
                : f;
        });
    }

    return clean;
}
