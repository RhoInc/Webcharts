import { min, max, mean, median, sum } from 'd3';

const stats = {
  min,
  max,
  mean,
  median,
  sum
};

export default function summarize(vals, operation) {
  const nvals = vals.filter(f => +f || +f === 0)
    .map(m => +m);

  if (operation === 'cumulative') {
    return null;
  }

  const stat = operation || 'mean';
  const mathed = stat === 'count' ? vals.length :
    stat === 'percent' ? vals.length :
    stats[stat](nvals);

  return mathed;
}
