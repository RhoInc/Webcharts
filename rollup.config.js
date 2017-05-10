import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'webCharts',
    entry: 'src/index.js',
    dest: 'build/webcharts.js',
    format: 'umd',
    globals: {d3: 'd3'},
    external: ['d3'],
    plugins: [
        babel({exclude: 'node_modules/**'})
    ]
}
