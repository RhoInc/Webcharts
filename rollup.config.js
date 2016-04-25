import babel from 'rollup-plugin-babel';

module.exports = {
  entry: './src/index.js',
  format: 'umd',
  exports: 'default',
  external: ['d3'],
  globals: {
    d3: 'd3'
  },
  moduleName: 'webcharts',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
