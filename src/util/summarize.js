import { min, max, mean, median, sum } from 'd3';

const stats = {
  min,
  max,
  mean,
  median,
  sum
};

export default function summarize(vals, operation = 'mean') {
  const nvals = vals
    .filter(f => parseFloat(f) || parseFloat(f) === 0)
    .map(m => parseFloat(m));

  if (operation === 'cumulative') {
    return null;
  }

  const mathed = operation === 'count' ? vals.length :
    operation === 'percent' ? vals.length :
    stats[operation](nvals);

  return mathed;
}
