export default function defineMark() {
    const mark = this.config.legend.mark
        ? this.config.legend.mark
        : this.config.marks.length && this.config.marks[0].type === 'bar'
        ? 'square'
        : this.config.marks.length
        ? this.config.marks[0].type
        : 'square';

    return mark;
}
