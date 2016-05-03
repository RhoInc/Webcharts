import expect from 'expect';
import naturalSorter from '../src/util/naturalSorter';
import summarize from '../src/util/summarize';
import stringAccessor from '../src/util/stringAccessor';

const mixedArray = ['14', '1', 2, '5.5', '20days', '11', 12, 3, '0.4 weeks'];
const sortedArray = ['0.4 weeks', '1', 2, 3, '5.5', '11', 12, '14', '20days'];

const settingsObject = {
  'max_width':500,
  'x':{
    'label':'Protein (g)',
    'type':'linear',
    'column':'Protein (g)',
    format: '1f'
  },
  'y':{
    'label':'Carbs (g)',
    'type':'linear',
    'column':'Carbo(g)',
    format: '1f'
  },
  'marks':[
    {
      'type':'circle',
      'per':['Food'],
      'tooltip':'[Food]\n[Measure]\n$x grams protein\n$y grams carbs'
    },
    {
      type: 'text',
      text: '$x, $y',
      per: ['Food'],
      attributes: {
        'text-anchor': 'middle',
        'dx': '0.25em',
        'dy': '-0.25em'
      }
    }
  ],
  'aspect':'1',
  'gridlines':'xy'
};

describe('Utility functions', () => {
  describe('Natural sorter', () => {
    it('Will sort numbers and number-like strings', () => {
      const newlySortedArray = mixedArray.sort(naturalSorter);
      expect(newlySortedArray).toEqual(sortedArray);
    });
  });

  describe('Summarize', () => {
    it('Computes min', () => {
      const min = summarize(mixedArray, 'min');
      expect(min).toBe(0.4);
    });
    it('Computes max', () => {
      const max = summarize(mixedArray, 'max');
      expect(max).toBe(20);
    });
    it('Computes mean', () => {
      const mean = summarize(mixedArray, 'mean');
      expect(mean).toBe(7.655555555555556);
    });
    it('Computes median', () => {
      const median = summarize(mixedArray, 'median');
      expect(median).toBe(5.5);
    });
    it('Computes sum', () => {
      const sum = summarize(mixedArray, 'sum');
      expect(sum).toBe(68.9);
    });
    it('Computes count', () => {
      const count = summarize(mixedArray, 'count');
      expect(count).toBe(9);
    });
    it('Returns count when operation = "percent"', () => {
      const count = summarize(mixedArray, 'percent');
      expect(count).toBe(9);
    });
    it('Returns null when operation = "cumulative"', () => {
      const cumulative = summarize(mixedArray, 'cumulative');
      expect(cumulative).toBe(null);
    });
    it('Computes mean when no operation provided', () => {
      const mean = summarize(mixedArray);
      expect(mean).toBe(7.655555555555556);
    });
  });

  describe('String accessor', () => {
    it('returns value 1 level deep', () => {
      const gridlinesVal = 'xy';
      const accessedVal = stringAccessor(settingsObject, 'gridlines');
      expect(accessedVal).toBe(gridlinesVal);
    });
    it('returns value 2 levels deep', () => {
      const yTypeVal = 'linear';
      const accessedVal = stringAccessor(settingsObject, 'y.type');
      expect(accessedVal).toBe(yTypeVal);
    });
    it('returns value 3 levels deep inside array', () => {
      const attrVal = 'middle';
      const accessedVal = stringAccessor(settingsObject, 'marks.1.attributes.text-anchor');
      expect(accessedVal).toBe(attrVal);
    });
    it('overwrites value 1 level deep', () => {
      const gridlinesVal = 'x';
      const updatedVal = stringAccessor(settingsObject, 'gridlines', gridlinesVal);
      expect(updatedVal).toBe(gridlinesVal);
    });
    it('overwrites value 2 levels deep', () => {
      const yTypeVal = 'log';
      const updatedVal = stringAccessor(settingsObject, 'y.type', yTypeVal);
      expect(updatedVal).toBe(yTypeVal);
    });
    it('overwrites value 3 levels deep inside array', () => {
      const attrVal = 'start';
      const updatedVal = stringAccessor(settingsObject, 'marks.1.attributes.text-anchor', attrVal);
      expect(updatedVal).toBe(attrVal);
    });
  });
  
});