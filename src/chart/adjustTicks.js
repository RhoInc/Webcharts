export function adjustTicks(axis, dx, dy, rotation, anchor){
  if(!axis)
    return;
  this.svg.selectAll("."+axis+".axis .tick text")
    .attr({
        "transform": "rotate("+rotation+")",
        "dx": dx,
        "dy": dy
    })
    .style("text-anchor", anchor || 'start');
}