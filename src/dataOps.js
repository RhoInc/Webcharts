webCharts.dataOps = {
  
  getValType: getValType,
  lengthenRaw: lengthenRaw,
  linearRegression: linearRegression,
  naturalSorter: naturalSorter,
  standardError: standardError,
  summarize: summarize

};

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

export function linearRegression(x,y){
  //http://stackoverflow.com/questions/20507536/d3-js-linear-regression
  let lr = {};
  let n = y.length;
  let sum_x = 0;
  let sum_y = 0;
  let sum_xy = 0;
  let sum_xx = 0;
  let sum_yy = 0;

  for (let i = 0; i < n; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += (x[i]*y[i]);
    sum_xx += (x[i]*x[i]);
    sum_yy += (y[i]*y[i]);
  }

  lr.slope = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  lr.intercept = (sum_y - lr.slope * sum_x)/n;
  lr.r2 = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

  return lr;

}

export function naturalSorter(a, b){
  //http://www.davekoelle.com/files/alphanum.js
  function chunkify(t) {
    let tz = [];
    let x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      let m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  let aa = chunkify(a.toLowerCase());
  let bb = chunkify(b.toLowerCase());

  for (let x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      let c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      } else return (aa[x] > bb[x]) ? 1 : -1;
    }
  }

  return aa.length - bb.length;

}

export function standardError(vals){
  if(!vals)
    return null;

  let n = +vals.length;

  if (n < 1) return NaN;
  if (n === 1) return 0;

  let mean = d3.sum(vals)/n;
  let i = -1;
  let s = 0;

  while (++i < n) {
    let v = vals[i] - mean;
    s += v * v;
  }

  return Math.sqrt(s / (n - 1)) / Math.sqrt(n);
  
}

export function summarize(vals, operation){
  let nvals = vals.filter(f => +f || +f === 0)
    .map(m => +m);

  if(operation === 'cumulative')
    return null;

  let stat = operation || 'mean';
  let mathed = stat === 'count' ? vals.length :
  	stat === 'percent' ? vals.length :
  	d3[stat](nvals);

  return mathed;

}

export function getValType(data, variable){
 	let var_vals = d3.set(data.map(m => m[variable])).values();
  let vals_numbers = var_vals.filter(f => +f || f === 0 );

  if(var_vals.length === vals_numbers.length && var_vals.length > 4)
  	return 'continuous';
  else
  	return 'categorical';
};
