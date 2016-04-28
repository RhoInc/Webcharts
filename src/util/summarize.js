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
    .filter(f => parseInt(f, 10) || parseInt(f, 10) === 0)
    .map(m => parseInt(m, 10));

  if (operation === 'cumulative') {
    return null;
  }

  const mathed = operation === 'count' ? vals.length :
    operation === 'percent' ? vals.length :
    stats[operation](nvals);

  return mathed;
}
