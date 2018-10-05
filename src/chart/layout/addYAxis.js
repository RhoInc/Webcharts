export default function addYAxis() {
    this.svg
        .append('g')
        .attr('class', 'y axis')
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('dy', '.75em')
        .attr('text-anchor', 'middle');
}
