export default function naturalSorter(a, b) {
  // adapted from http://www.davekoelle.com/files/alphanum.js
  function chunkify(t) {
    const tz = [];
    let x = 0;
    let y = -1;
    let n = 0;
    let i;
    let j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      let m = (i == 46 || (i >= 48 && i <= 57));
      if (m !== n) {
        tz[++y] = '';
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  const aa = chunkify(String(a).toLowerCase());
  const bb = chunkify(String(b).toLowerCase());

  for (let x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      let c = Number(aa[x]);
      let d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      }
      else {
        return (aa[x] > bb[x]) ? 1 : -1;
      }
    }
  }

  return aa.length - bb.length;
}
