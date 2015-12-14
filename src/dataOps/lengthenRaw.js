export default function (data, columns){
  let my_data = [];

  data.forEach(e => {

    columns.forEach(g => {
      let obj = Object.assign({}, e);
      obj.wc_category = g;
      obj.wc_value = e[g];
      my_data.push(obj);
    });

  });

  return my_data;
  
}
