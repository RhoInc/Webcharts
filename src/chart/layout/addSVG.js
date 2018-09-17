export default function addSVG() {
    this.svg = this.wrap
        .append('svg')
        .datum(() => null) // prevent data inheritance
        .attr({
            class: 'wc-svg',
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            xlink: 'http://www.w3.org/1999/xlink'
        })
        .append('g')
        .style('display', 'inline-block');
}
