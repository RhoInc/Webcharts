import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'webCharts',
    entry: 'src/index.js',
    format: 'umd',
    dest: 'build/webcharts.js',
    globals: {
        d3: 'd3'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
}
