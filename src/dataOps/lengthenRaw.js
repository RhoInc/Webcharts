/**
*expands a dataset to include one record per each column in the given array of columns
*@returns {array} a new, "longer" dataset
*@memberof webCharts.dataOps
*@method lengthenRaw
*@param {array} data the dataset to be transformed, in the form of an array of object, such as the one returned by d3.csv
*@param {array} columns an array of column names
*/
export function lengthenRaw(data, columns){
  let my_data = [];

  data.forEach(e => {

    columns.forEach(g => {
      let obj = Object.create(e);
      obj.wc_category = g;
      obj.wc_value = e[g];
      my_data.push(obj);
    });

  });

  return my_data;
  
}
