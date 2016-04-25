export default function stringAccessor(obj, str, val) {
  // adapted from http://jsfiddle.net/alnitak/hEsys/
  let s = str.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');
  const a = s.split('.');
  let objCopy = Object.create(obj);
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in objCopy) {
      if (i === n - 1 && val !== undefined) {
        objCopy[k] = val;
      }
      objCopy = objCopy[k];
    }
    else {
      break;
    }
  }
  return objCopy;
}
