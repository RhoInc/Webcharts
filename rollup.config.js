import babel from 'rollup-plugin-babel';

export default {
    input: './src/index.js',
    output: {
        name: 'webCharts',
        file: './build/webcharts.js',
        format: 'umd',
        globals: {
            d3: 'd3'
        }
    },
    external: ['d3'],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [
                [ 'es2015' , {modules: false} ]
            ],
            plugins: [
                'external-helpers'
            ],
            babelrc: false
        })
    ]
}
