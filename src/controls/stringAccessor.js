export default function(o, s, v) {
    //adapted from http://jsfiddle.net/alnitak/hEsys/
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            if (i == n - 1 && v !== undefined) o[k] = v;
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}
