import { set } from 'd3';

export default function getValType(data, variable) {
    let var_vals = set(data.map(m => m[variable])).values();
    let vals_numbers = var_vals.filter(f => +f || +f === 0);

    if (var_vals.length === vals_numbers.length && var_vals.length > 4) {
        return 'continuous';
    } else {
        return 'categorical';
    }
}
