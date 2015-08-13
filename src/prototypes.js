/** An object containing references to the three main objects that Webcharts can create.
*@memberof webCharts
*@type {object}
*@prop {object} chart points to the base {@link Chart chart} object
*@prop {object} table points to the base {@link Table table} object
*@prop {object} controls points to the base {@link Controls controls} object
*/
webCharts.objects = {
  chart: chartProto,
  table: tableProto,
  controls: controlsProto
};
