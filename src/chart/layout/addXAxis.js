export default function addXAxis() {
    this.svg
        .append('g')
        .attr('class', 'x axis')
        .append('text')
        .attr('class', 'axis-title')
        .attr('dy', '-.35em')
        .attr('text-anchor', 'middle');
}
