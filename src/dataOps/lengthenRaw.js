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
