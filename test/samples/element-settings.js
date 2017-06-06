export default {
  x: {column: "Group", type: "ordinal", label: "Group" },
  y: {column: "Boiling point", type: "linear", label: '', format: '.0f'},
  marks: [
    {type: "bar", per: ["Group"], split: "Period", arrange: "grouped"},
    {type: "circle", per: ["Group"], summarizeY: "mean", tooltip: "[Name]", attributes: {"fill-opacity": 1, fill: "black", "stroke": "black"}, size: 4},
    {type: "line", per: ["Period"], summarizeY: "mean", tooltip: "[Name]", attributes: {"fill-opacity": 1, fill: "black", "stroke": "black"}, size: 4},
    {
      type: 'text',
      per: ['Group'],
      text: '$y',
      summarizeY: 'max',
      attributes: {
        'text-anchor': 'start',
        // 'dy': '-0.75em',
        // 'transform': 'rotate(-45)'
      }
    }
  ],
  color_by: "Period",
  max_width: 500,
  gridlines: 'xy'
};
