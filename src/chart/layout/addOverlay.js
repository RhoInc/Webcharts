export default function addOverlay() {
    this.overlay = this.svg
        .append('rect')
        .attr('class', 'overlay')
        .attr('opacity', 0)
        .attr('fill', 'none')
        .style('pointer-events', 'all');
}
