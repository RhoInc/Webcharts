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
