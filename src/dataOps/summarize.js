import { mean, min, max, median, sum } from 'd3';

const stats = {
    mean,
    min,
    max,
    median,
    sum
};

export default function summarize(vals, operation = 'mean') {
    const nvals = vals.filter(f => +f || +f === 0).map(m => +m);

    if (operation === 'cumulative') {
        return null;
    }

    const mathed = operation === 'count'
        ? vals.length
        : operation === 'percent' ? vals.length : stats[operation](nvals);

    return mathed;
}
